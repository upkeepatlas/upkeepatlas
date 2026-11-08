---
name: content-seo-geo-release
description: Enforce per-page technical SEO, structured data, GEO discoverability, internal linking, indexability and content quality without ranking guarantees.
---
# Skill: SEO / GEO Release Gates for Content

## Baseline on every production page
- Unique query-intent-matched title (not clickbait) and meta description, 1 H1, logical H2/H3, clean slug and self-referencing canonical on actual verified production domain.
- Readable key answer and substantial primary content in generated HTML. Do not hide substantive content behind apps, PDFs, logins or JS.
- Genuine breadcrumbs and at least two context-appropriate links to relevant existing Upkeep Atlas pages where available, plus navigation to the new page from a real parent hub. No orphan pages or duplicate keyword intent.
- Accurate open graph, image URLs and source citations, no broken links or placeholders.
- Public 200, correct sitemap, robots and no accidental noindex. Never index staging, previews or drafts.
- Structured data: only truthful properties reflecting visible content. Article/BlogPosting schema for articles when publisher, dates and authorship are accurate; WebApplication if eligible and actually functional. Avoid fake reviews/FAQ rich-result hype. Validate JSON-LD.
- For new URLs update src/lib/routes.mjs and relevant hard-coded tests/audits until the registry is safely automated. Verify IndexNow trigger safely; never submit preview URLs.

## GEO interpretation
Google says AI Overviews and AI Mode have no special markup required: improve accessible text, factual traceability, unique insights, original computation, usability, crawl eligibility, and strong site architecture. Never claim guaranteed AI citations or invent "citation optimization scores". If an llms.txt file is ever added, treat it as optional documentation, not a ranking requirement.

## Publisher quality
Check policies on scaled content abuse, deceptive YMYL claims, copied photo licenses, ads interference and repetitive thin pages. Useful media only where appropriate. An image or embedded video count is not a ranking formula.

## Verification gates
A: Originality + research ledger + safety, rights, no duplicated intents.
B: npm test/build/check:seo/check:theme/check:indexnow/check: no regression; new URL visible in real HTML, links and sitemap.
C: Preview in both color schemes and mobile; accessible controls and working interactions.
D: Exact deployed Cloudflare SHA, live HTTP 200, canonical/robots/schema/images, linked hub, no layout break.
E: IndexNow if page changed; log response as *receipt only*, not index confirmation. GSC and Bing property status require dashboard evidence.

If any gate fails, fix and rerun; if required access/approval is missing, mark BLOCKED and do not publish unsupported claims.
Sources:
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/appearance/structured-data/article
- https://developers.google.com/search/docs/appearance/google-images
- https://developers.google.com/search/docs/essentials/spam-policies
