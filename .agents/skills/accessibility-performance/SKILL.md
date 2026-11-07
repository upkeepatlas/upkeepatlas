---
name: accessibility-performance
description: Build accessible layouts, lightweight interactions and high-performance pages suited to Cloudflare static hosting.
---
# Skill: Accessibility + Performance

## Accessibility target
Use WCAG 2.2 AA as the design and test target (not an unverified certification). Accessible HTML first; ARIA only where needed.
- Semantic regions, one main, logical headings, descriptive links and a working skip link.
- Keyboard-accessible navigation, tab order, focus visibility, no keyboard traps.
- Labels, help and error messages for calculator fields; outputs announced when changed as appropriate.
- Text contrast at least 4.5:1 for normal copy and 3:1 for large text; inspect UI controls and focus states.
- Support 200% text zoom, 320px mobile width, reduced motion; no information conveyed by color alone.
- Alt text for meaningful images; decorative images marked appropriately; SVG icons need accessible names when actionable.
- Print styles for downloadable checklists and plans.

## Performance target
Optimize for Core Web Vitals, measured on real devices:
- LCP <= 2.5s (75th percentile), INP <= 200ms, CLS <= 0.1.
- Keep initial content HTML-first, light CSS and minimal JS; no heavy client-side UI library without necessity.
- Prefer locally hosted optimized assets and correct image dimensions; use modern image formats.
- Reserve space for images/ads to avoid CLS. Load ads only after user value is apparent and policy requirements are satisfied.
- Respect data and privacy constraints and avoid unnecessary third-party scripts.

## Verification
Test locally and live at mobile sizes, keyboard-only and with a screen reader; run automated accessibility checks and Lighthouse/PageSpeed only against an actual built/deployed site. Record measured URL, environment, date, metrics and unresolved issues, and avoid unsupported '100/100' claims.

References:
- https://www.w3.org/TR/WCAG22/
- https://web.dev/articles/vitals
- https://developer.chrome.com/docs/lighthouse/overview/
