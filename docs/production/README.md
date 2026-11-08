# Upkeep Atlas — Production Queue Operations

The queue in queue.json is the source of truth for the planned function-first publishing program. Read docs/CONTENT_MASTER_PLAN.md and docs/CONTENT_EXECUTION_MASTER_PROMPT.md before changing it. Maintain one item per scheduled run.

## Queue states

- queued: not started.
- in_progress: claimed by one run with claim.id and claim.at (ISO UTC), and one working branch/PR if applicable.
- blocked: unresolved technical/provider/permissions issue. Add blocker.reason, blocker.action, and date. Repair or escalate the same task before a new item.
- needs_review: expert/legal/rights review required. Add blocker.reason and next signoff action. Do not fabricate approval or bypass this.
- published: CI passes, safety/source/media gates pass, the exact Cloudflare Pages production deployment was verified, and live page/function is demonstrably working. Record release.sha (40-char merge commit), release.deploymentId, release.ciRunUrl, release.verifiedAt, release.liveUrl, evidence (path under docs/production/evidence/) and source or media logs. Never mark as published because a GitHub commit or preview exists.

Every published item must have every dependency published. Article items cannot enter work states until all functional items have published proof. Initial 15 published routes are the existing baseline, not unfinished queue items.

## Claim and concurrency

Check a fresh GitHub main SHA, current queue content, other running PRs/commits and Cloudflare deploys. If an in-progress task is genuinely active elsewhere, do not overwrite it. Use optimistic compare-and-swap or a reviewed task PR/issue with a unique claim token. Do not have two active claims. If a run is interrupted, resume the same task with the existing branch and findings, do not launch the next item. If status diverges, stop and reconcile instead of force-pushing.

## Evidence

- evidence/TEMPLATE.md is the factual per-ID research and source ledger. The actual file is evidence/<ID>.md.
- runs/TEMPLATE.md is a dated verification record. Save actual reports as runs/<ID>-<YYYY-MM-DD>-<token>.md.
- assets.csv is a rights/provenance register. Add only assets actually committed.
- metrics/ contains only measurements from named instruments; no fabricated keyword volume, CPC or page rankings.
- All task keywords are candidate phrases, not validated search volume or likelihood of ranking. Competitor research happens when a task executes.

## DNS restricted automation environment

The scheduled container may be unable to resolve github.com for git clone, despite GitHub and Cloudflare plugins being fully functional. The required workaround is connector-first: fetch and update files via GitHub app, branch and PR through the connector, let GitHub Actions run all npm/Astro quality gates, merge passing PRs, then independently verify Cloudflare Pages deployment SHA and live URL. Never use "local clone failed" as the sole blocker when the connectors work. See the GITHUB CONNECTOR MODE section of the master prompt.

## CI and data contract

Run node scripts/validate-production-queue.mjs (or npm run check:queue); it checks schema, IDs, dependencies, one active claim and mandatory release evidence. Do not bypass the check to mark a task complete. If the queue needs extending, make a versioned reviewed update, retaining IDs and history.

The publishing prompt describes the complete GitHub/Cloudflare workflow and safe failure states. A scheduled task cannot guarantee uninterrupted execution or unchanged external account access; keep reports honest.

## Links

- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.cloudflare.com/pages/configuration/git-integration/
