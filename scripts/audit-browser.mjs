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
try {
  for (const route of routes) {
    for (const width of viewports) {
      const context = await browser.newContext({ viewport: { width, height: 800 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = [];
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
          await page.keyboard.press('Tab');
          const focus = await page.evaluate(() => ({
            tag: document.activeElement?.tagName,
            visible: document.activeElement !== document.body &&
              getComputedStyle(document.activeElement).visibility !== 'hidden'
          }));
          if (!focus.visible) failures.push({ route, width, check: 'first keyboard focus', observed: focus });
          await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
          const dark = await page.evaluate(() => ({
            background: getComputedStyle(document.body).backgroundColor,
            color: getComputedStyle(document.body).color
          }));
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
} finally {
  await browser.close();
}
console.log(JSON.stringify({ date: new Date().toISOString(), origin, routes: routes.length, viewports, sampled: results, failures }, null, 2));
if (failures.length) process.exitCode = 1;
