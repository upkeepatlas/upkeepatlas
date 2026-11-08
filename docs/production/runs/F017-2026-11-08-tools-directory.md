# F017 — tools directory release attempt

Date: 2026-11-08 UTC. Branch: content/F017-tools-discovery. PR: https://github.com/upkeepatlas/upkeepatlas/pull/24

Scope: One task only, F017. Existing /calculators/ route enhanced with searchable and purpose-filterable directory; all 12 destinations remain crawlable without JS. Research: docs/production/evidence/F017.md. No new media.

GitHub-hosted quality workflow: https://github.com/upkeepatlas/upkeepatlas/actions/runs/42524381653 (in progress when recorded; do not treat as passing until conclusion success). Cloudflare latest production before merge: deployment 24552957-9218-4826-8a0d-df81c0334d20, SHA 168be68ae3fbe9fed80c74a113f55d59b912d988. F017 not yet in production.

Required recovery: check exact final PR-head CI; fix failures; merge only on green; verify exact Cloudflare production SHA and live /calculators/ interaction; then record published status with factual release metadata. Browser keyboard, 320px and dark mode interactions not yet independently verified.

## Final verified release
- PR #24 merged: https://github.com/upkeepatlas/upkeepatlas/pull/24
- Final PR head 6dcf8662435bbe62ec77a54615e405fe07b5f989 passed GitHub Actions build and quality run https://github.com/upkeepatlas/upkeepatlas/actions/runs/42524425726 (completed success; npm ci, tests, queue, Astro build, SEO, media, theme, IndexNow, type and HTTPS checks).
- Merge SHA: 5373ee5e9751a6c5d0c59e579a1e0ecdfd1d081a.
- Cloudflare Pages production deployment c0e4589c-8aa3-474f-950f-a26e49afe3bb: deploy stage success; exact merge SHA confirmed.
- Cloudflare Browser Rendering of https://upkeepatlas.pages.dev/calculators/ at 375px confirmed new title, canonical, search input, category radios, empty-state text, annual calendar internal link and all 12 existing crawlable tool cards. Interactive search/filter changes, keyboard traversal and comprehensive mobile layout not independently exercised.
- Queue updated to published in commit dce52123c88b4b60cf456605cba87dd328827b10. No ranking or indexing outcome claimed.
