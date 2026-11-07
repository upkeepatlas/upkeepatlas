# Contact form release audit — 2026-11-08

**Page:** https://upkeepatlas.pages.dev/contact/  
**Recipient:** upkeepatlas@protonmail.com  
**Repository:** https://github.com/upkeepatlas/upkeepatlas  
**CI evidence:** https://github.com/upkeepatlas/upkeepatlas/actions/runs/42424795069

## Implemented

- New responsive `/contact/` Astro page with name, email, topic and message fields.
- Native HTTPS POST to `https://formsubmit.co/upkeepatlas@protonmail.com` for mail forwarding, without needing an application server or JavaScript.
- Required field and length validation, FormSubmit CAPTCHA (not disabled), invisible honeypot and no attachments.
- Direct `mailto:upkeepatlas@protonmail.com` alternative.
- Footer and mobile navigation links.
- Privacy notice describing third-party message delivery, possible CAPTCHA, approximate third-party retention and direct email alternative.
- Route included in `PUBLIC_ROUTES`, the production sitemap generator, and generated-output SEO validation.
- [Setup/activation instructions](../CONTACT_FORM_SETUP.md) committed.

## Verification

| Check | Status | Evidence |
| --- | --- | --- |
| GitHub file readback | PASS | Contact page and related source present in `main` |
| Astro build | PASS | GitHub Actions run 42424795069 |
| Unit tests | PASS | 6/6 passing |
| Strict Astro/TypeScript check | PASS | GitHub Actions run 42424795069 |
| Generated SEO audit | PASS | 15 routes in staging and production-host modes |
| Contact form markup | PASS | Live HTML contains correct FormSubmit recipient, POST, honeypot and direct mail link |
| Live title, H1, canonical, indexable metadata | PASS | Browser-rendered `/contact/` HTML checked; canonical `https://upkeepatlas.pages.dev/contact/` |
| Browser mobile screenshot | BLOCKED | Cloudflare Browser Rendering screenshot rate-limited (HTTP 429) |
| End-to-end email receipt | BLOCKED | FormSubmit requires first message and one-time confirmation emailed to owner; this has not been done |
| Legal/privacy review | PENDING | Site disclosure updated; contact processing should be reviewed if data-handling needs change |

## Owner action required to enable delivery

1. Open https://upkeepatlas.pages.dev/contact/ and send a harmless test message.
2. Check the inbox (and spam folder) for **upkeepatlas@protonmail.com** and click the FormSubmit activation link.
3. Send a second message and verify that it actually arrives. Until then, **do not assume contact form emails are being delivered**.
4. If confirmation does not arrive, check provider documentation and use the direct email link as fallback.

No user test message or private data was submitted from this implementation session.

## Operational caveat

FormSubmit is an independent external provider. Its documentation states that first-time activation is required and submissions are retained temporarily; this website does not operate an independent email service or store form submissions in its own database. The contact page has built-in browser validation, but confirmation of mail transport is an account-side step.
