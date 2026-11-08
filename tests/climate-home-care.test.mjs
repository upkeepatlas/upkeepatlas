import test from "node:test";import assert from "node:assert/strict";import {selectClimateCare,EXPOSURES} from "../src/lib/climate-home-care.mjs";
test("no exposure yields only baseline",()=>assert.deepEqual(selectClimateCare([]).map(x=>x.id),["baseline"]));
test("multi-exposure selection includes both and no unrelated prompts",()=>assert.deepEqual(selectClimateCare(["rain","freeze"]).map(x=>x.id),["freeze","rain","baseline"]));
test("duplicates are deduplicated",()=>assert.equal(selectClimateCare(["heat","heat"]).length,2));
test("all exposures are available",()=>assert.equal(selectClimateCare(EXPOSURES.map(x=>x.id)).length,EXPOSURES.length+1));
test("invalid inputs fail closed",()=>{assert.throws(()=>selectClimateCare(["unknown"]));assert.throws(()=>selectClimateCare(null));});