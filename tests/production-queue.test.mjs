import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {validateQueue,selectNextTask} from "../scripts/validate-production-queue.mjs";
const queue=JSON.parse(fs.readFileSync(new URL("../docs/production/queue.json",import.meta.url),"utf8"));

const pendingFunction = (q) => q.tasks
  .filter(t => t.type === "function" && t.status !== "published")
  .sort((a,b) => b.priority-a.priority || a.id.localeCompare(b.id))[0];

test("production queue is valid and has function-first priorities",()=>{
  assert.deepEqual(validateQueue(queue),[]);
  assert.equal(queue.tasks.filter(t=>t.type==="function").length,20);
  assert.equal(queue.tasks.filter(t=>t.type==="article").length,32);
});
test("selection advances to highest priority unpublished function",()=>{
  const result=selectNextTask(queue);
  const next=pendingFunction(queue);
  assert.ok(next, "expected remaining functional work in this roadmap");
  assert.equal(result.task?.id,next.id);
  assert.match(result.reason,/highest-priority/);
});
test("a claimed task blocks moving to any next item",()=>{
  const copy=structuredClone(queue);
  const next=pendingFunction(copy);
  next.status="in_progress";
  next.claim={id:"run-1",at:"2026-11-08T00:00:00Z"};
  assert.equal(selectNextTask(copy).task.id,next.id);
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
  const next=pendingFunction(copy);
  next.status="published";
  next.release=null;
  next.evidence=null;
  assert.ok(validateQueue(copy).some(p=>p.includes("cannot mark published")));
});
test("duplicate IDs and unverified routes are rejected",()=>{
  const copy=structuredClone(queue);
  copy.tasks[1].id=copy.tasks[0].id;
  copy.tasks.find(t=>t.id==="A001").targetPath="https://spam.example/article/";
  const errors=validateQueue(copy);
  assert.ok(errors.some(p=>p.includes("Duplicate ID")));
  assert.ok(errors.some(p=>p.includes("unsafe canonical")));
});
