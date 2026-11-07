# Upkeep Atlas — project instructions

Upkeep Atlas is a trustworthy, design-led home-maintenance planning website for first-time U.S. homeowners. Prioritize practical tools, seasonal guides, calculators, and downloadable checklists. Our revenue model is display advertising, but usefulness and reader trust come first.

For any future request to implement the full website, first read [docs/MASTER_BUILD_PROMPT.md](docs/MASTER_BUILD_PROMPT.md) and execute it alongside all local skills. The master prompt is an implementation plan, not evidence that tests or deployment have already succeeded.

## Required work sequence
1. Inspect existing code and deployment configuration. Never overwrite another person's changes.
2. Read the relevant local instructions under `.agents/skills/` before implementing.
3. Establish evidence for maintenance claims; never invent inspections, testing, expert reviews, or credentials.
4. Build accessible, fast, semantic pages with visible primary content in generated HTML.
5. Run the SEO/GEO and quality gates in `.agents/skills/seo-readiness-audit/SKILL.md` before claiming readiness.
6. Report checks actually run separately from checks pending live deployment.

## Local skills — apply as relevant
- [Visual language](.agents/skills/visual-design/SKILL.md): design direction, typography, restrained layout, art direction.
- [Astro + Cloudflare](.agents/skills/astro-cloudflare-pages/SKILL.md): static-first architecture and deployment.
- [Technical SEO](.agents/skills/technical-seo/SKILL.md): indexability, metadata, sitemaps, structured data.
- [AI search / GEO](.agents/skills/geo-discoverability/SKILL.md): accessible evidence and answer quality without GEO gimmicks.
- [Content research](.agents/skills/content-research/SKILL.md): sourcing, editorial workflow, original usefulness.
- [Home maintenance safety](.agents/skills/home-maintenance-safety/SKILL.md): boundaries, regional variation and hazard review.
- [Accessibility and performance](.agents/skills/accessibility-performance/SKILL.md): WCAG and Core Web Vitals.
- [SEO readiness audit](.agents/skills/seo-readiness-audit/SKILL.md): measurable release gates, result reporting.

## Core principles
- Build for real homeowners, not for search-engine keyword volume.
- No mass-generated doorway/location pages, thin AI content, fake ratings, unverifiable author bios, or unsupported claims.
- Do not add analytics, cookie banners, ad scripts, paid assets, third-party embeds, or credentials without a concrete need.
- Avoid generic AI website aesthetics: excessive gradients, glass cards, ubiquitous rounded pill shapes, emoji iconography, and fake social proof.
- SEO/GEO compliance does not guarantee rankings, referrals, indexing, or ad approval.
- Use tracked, reviewed source material; code is the source of truth and GitHub is the canonical repository.
- Intended platform: Cloudflare Pages connected to GitHub. Never assert a Pages deployment is working until its deployment and URL are checked.
