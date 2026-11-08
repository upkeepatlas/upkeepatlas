#!/usr/bin/env node
/**
 * GitHub-hosted HTTPS smoke test for the actual Cloudflare Pages site.
 * A successful build/deployment API response alone does not prove useful HTML.
 * In PR mode, check the branch preview; in main mode require the exact SHA.
 */
const isPR = process.env.GITHUB_EVENT_NAME === "pull_request";
const branch = process.env.GITHUB_HEAD_REF || "";
const sha = process.env.GITHUB_SHA || "";
const production = "https://upkeepatlas.pages.dev";
function previewAlias(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    .slice(0, 28).replace(/-$/g, "");
}
const base = isPR ? "https://" + previewAlias(branch) + ".upkeepatlas.pages.dev" : production;
if (isPR && !branch) throw Error("PR branch missing");
if (!isPR && !/^[a-f0-9]{40}$/.test(sha)) throw Error("Main SHA missing");
const sleep = ms => new Promise(resolve=>setTimeout(resolve,ms));

async function inspect() {
  const paths = ["/", "/guides/", "/guides/hvac-filter-routine/", "/sitemap.xml", "/robots.txt"];
  const output = {};
  for (const pathname of paths) {
    const response = await fetch(base + pathname + "?smoke=" + encodeURIComponent(sha),
      {headers:{"Cache-Control":"no-cache"},signal:AbortSignal.timeout(15000)});
    if (response.status !== 200) throw Error(pathname + ": HTTP " + response.status);
    output[pathname] = await response.text();
  }
  const article = output["/guides/hvac-filter-routine/"];
  if (!article.includes('aria-label="More field notes"') ||
      !article.includes('href="/guides/spotting-moisture-early/"')) {
    throw Error("Visible automated guide cross-links missing");
  }
  for (const route of ["/", "/guides/", "/guides/hvac-filter-routine/"]) {
    const html=output[route];
    const h1=(html.match(/<h1\b/gi)||[]).length;
    if(h1!==1)throw Error(route+": expected one H1, got "+h1);
    if(!html.includes('rel="canonical" href="'+production+route+'"'))
      throw Error(route+": wrong canonical");
    if(!html.includes('name="google-site-verification"') ||
       !html.includes('name="msvalidate.01"') ||
       !html.includes('name="google-adsense-account"') ||
       !html.includes('upkeepatlas-theme'))throw Error(route+": integration marker missing");
    if(!isPR && !html.includes('name="upkeepatlas-deploy-commit" content="'+sha+'"')) {
      throw Error(route+": Cloudflare production has not deployed "+sha);
    }
  }
  const sitemap=output["/sitemap.xml"], robots=output["/robots.txt"];
  if(!sitemap.includes("<loc>"+production+"/guides/hvac-filter-routine/</loc>") ||
     !sitemap.includes("<loc>"+production+"/calculators/paint-coverage/</loc>"))
    throw Error("Sitemap is missing verified canonical routes");
  if(!robots.includes("Sitemap: "+production+"/sitemap.xml"))throw Error("Robots sitemap reference missing");
  const missing=await fetch(base+"/not-a-real-page-for-smoke-f002/",
    {signal:AbortSignal.timeout(15000)});
  if(missing.status!==404)throw Error("Missing path did not return HTTP 404: "+missing.status);
  console.log("PASS live HTTPS, 200/404, canonical, H1, sitemap, robots, related links and integrations",
    base,"mode",isPR?"preview":"production","SHA",sha);
}
let last;
for(let attempt=1;attempt<=24;attempt++){
  try{await inspect();process.exit(0);}catch(error){
    last=error;
    console.warn("Cloudflare Pages smoke retry",attempt+"/24",String(error));
    if(attempt<24)await sleep(7000);
  }
}
console.error("FAIL: preview/production HTTP smoke did not verify:",last);
process.exitCode=1;
