import test from "node:test";
import assert from "node:assert/strict";
import { maintenanceBudget } from "../src/lib/maintenance-budget.mjs";
const input={homeValue:350000,lowPercent:1,targetPercent:2,highPercent:4,annualSpend:2000,currentReserve:1000};
test("explicit scenario rates, monthly amounts and reserve gap",()=>{
 const r=maintenanceBudget(input);
 assert.equal(r.low,3500);assert.equal(r.target,7000);assert.equal(r.high,14000);
 assert.equal(r.monthlyTarget,7000/12);assert.equal(r.additionalTarget,5000);
 assert.equal(r.firstYearGap,6000);assert.equal(r.firstYearMonthlyGap,500);
});
test("existing annual spending or reserve cannot produce negative gaps",()=>{
 const r=maintenanceBudget({...input,annualSpend:9000,currentReserve:9000});
 assert.equal(r.additionalTarget,0);assert.equal(r.firstYearGap,0);
});
test("fractional rates remain exact until displayed rounding",()=>{
 const r=maintenanceBudget({...input,homeValue:100001,targetPercent:1.5,lowPercent:0.5,highPercent:2.5});
 assert.equal(r.target,1500.015);
});
test("rejects invalid, missing, reversed, extreme or negative inputs",()=>{
 for(const x of [
 {...input,homeValue:0},{...input,homeValue:Infinity},{...input,homeValue:NaN},
 {...input,lowPercent:5},{...input,targetPercent:-1},{...input,highPercent:21},
 {...input,annualSpend:-1},{...input,currentReserve:-1},
 {...input,homeValue:100000001},{...input,annualSpend:undefined}
 ])assert.throws(()=>maintenanceBudget(x),RangeError);
});
