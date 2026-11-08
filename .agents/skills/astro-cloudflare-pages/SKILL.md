---
name: astro-cloudflare-pages
description: Build and deploy Upkeep Atlas's content-heavy static-first website using Astro, GitHub and the existing Cloudflare Pages workflow.
---
# Skill: Astro + Cloudflare Pages

## Decision
Prefer Astro static output for a content-focused site. HTML and critical content must be present in the built document, not require JavaScript hydration or client-side fetching. Use plain CSS or small focused interactive islands. Don't add a database or Workers backend until a feature genuinely needs one.

## Repository shape
- `src/pages/` for routes; `src/layouts/` and `src/components/` for shared UI.
- `src/content/` and collections with validated metadata for future guides.
- `src/styles/` for tokens and typography; `public/` for static icons and known crawl assets.
- `scripts/` for validation tools; `docs/` for editorial and technical decisions.
- No user credentials or account IDs in committed source.

## Checkout-independent workflow

If local git clone or DNS is disabled in a scheduled ChatGPT runtime, use linked GitHub repository file actions for commits and GitHub Actions runners for independent npm ci, test, Astro build and SEO checks. Cloudflare Pages remains Git-connected to main. A local checkout is optional; production exact-SHA and live checks are mandatory. This avoids a false infrastructure blocker when available GitHub/Cloudflare connectors work.

## Cloudflare workflow
1. Inspect current GitHub branch and Cloudflare Pages project (do not assume the deployment exists).
2. For Astro static: `npm run build`, output directory `dist`, set Node version to a supported version documented for the selected Astro release.
3. Commit site and assets to GitHub; connect Pages to this specific repository/branch via its Git integration.
4. Validate deployment URL and check automatic rebuild after an approved commit.
5. Preview changes safely via preview builds/branches when available.
6. Do not expose unpublished drafts or preview deployments to indexing.

## Implementation guardrails
- Keep dependencies few and pin versions through `package-lock.json`.
- Avoid layout shifts from image and font loading; lazy-load below-fold imagery.
- Generate `robots.txt`, sitemap, canonical URLs and feeds from verified origin configuration.
- Cloudflare configurations, headers and redirects must follow current Pages docs.
- If Pages project is not visible in the connected Cloudflare account, record deployment as BLOCKED and do not claim it is live.
- Never place secrets, analytics tokens or Cloudflare API tokens in GitHub files.

## Verification
Run install/build checks, inspect actual output HTML, then test production HTTP status, key routes, redirects, content-type, robots, sitemap and canonical target. A successful GitHub push is NOT equivalent to a successful Pages deployment.

Sources:
- https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- https://developers.cloudflare.com/pages/configuration/git-integration/
- https://developers.cloudflare.com/pages/configuration/build-configuration/
