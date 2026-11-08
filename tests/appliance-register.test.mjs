import test from "node:test";import assert from "node:assert/strict";
import {normalizeAppliance,normalizeActivity,exportAppliances,importAppliances,upcoming} from "../src/lib/appliance-register.mjs";
const a=normalizeAppliance({id:"unit-1",name:"Refrigerator",model:"ABC-123",brand:"Example"});
const r={applianceId:"unit-1",task:"Check manual-listed filter",date:"2026-11-08",next:"2027-01-08",notes:""};
test("requires name and model and limits fields",()=>{assert.equal(a.model,"ABC-123");assert.throws(()=>normalizeAppliance({name:"x"}));assert.throws(()=>normalizeAppliance({...a,model:"x".repeat(101)}));});
test("validates dates and equipment references",()=>{assert.deepEqual(normalizeActivity(r,[a]),r);for(const changes of [{date:"2026-02-30"},{next:"2026-01-01"},{applianceId:"missing"},{task:""}])assert.throws(()=>normalizeActivity({...r,...changes},[a]));});
test("backup roundtrip and corrupt import rejection",()=>{assert.deepEqual(importAppliances(exportAppliances([a],[r])),{appliances:[a],activities:[r]});assert.throws(()=>importAppliances('{"version":2}'));assert.throws(()=>importAppliances(exportAppliances([a,a],[r])));});
test("reminder ordering is explicit and date-based",()=>{const list=upcoming([r,{...r,next:"2026-11-01"},{...r,next:""}],"2026-11-08");assert.equal(list.length,2);assert.equal(list[0].overdue,true);});
