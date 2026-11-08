import test from "node:test";
import assert from "node:assert/strict";
import { PUBLIC_ROUTES, discoverRoutesFromPaths } from "../src/lib/routes.mjs";
import { routesForChangedFiles } from "../src/lib/indexnow.mjs";

test("current Astro and Markdown routes are discovered without a manual count", () => {
  assert.ok(PUBLIC_ROUTES.includes("/"));
  assert.ok(PUBLIC_ROUTES.includes("/guides/hvac-filter-routine/"));
  assert.ok(PUBLIC_ROUTES.includes("/calculators/paint-coverage/"));
  assert.equal(PUBLIC_ROUTES.length, new Set(PUBLIC_ROUTES).size);
  assert.deepEqual(PUBLIC_ROUTES, [...PUBLIC_ROUTES].sort((a,b)=>a.localeCompare(b)));
});

test("new static pages and guide articles automatically become canonical URLs", () => {
  const files = [
    "src/pages/index.astro",
    "src/pages/guides/index.astro",
    "src/pages/guides/[slug].astro",
    "src/pages/tools/new-calculator/index.astro",
    "src/content/guides/new-safe-guide.md",
    "src/pages/404.astro",
    "src/pages/sitemap.xml.ts",
  ];
  assert.deepEqual(discoverRoutesFromPaths(files, ["legacy-guide"]), [
    "/", "/guides/", "/guides/legacy-guide/", "/guides/new-safe-guide/",
    "/tools/new-calculator/"
  ]);
});

test("unknown dynamic routes, unsafe paths and duplicate guide slugs fail closed", () => {
  assert.throws(()=>discoverRoutesFromPaths(["src/pages/index.astro","src/pages/tools/[id].astro"]),/Unregistered dynamic/);
  assert.throws(()=>discoverRoutesFromPaths(["src/pages/index.astro","src/pages/guides/[slug].astro","src/content/guides/unsafe/nested.md"]),/flat, safe/);
  assert.throws(()=>discoverRoutesFromPaths(["src/pages/index.astro","src/pages/guides/[slug].astro","src/content/guides/known.md"],["known"]),/Duplicate or unsafe/);
});

test("IndexNow selects additions and deletions without notifying unrelated pages", () => {
  const before=["/","/guides/","/guides/old-guide/"];
  const after=["/","/guides/","/guides/new-guide/"];
  assert.deepEqual(routesForChangedFiles(["src/content/guides/new-guide.md"],after,before),
    ["/guides/","/guides/new-guide/"]);
  assert.deepEqual(routesForChangedFiles(["src/content/guides/old-guide.md"],after,before),
    ["/guides/","/guides/old-guide/"]);
  assert.deepEqual(routesForChangedFiles(["src/pages/tools/new-tool/index.astro"],[...after,"/tools/new-tool/"],before),
    ["/tools/new-tool/"]);
  assert.deepEqual(routesForChangedFiles(["docs/production/evidence/F002.md"],after,before),[]);
});
