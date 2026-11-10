// F020: GitHub-hosted browser smoke checks, not a WCAG certification or field CWV measurement.
// Run against a locally served production build; no private homeowner data is entered.
import { chromium } from 'playwright';
import { PUBLIC_ROUTES } from '../src/lib/routes.mjs';

const origin = process.env.AUDIT_ORIGIN || 'http://127.0.0.1:4321';
const viewports = [320, 375, 768, 1024, 1440];
const routes = PUBLIC_ROUTES.filter(route => route.startsWith('/tools/') || route.startsWith('/calculators/'));
if (!routes.length) throw new Error('No tool routes discovered');
const browser = await chromium.launch({ headless: true });
const failures = [];
const results = [];
const labPerformance = [];
try {
  for (const route of routes) {
    for (const width of viewports) {
      const context = await browser.newContext({ viewport: { width, height: 800 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      // Collect browser lab signals. These are NOT CrUX field CWV or a Lighthouse score.
      if (width === 375) await page.addInitScript(() => {
        window.__auditVitals = { lcp: null, cls: 0, shifts: 0 };
        try {
          new PerformanceObserver(list => {
            for (const entry of list.getEntries()) window.__auditVitals.lcp = Math.round(entry.startTime);
          }).observe({ type: 'largest-contentful-paint', buffered: true });
          new PerformanceObserver(list => {
            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) {
                window.__auditVitals.cls += entry.value;
                window.__auditVitals.shifts++;
              }
            }
          }).observe({ type: 'layout-shift', buffered: true });
        } catch { /* Unsupported browser signal is reported as null. */ }
      });
      const errors = [];
      // Observe real print calls rather than merely checking print CSS.
      await page.addInitScript(() => {
        window.__auditPrintCalls = 0;
        window.print = () => { window.__auditPrintCalls++; };
      });
      page.on('pageerror', error => errors.push(error.message));
      try {
        const response = await page.goto(origin + route, { waitUntil: 'domcontentloaded', timeout: 20000 });
        if (response?.status() !== 200) throw new Error('HTTP ' + response?.status());
        const initial = await page.evaluate(() => ({
          title: document.title,
          h1: document.querySelectorAll('h1').length,
          overflow: document.documentElement.scrollWidth > innerWidth + 2,
          main: !!document.querySelector('main'),
          skip: !!document.querySelector('a[href="#main-content"],a[href="#main"]')
        }));
        if (!initial.title || initial.h1 !== 1 || !initial.main || !initial.skip || initial.overflow)
          failures.push({ route, width, check: 'structure/overflow', observed: initial });
        if (width === 375) {
          // A short, reproducible lab observation window before user interactions.
          // LCP/CLS here are diagnostic samples, not real-user p75 or INP.
          await page.waitForLoadState('load');
          await page.waitForTimeout(750);
          const perf = await page.evaluate(() => {
            const nav = performance.getEntriesByType('navigation')[0];
            const fcp = performance.getEntriesByName('first-contentful-paint')[0];
            return {
              lcpMs: window.__auditVitals?.lcp ?? null,
              clsObserved: window.__auditVitals ? Number(window.__auditVitals.cls.toFixed(4)) : null,
              layoutShiftEntries: window.__auditVitals?.shifts ?? null,
              fcpMs: fcp ? Math.round(fcp.startTime) : null,
              domContentLoadedMs: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
              transferBytes: nav?.transferSize ?? null
            };
          });
          labPerformance.push({ route, width, ...perf });
          // Check the accessible name of each visible native form control. This
          // catches unlabeled inputs that structural SEO checks cannot detect.
          const unnamedControls = await page.locator('input, select, textarea').evaluateAll(elements =>
            elements.filter(el => {
              const style = getComputedStyle(el);
              if (el.type === 'hidden' || style.display === 'none' || style.visibility === 'hidden' || !el.getClientRects().length) return false;
              const id = el.id;
              const label = (el.labels && Array.from(el.labels).some(node => node.textContent.trim())) ||
                (id && document.querySelector('label[for="' + CSS.escape(id) + '"]')?.textContent.trim()) ||
                el.closest('label')?.textContent.trim() ||
                el.getAttribute('aria-label')?.trim() ||
                (el.getAttribute('aria-labelledby') || '').split(/\s+/).some(ref => document.getElementById(ref)?.textContent.trim());
              return !label;
            }).map(el => ({ tag: el.tagName, type: el.type || '', id: el.id || '', name: el.name || '' }))
          );
          if (unnamedControls.length) failures.push({ route, width, check: 'unlabeled visible form controls', observed: unnamedControls });
          await page.keyboard.press('Tab');
          const focus = await page.evaluate(() => ({
            tag: document.activeElement?.tagName,
            visible: document.activeElement !== document.body &&
              getComputedStyle(document.activeElement).visibility !== 'hidden'
          }));
          if (!focus.visible) failures.push({ route, width, check: 'first keyboard focus', observed: focus });
          // Emulating a color preference after load does not prove the site's
          // user-controlled theme works. Exercise the real keyboard control.
          const toggle = page.locator('[data-theme-toggle]');
          await toggle.waitFor({ state: 'visible' });
          const beforeTheme = await page.locator('html').getAttribute('data-theme');
          await toggle.focus();
          await page.keyboard.press('Enter');
          const afterTheme = await page.locator('html').getAttribute('data-theme');
          const actionLabel = await toggle.getAttribute('aria-label');
          const savedTheme = await page.evaluate(() => localStorage.getItem('upkeepatlas-theme'));
          if (beforeTheme === afterTheme || !['dark', 'light'].includes(afterTheme) ||
              savedTheme !== afterTheme ||
              actionLabel !== (afterTheme === 'dark' ? 'Switch to day mode' : 'Switch to night mode')) {
            failures.push({ route, width, check: 'keyboard theme toggle', observed: { beforeTheme, afterTheme, actionLabel, savedTheme } });
          }
          const dark = await page.evaluate(() => ({
            theme: document.documentElement.dataset.theme,
            background: getComputedStyle(document.body).backgroundColor,
            color: getComputedStyle(document.body).color
          }));
          await page.reload({ waitUntil: 'domcontentloaded' });
          const persistedTheme = await page.locator('html').getAttribute('data-theme');
          if (persistedTheme !== afterTheme) failures.push({ route, width, check: 'theme persistence', observed: { afterTheme, persistedTheme } });
          // Exercise visible print actions with keyboard activation. A print
          // media query alone cannot prove that the site's button is wired.
          const printButtons = page.getByRole('button', { name: /print/i });
          const printButtonCount = await printButtons.count();
          for (let i = 0; i < printButtonCount; i++) {
            const control = printButtons.nth(i);
            if (!(await control.isVisible()) || !(await control.isEnabled())) continue;
            const beforeCalls = await page.evaluate(() => window.__auditPrintCalls);
            await control.focus();
            await page.keyboard.press('Enter');
            const afterCalls = await page.evaluate(() => window.__auditPrintCalls);
            if (afterCalls <= beforeCalls) failures.push({
              route, width, check: 'keyboard print action',
              observed: { button: await control.innerText(), beforeCalls, afterCalls }
            });
          }
          await page.emulateMedia({ media: 'print' });
          const print = await page.evaluate(() => ({ media: matchMedia('print').matches, body: !!document.body.innerText.trim() }));
          if (!print.media || !print.body) failures.push({ route, width, check: 'print media', observed: print });
          results.push({ route, width, focus, dark, print });
        }
        if (errors.length) failures.push({ route, width, check: 'page errors', observed: errors });
      } catch (error) {
        failures.push({ route, width, check: 'navigation', observed: String(error) });
      } finally {
        await context.close();
      }
    }
  }
  // End-to-end representative arithmetic and CSV round-trip assertions.
  // Browser data is isolated in a fresh context; no production user data is touched.
  {
    const context = await browser.newContext({ acceptDownloads: true });
    const page = await context.newPage();
    try {
      await page.goto(origin + '/calculators/appliance-electricity-cost/', { waitUntil: 'load' });
      await page.locator('#electric-watts').fill('1000');
      await page.locator('#electric-hours').fill('2');
      await page.locator('#electric-days').fill('7');
      await page.locator('#electric-rate').fill('0.25');
      await page.locator('#electric-duty').fill('50');
      await page.locator('#electric-form button[type="submit"]').click();
      const cost = await page.locator('#electric-cost').innerText();
      const detail = await page.locator('#electric-detail').innerText();
      // 1 kW × 2 h × 7 days × 0.5 load × 52 weeks = 364 kWh; at $0.25 = $91.
      if (!cost.includes('91.00') || !detail.includes('364.00 kWh/year'))
        failures.push({ route: '/calculators/appliance-electricity-cost/', check: 'actual calculation', observed: { cost, detail } });
      await page.locator('#electric-watts').fill('-1');
      await page.locator('#electric-form button[type="submit"]').click();
      const error = await page.locator('#electric-error').innerText();
      if (!error.trim()) failures.push({ route: '/calculators/appliance-electricity-cost/', check: 'invalid input error missing' });

      await page.goto(origin + '/tools/maintenance-log/', { waitUntil: 'load' });
      await page.locator('#record-date').fill('2026-11-09');
      await page.locator('#record-system').fill('HVAC');
      await page.locator('#record-work').fill('Inspected filter');
      await page.locator('#log-form button[type="submit"]').click();
      if (await page.locator('#log-rows tr').count() !== 1)
        failures.push({ route: '/tools/maintenance-log/', check: 'save record' });
      await page.reload({ waitUntil: 'load' });
      if (await page.locator('#log-rows tr').count() !== 1)
        failures.push({ route: '/tools/maintenance-log/', check: 'persist record after reload' });
      const downloadPromise = page.waitForEvent('download');
      await page.locator('#export-log').click();
      const download = await downloadPromise;
      const path = await download.path();
      const { readFile } = await import('node:fs/promises');
      const csv = await readFile(path, 'utf8');
      if (!csv.includes('"2026-11-09","HVAC","Inspected filter"'))
        failures.push({ route: '/tools/maintenance-log/', check: 'CSV content', observed: csv.slice(0, 300) });
      page.once('dialog', dialog => dialog.accept());
      await page.locator('#clear-log').click();
      if (await page.locator('#log-rows tr').count() !== 0)
        failures.push({ route: '/tools/maintenance-log/', check: 'erase records' });
      page.once('dialog', dialog => dialog.accept());
      await page.locator('#import-log').setInputFiles({ name: 'backup.csv', mimeType: 'text/csv', buffer: Buffer.from(csv) });
      try {
        await page.locator('#log-rows tr').first().waitFor({ state: 'visible', timeout: 5000 });
      } catch {
        failures.push({ route: '/tools/maintenance-log/', check: 'CSV import round trip', observed: await page.locator('#log-rows').innerText() });
      }
      results.push({ route: 'interaction-samples', checks: ['electricity arithmetic', 'invalid input', 'log persistence', 'CSV export', 'erase', 'CSV import'] });
    } catch (error) {
      failures.push({ route: 'interaction-samples', check: 'end-to-end flow', observed: String(error) });
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}
console.log(JSON.stringify({ date: new Date().toISOString(), origin, routes: routes.length, viewports, sampled: results, labPerformance, labLimitations: 'Chromium 375x800, local Astro preview, 750ms observation after load; LCP/CLS/FCP are lab signals, not CrUX p75 or INP; no throttling or screen reader', failures }, null, 2));
if (failures.length) process.exitCode = 1;
