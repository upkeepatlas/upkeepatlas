# Upkeep Atlas — Validated article collection

F001 · November 8, 2026

## How to add one original guide

Create one Markdown file in src/content/guides/ named after the *distinct user need*, e.g. `when-to-inspect-hvac-filter.md`. The Astro 5 collection is declared in src/content.config.ts and enforces the required metadata at build time.

### Required frontmatter

```yaml
---
title: "How to inspect a home's moisture-prone areas"
description: "A specific, factual summary (60–190 characters) of what a first-time homeowner will learn."
category: "Home health"
minutes: 5
intro: "At least 80 characters of reader-first explanation that sets conditions and boundaries."
publishedAt: 2026-11-08
publisher: "Upkeep Atlas"
reviewStatus: "ai-assisted-not-expert-reviewed"
risk: "low"
sources:
  - epa
---
```

- `publishedAt`: genuine initial publication date; for already-published migrated guides preserve their original date.
- `updatedAt`: optional genuine material revision date, never earlier than publication; do not change for cosmetic edits.
- `publisher`: the Upkeep Atlas site, not an invented professional identity.
- `reviewStatus`: use `ai-assisted-not-expert-reviewed` unless verifiable review has actually occurred. Do not claim human or credentialed specialist review without evidence.
- `risk`: low, medium, high. Hands-on hazardous procedural content needs qualified verification and may need to be rejected.
- `sources`: IDs in src/data/guides.mjs, e.g. energy, hvac, epa, cpsc, air. Explain factual claims and link to specific primary sources in Markdown.
- Body: original useful plain-English sections, practical examples and limitations, no keyword stuffing, unlicensed photography, unsupported time/safety claims or copied text.

The guides index and route renderer combine validated Markdown guides with legacy structured guides until remaining migrations are separately planned. **Never duplicate a slug** across collections: the build fails closed. Keep URLs unchanged when migrating an already-live guide.

## Working migration example

`src/content/guides/hvac-filter-routine.md` preserves its published canonical `/guides/hvac-filter-routine/` and its original research, safety framing, design, sources and internal links, while moving from a JS record into the validated Markdown collection. The remaining two pre-existing guides continue to render unchanged.

## Release criteria

1. Inspect article and compare against existing routes and competing content for a clearly distinct reader purpose.
2. Confirm claim citations and legal rights to any imagery; original SVGs must be accurate.
3. Run npm run test, npm run build, npm run check, npm run check:seo, npm run check:theme and npm run check:queue in GitHub Actions.
4. Verify 15 original routes remain in dist, especially the migrated canonical URL; verify no changed title/H1 or broken internal link.
5. Verify the precise merged SHA in Cloudflare Pages, and that the updated guide renders correctly on the production URL.

The editorial content collection is a platform capability; future article work remains locked until the functional queue is fully published.
