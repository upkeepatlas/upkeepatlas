# Day and night modes

Upkeep Atlas includes a native, low-JavaScript theme switch consistent with its calm editorial design.

## Reader behavior

- Defaults to the visitor's operating-system light/dark preference.
- A single button in the desktop/mobile header switches to the other mode.
- Remembers an explicit choice in browser local storage under `upkeepatlas-theme`. It stores only `dark` or `light` and does not send that preference to an application backend.
- If local storage is blocked, the switch still works during the current page visit but cannot remember the choice across reloads.
- The early inline head script sets the theme before first paint to avoid a white flash on dark devices.
- With no explicit choice, future operating-system changes are followed.
- Interactive controls are semantic buttons with accessible action labels, keyboard focus styles and decorative icons hidden from assistive technologies.
- The site's standard print styles remain light on paper, including when the page is being viewed in night mode.

## Visual direction

Night palette: pine/charcoal paper `#151C19`, warm off-white ink `#EAF0E9`, forest accent `#AFD5B9`, green-grey secondary surfaces `#25352C`, muted green-grey copy `#B8C6BC`. Avoid auto-inversion, gradients, washed-out imagery and low-contrast fields.

Dark surfaces are applied to the homepage, hero, footer, guide blocks, planner, calculators, checklists and contact form. The geometric brand mark and architectural illustration remain intentionally dark green.

## Development verification

Run `npm run test`, `npm run build`, `npm run check:theme`, `npm run check:seo` and `npm run check` (also part of GitHub CI). The theme checks verify presence of the first-paint script, accessible toggle, CSS, and light print fallback on every generated page. The theme resolver unit tests cover system preference, explicit overrides, invalid values and mode switching.

Visual/interaction follow-up after deployment:
- Check 320, 375, 768, 1024 and 1440px widths for header overlap.
- Verify colors and focus states in both modes, keyboard control, text zoom, forms, planner, guide notes, footer, and print preview.
- Reload after a choice; verify it persists and does not flash. Confirm the OS preference works when the stored value is absent.
- Test browser with blocked local storage and reduced motion where possible.
- Measure actual color contrast and accessibility with browser inspection; automated source checks do not constitute WCAG certification.

## SEO / accessibility

The mode affects presentation only. The HTML content, title, canonical URL, structured data, sitemap and internal links are identical in both modes. No duplicate URLs or theme-specific indexed pages are created.

The privacy page explains local storage. No additional third-party service or site cookie is required for the theme.
