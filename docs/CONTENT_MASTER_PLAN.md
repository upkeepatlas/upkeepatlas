# Upkeep Atlas — Function-First Publishing Master Plan

Version 1.0 · 2026-11-08 · U.S. first-time homeowners
GitHub: https://github.com/upkeepatlas/upkeepatlas
Live canonical: https://upkeepatlas.pages.dev/
**Authoritative work queue:** docs/production/queue.json
**Execution manual:** docs/CONTENT_EXECUTION_MASTER_PROMPT.md

## Purpose and constraints

Build a trustworthy, distinct home-maintenance field guide with genuinely working homeowner functions first and source-verified original articles second. Our differentiation is utility and coherent, readable editorial design, not mass production or keyword repetition.

The current site already has an annual planner, paint estimator, two checklists, three guides, About, Editorial, Privacy, Contact, responsive day/night themes, GitHub/Cloudflare Pages publishing, Google/Bing verification, AdSense loader and Bing IndexNow. Preserve everything that works and improve rather than duplicate it.

Organic traffic, rank, AI mentions and AdSense acceptance depend on competition, usefulness, indexing and publisher status. NO guaranteed ranking or traffic level; the queued keyword candidates are **research hypotheses, not observed search volume, difficulty or CPC**.

## Phases and information architecture

**PHASE 1 — FUNCTIONS.** Complete queued F001–F020, one complete published item per execution, respecting dependencies. The first three provide scalable editorial architecture, automatic SEO route discovery and legal media infrastructure; then implement independent utilities that make a new homeowner's work measurably easier. Existing tool URLs are enhancement targets, not new duplicate pages.

**PHASE 2 — ARTICLES.** After ALL function tasks have verifiable PUBLISHED status, release A001–A032, one original, useful, researched page at a time. Every page must fulfill a different user intent from existing content and provide a compelling original contribution.

**PHASE 3 — IMPROVE.** On real GSC/Bing query data and usability results, consolidate weak pages and improve tools; do not automatically generate similar location/keyword pages.

### Roadmap — functional part (details, intents and dependencies in queue.json)

| ID | Outcome | Planned public surface |
|---|---|---|
| F001 | Validated Astro article collection, metadata, source ledger and one live migration | Existing /guides/ |
| F002 | Dynamic SEO/sitemap/index and IndexNow route discovery without hard-coded counts | Existing routes |
| F003 | Media provenance, licensing intake, responsive images, performance and alt checks | Existing routes |
| F004 | Save, reset and export actual annual maintenance plan locally | /maintenance-calendar/ |
| F005 | Manufacturer-first HVAC filter inspection scheduler | /tools/hvac-filter-schedule/ |
| F006 | Annual maintenance budget calculator with user-defined uncertainty | /calculators/home-maintenance-budget/ |
| F007 | Personalized printable home checklist builder | /tools/custom-maintenance-checklist/ |
| F008 | Local-only maintenance record log with CSV import/export/delete | /tools/maintenance-log/ |
| F009 | Improve paint calculator for ceilings and measured wall segments | /calculators/paint-coverage/ |
| F010 | Personalized seasonal maintenance checklist builder | /tools/seasonal-maintenance-builder/ |
| F011 | Transparent caulk and sealant tube estimate | /calculators/caulk-tube-estimator/ |
| F012 | Watts/hours/rate electricity cost calculator | /calculators/appliance-electricity-cost/ |
| F013 | Appliance equipment maintenance register | /tools/appliance-maintenance-log/ |
| F014 | Private printable home inventory checklist | /tools/home-inventory/ |
| F015 | Broad climate-informed home-care selector | /tools/climate-home-care/ |
| F016 | Safe ground-level gutter observation planner | /tools/gutter-care-planner/ |
| F017 | Crawlable and accessible tools index with meaningful tags | /calculators/ |
| F018 | One useful seasonal hub, linking actual guidance and tools | /seasonal/ |
| F019 | Functional printables collection with working downloads | /printables/ |
| F020 | Entire tool suite mobile, accessibility, performance and technical SEO hardening | Existing routes |

The article backlog includes 32 separate factual questions across HVAC, planning, budgeting, seasons, moisture, exterior observations, household systems, painting/sealants, electricity and home inventory. Exact topic, keyword hypothesis, source risk, distinct user intent and planned path live in queue.json. No thin pages or made-up expert reviews.

### Future architecture

- src/content/ for validated articles (slug, query, summary, publishedAt, updatedAt when materially changed, publisher, sources, risk, author/review status, related tools, media).
- src/pages/guides/[slug].astro for readable server/static-rendered article text with breadcrumbs, helpful body, official citations, and accurate article metadata.
- src/pages/tools/ and src/pages/calculators/ for small, accessible interactive modules; pure formulas in src/lib/; unit tests in tests/.
- src/lib/routes.mjs, robots.txt, sitemap.xml, SEO audit and IndexNow kept synchronized; no brittle fixed route counts once F002 is delivered.
- src/components/ shared forms, figures, callouts, sources and navigation, all using existing light/dark design tokens.
- public/assets/ for optimized and lawfully sourced images; docs/production/assets.csv for their provenance.
- docs/production/ for queue, evidence briefs, run logs and real metrics, not indexable website pages.

