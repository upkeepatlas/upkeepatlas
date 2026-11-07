---
name: seo-readiness-audit
description: Run a documented pre-release and post-deployment SEO/GEO readiness gate; distinguish tested outcomes from planned work.
---
# Skill: SEO / GEO Readiness Audit

## States
PASS = tested with evidence. FAIL = tested and not met. BLOCKED = cannot test until site, domain, tool or connection is available. N/A = genuinely inapplicable. Never turn BLOCKED into PASS.

## Gate A — content + design
[ ] Every public page solves a clear homeowner task; no placeholder/thin/duplicate pages.
[ ] Sources, revision dates and safety limitations shown where needed.
[ ] Functional tools are tested and accessible; print/download actions work.
[ ] Distinctive visual hierarchy, mobile responsive, keyboard accessible and honest publisher identity.

## Gate B — technical SEO (inspect build output)
[ ] Builds without errors; HTML is pre-rendered and valuable content appears in server response.
[ ] Indexable URLs respond 200, true missing routes 404.
[ ] Unique descriptive titles, H1s, metadata and absolute canonical on verified origin.
[ ] Valid XML sitemap of only canonical 200 pages; working robots.txt with sitemap.
[ ] Internal crawl from homepage; no orphan landing pages, dead links or accidental noindex.
[ ] JSON-LD is syntactically valid, truthful and corresponds to visible content.
[ ] OG metadata, accessible images with dimensions, semantic heading and language declarations.
[ ] No private data, fake credentials, misleading claims, thin location pages or duplicate intent.
[ ] Redirects, 404 handling, previews and canonical host verified.

## Gate C — GEO readiness
[ ] Primary facts are readable in HTML and supported by source links.
[ ] Intro answer, assumptions, exceptions and original tool outputs are evident.
[ ] No unsourced SEO/GEO hacks, AI-keyword stuffing or fake citation bait.
[ ] Structured data is accurate rather than overproduced; basic crawl eligibility verified.
[ ] No guaranteed placement in AI responses or Google Search is asserted.

## Gate D — live operations (must test after deployment)
[ ] Cloudflare Pages project and production deployment ID visible.
[ ] Production DNS/HTTPS domain confirmed; no mixed content.
[ ] Robots/canonical/sitemap served successfully from production origin.
[ ] Mobile performance and a11y test results documented.
[ ] Google Search Console ownership verified and sitemap submitted.
[ ] Analytics/ad integration and privacy obligations addressed before activation.
[ ] Real crawlers can access pages; index inclusion and impressions monitored over time.

## Report format
Provide a table: Check | Status | Evidence (URL/path/log) | Owner/next action. Include an executive summary with 'what is already implemented', 'what is tested' and 'what is blocked'. Site quality, eligibility and rankings are not equivalent.

References:
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/essentials/spam-policies
- https://web.dev/articles/vitals
