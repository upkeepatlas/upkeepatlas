# Contact form — activation and verification

Updated: 2026-11-08

## Implementation

The public contact page is at **https://upkeepatlas.pages.dev/contact/**. It uses a normal HTML form (no client JavaScript necessary) with `POST` to `https://formsubmit.co/upkeepatlas@protonmail.com`. The service forwards incoming form messages to **upkeepatlas@protonmail.com** after one-time inbox activation.

The form asks for name, email, a topic and a message. It uses standard HTML constraints, an invisible honeypot (`_honey`) and FormSubmit's built-in CAPTCHA/spam filtering. It deliberately does not allow file uploads. The form defaults to the external service's confirmation/thank-you screen, so it does not claim successful delivery in the browser before the provider handles it.

A direct mailto link is provided as an alternative. The site's privacy policy discloses the third-party processing, and the footer and mobile navigation link to the page. `PUBLIC_ROUTES`, generated sitemap, metadata and the static SEO checker include the page.

## Critical one-time activation (site owner)

1. Open **https://upkeepatlas.pages.dev/contact/** after a successful Cloudflare Pages deployment.
2. Submit a harmless test message using your own contact information; do not use private data.
3. FormSubmit will send an activation message to **upkeepatlas@protonmail.com**. Open the Proton Mail inbox (including Spam), follow the confirmation link and authorize delivery.
4. Submit another test message and confirm that an actual email arrives and that Reply-To corresponds to the sender's address.
5. If the service is not activated, submission delivery is **not verified**. The repo integration alone is not proof that email works.

**Do not ask visitors to rely on the form until you have completed activation and a successful test.** An alternative direct email link is always available.

## Operational notes

- Provider: [FormSubmit.co](https://formsubmit.co/), not FormSubmit.io (a different service that announced shutdown).
- Provider instructions: [FormSubmit documentation](https://formsubmit.co/documentation), [activation FAQs](https://formsubmit.co/help), [privacy notice](https://formsubmit.co/privacy.pdf).
- Per its documentation, FormSubmit keeps submissions for up to 30 days. Mail forwarding and activation are managed outside GitHub and Cloudflare.
- There is no first-party mail API token, database, or Pages Function. If a stronger controlled delivery/retention solution is desired later, replace the external endpoint with a suitably authenticated and rate-limited server-side function and approved mail service.
- Do not remove CAPTCHA protection merely for visual style. Avoid leaking spam test messages or credentials.
- Re-check the endpoint and sender verification whenever the contact email, production domain or form service changes.

## Technical audit

The generated-output SEO checker now verifies that `/contact/` is pre-rendered, has normal metadata and a unique H1, and includes the correct submission action, POST method, honeypot and required message fields. This does not verify email delivery — activation and actual inbox receipt are separate manual checks.