## Keyword research and originality

Every run research the primary query and at least three variants using current U.S. search results. Note SERP date, at least three competitor URLs, type of result, intent, missing utility and competing coverage. Record verified primary technical sources. If GSC, Bing or reputable keyword data is connected, capture measured impressions, click-through, volume estimates with tool/time/country definitions; if not connected label metrics UNMEASURED rather than guessing. Candidate topics can change with a documented versioned queue update, while keeping one chosen task per run.

Original means extra value and effort: tested calculation with assumptions, original printable, original comparison/decision matrix, clear visual explanation or a genuinely researched synthesis. It does not mean a rewritten version of a competitor's text. No article stuffing, cloned headings, fake locality, mass pages or guaranteed rankings.

### How to write one article

Start with a useful short answer and applicability conditions; explain exactly what a homeowner should notice or decide; provide an original example, table, photograph or diagram when it genuinely improves understanding; cite precise primary claims; state safety/uncertainty; connect to at least one related verified tool and parent hub; close with related practical next steps and honest dates and creation/review disclosure.

Tool pages must have a substantive HTML explanation and default usable example even when JS has not run. They must calculate correctly, handle invalid inputs, explain units and assumptions, offer real print/export as promised and work on keyboard/mobile/night mode.

## Media strategy

Use authentic photography and technical illustrations as useful support, not decorative AI images. Default to self-produced SVG/diagrams or legally licensed real photography. Unsplash and Pexels license many commercial uses, but check specific asset terms; Wikimedia Commons files may require attribution/share-alike; manufacturer pages/images are not automatically licensed. Record each included asset's source, creator, rights, access date, edits, dimensions, file path and attribution in the media ledger. Do not hotlink arbitrary search results.

Use optimized responsive images, descriptive filenames, genuine alt text and meaningful captions. A video is optional and must have appropriate rights, transcript/captions where relevant, and no page-speed penalty without corresponding value. Generated images must not be misrepresented as real technical repairs or expert evidence. Avoid AI-looking glossy imaginary homes and fabricated before/after comparisons.

## SEO/GEO and AdSense standards

Every public page needs a distinct canonical intent, unique title/description/H1, meaningful internal links, a proper source/provenance section, non-deceptive OG preview, accurate schema matching visible content, a real sitemap/robots entry, correct HTTP 200, correct canonical and no accidental noindex. Headings and direct answers must be readable in generated HTML, not only hidden in JS or PDFs.

For articles use honest Article/BlogPosting metadata and truthful byline; for tools use structured data only where technically appropriate. Google AI Overviews/AI Mode require no special GEO markup. Good SEO is a foundation, not a guarantee of citations.

The page's main purpose must be immediately accessible, never obscured by AdSense units. Keep consent and privacy disclosures current, and do not claim AdSense approval because its script exists. Follow Google's people-first and scaled-content policies. No arbitrary minimum word count, media count or keyword density.

## Release gates — one item per run

1. Research evidence and clear unique intent; 3+ SERP competitors; official sources; risk and image-rights ledger.
2. Implement complete tool or article on a branch. Never output merely a plan, empty card, placeholder, dead link or partial page as finished.
3. Test function math, accessibility, keyboard, 320px/mobile, dark mode, focus, forms, print/export, safety guidance.
4. Run npm ci, npm run test, npm run build, npm run check, npm run check:seo, npm run check:theme, npm run check:indexnow and npm run check:queue. Preserve previous routes and scripts.
5. Confirm preview and PR; merge only passing work. Wait for Cloudflare exact production SHA, then test live URL, 200, canonical, links, images and interaction. For a platform/quality task, verify the changed functionality live on affected existing routes.
6. Only after live verification mark item PUBLISHED in queue.json with source evidence, CI URL, commit SHA, Cloudflare deployment identifier, live URL and verified date, plus a run log.
7. If blocked by access, licenses, legal safety signoff, CI or deployment, make targeted limited retries, keep the previous site stable, record BLOCKED/NEEDS_REVIEW, and resume the same task in a subsequent run rather than publishing lower-priority articles. Never claim delivery was verified if it was not.

**Completion** is a verified live artifact, not a GitHub push, a passing unit test, an unapproved draft or an IndexNow 202 receipt. If a production gate cannot be passed within an automation execution, no tool can guarantee completion; provide truthful evidence and a recovery plan.

## Automation invariants

- Queue order and state are authoritative. Resume IN_PROGRESS before selecting a new ID, enforce dependencies and function-first gate even after a failure.
- One ID per run; one PR/deploy sequence; compare-and-swap or re-fetch on concurrent GitHub writes. No force push, no rewriting another branch's work.
- No private credentials, API tokens or user content committed to GitHub. GitHub and Cloudflare connectors may require approval in a future task context.
- Docs-only changes do not justify IndexNow resubmission. Live Page SHA and actual indexing must be verified independently.
- Keep clear dated run logs, current source ledgers, release URLs, measured outcomes and blockers. Correct claims if later evidence changes.

## Official references reviewed

- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/appearance/google-images
- https://developers.google.com/search/docs/appearance/structured-data/article
- https://support.google.com/adsense/answer/1348727
- https://developers.cloudflare.com/pages/configuration/git-integration/
