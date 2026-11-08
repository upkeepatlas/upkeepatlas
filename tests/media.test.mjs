import test from "node:test";
import assert from "node:assert/strict";
import { csvRows } from "../scripts/check-media.mjs";
test("CSV parser handles quoted attribution and escaped quotes",()=>{
  assert.deepEqual(csvRows('a,b\n"x,y","He said ""yes"""\n'),[["a","b"],["x,y",'He said "yes"']]);
});
test("CSV parser rejects unclosed quote",()=>assert.throws(()=>csvRows('"bad'),/Unclosed/));
