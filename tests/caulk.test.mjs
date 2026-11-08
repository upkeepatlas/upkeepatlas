import test from "node:test";
import assert from "node:assert/strict";
import {estimateCaulk} from "../src/lib/caulk.mjs";
test("manufacturer geometric 1/4 x 1/4 rectangular example",()=>{
 const x=estimateCaulk({lengthFeet:24.3,widthInches:.25,depthInches:.25,tubeFluidOunces:10.1,wastePercent:0});
 assert.ok(Math.abs(x.exactTubes-1)<.002);
 assert.equal(x.tubesToBuy,1);
});
test("waste and whole-tube rounding",()=>{const a=estimateCaulk({lengthFeet:50,wastePercent:0});const b=estimateCaulk({lengthFeet:50,wastePercent:10});assert.ok(b.exactTubes>a.exactTubes);assert.equal(b.tubesToBuy,3);});
test("triangular volume is half rectangular",()=>{const a=estimateCaulk({shape:"rectangular"});const b=estimateCaulk({shape:"triangular"});assert.equal(b.volumeCubicInches,a.volumeCubicInches/2);});
test("invalid values and unknown profiles reject",()=>{for(const value of [0,-1,NaN,Infinity,100001]) assert.throws(()=>estimateCaulk({lengthFeet:value}),RangeError);assert.throws(()=>estimateCaulk({shape:"round"}),RangeError);assert.throws(()=>estimateCaulk({wastePercent:101}),RangeError);});
