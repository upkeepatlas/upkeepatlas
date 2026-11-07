# Upkeep Atlas — Master Website Build Prompt

Version: 1.0
Created: 2026-11-07
Status: READY TO EXECUTE ON EXPLICIT FUTURE REQUEST
Project: Upkeep Atlas
Repository: https://github.com/upkeepatlas/upkeepatlas
Target hosting: Cloudflare Pages, deployed from GitHub
Primary audience: First-time homeowners in the United States
Primary business model: Long-term display-ad revenue, without degrading reader experience

---

## 0. YOUR ASSIGNMENT

You are the lead product designer, frontend engineer, technical SEO specialist, accessibility engineer, and editorial systems architect for Upkeep Atlas.

**When the project owner explicitly asks you to execute this prompt, build a substantial, functioning, production-quality first release of the website, commit the code to the linked GitHub repository, attempt to connect/verify the existing Cloudflare Pages workflow, and run verifiable SEO/GEO, accessibility, content, and performance checks.**

Treat this document as an implementation specification, not as content to publish on the website. Do not stop after describing what you would build. Deliver real source files, working features, tests, and a factual handoff. Work autonomously within authorized repository and Cloudflare resources, using the least invasive safe operations.

The product should feel like a beautifully designed homeowner's field guide: distinctive, calm, modern, sophisticated, approachable, editorial, and genuinely useful. It must NOT feel like a generic AI-generated template, SEO article farm, or dashboard.

The site's core differentiator is FUNCTIONAL UTILITY: a real home-maintenance planner and carefully sourced guides that a homeowner can use today.

## 1. FIRST ACTIONS — INSPECT BEFORE BUILDING

1. Verify access to the correct GitHub account and repository: upkeepatlas/upkeepatlas. Confirm current default branch, files, recent commits, and write permissions. Never overwrite changes without inspecting them.
2. Read AGENTS.md and docs/PROJECT_BRIEF.md completely. Read docs/SEO_READINESS_BASELINE.md.
3. Read EVERY relevant local skill file below before design/coding; consider these mandatory project instructions, not optional decoration:
   - .agents/skills/visual-design/SKILL.md
   - .agents/skills/astro-cloudflare-pages/SKILL.md
   - .agents/skills/technical-seo/SKILL.md
   - .agents/skills/geo-discoverability/SKILL.md
   - .agents/skills/content-research/SKILL.md
   - .agents/skills/home-maintenance-safety/SKILL.md
   - .agents/skills/accessibility-performance/SKILL.md
   - .agents/skills/seo-readiness-audit/SKILL.md
4. Discover/read any currently available official Cloudflare performance/deployment skills and relevant current documentation, particularly if deployment methods or Astro versions have changed.
5. Check the connected Cloudflare account for an Upkeep Atlas Pages project, its build settings, Git source, production branch, deployments, and any custom domain. **Previous inspection found a connected Cloudflare account but no visible Pages projects; this is historical, not a current assertion. Recheck.**
6. Identify whether the user-approved Upkeep Atlas minimalist favicon/logo artwork is actually available in the repository or as an attached asset. If not, do NOT claim the original asset was installed; use a clean temporary vector mark clearly identified as provisional or flag the missing asset.
7. Verify the canonical live hostname before committing production canonical/sitemap configuration. Do not assume that upkeepatlas.com belongs to this project; the brand name alone is not proof of ownership.
8. Consult current official guidance as needed rather than relying on dated framework and SEO assumptions.

**Hierarchy:** Actual user instructions > safety, accuracy, and platform constraints > AGENTS.md and local skills > this prompt's preferences. If instructions conflict, preserve safety and user-stated platform choices.

**Don't waste time on cosmetic planning artifacts instead of implementing the working site.** If a blocking external setting is missing, complete all independent engineering work and clearly report the exact blocked step.

## 2. PRODUCT VISION AND SUCCESS CRITERIA

Brand: Upkeep Atlas
Promise: Home maintenance made manageable.
Audience: First-time homeowners seeking clarity about what to check, when, how difficult a task is, and when to hire a professional.
Geographic scope: U.S. with transparent caveats for climate, housing type, local rules, model-specific instructions, and manufacturer recommendations.
Voice: Clear, responsible, quietly confident, helpful and human. No gimmicks, exaggerated claims, filler prose or fear-based copy.

