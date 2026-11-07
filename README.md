# Upkeep Atlas

A thoughtfully designed home-maintenance field guide for first-time U.S. homeowners, powered by a **static-first Astro website deployed to Cloudflare Pages**.

**Live:** https://upkeepatlas.pages.dev/  
**Cloudflare Pages project:** `upkeepatlas`, GitHub-connected production branch `main`.  
**Audit:** [Initial SEO/GEO and deployment report](docs/audits/2026-11-07-final.md).

## Features

- Twelve-month, climate/home-type/equipment-aware maintenance planner with source-linked reminders, checkboxes and printing.
- Free paint coverage calculator with dimensions, openings, coats, product coverage and waste factors.
- Two printable checklists for the first year and seasonal home care.
- Three carefully structured homeowner guides with primary-source links and safety qualifications.
- Refined responsive editorial UI; no login, invasive analytics or advertising code at launch.
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
```

Build output is `dist/`. Production Cloudflare Pages build command: `npm run build`, output: `dist`.

Set `PUBLIC_SITE_URL` **only to a verified HTTPS production host** (currently `https://upkeepatlas.pages.dev`) in Cloudflare Pages and CI. If unset, the build intentionally emits `noindex,nofollow`, robots disallow and an empty XML sitemap. Verify that the desired custom domain is actually connected before changing canonical URLs.

GitHub Actions: [Build & quality](.github/workflows/quality.yml) runs `npm ci`, 6 unit tests, Astro build, strict check, generated 14-page SEO audit and a second production-origin SEO build.

## Editorial and project standards

- [Master website build prompt](docs/MASTER_BUILD_PROMPT.md)
- [Project instructions](AGENTS.md)
- [Project brief](docs/PROJECT_BRIEF.md)
- [Research source ledger](docs/SOURCE_LEDGER.md)
- [Implementation & deployment notes](docs/IMPLEMENTATION.md)
- [SEO/GEO readiness audit](docs/audits/2026-11-07-final.md)
- [Local skills library](.agents/skills/)

Content is AI-assisted, with linked sources and explicit safety limitations. It is not professional home inspection or licensed repair advice. The brand mark is a provisional minimalist vector approximation of the selected art direction; the original approved graphic is not yet installed.

## Release honesty

Static technical SEO checks and deployment have passed, but live Search Console indexing, complete accessibility and browser tests, Core Web Vitals and ad network approval remain outstanding. No rankings, AI citations, or traffic results are guaranteed.
