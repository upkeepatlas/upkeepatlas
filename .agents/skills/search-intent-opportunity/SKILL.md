---
name: search-intent-opportunity
description: Research U.S. homeowner search demand, intent, content gaps and prioritization without inventing keyword metrics or ranking promises.
---
# Skill: Search Intent and Opportunity Research

## Goal
Choose a narrowly defined homeowner problem with measurable potential for a useful tool or original article. Upkeep Atlas is not a mass keyword site. Target U.S. English users and distinguish national guidance from regional, seasonal, climate and equipment-dependent needs.

## Required process for EVERY task
1. Read its record in docs/production/queue.json and the topical cluster in docs/CONTENT_MASTER_PLAN.md.
2. Verify what Upkeep Atlas already publishes; check title, URL, intent and internal links to avoid self-competition.
3. Research live search results for the primary query and 3–6 close variants. Record date, geography, observable SERP types and at least 3 real competing URLs in the evidence ledger. Inspect what tasks competing results leave unsolved and which official sources are credible.
4. Assess informational / calculator / checklist / comparison / navigational intent; if mixed, choose one principal intent and use related intents for internal links.
5. Capture actual Google Search Console/Bing query impressions and CTR when connected. If a third-party keyword provider or reliable API is accessible, attach source, geography, metric definitions, timestamp and export. If none, label search volume, competition and keyword difficulty **unmeasured**, not zero.
6. Rank the task by direct usefulness, match to tools, site authority, observed competition, freshness, verifiable sources, estimated maintenance burden and safety. Prioritize ownable long-tail needs over generic broad terms.
7. Record a single primary phrase, sensible synonyms, user question, SERP notes, evidence limitations, one unique asset or computation, linked parent hub and related routes, and canonical path.

## Conservative opportunity scoring (not a Google ranking score)
Each factor 0–5, explained in evidence: utility, intent match, evidence reliability, differentiation, feasible delivery, SERP gap. Subtract 0–5 for safety/regulatory risk, 0–5 for direct competition, and 0–5 for overlap with existing content. Scoring helps prioritize only; it does **not** estimate visits or first-page ranking probability.
Avoid attaching arbitrary "10k searches/month", CPC, difficulty percentages, and revenue forecasts without dated instrumented data.

## Exclusions
No programmatic near-identical city/state pages, artificial PAA stuffing, title template cloning or search-result scraping as the page body. A new URL must serve a genuinely different need.
When keyword data is inaccessible, deliver a fully honest opportunity brief based on observable SERP evidence, not fabricated metrics. Where the gap is weak, choose the next queued task only if that does not violate the one-item-per-run rule.

## Evidence
Store each run's snapshot at docs/production/evidence/<ID>.md or another agreed source-ledger location with query, country, date, competitor links, observed patterns, confidence, and keyword measurement source.
Sources:
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