Primary jobs to be done:
- Understand the most important routine home-maintenance tasks.
- Generate a useful, printable maintenance plan, adjusted to a few honest inputs.
- Find credible, practical seasonal checklists.
- Use a transparent calculator to estimate a basic planning quantity.
- Learn what is safe to do personally and when professional help is appropriate.
- Follow references to authoritative information.

The homepage should communicate the value in seconds, and users should reach a genuinely useful tool or checklist within one click.

**Minimum first-release deliverables (publish fewer only when needed to avoid unsupported or unsafe content):**
- A polished, mobile-first, accessible homepage.
- Consistent header, footer, navigation, breadcrumb pattern, and reusable editorial components.
- An actually functioning annual home-maintenance planner/calender with a useful print view.
- At least one actually functioning low-risk calculator (paint coverage, HVAC filter budget, or similar). Show formulas/assumptions and test edge cases.
- At least two genuinely useful printable checklists (can be HTML print styles instead of PDFs).
- A small set of carefully researched, distinct evergreen guides (target 3–5 if primary-source verification is possible).
- Curated landing/hub pages only for categories with real content.
- About, editorial standards and honest privacy/contact information when verifiable.
- Working metadata, robots, sitemap, structured data where appropriate, internal links, real 404 behavior, and readable static HTML.
- Reproducible build/test scripts, a launch-readiness report, and deployment instructions.
- GitHub commits containing all code/content. Attempt live Cloudflare Pages verification if accessible.

Do not inflate page count with thin pages. A smaller excellent release is preferable to 30 AI-written stubs.

## 3. VISUAL DESIGN — PREMIUM, EDITORIAL, NON-TEMPLATE

Adopt a restrained architectural/editorial design rather than a startup landing page. Develop a cohesive design system, not a random component assortment.

### Palette starting point
- Pine green: #234238
- Ink: #202824
- Warm paper: #F7F6F2
- Mist/sage: #DFE7DE
- Muted clay accent: #B27F62

These are starting tokens, not immutable values; verify contrast before use. Prefer near-black readable body text on warm light surfaces. Dark mode is optional only if it improves quality without diverting effort.

### Typography and composition
- Expressive but disciplined editorial serif for major headlines, clear humanist sans for navigation, controls, captions, and long-form body.
- Use licensed self-hosted fonts or robust system fallbacks; never expose/share font files contrary to licensing.
- Strong hierarchy, memorable art direction, purposeful whitespace, comfortable line length, fine borders and understated cards.
- Asymmetrical compositions where appropriate; responsive grid that simplifies gracefully on mobile.
- Distinctive but subtle visual details inspired by home plans, field guides, architectural lines, measured grids, and checklists.
- Minimal custom line icons; use one consistent style.
- Responsive states at 320, 375, 768, 1024, 1440 px; excellent on mobile without overflow.
- Appropriate focus, hover, active, loading, empty, success and validation states.
- No fake social proof or unearned "trusted by thousands" claims.

### Avoid typical AI-template signals
No blue/purple gradients, glassmorphism, glowing blobs, random illustration collage, inflated statistics, giant emoji, excessive pills, repetitive shadowed cards, vague aspirational buzzwords, fake dashboards, unnecessary animations, or a meaningless mega-hero that hides the tool.

### Suggested homepage art direction
- Consider a restrained wordmark plus simple geometric mark in the header.
- Lead with a purposeful, beautifully typeset statement about caring for a home over time.
- Show a genuine "Start your home plan" module prominently.
- Include a tastefully designed "This season" editorial feature or maintenance timeline.
- Introduce the core utility in a visually memorable manner.
- Surface 3 strong guides and 1 practical tool.
- End with honest source/editorial information, not fake logos or testimonials.

Use custom lightweight CSS/SVG diagrams for useful details. If genuine/licensed photography is unavailable, make the site visually strong through typography, grids and original diagrams rather than using fake lifestyle imagery.

## 4. TECHNICAL ARCHITECTURE

**Preferred stack:** Astro, static-site output, HTML-first pages, TypeScript where useful, modular CSS/custom properties. Build only as much JavaScript as required for interactive tools. Avoid large UI frameworks unless a clear need exists.

**Hosting:** GitHub repository is source of truth. The user's chosen deployment target is Cloudflare Pages; respect this, even if Cloudflare currently recommends Workers for new greenfield projects.

