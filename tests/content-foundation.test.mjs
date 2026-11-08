import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const root = new URL("../", import.meta.url);
const get = (p) => fs.readFileSync(new URL(p, root), "utf8");

test("Astro 5 has a validated Markdown guide collection", () => {
  const cfg = get("src/content.config.ts");
  assert.match(cfg,/defineCollection/);
  assert.match(cfg,/glob\(\{ pattern: "\*\*\/\*\.md"/);
  for(const key of ["title","description","intro","publishedAt","publisher","reviewStatus","risk","sources"]){
    assert.match(cfg,new RegExp(key+":"));
  }
});
test("HVAC guide migration keeps the same slug and original primary-source claims", () => {
  const md=get("src/content/guides/hvac-filter-routine.md");
  const legacy=get("src/data/guides.mjs");
  assert.match(md,/title: "A practical routine for checking your HVAC filter"/);
  assert.match(md,/publishedAt: 2026-11-07/);
  assert.match(md,/reviewStatus: "ai-assisted-not-expert-reviewed"/);
  assert.match(md,/www\.energystar\.gov\/saveathome\/heating-cooling/);
  assert.match(md,/Never open an electrical compartment/);
  assert.doesNotMatch(legacy,/slug:"hvac-filter-routine"/);
});
test("guide pages render content collection and existing legacy guides", () => {
  const guidePage=get("src/pages/guides/[slug].astro");
  const index=get("src/pages/guides/index.astro");
  for(const code of [guidePage,index]){
    assert.match(code,/getCollection\("guides"\)/);
    assert.match(code,/legacyGuides/);
    assert.match(code,/Duplicate guide slug/);
  }
  assert.match(guidePage,/await render\(entry\)/);
  assert.match(index,/GuideCard/);
  assert.match(get("src/lib/routes.mjs"),/discoverRoutesFromPaths/);
});
test("scheduled execution instructions include GitHub connector without clone fallback",()=>{
  const prompt=get("docs/CONTENT_EXECUTION_MASTER_PROMPT.md");
  assert.match(prompt,/GITHUB CONNECTOR MODE/);
  assert.match(prompt,/No local clone or outbound DNS/);
  assert.match(prompt,/GitHub Actions/);
});
