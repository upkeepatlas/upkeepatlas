# Upkeep Atlas — Night Mode Release Audit

**Date:** 2026-11-08 (Europe/Prague)  
**Site:** https://upkeepatlas.pages.dev/  
**Release commit:** `2f5e8ef47cbfebd3ddae683e494c00d786979372`  
**Feature PR:** https://github.com/upkeepatlas/upkeepatlas/pull/5  
**Green production CI:** https://github.com/upkeepatlas/upkeepatlas/actions/runs/42426579422

## Implementation

- `src/components/ThemeToggle.astro`: one keyboard-native night/day header action; descriptive accessible label and a simple original moon/sun icon pair.
- `src/layouts/BaseLayout.astro`: early synchronous inline script reads locally saved preference or OS dark-mode preference before first paint; browser theme-color metadata follows selected appearance.
- `src/lib/theme.mjs`: pure preference-resolution and toggle functions.
- `src/styles/global.css`: warm charcoal, pine and off-white dark palette with individually selected backgrounds for planner, calculations, cards, editorial panels, contact fields, header and footer; print-safe light colors.
- `src/pages/privacy/index.astro`: transparent disclosure of browser-only `upkeepatlas-theme` preference.
- `tests/theme.test.mjs`, `scripts/check-theme.mjs`, CI workflow and README/docs: 4 functional tests and generated-output checks covering all pages in both SEO build modes.
- No new third-party runtime dependencies and no added indexing URLs.

## Verified

| Check | Status | Evidence |
| --- | --- | --- |
| GitHub changes merged | PASS | PR #5 and release commit above |
| Cloudflare Pages production deployment | PASS | Canonical deployment for `2f5e8ef47cbfebd3ddae683e494c00d786979372` reported `success` |
| Complete CI quality gate | PASS | GitHub run 42426579422, `npm ci`, 16/16 Node tests, Astro build, SEO, IndexNow ownership check, Astro/TypeScript check |
| Theme generated-output audit | PASS | 15 HTML routes in both staging and production-configured builds; early script, one button, dark styles and print fallback |
| Actual live toggle interaction | PASS | Cloudflare Browser Rendering clicked the production header button: light → dark, `localStorage.upkeepatlas-theme = dark`, accessible label updated to `Switch to day mode` |
| Live dark styles | PASS (sampled) | Production browser computed body `rgb(21,28,25)`; hero CTA background `rgb(175,213,185)` |
| Live SEO unaffected | PASS (homepage) | Existing title and `https://upkeepatlas.pages.dev/` canonical unchanged |
| Mobile preview screenshot | PASS (visual sample) | 390 × 844 preview screenshot reviewed; responsive header, dark content and hero displayed without obvious overflow |
| Browser system preference & refresh persistence | PARTIAL | Pure preference logic tested; setting stored during a real click confirmed; separate-page reload and OS switching not independently observed |
| Print layout / all-page screen-reader audit | PARTIAL | Print-safe CSS and semantic button implemented and source-checked; real printed output and comprehensive assistive-technology testing not performed |
| Formal WCAG 2.2 AA certification | NOT CLAIMED | Focus, labels, contrast-minded palette implemented; a thorough accessibility audit remains necessary |

## Site behavior

The default follows the visitor's device preference unless an explicit light/dark selection exists. Selection is saved only to local storage, not transferred by the site's own appearance code. If storage is blocked, the switch works for the current visit. The theme is presentation-only: content, canonicals, structured data, sitemap and other SEO signals remain unchanged.

For future updates, preserve the `data-theme` styling hooks, print fallback, early no-flash bootstrap and user preference. Keep dark colors contrast-checked when introducing new components.

**No guarantee of flawless accessibility on every device or browser is implied by the checks above.**