Suggested structure (adapt to framework's current conventions):
- src/pages — public routes.
- src/layouts — accessible base/guide/tool layouts.
- src/components — reusable navigation, breadcrumbs, tool forms, safety notes, cards, citations and structured data helpers.
- src/content — researched guides, templates and validated metadata.
- src/styles — design tokens, typography, layout, print styles.
- src/lib — maintenance rules, date scheduling, calculator formulas, canonical/metadata helpers.
- public — robots, favicon, social asset, static downloads and correctly licensed imagery.
- scripts — content/schema/route/link validation and audit scripts.
- tests — unit and feature tests.
- docs — architecture, release notes and SEO/GEO readiness evidence.
- .github/workflows — reproducible build/test checks if integration is appropriate.

Use npm and commit package-lock.json. Pin/resolve dependencies consistently and avoid speculative versions. Verify current Astro and Cloudflare Pages instructions. If a static site does not need @astrojs/cloudflare or SSR, do not add it without reason.

Do not commit secrets, third-party API keys, fake domain data, account IDs, token-bearing URLs, or user information.

### Performance
- Static HTML including essential readable content.
- Small JS payload and CSS footprint; no unnecessary hydration.
- Reserve image and future ad slots to avoid layout shifts.
- Local optimized assets where licensing allows; meaningful alt text and dimensions.
- Lazy-load noncritical imagery, but don't lazy-load primary above-the-fold assets.
- Minimize render-blocking dependencies.
- Target good Core Web Vitals on real data when measurable: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 at the 75th percentile.
- Record measured test data and distinguish lab scores from field data.

### Security and privacy
- Prefer local-only browser state for tool inputs, with clear disclosure if anything persists.
- Avoid collecting addresses or personally identifying homeowner data for an MVP.
- Avoid third-party trackers unless intentionally and lawfully configured.
- Never imply a print/export button saves data server-side.
- Include a realistic privacy page based on actual processing, not fabricated legal assurances.

## 5. FUNCTIONAL FEATURE SPECIFICATIONS

### A. Home maintenance planner (the flagship feature)
Design a polished, useful form with only necessary fields, for example:
- Climate category: colder winters / temperate / warmer climate (simple self-selection rather than unsupported state-by-state precision).
- Home type: detached / townhouse / condo, with clear caveats about owner versus HOA responsibilities.
- Optional equipment/features (HVAC, gutters, yard, fireplace, etc.), only for verified tasks.
- Month or annual overview.

Output:
- A clean, month-by-month or seasonal task list with grouped categories.
- Each task has reason, general frequency or timing, estimated effort category (if defensible), safety/DIY note and a credible reference or methodology note.
- Users can check off tasks locally, reset, and print a legible annual schedule.
- Optional CSV or ICS export only if implemented and actually tested; avoid broken promises.
- Conditional rules must be transparent, deterministic and independently unit tested.
- Use conservative general recommendations; defer to manufacturer, local authority and qualified professionals where appropriate.
- Do not present climate buckets as exact frost-date or legal/code guidance.

### B. Calculator
Choose a useful low-risk calculator with understandable inputs and formula. Recommended first candidate: paint coverage estimator for a room, using area, openings, coats and user-adjustable manufacturer coverage; show units and waste assumptions. Alternative if easier to source: HVAC-filter annual budget.

Output requirements:
- Correct conversions, reasonable default values with labeled assumptions, validation messages and no impossible negative results.
- Clear formula and a worked example; accessible live result region.
- Print-friendly results and link to a related guide.
- Automated unit tests for normal, zero/boundary, invalid and extreme plausible inputs.

### C. Checklists
At least two with real content, such as seasonal tasks and a new-homeowner monthly starter checklist.
- Short task language, print styles, optional interactive checkbox state and a useful key.
- Each task should have an evidence/scope note or link when needed.
- Avoid promising a downloadable PDF unless a PDF actually exists and works; native print is acceptable.

### D. Guides
Develop 3–5 genuinely distinct, useful guides, such as:
- A first-year home maintenance schedule.
- What to check before winter (region-aware).
- How to organize a maintenance log.
- Understanding HVAC filter replacement intervals (manufacturer-specific caveats).
- When a home maintenance task requires a professional.

Only publish topics for which reliable sources and safety review are available. If uncertain, start with organizational low-risk guides and move unsafe repair topics into a review queue.

## 6. INFORMATION ARCHITECTURE AND URL POLICY

Suggested initial paths (only publish those with substantive content):
- /
- /maintenance-calendar/
- /checklists/
- /checklists/first-year-home-maintenance/
- /checklists/seasonal-home-care/
- /calculators/
- /calculators/paint-coverage/
- /guides/
- /guides/<descriptive-verified-topic>/
- /about/
- /editorial-policy/
- /privacy/
- /contact/ (only once a real contact channel exists)

Potential future seasonal hubs under /seasonal/ should not become empty SEO landing pages. Navigation must match actual published content. Keep trailing slash policy consistent. Avoid internal redirects, dead links, or orphan published pages.

## 7. SEO — IMPLEMENTATION AND VALIDATION

Follow .agents/skills/technical-seo/SKILL.md and .agents/skills/seo-readiness-audit/SKILL.md.

For EVERY indexable page:
- Render useful content in HTML (not only client-side JavaScript).
- Provide a unique descriptive <title>, concise meta description, sensible H1/headings, clear language and meaningful link text.
- Emit an absolute canonical URL only when the correct production origin is verified or a clearly documented nonproduction build variable is supplied. Avoid writing an unverified guessed domain into canonical tags.
- Provide correctly scoped Open Graph/Twitter metadata and an actual share image if one is present.
- Keep image dimensions and alt text truthful and helpful.
- Add breadcrumbs where useful; ensure they correspond to navigation.
- Keep substantial supporting text on tool pages: usage, definitions, assumptions, formula, limitations and next steps.

For the site:
- Produce a valid sitemap.xml with only indexable canonical 200-OK URLs; meaningful lastmod only when true.
- Produce robots.txt with a correct sitemap location for the verified origin; don't use it as a security control.
- Ensure drafts/preview environments aren't indexed accidentally.
- Generate accurate JSON-LD only where visible, factual content supports it. Consider WebSite, Organization (with truthful identity fields only), BreadcrumbList and Article/BlogPosting for qualifying pages; genuine software tool schema only if appropriate. Do not fake reviews, FAQ-rich results, authors or credentials.
- Check 404 responses, canonical/host consistency, URL normalization, link crawl, image failures, redirects and duplicate titles/headings.
- Prepare clear instructions for Google Search Console verification and sitemap submission; do not claim they happened without account verification.
- No mass generated keyword permutations, thin state/city pages, redundant FAQ bait or promises of ranking.

Provide a reproducible audit script or test procedure that inspects generated output for missing H1s, titles, descriptions, canonical logic, invalid JSON-LD, sitemap consistency and broken internal links. Use build output and (when live) HTTP checks, not mere source-code existence.

## 8. GEO / AI SEARCH — PEOPLE-FIRST DISCOVERABILITY

Follow .agents/skills/geo-discoverability/SKILL.md. Understand GEO as making information useful, corroborable and accessible to AI-assisted discovery, not manipulating AI citations.

- Answer the user's core question promptly at the start of a guide.
- Explain assumptions, scope, exceptions, dates, and distinctions between common cases.
- Attribute claims to authoritative, specific sources near the relevant statement.
- Present genuinely useful original features: planner logic, calculators, checklists and worked examples.
- Use accessible semantic HTML, well-labeled tables, descriptive headings and meaningful relationships among related pages.
- Ensure important information is visible without relying on hidden app state.
- Avoid generic AI-written filler or duplicate pages designed to catch query variants.
- Keep structured data aligned with visible content.
- No claim that GEO requires special schemas, llms.txt or separate "AI optimization markup"; consider such optional files only if warranted by actual evidence and publisher policy.
- Respect crawler/bot preferences; do not equate AI-model training bots with search discovery.
- Never claim guaranteed inclusion in AI Overviews, chat answers, search results or citations.

Current official starting points (recheck at build time):
https://developers.google.com/search/docs/appearance/ai-features
https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
https://developers.google.com/search/docs/fundamentals/creating-helpful-content
https://developers.google.com/search/docs/essentials/spam-policies

## 9. CONTENT AND HOME-CARE SAFETY

Follow .agents/skills/content-research/SKILL.md and .agents/skills/home-maintenance-safety/SKILL.md.

Research using primary sources (e.g. DOE, ENERGY STAR, EPA, CPSC, FEMA, USDA/local extension services where applicable, manufacturer manuals and local authorities).
- Maintain a source ledger or metadata for every substantive guide.
- Don't invent exact service schedules, universal laws, building codes, life expectancies, cost savings, expert review, original testing, photographs, authorship or credentials.
- Distinguish general maintenance suggestions from manufacturer-specific service requirements and local legal obligations.
- Add visible appropriate safety notes and "call a qualified professional" boundaries for risky tasks.
- High-risk issues (mains electrical, gas, structural failure, roofs, combustion, asbestos/lead, severe mold) should generally direct readers to professional assessment, not present unverified step-by-step DIY repair instructions.
- Treat cost and time estimates as estimates with transparent inputs.
- Use editorial dates honestly; display "reviewed" only after review actually occurs.
- Don't reproduce other publishers' copyrighted text or imagery.

For future automation: content generation is draft-first, with automated factual/source checks and human review of medium/high-risk tasks before publication. Do not configure an unattended high-volume content publishing pipeline as part of the MVP.

## 10. ACCESSIBILITY, UX AND TESTING

Follow .agents/skills/accessibility-performance/SKILL.md.

Target WCAG 2.2 AA in implementation and audit (do not claim certification). Specifically:
- Meaningful semantic landmarks and a functioning skip-to-content link.
- Labelled form inputs with associated validation errors, keyboard-operable controls, visible focus styles and understandable results.
- Adequate contrast, touch targets and text scaling; support reduced-motion settings.
- Correct tab order, no keyboard traps, sensible mobile navigation.
- Informational SVGs/images have accessible equivalents; decorative visuals should be ignored by assistive tech.
- No important text trapped solely in an image or client-side canvas.
- Print styles work for planner and checklists without unnecessary navigation.
- Check real layout at widths 320, 375, 768, 1024, 1440 and with 200% zoom if tools permit.

Set up and RUN relevant tests:
1. Install dependencies using reproducible lockfile.
2. npm run build and framework/type checks.
3. Unit tests for planner rules and calculator math.
4. Automated generated-HTML SEO checks.
5. Internal link and sitemap validation.
6. Accessibility checks with available tools; manual keyboard inspection if possible.
7. Live deployment smoke tests once URL exists.
8. Lighthouse/PageSpeed/Core Web Vitals where actual page and tools permit. Don't invent scores.
9. Test print/export functions and failure/empty states.

Include useful npm scripts such as build, check, test and check:seo as appropriate; commands documented must actually exist.

## 11. GITHUB AND CLOUDFLARE DELIVERY

GitHub:
- Existing repository: upkeepatlas/upkeepatlas.
- Inspect before editing; preserve project instructions/skills and existing history.
- Prefer clear incremental commits (framework foundation, design/components, tools/content, SEO/tests).
- Keep human-reviewable structure and README instructions.
- Add CI to build and run tests if the repository/tooling supports it, but do not introduce unneeded secrets or unreliable tests.

Cloudflare:
- Query the connected Upkeep Atlas account and locate its Pages project. If none is visible, do not invent one or a URL; report that Pages connection/deployment is blocked.
- If authorized and safe, configure GitHub Pages integration/build settings using current Cloudflare documentation. For static Astro, expected build command is normally npm run build and output directory dist, but verify for actual framework version.
- Never infer that GitHub push automatically equals a successful site deploy.
- Verify the actual production deployment, public URL, HTTPS, status, headers, canonical, robots, sitemap, major routes and mobile layout. Check whether repository pushes trigger builds.
- If a domain is not verified, document required domain/DNS/canonical setup and avoid publishing contradictory canonical URLs.

No account creation, purchasing a domain, buying services, or altering unrelated Cloudflare resources.

## 12. CHECKPOINTS / IMPLEMENTATION ORDER

Execute in this order, adapting to available access:

**Phase 1 — Discovery and architecture**
- Inspect repo, skills, tools, target project, domain and existing assets.
- Produce a short architecture note and an explicit implementation plan in docs.
- Choose and verify current package versions and the static hosting strategy.

**Phase 2 — Visual system**
- Build tokens, typography, layout, header/footer, navigation, buttons, forms, article components, responsive behavior and brand-mark handling.
- Implement a genuinely art-directed homepage, not a starter theme.

**Phase 3 — Real homeowner tools**
- Build the deterministic maintenance planner with task dataset, UI logic and print view.
- Build and unit-test a transparent calculator.
- Build at least two useful checklists.

**Phase 4 — Content**
- Add a small set of verified guides with source ledger, honest editorial policy, related links and safety scope.
- Ensure every linked hub page has useful original content.

**Phase 5 — SEO/GEO**
- Generate route-level metadata, conditional canonical, accurate schema, sitemap, robots, sensible headings and internal linking.
- Add generated-output audit tooling.

**Phase 6 — Verification**
- Run available unit/build/link/SEO/accessibility tests.
- Review visual output at mobile and desktop widths.
- Fix observed failures, not imaginary scores.

**Phase 7 — Delivery**
- Commit all source and documentation to GitHub.
- Verify commits and read back key files from GitHub.
- Check whether Cloudflare can deploy and validate production if accessible.
- Record an evidence-backed audit and a concise next-steps handoff.

Do not call the project "complete", "SEO ready" or "GEO optimized" when the relevant checks remain blocked.

## 13. RELEASE ACCEPTANCE CRITERIA

A release is accepted as a functional build only if all applicable checks below pass:
- [ ] Real, distinctive responsive website implemented (not a wireframe).
- [ ] No essential public UI routes with lorem ipsum, dead ends or fabricated claims.
- [ ] Planner works with representative inputs and prints accurately.
- [ ] Calculator produces correct tested results and handles invalid inputs.
- [ ] At least two useful checklists are accessible and printable.
- [ ] A small number of sourced guides provide real value.
- [ ] Key controls keyboard operable; forms labeled, contrast checked.
- [ ] npm install/build/type/test scripts execute successfully (or failures documented with evidence).
- [ ] Generated public pages contain useful HTML and logical headings.
- [ ] Titles, metadata, sitemap/robots, internal links and JSON-LD checks pass where applicable.
- [ ] Canonical configuration uses an actually verified hostname, or is clearly BLOCKED.
- [ ] Repo changes committed and verified via GitHub read-back.
- [ ] Pages project/deployment tested if accessible; otherwise clearly BLOCKED.
- [ ] Audit records have evidence and do not misrepresent live Search Console/indexing/ad approval.

Metrics target, not promises: pleasant mobile experience, fast static loading, good Core Web Vitals when measured, zero known critical accessibility issues, and zero known broken internal links or invalid canonical/sitemap URLs.

## 14. MANDATORY FINAL AUDIT AND REPORT

Update docs/SEO_READINESS_BASELINE.md or create a dated report under docs/audits/ covering:
- Build and unit-test outcome and exact commands/log evidence.
- URL and page inventory.
- Technical SEO checks by status PASS / FAIL / BLOCKED / N/A.
- GEO content/source checks by status.
- Accessibility/performance checks, with actual measured numbers only.
- Content safety/editorial review status.
- GitHub commit SHA and changed file summary.
- Cloudflare project name and production deployment URL/ID if verified.
- Required external work (verified domain, Pages connection, Search Console, optional ads/privacy configuration).

Final answer format:
1. What was actually built, with links to real GitHub files/commits.
2. What was tested, with results.
3. What was deployed, with real URL, or why deployment was blocked.
4. Outstanding issues and next action; no unsupported "100% SEO" guarantees.

## 15. REUSABLE START COMMAND

When the owner later says:
"Execute the Upkeep Atlas master build prompt from docs/MASTER_BUILD_PROMPT.md. Read all local skills, build the website, commit it to GitHub, and audit what you can."

Treat that as permission to perform the work described above within available connected systems. Do not re-ask already settled design/stack requirements. Ask only for genuinely indispensable missing information (e.g. access to an external account setting), and still deliver all independent work in the current session. Do not promise asynchronous background implementation.

---

## SOURCE / MAINTENANCE NOTES

These instructions reflect project choices as of 2026-11-07 and MUST be cross-checked against currently available official documentation at execution time.

Official references to consult:
- https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- https://developers.cloudflare.com/pages/configuration/git-integration/
- https://docs.astro.build/
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/essentials/spam-policies
- https://web.dev/articles/vitals
- https://www.w3.org/TR/WCAG22/

The document is project-owned direction; it is not an assertion that any skill file can automatically execute commands. Actual implementation still requires appropriate tools, verified permissions and measured checks.
