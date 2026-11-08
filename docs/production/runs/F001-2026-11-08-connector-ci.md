# F001 — Released on November 8, 2026

Status: **PUBLISHED**
Verified at UTC: 2026-11-08T00:37:32.764Z
Task ID: F001 — Content publishing foundation
Research evidence: docs/production/evidence/F001.md
Primary keyword: not applicable to internal publishing infrastructure; SEO metrics remain UNMEASURED.

## What was implemented

- Astro 5 content layer at src/content.config.ts using glob Markdown loader and Zod validation for descriptions, factual publication dates, source IDs, publisher, review status and risk classification.
- Migrated the existing HVAC filter guide into src/content/guides/hvac-filter-routine.md without changing public URL, headings, disclaimer, primary sources, or its basic content and intent.
- Guides index and dynamic route renderer support a mix of validated Markdown and two existing legacy JS guides, while throwing on duplicate slugs.
- Authorship and safety messaging is factual: Upkeep Atlas publisher, AI-assisted and no claimed professional review.
- Editorial authoring guide and 4 tests added; all 15 original canonical site routes remain intact.
- Fix for repeated scheduled-task DNS blocker: GitHub plugin edits/PR, GitHub Actions checks, Cloudflare Pages production checks. No local git clone or outbound DNS required.

## Source basis and safety

Astro official docs, Google people-first content and Cloudflare Git integration are listed in docs/production/evidence/F001.md. Existing ENERGY STAR HVAC and EPA moisture links retained, with no new claim of field testing or expert review. No new image assets were added. Low-risk planning/observation guidance only.

## GitHub and CI

- PR: https://github.com/upkeepatlas/upkeepatlas/pull/7 — merged
- Production content commit: a41a2cfb7e1415c41e167099c9649970dd8cbfd1
- Full GitHub Actions quality run: https://github.com/upkeepatlas/upkeepatlas/actions/runs/42430363513 — green
- Passed: npm ci, unit tests including new F001 tests, queue validator, Astro build, generated HTML SEO, theme, IndexNow, Astro type checking and production-host SEO build.

## Cloudflare and live content verification

- Project: upkeepatlas
- Environment: production
- Deployment ID: 959e7155-246e-41ea-bf86-6f8311acfaac
- Exact deployed content commit: a41a2cfb7e1415c41e167099c9649970dd8cbfd1
- Deployment status: success (all stages success: queued, initialize, clone_repo, build, deploy)
- Live URL: https://upkeepatlas.pages.dev/guides/hvac-filter-routine/
- Browser Rendering HTML retrieval: confirmed existing canonical URL, title, article heading, original source references, preserved guide body and new published byline; the /guides/ index still links to all three original guides.
- Verified at: 2026-11-08T00:37:32.764Z
- Not claimed: real Google indexing, organic ranking, AdSense acceptance, full multi-viewport visual accessibility certification. These remain separate audits and metrics.

## Outcome and next action

F001 is published and the queue now permits F002, Automatic route and SEO registry. The automation prompt has been directly updated so future hourly executions do not repeat a false BLOCKED report when the chat runtime cannot clone GitHub.
