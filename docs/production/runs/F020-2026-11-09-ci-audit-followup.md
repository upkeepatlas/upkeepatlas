# F020 — CI follow-up, 2026-11-09 UTC

Status: **in_progress**, not published. One task only: F020 site-wide tool and SEO hardening.

- Existing PR: https://github.com/upkeepatlas/upkeepatlas/pull/27 ; branch `content/F020-tool-seo-hardening`.
- Previous correction commit `b82e8b575213b357db8878f0e5bdae715eb4995d` passed GitHub-hosted quality workflow https://github.com/upkeepatlas/upkeepatlas/actions/runs/42549984890 (completed success). The quality job reported success for npm ci, tests, queue validation, Astro build, SEO, media, theme, IndexNow, TypeScript and HTTPS smoke steps.
- Cloudflare preview deployment `5c8d7164-f7c6-4960-b0b0-8612c5801dc0` succeeded for that SHA. Preview is **not production**.
- Latest observed Cloudflare production deployment `be637d6e-bf20-44df-9668-eb69660bd812` succeeded for SHA `a550ff400eed38b73929379bc8f011a21e3b72b9`; it does **not** include F020. Production host: https://upkeepatlas.pages.dev/ .
- Scope implemented so far: generated-page duplicate meta-description and JSON-LD syntax checks. Source: `scripts/check-seo.mjs`; research: `docs/production/evidence/F020.md`.
- Not performed/verified: all-tool real-browser keyboard navigation, mobile viewport matrix (320/375/768/1024/1440), dark-mode, print/export interaction, Lighthouse/CrUX Core Web Vitals measurement, and full Ads/SEO audit. These are remaining acceptance criteria, not successful checks.
- Next: finish actual browser/print and performance measurements where possible; fix concrete issues; rerun GitHub-hosted quality on final PR SHA; merge only after adequate audit; verify exact merge SHA production deployment and live URL; then record published release metadata. Do not claim rankings or indexing.
