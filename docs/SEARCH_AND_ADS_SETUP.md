# Search Console, Bing Webmaster & Google AdSense

Updated: 2026-11-08

## Deployment values

| Service | Value |
| --- | --- |
| Current site | https://upkeepatlas.pages.dev/ |
| Production canonical origin | https://upkeepatlas.pages.dev |
| Sitemap | https://upkeepatlas.pages.dev/sitemap.xml |
| Robots | https://upkeepatlas.pages.dev/robots.txt |
| ads.txt | https://upkeepatlas.pages.dev/ads.txt |
| AdSense publisher ID | ca-pub-3399213817491318 |

### What the GitHub implementation does

- `src/layouts/BaseLayout.astro` includes the exact Google Search Console `google-site-verification` meta tag and Bing `msvalidate.01` meta tag in static HTML head on all pages.
- The same layout includes Google's `google-adsense-account` meta tag. The provided AdSense loader is inserted **once per page on configured production builds** (when `PUBLIC_SITE_URL` is a valid HTTPS origin). Preview builds without this setting don't load the advertising script.
- `public/ads.txt` declares `google.com, pub-3399213817491318, DIRECT, f08c47fec0942fa0` as an authorized seller.
- `src/pages/privacy/index.astro` discloses AdSense integration and regional-consent dependencies.
- `scripts/check-seo.mjs` validates the tags, script count, ads.txt content, and staging vs production behavior in generated static HTML.

**Installing verification code is not the same as verifying website ownership in any service dashboard; loading an AdSense script is not ad network approval.**

## Google Search Console: action in your account

1. Open https://search.google.com/search-console/ and add the **URL-prefix property** `https://upkeepatlas.pages.dev/` (exact HTTPS origin). An HTML meta tag verifies URL-prefix properties, not DNS-based domain properties.
2. Choose **HTML tag** verification, then click **Verify**. The meta tag has already been deployed in the site's HTML.
3. Under **Sitemaps**, submit `https://upkeepatlas.pages.dev/sitemap.xml` (or `sitemap.xml` if the interface requests a path).
4. Use URL Inspection to check the home page and key content pages and monitor indexing. Submission does not guarantee indexing.
5. When moving to a custom domain, create the new property and update `PUBLIC_SITE_URL`, redirects and the relevant ownership verification.

## Bing Webmaster Tools: action in your account

1. Open https://www.bing.com/webmasters/ and **Add a Site** using `https://upkeepatlas.pages.dev/`.
2. Select **HTML Meta Tag** verification and click **Verify**; the specified `msvalidate.01` is in the HTML head.
3. Submit `https://upkeepatlas.pages.dev/sitemap.xml` and review Index Explorer / Site Scan after Bing has crawled your pages.
4. Alternatively, Bing supports importing an already verified Google Search Console property.

## AdSense: action in your account

1. Open https://www.google.com/adsense/ and navigate to **Sites** → **New site**. Enter the live host as accepted by your AdSense account. The provided script, account meta tag and ads.txt are already installed.
2. Complete the ownership verification and site review process. **Google decides whether a hosted subdomain such as `upkeepatlas.pages.dev` is eligible to be added and approved**; this has not been verified. If rejected or unsupported, connect your own registered custom domain, update canonical/deployment settings and apply using that domain.
3. Only after approval, enable and configure **Auto ads** from **Ads**, and use the preview before activation. Consider excluding utility interfaces (`/maintenance-calendar/`, `/calculators/paint-coverage/`) and privacy pages from intrusive placement, and limit density.
4. Under **Privacy & messaging**, configure and verify a **Google-certified, IAB TCF-integrated CMP** for visitors in the EEA, UK and Switzerland before eligible advertising. A homemade banner isn't a substitute for Google's certification. Review other applicable regional privacy/consent rules and get legal advice as needed.
5. Confirm AdSense account details, ads.txt crawler status, policy center, approval, and live ad serving in your own account. This implementation cannot assert these statuses without dashboard access.

## What remains unverified

- Search Console ownership, indexing, sitemap submission and crawl status.
- Bing ownership, crawl status and sitemap submission.
- AdSense domain/site eligibility, account approval, automatic-ad settings, ads.txt crawler acknowledgment, consent management activation and actual paid ad impressions.
- Compliance review of the privacy policy against actual traffic and regional rules.

## Sources

- [Google Search Console — HTML tag verification](https://support.google.com/webmasters/answer/9008080)
- [Bing Webmaster — Add and verify site](https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b)
- [Google AdSense — Add a new site](https://support.google.com/adsense/answer/12169212)
- [Google AdSense — Auto ads settings](https://support.google.com/adsense/answer/9305577)
- [Google AdSense — EEA, UK and Switzerland consent requirements](https://support.google.com/adsense/answer/13554116)
