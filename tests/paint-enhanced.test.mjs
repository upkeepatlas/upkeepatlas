import test from "node:test";
import assert from "node:assert/strict";
import {estimatePaintProject} from "../src/lib/paint.mjs";

test("default room stays backward compatible",()=>{
 const x=estimatePaintProject();
 assert.equal(x.paintableArea,344);
 assert.equal(x.gallonsToBuy,3);
 assert.equal(x.ceiling.area,0);
});
test("segments replace rectangular walls, not added",()=>{
 const x=estimatePaintProject({mode:"segments",segments:[{length:10,height:8,openings:20},{length:5,height:8,openings:0}],coats:1,coverage:100,waste:0});
 assert.equal(x.grossWallArea,120);
 assert.equal(x.paintableArea,100);
 assert.equal(x.gallonsExact,1);
});
test("ceiling and trim independently rounded",()=>{
 const x=estimatePaintProject({length:10,width:10,height:8,openings:0,coats:1,coverage:400,waste:0,includeCeiling:true,ceilingCoats:2,ceilingCoverage:100,trimArea:25,trimCoats:1,trimCoverage:100});
 assert.equal(x.wall.gallonsToBuy,1);
 assert.equal(x.ceiling.gallonsToBuy,2);
 assert.equal(x.trim.quartsToBuy,1);
});
test("reject invalid segment cutout and double counting ceiling",()=>{
 assert.throws(()=>estimatePaintProject({mode:"segments",segments:[{length:10,height:8,openings:80}]}),RangeError);
 assert.throws(()=>estimatePaintProject({mode:"segments",segments:[{length:10,height:8}],includeCeiling:true}),RangeError);
});
test("round quart boundary without floating overbuy",()=>{
 const x=estimatePaintProject({length:10,width:10,height:10,openings:0,coats:1,coverage:400,waste:0});
 assert.equal(x.wallQuartsToBuy,4);
});
