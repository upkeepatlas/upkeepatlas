# F002 — Automatic route and SEO registry · 2026-11-08

## Work and release
- Item: **F002**, function, only item selected in this execution.
- Keyword / intent: Astro sitemap and new article route automation; platform-infrastructure intent. U.S. homeowner keyword volume, difficulty, CPC, impressions, CTR and ranking **UNMEASURED**.
- Branch: `content/F002-route-discovery-20261108` (claimed `F002-20261108-route-discovery`). Main base was `5b70bcfcc124877ea61877a45d230f2aa45fc3a6`.
- Evidence / primary framework references / limitations: `docs/production/evidence/F002.md`.
- PR: https://github.com/upkeepatlas/upkeepatlas/pull/9 — merged via guarded squash after green PR-head workflow and matching successful preview.
- Merged production content SHA: `14292e7effb7595b25967919a492706e80bb12e9`.
- PR-head SHA: `01bb1e5569b249565ffd847486094fd66619d984`.
- PR CI: https://github.com/upkeepatlas/upkeepatlas/actions/runs/42431858123 — **SUCCESS**, with GitHub-hosted Cloudflare preview HTTPS smoke.
- Main CI: https://github.com/upkeepatlas/upkeepatlas/actions/runs/42431923943 — **SUCCESS**, all steps including `npm ci`, unit tests, `npm run check:queue`, `npm run build`, `npm run check:seo`, `npm run check:theme`, `node scripts/indexnow.mjs --check`, `npm run check`, production-environment SEO build, and independently fetched real production HTTPS smoke test, exact SHA guard.
- Cloudflare production project: `upkeepatlas`; deployment ID: `1251d6b2-fb5c-4ce7-b4d5-1e276e211af9` — **SUCCESS**, source branch main, exact SHA `14292e7effb7595b25967919a492706e80bb12e9`.
- Verified production URL: https://upkeepatlas.pages.dev/guides/hvac-filter-routine/ . Independently inspected live rendered HTML through Cloudflare Browser Rendering at 375px viewport: title **A practical routine for checking your HVAC filter | Upkeep Atlas**, one H1, absolute canonical pointing to exact URL, deployment fingerprint exact SHA, real related-guide navigation and link to `/guides/spotting-moisture-early/`, Google Search Console, Bing Webmaster and AdSense account markers present.
- Verified sitemap/robots/404 in GitHub-hosted HTTPS smoke: `/sitemap.xml` contains canonical guide and calculator routes, `/robots.txt` points to production sitemap, missing page returns 404. Production homepage and /guides/ fetched successfully with H1/canonical/integration checks; no preview indexing leak.
- Verification timestamp (UTC): **2026-11-08T00:56:09.062Z**.
- Result: **PUBLISHED** — verified operating route registry, not a new article.

## Delivered original technical utility
- Replaced manual static registry with build-time source-derived canonical routes from Astro static pages, actual Markdown guide entries and legacy guide slugs; unknown dynamic routing and unsafe slugs fail closed.
- Kept existing canonical routes and site functions. Added meaningful automatically generated related-guide links to existing guide detail pages; useful content stays server-rendered.
- Generated HTML route registry and sitemap URL sets must match exactly; automated tests cover new/deleted guide entries, malformed slugs and IndexNow changed-file selections.
- IndexNow now derives previous paths from the parent Git tree, no fixed route count. GitHub notifications are receipts, not proof of indexing. No new docs-only IndexNow URL submission requested; IndexNow workflow may independently run on this source-code release if it observes the exact production SHA.

## Review, media, safety, privacy and limitations
- Risk LOW: routing/SEO infrastructure, no hazardous homeowner procedure, no fabricated pro credentials, inspection or expert signoff.
- New media: **none**; no licensing claims or assets ledger entry, existing assets unchanged.
- Night-mode output audit PASS; existing theme toggles, AdSense script/ads.txt, contact, privacy, IndexNow key, and Google/Bing ownership markers preserved. No additional trackers, user inputs or stored personal data.
- Mobile browser: 375px rendered HTML inspected; 320/768/1024/1440 full visual screenshot and Lighthouse/real-user Core Web Vitals **NOT MEASURED** (no performance/a11y score claimed). GitHub source/build regression gates and semantic HTML checks passed. Google Search Console and Bing dashboard permissions/data **NOT VERIFIED**; public meta tags are not dashboard evidence.
- SEO/GEO: title, one H1, canonical, server-rendered links, sitemap, robots and 404 objectively checked. No promised indexing, AI citations, search ranking or paid-ad approval.
- Release queue record points to the **verified content merge SHA**; subsequent docs-only evidence commits may cause a later Pages deployment. They do not retroactively change the verified content SHA.
- Final disposition: published after verified site functionality. Future monitoring should use actual Search Console/Bing and mobile performance tools when available.
