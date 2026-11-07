# Search Ownership & AdSense Integration Audit

**Date:** 2026-11-08  
**Site:** https://upkeepatlas.pages.dev/  
**Repo:** https://github.com/upkeepatlas/upkeepatlas  
**Reproducible CI proof:** https://github.com/upkeepatlas/upkeepatlas/actions/runs/42424232316  
**Dashboard guide:** [Search, Bing & AdSense setup](../SEARCH_AND_ADS_SETUP.md)

## Implementation

| Feature | Result | Evidence |
| --- | --- | --- |
| Google Search Console HTML verification meta | **PASS — live HTML** | Exact `google-site-verification` found inside live homepage HTML head through Cloudflare Browser Rendering |
| Bing Webmaster HTML verification meta | **PASS — live HTML** | Exact `msvalidate.01` found inside live homepage HTML head through Cloudflare Browser Rendering |
| AdSense account metadata | **PASS — live HTML** | Exact `google-adsense-account` publisher ID present |
| AdSense loader | **PASS — live HTML** | Exact Google-provided `adsbygoogle.js?client=ca-pub-3399213817491318` referenced on configured production pages |
| AdSense authorized sellers file | **PASS — live file** | https://upkeepatlas.pages.dev/ads.txt returned the specified Google DIRECT seller record |
| Policy disclosure | **PASS — source** | `src/pages/privacy/index.astro` now explains Google AdSense script, potential cookie/identifier processing and consent dependencies |
| Staging isolation | **PASS — generated HTML** | Without `PUBLIC_SITE_URL`, external AdSense loader is omitted |
| Generated-page verification markers | **PASS — 14 pages** | `npm run check:seo` validates tags and account ID in staging and production builds |
| Production AdSense tag singularity | **PASS — generated HTML** | One AdSense script reference per public page in production build |
| GitHub quality workflow | **PASS** | Run 42424232316: `npm ci`, six functional tests, Astro static build, SEO audit, Astro/TypeScript check, production SEO build all successful |
| Cloudflare Pages delivery | **PASS** | `upkeepatlas` Pages project GitHub-connected to `main`, successful production deployment |
| Live homepage canonical/indexability | **PASS** | Canonical remains https://upkeepatlas.pages.dev/ and indexable robots meta found |
| Search Console ownership in account | **BLOCKED — dashboard** | Code live, but `Verify` action not performed in the user's Google account |
| Bing Webmaster ownership in account | **BLOCKED — dashboard** | Code live, but `Verify` action not performed in the user's Bing account |
| Google/Bing sitemap submission | **BLOCKED — dashboard** | Generated sitemap is built; submissions unverified |
| AdSense site approval and earning ads | **BLOCKED — AdSense account** | Code installed; AdSense site review, Auto ads setting and ad-serving status unverified |
| Google-certified consent management | **BLOCKED — AdSense/privacy setup** | User/publisher must configure certified IAB TCF CMP for eligible EEA, UK and Swiss ad serving in AdSense Privacy & messaging |
| Custom domain and AdSense domain eligibility | **PENDING** | Current Pages subdomain may not satisfy AdSense site-entry policy in all cases; check account, prefer owned custom domain |

## Changes

- `src/layouts/BaseLayout.astro`: search owner tags, AdSense account meta and once-only async external loader for configured production.
- `public/ads.txt`: authorized Google seller record.
- `src/pages/privacy/index.astro`: truthful advertising and privacy disclosure.
- `scripts/check-seo.mjs`: guards for search tags, AdSense account meta, loader and ads.txt.
- `docs/SEARCH_AND_ADS_SETUP.md`: post-deployment dashboard actions.
- `README.md`: integration links and current state.

## Next actions that require account access

1. Verify the exact URL-prefix property `https://upkeepatlas.pages.dev/` within Google Search Console and submit `https://upkeepatlas.pages.dev/sitemap.xml`.
2. Verify the same site within Bing Webmaster Tools and submit the same sitemap.
3. Add the website to AdSense Sites, verify ownership, request review/approval, configure Google-certified CMP and regional privacy settings, then enable and tune Auto ads if approved.
4. If AdSense refuses the `pages.dev` hostname, attach an owned custom domain in Cloudflare Pages and update the production canonical, GSC/Bing properties and AdSense site application.
5. Review the privacy page, Cookie/CMP setup and legal obligations before active ad monetization. No code integration guarantees ad approval, impressions, clicks or earnings.

## Source reference

Implementation choices follow official Google Search Console HTML verification, Bing Webmaster meta verification, AdSense site connection/ads.txt, and Google publisher consent requirements, linked in [the setup guide](../SEARCH_AND_ADS_SETUP.md).
