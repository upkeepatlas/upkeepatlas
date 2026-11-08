import test from "node:test";
import assert from "node:assert/strict";
import {nextInspection,inspectionDates} from "../src/lib/filter-schedule.mjs";
test("date-only schedule handles leap years and DST boundaries",()=>{
 assert.equal(nextInspection("2028-02-28",1),"2028-02-29");
 assert.equal(nextInspection("2026-03-07",2),"2026-03-09");
 assert.deepEqual(inspectionDates("2026-12-30",2,2),["2027-01-01","2027-01-03"]);
});
test("invalid calendar dates, zero and excessive intervals fail",()=>{
 for(const date of ["2026-02-29","2026-13-01","2026-04-31","x","1999-01-01"]) assert.throws(()=>nextInspection(date,30),RangeError);
 for(const days of [0,-1,1.5,366,NaN]) assert.throws(()=>nextInspection("2026-11-08",days),RangeError);
 assert.throws(()=>inspectionDates("2026-11-08",30,25),RangeError);
});
