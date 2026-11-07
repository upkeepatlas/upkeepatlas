import test from "node:test";
import assert from "node:assert/strict";
import {PUBLIC_ROUTES} from "../src/lib/routes.mjs";
import {
  INDEXNOW_KEY, INDEXNOW_KEY_PATH, INDEXNOW_ORIGIN, INDEXNOW_ENDPOINT,
  routesForChangedFiles, makeIndexNowPayload
} from "../src/lib/indexnow.mjs";

test("IndexNow key and endpoint obey the protocol",()=>{
  assert.match(INDEXNOW_KEY,/^[A-Za-z0-9-]{8,128}$/);
  assert.equal(INDEXNOW_KEY_PATH, "/" + INDEXNOW_KEY + ".txt");
  assert.equal(INDEXNOW_ENDPOINT,"https://www.bing.com/indexnow");
  const p=makeIndexNowPayload(PUBLIC_ROUTES);
  assert.equal(p.host,"upkeepatlas.pages.dev");
  assert.equal(p.urlList.length,PUBLIC_ROUTES.length);
  assert.equal(p.keyLocation,INDEXNOW_ORIGIN+INDEXNOW_KEY_PATH);
  assert.ok(p.urlList.every(url=>url.startsWith(INDEXNOW_ORIGIN+"/")));
});
test("IndexNow sends a changed homepage without unnecessary URLs",()=>{
  assert.deepEqual(routesForChangedFiles(["src/pages/index.astro"]),["/"]);
});
test("IndexNow maps content changes, including removed URL paths",()=>{
  assert.deepEqual(routesForChangedFiles(["src/pages/checklists/seasonal-home-care/index.astro"]),
    ["/checklists/seasonal-home-care/"]);
  assert.deepEqual(routesForChangedFiles(["src/lib/routes.mjs"],["/"],["/removed/"]),
    ["/","/removed/"]);
});
test("IndexNow maps dynamic guides and shared layout changes",()=>{
  const guides=routesForChangedFiles(["src/data/guides.mjs"]);
  assert.ok(guides.includes("/guides/"));
  assert.ok(guides.includes("/guides/hvac-filter-routine/"));
  assert.ok(!guides.includes("/maintenance-calendar/"));
  assert.equal(routesForChangedFiles(["src/layouts/BaseLayout.astro"]).length,PUBLIC_ROUTES.length);
  assert.equal(routesForChangedFiles(["public/"+INDEXNOW_KEY+".txt"]).length,PUBLIC_ROUTES.length);
});
test("IndexNow skips docs, workflows, styling, sitemap implementation and 404",()=>{
  assert.deepEqual(routesForChangedFiles(["docs/INDEXNOW.md",".github/workflows/indexnow.yml","src/styles/global.css"]),[]);
  assert.deepEqual(routesForChangedFiles(["src/pages/404.astro","src/pages/sitemap.xml.ts"]),[]);
  assert.deepEqual(routesForChangedFiles([]),[]);
});
test("IndexNow rejects invalid hostnames, routes and duplicate submissions",()=>{
  assert.throws(()=>makeIndexNowPayload(["/"],"https://preview.upkeepatlas.pages.dev"));
  assert.throws(()=>makeIndexNowPayload(["/"],"http://upkeepatlas.pages.dev"));
  assert.throws(()=>makeIndexNowPayload(["/","/"]));
  assert.throws(()=>makeIndexNowPayload(["https://example.com/"]));
});
