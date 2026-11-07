import test from "node:test";
import assert from "node:assert/strict";
import {resolveTheme,nextTheme} from "../src/lib/theme.mjs";

test("theme follows system preference when none is saved", () => {
  assert.equal(resolveTheme(null,false),"light");
  assert.equal(resolveTheme(null,true),"dark");
  assert.equal(resolveTheme(undefined,true),"dark");
});
test("an explicit saved choice overrides the system", () => {
  assert.equal(resolveTheme("light",true),"light");
  assert.equal(resolveTheme("dark",false),"dark");
});
test("unrecognized values fail safely to system preference", () => {
  assert.equal(resolveTheme("night",false),"light");
  assert.equal(resolveTheme("invalid",true),"dark");
});
test("switching themes is deterministic and reversible", () => {
  assert.equal(nextTheme("light"),"dark");
  assert.equal(nextTheme("dark"),"light");
  assert.equal(nextTheme(nextTheme("light")),"light");
});
