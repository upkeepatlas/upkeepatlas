---
name: technical-seo
description: Implement indexable, crawlable, logically organized and measurable technical SEO for Upkeep Atlas pages.
---
# Skill: Technical SEO

## Required page metadata
- One unique, descriptive HTML title per indexable URL (write for humans; avoid keyword stuffing).
- One useful meta description; may be rewritten by search engines.
- One visible H1 and a sensible heading hierarchy; a clear introductory answer in real HTML.
- Absolute, self-referencing canonical URL on the verified production origin; pagination or duplicates handled case by case.
- Meaningful internal `<a href>` links and descriptive anchor text.
- Appropriate Open Graph/Twitter summary data and valid image URLs once assets exist.
- Distinct URL slugs; redirects for moved content; no placeholder thin pages presented as complete.

## Discovery
- XML sitemap includes only canonical, public, indexable, 200-status URLs; dates are genuine change dates.
- `robots.txt` allows valuable pages and points to the sitemap; do not attempt to protect private content with robots.
- Test `noindex` for drafts, staging, internal utility endpoints, search results when appropriate.
- Crawl from homepage to each indexable page through links, not sitemap alone.
- Every route returns useful server/static-rendered HTML; 404 is a real 404.

## Structured data
- Use JSON-LD only when it accurately describes visible content.
- Sitewide `WebSite` and truthful `Organization` only as appropriate.
- `BreadcrumbList` for navigable page trails; `Article` or `BlogPosting` for substantive articles with honest dates/authorship; `SoftwareApplication`/ `WebApplication` if a real functional tool is published and eligible.
- No fake reviews, star ratings, affiliations, certifications or misleading author profiles.
- Validate with Schema.org Validator and Google's Rich Results Test where applicable. Schema does not guarantee rich results.

## Editorial architecture
Focus clusters: seasonal care, routine home checklists, maintenance calendar, simple cost calculators, systems and materials. Publish distinct intent pages only when each adds unique value.

## Audit
Test actual deployed HTML: title, H1, meta description, canonical, link traversal, images/alt text, schema syntax, sitemap, robots, status codes, redirect chains, noindex and duplicate URLs. Confirm Google Search Console ownership, submit sitemap and monitor index coverage and impressions after launch. Do not mark complete based only on source code.

Official references:
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
