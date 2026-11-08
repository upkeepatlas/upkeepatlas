# Upkeep Atlas

A thoughtfully designed home-maintenance field guide for first-time U.S. homeowners, powered by a **static-first Astro website deployed to Cloudflare Pages**.

**Live:** https://upkeepatlas.pages.dev/  
**Cloudflare Pages project:** `upkeepatlas`, GitHub-connected production branch `main`.  
**Audit:** [Initial SEO/GEO and deployment report](docs/audits/2026-11-07-final.md).

## Function-first growth program

The versioned [function and article master plan](docs/CONTENT_MASTER_PLAN.md), [hourly task execution prompt](docs/CONTENT_EXECUTION_MASTER_PROMPT.md), [52-item production queue](docs/production/queue.json) and [7 additional skills](.agents/skills/) define how new content and functions are developed, source-checked, tested and verified on Cloudflare. A queued item is NOT a live page and no ranking or AdSense revenue is guaranteed.

Build and queue checks: npm run check:queue; npm run test; npm run build; npm run check:seo; npm run check:theme; npm run check.

## Features

- Twelve-month, climate/home-type/equipment-aware maintenance planner with source-linked reminders, checkboxes and printing.
- Free paint coverage calculator with dimensions, openings, coats, product coverage and waste factors.
- Two printable checklists for the first year and seasonal home care.
- Three carefully structured homeowner guides with primary-source links and safety qualifications.
- Contact page with a no-JavaScript contact form targeting upkeepatlas@protonmail.com, plus a direct email link.
- Bing IndexNow ownership key and production-verified GitHub Actions notifications for new or changed public URLs.
- Refined responsive editorial UI with a saved night/day theme and device color scheme support; no login, with Google AdSense loader configured for production. Ad placement and approval remain managed in AdSense.
- Static semantic HTML, per-route SEO metadata, sitemap and robots rules, JSON-LD, accessible navigation and a custom 404 page.

## Local development

Requires Node 22 and npm.

```sh
npm ci
npm run dev
npm run test
npm run check
npm run build
npm run check:seo
npm run check:indexnow
npm run check:theme
npm run indexnow:dry-run
```

Build output is `dist/`. Production Cloudflare Pages build command: `npm run build`, output: `dist`.

Set `PUBLIC_SITE_URL` **only to a verified HTTPS production host** (currently `https://upkeepatlas.pages.dev`) in Cloudflare Pages and CI. If unset, the build intentionally emits `noindex,nofollow`, robots disallow and an empty XML sitemap. Verify that the desired custom domain is actually connected before changing canonical URLs.

GitHub Actions: [Build & quality](.github/workflows/quality.yml) runs `npm ci`, 6 unit tests, Astro build, strict check, generated 15-page SEO audit and a second production-origin SEO build.

## Editorial and project standards

- [Master website build prompt](docs/MASTER_BUILD_PROMPT.md)
- [Project instructions](AGENTS.md)
- [Project brief](docs/PROJECT_BRIEF.md)
- [Research source ledger](docs/SOURCE_LEDGER.md)
- [Implementation & deployment notes](docs/IMPLEMENTATION.md)
- [Contact form setup and mailbox activation](docs/CONTACT_FORM_SETUP.md)
- [Bing IndexNow deployment automation and verification](docs/INDEXNOW.md)
- [Theme behavior and accessibility notes](docs/NIGHT_MODE.md)
- [Bing IndexNow acceptance and production audit](docs/audits/2026-11-08-indexnow.md)
- [SEO/GEO readiness audit](docs/audits/2026-11-07-final.md)
- [Content publishing production queue operations](docs/production/README.md)
- [Content and tool SEO/GEO master plan](docs/CONTENT_MASTER_PLAN.md)
- [Autonomous one-item master prompt](docs/CONTENT_EXECUTION_MASTER_PROMPT.md)
- [Search Console, Bing Webmaster and AdSense setup](docs/SEARCH_AND_ADS_SETUP.md)
- [Search and advertising integration audit — 2026-11-08](docs/audits/2026-11-08-search-ads.md)
- [Local skills library](.agents/skills/)

Content is AI-assisted, with linked sources and explicit safety limitations. It is not professional home inspection or licensed repair advice. The brand mark is a provisional minimalist vector approximation of the selected art direction; the original approved graphic is not yet installed.

## Release honesty

Static technical SEO checks and deployment have passed, but live Search Console indexing, complete accessibility and browser tests, Core Web Vitals, account-side ownership verification, ad network approval and regional consent configuration remain outstanding. No rankings, AI citations, or traffic results are guaranteed.
