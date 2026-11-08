---
name: visual-media-rights
description: Choose realistic, legally usable, optimized media for homeowner content while documenting license and avoiding misleading generated images.
---
# Skill: Visual Media, Provenance and Performance

## Design principle
Media must teach, demonstrate, distinguish components, or provide context; do not demand a photo or video count on every page. The site uses refined architectural editorial design, warm paper and pine colors by day, dark charcoal and forest by night, neutral type and quiet whitespace.

## Asset selection hierarchy
1. Original factual illustration: hand-built SVG diagram, annotated plan or measured chart with accurate labels and tested facts.
2. Original photography captured with documented permission (never claim project staff took it unless true).
3. Clearly licensed third-party photos/videos relevant to the real task: review the exact per-file license and commercial rights. Unsplash and Pexels may allow site use subject to license and use restrictions; Wikimedia Commons often requires per-file attribution or share-alike compliance. Product manufacturer photos require permission or license.
4. AI-generated imagery only if a genuinely suitable alternative is unavailable and the generated illustration is materially useful. Prefer clearly stylized explanatory diagrams over photorealistic representations of installations, defects, damage or professionals. Never present AI output as a real repair, test, expert or before-and-after case.

## Proof required before committing an asset
An entry in docs/production/assets.csv with: task_id, target_path, asset_kind, originating_url, creator, license_name, license_url, attribution_text, changes_made, capture_or_access_date, factual_or_illustrative, dimensions, byte_count, rights_check.
Use "original" and self-created diagram details for generated vectors; use an explicit AI-generated disclosure when applicable. If licensing evidence cannot be verified, omit media; do NOT hotlink arbitrary image search results.
If a video is beneficial, only embed when content and reuse permission are appropriate and the page remains usable without video.

## Technical requirements
- Save images in public/assets/ or Astro image pipeline, use self-hosted optimized WebP/AVIF/JPEG as appropriate, descriptive filenames and human-meaningful alt. Avoid alt stuffing.
- Preserve original proportions and color fidelity, allocate width/height or aspect-ratio to prevent layout shifts. Images in article body should be responsive; below-fold media lazy, leading meaningful images priority loaded.
- Put media adjacent to the text it explains. Caption source/uncertainty.
- OG/social image should be relevant and available; no broken previews or placeholder blocks.
- Keep working tool and form content accessible in HTML without the media.

## Safety
Never produce a visual that could plausibly be confused for a tested electrical, gas or structural installation and then use it as evidence of safety or workmanship.
Sources:
- https://developers.google.com/search/docs/appearance/google-images
- https://unsplash.com/license
- https://www.pexels.com/legal-pages/license/
- https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia
