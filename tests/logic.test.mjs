import test from "node:test";
import assert from "node:assert/strict";
import {estimatePaint} from "../src/lib/paint.mjs";
import {generatePlan,months} from "../src/lib/planner.mjs";
import {PUBLIC_ROUTES,publishedOrigin} from "../src/lib/routes.mjs";
test("paint arithmetic: walls, openings, coats and waste",()=>{
  const actual=estimatePaint();
  assert.equal(actual.grossWallArea,384);
  assert.equal(actual.paintableArea,344);
  assert.ok(Math.abs(actual.gallonsExact-(344*2*1.1/350))<1e-10);
  assert.equal(actual.gallonsToBuy,3);
});
test("one-coat calculation returns one gallon for a small room",()=>{
  assert.equal(estimatePaint({length:10,width:10,height:8,openings:0,coats:1,coverage:400,waste:0}).gallonsToBuy,1);
});
test("invalid or impossible paint inputs are rejected",()=>{
  for(const options of [{length:0},{openings:999},{coats:1.5},{waste:-1},{coverage:0},{width:NaN},{height:Infinity}]){
    assert.throws(()=>estimatePaint(options),RangeError);
  }
});
test("planner returns twelve months with unique sourced reminders",()=>{
  const plan=generatePlan();assert.equal(plan.length,12);
  assert.deepEqual(plan.map(item=>item.name),months);
  const tasks=plan.flatMap(item=>item.tasks);
  assert.ok(tasks.length>12);
  assert.ok(tasks.every(task=>task.source.startsWith("https://")));
  assert.equal(new Set(tasks.map(task=>task.id)).size,tasks.length);
});
test("planner respects disabled features, building type and climate",()=>{
  const condo=generatePlan({home:"condo",features:[],climate:"warm"}).flatMap(m=>m.tasks);
  assert.ok(!condo.some(task=>["gutters","cooling","heating","winter","humid","filters"].some(id=>task.id.startsWith(id+"-"))));
  const cold=generatePlan({home:"detached",features:["hvac","gutters","dryer"],climate:"cold"}).flatMap(m=>m.tasks);
  assert.ok(cold.some(task=>task.id.startsWith("winter-")));
});
test("routes and site-origin guardrails are deterministic",()=>{
  assert.ok(PUBLIC_ROUTES.length>=15);
  assert.ok(PUBLIC_ROUTES.includes('/tools/hvac-filter-schedule/'));
  assert.ok(PUBLIC_ROUTES.includes('/contact/'));
  assert.equal(new Set(PUBLIC_ROUTES).size,PUBLIC_ROUTES.length);
  assert.equal(publishedOrigin(undefined),"");
  assert.equal(publishedOrigin("http://example.com"),"");
  assert.equal(publishedOrigin("https://example.org/"),"https://example.org");
});
