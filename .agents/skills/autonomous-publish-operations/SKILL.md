---
name: autonomous-publish-operations
description: Select and release one prioritized unit of work with GitHub, CI, Cloudflare, evidence and safe failure states for scheduled Upkeep Atlas runs.
---
# Skill: Autonomous Publishing Operations

## Invariants
- One execution attempts at most one task ID from docs/production/queue.json. FUNCTION tasks take absolute priority; ARTICLE tasks cannot start while ANY function is in queued/in_progress/blocked/needs_review unless a versioned owner decision explicitly accepts and waives that gate.
- One task is done only after a usable page is deployed to production, tested live and recorded; one draft or GitHub commit is not completion.
- A run that cannot finish honestly reports BLOCKED, keeps unfinished work out of production, and records repair steps. Never promise 100% completion if a provider or CI is unavailable.
- Respect GitHub repository upkeepatlas/upkeepatlas and existing Cloudflare Pages project. Never force push, delete user work, remove Google/Bing/AdSense/IndexNow scripts, change domain or disable ads/consent without reason and review.

## Start of every run
1. Read the current master prompt and plan, AGENTS.md, applicable skills and queue. Inspect current GitHub head and Cloudflare status.
2. Recover any existing task already IN_PROGRESS before selecting a new ID. Distinguish real stuck work from active concurrent work, compare run claims safely, and avoid overwriting concurrent changes.
3. Select highest-priority eligible function; when all functional tasks have verifiable PUBLISHED states, pick highest-priority eligible article.
4. Claim task with a compare-and-swap change or reviewed task PR/issue with current commit, unique run marker and timestamp. If claim races, re-read and choose no conflicting work.
5. Research and implement only the selected item; preserve branches, tests, assets, privacy and link structure. Keep original sources/media provenance.

## Commit and verify
6. Work on uniquely named feature branch. Open one PR for the selected item, run CI and fix actionable findings. Require production-safe preview validation.
7. Merge only a passing, accurate change. Wait for Cloudflare Git deployment of exact merge SHA, check live HTTP status/canonical/rendering/tool UI, and verify safety/media/legal issues. Attempt targeted retries of transient deployment issues with a finite budget.
8. Update queue item to PUBLISHED with exact route, commit, deployment evidence and test reports ONLY after live success. If merge succeeded but deploy is delayed, leave status IN_PROGRESS and resume next run; do not create a second item. Do not create multiple publications in one run.
9. Update docs/production/runs/<ID>-<date>.md with findings, factual source URLs, CI run ID, release SHA, deploy URL, browser checks, remaining issues and status. Update shared summary index only from observed facts.

## Failure, risk and limits
- If required licensed media cannot be obtained, use a helpful original SVG/diagram or omit rather than scrape. If professional review is essential but absent, stay NEEDS_REVIEW with no auto-published high-risk procedures.
- If GitHub or Cloudflare connector isn't present or triggers account approval, stop safely and flag human action, not a fake success. Do not store credentials in repo.
- If external web/CI/live tools fail, retry narrowly (e.g. up to 3 reasonable attempts); do not loop forever. Keep prior site stable.
- Stop after reporting the single task's final verified or blocked state. A scheduled ChatGPT task may not have the same execution environment or unlimited time; prefer truthful partial work over misleading a user.

## Production integrity
Never falsely claim a Page is live based on GitHub push or CI alone. Use Cloudflare deployment API and live URLs. Avoid overlapping deploy races via commit checks. An automated notification should report the one task ID and concrete evidence.
Sources:
- https://developers.cloudflare.com/pages/configuration/git-integration/
- https://developers.cloudflare.com/pages/configuration/build-configuration/
