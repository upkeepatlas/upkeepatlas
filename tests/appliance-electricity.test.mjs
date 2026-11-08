import test from "node:test";
import assert from "node:assert/strict";
import {estimateApplianceElectricity as calc} from "../src/lib/appliance-electricity.mjs";
test("daily 100 W for 4 hours at 20 cents",()=>{const r=calc();assert.ok(Math.abs(r.weeklyKwh-2.8)<1e-9);assert.ok(Math.abs(r.annualKwh-145.6)<1e-9);assert.ok(Math.abs(r.annualCost-29.12)<1e-9)});
test("duty cycle scales energy",()=>{assert.equal(calc({watts:1000,hoursPerDay:2,daysPerWeek:7,ratePerKwh:0.25,dutyPercent:50}).annualKwh,364)});
test("zero usage and zero rate allowed",()=>{assert.equal(calc({hoursPerDay:0}).annualCost,0);assert.equal(calc({ratePerKwh:0}).annualCost,0)});
test("invalid ranges and non-finite rejected",()=>{for(const args of [{watts:0},{watts:Infinity},{hoursPerDay:25},{daysPerWeek:-1},{ratePerKwh:-0.1},{dutyPercent:101},{watts:NaN}])assert.throws(()=>calc(args),RangeError)});
