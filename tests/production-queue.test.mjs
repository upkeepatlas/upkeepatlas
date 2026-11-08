import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {validateQueue,selectNextTask} from "../scripts/validate-production-queue.mjs";
const queue=JSON.parse(fs.readFileSync(new URL("../docs/production/queue.json",import.meta.url),"utf8"));

test("production queue is valid and has function-first priorities",()=>{
  assert.deepEqual(validateQueue(queue),[]);
  assert.equal(queue.tasks.filter(t=>t.type==="function").length,20);
  assert.equal(queue.tasks.filter(t=>t.type==="article").length,32);
});
test("first run selects highest-priority function",()=>{
  const result=selectNextTask(queue);
  assert.equal(result.task.id,"F001");
  assert.match(result.reason,/highest-priority/);
});
test("a claimed task blocks moving to any next item",()=>{
  const copy=structuredClone(queue);
  copy.tasks[0].status="in_progress";
  copy.tasks[0].claim={id:"run-1",at:"2026-11-08T00:00:00Z"};
  assert.equal(selectNextTask(copy).task.id,"F001");
  assert.deepEqual(validateQueue(copy),[]);
});
test("articles are never started while functions remain incomplete",()=>{
  const copy=structuredClone(queue);
  copy.tasks.find(t=>t.id==="A001").status="in_progress";
  copy.tasks.find(t=>t.id==="A001").claim={id:"no",at:"2026-11-08T00:00:00Z"};
  assert.ok(validateQueue(copy).some(p=>p.includes("Articles cannot start")));
});
test("fabricated publication receipts are rejected",()=>{
  const copy=structuredClone(queue);
  copy.tasks[0].status="published";
  assert.ok(validateQueue(copy).some(p=>p.includes("cannot mark published")));
});
test("duplicate IDs and unverified routes are rejected",()=>{
  const copy=structuredClone(queue);
  copy.tasks[1].id="F001";
  copy.tasks.find(t=>t.id==="A001").targetPath="https://spam.example/article/";
  const errors=validateQueue(copy);
  assert.ok(errors.some(p=>p.includes("Duplicate ID")));
  assert.ok(errors.some(p=>p.includes("unsafe canonical")));
});
