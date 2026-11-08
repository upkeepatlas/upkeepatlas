import test from "node:test";import assert from "node:assert/strict";import {OBSERVATIONS,buildGutterPlan} from "../src/lib/gutter-care.mjs";
test("empty report does not certify gutters",()=>{const r=buildGutterPlan();assert.equal(r.findings.length,0);assert.match(r.summary,/cannot be ruled out/);});
test("ordered findings are deterministic",()=>{const r=buildGutterPlan({observed:["pool","sag"],exposure:"rain",date:"2026-11-08"});assert.deepEqual(r.findings.map(x=>x.id),["sag","pool"]);assert.match(r.exposureNote,/rain/i);});
test("every selectable observation yields a useful follow-up",()=>{for(const o of OBSERVATIONS){const r=buildGutterPlan({observed:[o.id]});assert.ok(r.findings[0].detail.length>35);}});
test("reject unknown, duplicate and malformed inputs",()=>{for(const observed of [["roof"],["sag","sag"],"sag"]){assert.throws(()=>buildGutterPlan({observed}));}assert.throws(()=>buildGutterPlan({exposure:"flood-zone-5"}));assert.throws(()=>buildGutterPlan({date:"yesterday"}));});
