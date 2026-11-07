# Upkeep Atlas implementation and deployment

## Architecture
Astro static output, HTML-first pages, small client-side scripts for the maintenance planner, calculator and printable checklists. Styling is hand-built CSS. Node's built-in test runner covers deterministic business logic. There is no backend, login or tracking/ad SDK.

## Pages deployment (GitHub source)
- GitHub: upkeepatlas/upkeepatlas, branch main.
- Build: npm run build; output dist.
- Node: 22.
- Set PUBLIC_SITE_URL to a **verified HTTPS production hostname** before indexing. Never assume the domain from the brand name.
- Check Cloudflare Pages Git integration, actual deploy ID and HTTPS URL. A pushed commit alone is not a deploy.

## Indexing safety
With no valid PUBLIC_SITE_URL at build time, the site intentionally emits noindex, omits canonical, disallows crawling in robots.txt and publishes an empty XML sitemap. This prevents accidentally treating a preview origin as canonical. It is not an SEO launch pass.

On verified production:
1. Set PUBLIC_SITE_URL to the real host in the Pages build environment, then rebuild.
2. Confirm live canonical, robots, sitemap, metadata, 200/404, redirects and domain/HTTPS.
3. Run npm run check:seo with the same variable; verify Search Console and submit sitemap.
4. Monitor indexing and search traffic over time rather than claiming ranking guarantees.

## Privacy and brand assets
Planner/checklist state is temporary in-browser state, no server API. Hosted access logs may be processed by Cloudflare. No intentional third-party ad or analytics scripts.
The SVG favicon is a **provisional hand-built vector inspired by the approved minimal roof/leaf direction**, not the original generated image binary; replace only after locating the exact asset and verifying visual quality/licensing.

## Tests
npm run test; npm run build; npm run check:seo; npm run check.
Recheck current package versions, run on real dependencies, and use live inspection before claiming production readiness. Lockfile should be generated/committed after an authenticated npm install.
