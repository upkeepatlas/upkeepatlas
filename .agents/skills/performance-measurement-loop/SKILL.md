---
name: performance-measurement-loop
description: Measure content performance, search impressions, usability and priority feedback without fabricated traffic or Core Web Vitals scores.
---
# Skill: Performance and Learning Loop

## Before publication
Record task intent, original hypothesis, baseline search queries (if observed), target canonical, links and competing page URLs. Unavailable metrics are UNMEASURED, not zero.

## After publication
- Check that Google Search Console and Bing Webmaster Tools actually have verified access; otherwise record dashboard status as BLOCKED.
- Collect impressions, clicks, CTR, query and page data at sensible intervals once sufficient time has elapsed. Compare like time windows and report data freshness. No invented traffic growth, CPC, RPM or ranking trajectories.
- Review PageSpeed Insights / CrUX and/or browser traces for mobile LCP/INP/CLS. State tested URL/date/device/conditions. Real-user Core Web Vitals and lab Lighthouse are different metrics.
- Look for errors and real user feedback: form failures, tool validity, misleading outputs, dead links, unsupported instructions and image load.
- Fix regressions before expanding content. Use change notes and don't fake dateModified for minor cosmetic updates.
- Add actual data to docs/production/metrics/ when accessible; no credentials/tokens in GitHub.

## Strategic learning
Prefer improving a useful existing tool/article with observed opportunity over generating endless new pages. Evaluate high-intent query needs, match to product clusters and maintenance burden; penalize thin or overlapping topics.

## Privacy and AdSense
Account-side verification, privacy/consent and ad approval must be measured independently. Do not claim AdSense approval or revenue based on script installation. Avoid intrusive ads over tool results.

Sources:
- https://developers.google.com/search/docs/performance/monitor-debug
- https://web.dev/articles/vitals
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
