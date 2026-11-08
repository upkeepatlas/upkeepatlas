# F018 — Seasonal hub release run

Date: 2026-11-08 UTC. Branch: `content/F018-seasonal-hub`.
PR: https://github.com/upkeepatlas/upkeepatlas/pull/25
Head SHA before log commit: `ed20569aa22cb683773695dc3598765a34769318`.
Implementation: `/seasonal/` four-season static HTML hub; homepage link; primary-source and SERP ledger.
GitHub-hosted CI: https://github.com/upkeepatlas/upkeepatlas/actions/runs/42529043275 — in progress when first checked. Final SHA after this log commit must be independently checked.
Cloudflare baseline production before merge: deployment `ea0be685-d169-4b51-84b2-632eead1488e`, SHA `0e2c720c0ea8c70c1011bfb9d50241c2b7972f5d`, success. F018 not yet deployed.
Release state: IN_PROGRESS. Do not mark published until final head CI success, safe merge, exact production SHA and live HTML verification. Browser keyboard/print/mobile interactions not independently exercised.

## Verified release — 2026-11-08 23:18 UTC
- Initial PR CI run 42529043275 failed queue validation because the prior F017 published record omitted its existing evidence path; restored `docs/production/evidence/F017.md` in this PR.
- Follow-up run 42534307731 passed tests/queue but failed Astro build due to nested route imports; corrected both imports to `../../`.
- Final PR head `ca07d7e7d2282906f42eb28b6427d48eb81e3075`: GitHub-hosted quality run https://github.com/upkeepatlas/upkeepatlas/actions/runs/42534341823 succeeded (npm ci, tests, queue, Astro build, SEO, media, theme, IndexNow, Astro check and HTTPS smoke).
- PR https://github.com/upkeepatlas/upkeepatlas/pull/25 merged at `4e86d0009ed4ad72efaf9e99b45fc0206a66a28a`.
- Cloudflare Pages production deployment `cfa52894-91e4-480f-ac00-a9c3a304848c` completed successfully with exact merge SHA; production host `upkeepatlas.pages.dev`.
- Cloudflare Browser Rendering at 375px confirmed https://upkeepatlas.pages.dev/seasonal/ renders expected title, H1, self canonical, Spring/Winter season content and Ready.gov source; initial 404 before deployment finished was rechecked after success.
- Safety/media: ground-level observation and professional referral; no third-party assets. Keyword volume/difficulty/CPC UNMEASURED; no indexing, expert review, or browser keyboard testing claimed.
- State: PUBLISHED; production queue evidence path and release metadata updated after verification. Queue-only follow-up commit is not the verified content merge SHA.
