---
name: interactive-tool-production
description: Build original low-dependency accessible Astro homeowner tools with validated units, reproducible math tests, explanations and export/print states.
---
# Skill: Functional Tool Production

## One published item = one complete usable task
Deliver an operating function, not a design mockup or static calculator screenshot. Include truthful input assumptions, clear output, safe defaults, and a concrete path to redo or print/export results.
Use the repo's existing Astro static architecture, CSS theme tokens and small client-side scripts. Avoid unnecessary frameworks, backends, accounts or tracking.

## Implementation order
1. Inspect existing planner, paint estimator, checklists, common components, route registry, tests and Cloudflare pipeline. Improve/reuse before cloning features.
2. Define typed inputs, output schema, units, restrictions, rounding policy, examples, behavior with blank/negative/extreme values and scope restrictions.
3. Implement pure deterministic logic under src/lib where possible, unit tests in tests/, and one readable page with a purposeful explanation of assumptions and calculation.
4. Test at least: ordinary case, zero/empty, min/max, invalid, rounding boundaries, no-JS baseline when feasible, keyboard-only controls, mobile 320px, dark mode, print/export behavior and any stored preferences.
5. If tool persists homeowner data in local storage, explain persistence, a visible clear/remove option and disclosure in privacy notice. Keep data local by default. Do not send stored selections to advertising/analytics.
6. Contextual help links to primary sources and related articles. A clear example should be visible in rendered HTML, even before JS hydration.
7. A complete canonical URL, title, H1, structured data only when truthful/eligible, internal links, sitemap, IndexNow route consideration and source ledger.

## Product-specific guardrails
- HVAC intervals depend on model, filter type, loading and manufacturer; no false universal "every N days".
- Home maintenance costs are highly local and are estimates, not quoted prices; label sources, dates, labor, units and uncertainty.
- Time estimates, savings, risk reductions and equipment lifespan claims need real evidence.
- Roof/ladders/electrical/gas/structural issues -> professional evaluation, not step-by-step dangerous DIY.
- No ad placements that interfere with tool controls, results or accessibility.

## Definition of done
A clean preview is not deployment. Require GitHub PR/commit, passing CI (test/build/check/SEO + theme/IndexNow), Cloudflare production deployment of the exact SHA, real live URL with 200, correct canonical, working calculation on a browser, mobile/keyboard inspection, and a successful release ledger entry.
Fail closed on unverified steps; never falsely mark a tool complete.
Sources:
- https://www.w3.org/WAI/WCAG22/quickref/
- https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- https://web.dev/articles/vitals
