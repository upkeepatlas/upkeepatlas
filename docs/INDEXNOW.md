# Bing IndexNow — Upkeep Atlas

**Implemented for:** https://upkeepatlas.pages.dev/  
**Protocol:** https://www.indexnow.org/en_gb/documentation  
**Bing endpoint:** https://www.bing.com/indexnow  
**GitHub workflow:** .github/workflows/indexnow.yml

## What this does

IndexNow notifies participating search engines when public URLs have been added, updated or removed. It is **not** Bing Webmaster Tools site verification, an indexing guarantee, a Google Search Console submission, or an instant-ranking service.

We use the existing verified Cloudflare Pages production hostname. Changing to a custom domain requires creating a new ownership key file on that hostname and updating site URL, canonical, workflow configuration, tests and sitemap before notifying search engines.

## Key verification

- Public root file: /27441d201328388b746929fd572c8a7068f5ee8a.txt
- Exact URL: https://upkeepatlas.pages.dev/27441d201328388b746929fd572c8a7068f5ee8a.txt
- File content is the same key without HTML. IndexNow keys are designed to be public ownership proofs and are *not* account passwords or private API credentials.

Do not submit until this file is actually reachable from the published production host.

## Automatic notifications

1. GitHub's **Build and quality** workflow validates the normal static site, then verifies the IndexNow file, canonical URLs, and production build fingerprint.
2. The separate **Bing IndexNow — deployed content notifications** workflow triggers only after a **successful main-branch push** quality run; it excludes pull requests and previews.
3. The workflow checks out the tested commit, compares its content files with its parent and selects the affected URLs. Documentation-only, style-only, and CI-only changes are skipped; shared content/layout changes can affect all pages.
4. Before sending anything, it checks that the public homepage is serving exactly that commit (Cloudflare exposes CF_PAGES_COMMIT_SHA in a build-time metadata field) and that the live key file matches.
5. Once both checks pass, a single JSON POST submits canonical URLs for the changed pages to Bing's IndexNow endpoint. A successful HTTP 200 means the URLs were received; HTTP 202 means received while key validation is pending. **Neither proves an URL was crawled or indexed.**
6. A missing deployment, missing key, HTTP error, 403/422/429 or mismatch fails the notification job without falsely claiming submission. Inspect the workflow log; retry only after resolving the issue.

No Bing API tokens, passwords, or Cloudflare credentials are stored in GitHub. The key is public because IndexNow requires it to be publicly accessible.

## Manual setup and recovery

- Check local/public key and valid URLs: \`npm run check:indexnow\` (after \`npm run build\` also verifies the compiled key file).
- Preview changed canonical routes (no network): \`npm run indexnow:dry-run\`.
- GitHub → Actions → **Bing IndexNow — deployed content notifications** → **Run workflow** on main:
  - \`submit_all = false\` checks only the latest changed URLs;
  - \`submit_all = true\` explicitly submits the entire current published set, for first launch or recovery only.
- The manual command \`INDEXNOW_EXPECT_SHA=<full-40-character-commit-sha> npm run indexnow:submit\` will only send after the production site shows exactly that commit and the verification file loads. Use sparingly and avoid repeated notifications for unchanged pages.

## Bing visibility

In https://www.bing.com/webmasters/ verify the URL-prefix property, review IndexNow reporting, inspect URLs and submit the sitemap as a separate discovery signal. IndexNow receipt is not equivalent to search ranking, indexing, or account verification.

## Release audit checklist

- [ ] Key file exists in GitHub, \`dist/\` and live at the production host
- [ ] Generated public URLs are absolute, canonical and stay on the expected host
- [ ] Only matching deployed commit can trigger submission
- [ ] No preview, pull request or docs-only automatic notifications
- [ ] Unit tests and production SEO build succeed
- [ ] Actual Bing endpoint HTTP response captured in successful workflow logs
- [ ] Bing Webmaster IndexNow/index coverage observed later (separate from receipt)

### Sources

- https://www.indexnow.org/en_gb/documentation
- https://www.indexnow.org/faq
- https://developers.cloudflare.com/pages/configuration/build-configuration/
- https://developers.cloudflare.com/pages/configuration/git-integration/
