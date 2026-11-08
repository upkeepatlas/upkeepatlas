import { PUBLIC_ROUTES } from "./routes.mjs";

// The key file is public ownership proof, not a secret credential.
export const INDEXNOW_KEY = "27441d201328388b746929fd572c8a7068f5ee8a";
export const INDEXNOW_ORIGIN = "https://upkeepatlas.pages.dev";
export const INDEXNOW_ENDPOINT = "https://www.bing.com/indexnow";
export const INDEXNOW_KEY_PATH = "/" + INDEXNOW_KEY + ".txt";

function uniqueRoutes(routes) {
  return [...new Set(routes)].filter(route => /^\/(?:[a-z0-9-]+\/)*$/.test(route)).sort();
}

/** Select only relevant published/removed URLs; skip docs-only and style-only changes. */
export function routesForChangedFiles(files, currentRoutes = PUBLIC_ROUTES, previousRoutes = []) {
  const all = uniqueRoutes([...currentRoutes, ...previousRoutes]);
  if (!Array.isArray(files) || files.length === 0) return [];
  const chosen = new Set();
  let broad = false;
  const selectGuides = (includeHub = false) => {
    for (const route of all) {
      if (route.startsWith("/guides/") && (includeHub || route !== "/guides/")) chosen.add(route);
    }
  };
  for (const file of files) {
    if (file === "public/" + INDEXNOW_KEY + ".txt" ||
        file === "src/lib/routes.mjs" ||
        file.startsWith("src/layouts/") ||
        file.startsWith("src/components/")) {
      broad = true; continue;
    }
    if (file === "src/data/guides.mjs" || file === "src/content.config.ts") {
      selectGuides(true); continue;
    }
    const markdown = /^src\/content\/guides\/([a-z0-9-]+)\.md$/.exec(file);
    if (markdown) {
      chosen.add("/guides/" + markdown[1] + "/");
      chosen.add("/guides/"); // library card/list also changed
      continue;
    }
    if (file === "src/pages/index.astro") { chosen.add("/"); continue; }
    if (file === "src/lib/planner.mjs") { chosen.add("/maintenance-calendar/"); continue; }
    if (file === "src/lib/paint.mjs") { chosen.add("/calculators/paint-coverage/"); continue; }
    if (file === "src/pages/404.astro" ||
        file === "src/pages/robots.txt.ts" ||
        file === "src/pages/sitemap.xml.ts") continue;
    if (file === "src/pages/guides/[slug].astro") { selectGuides(); continue; }
    const page = /^src\/pages\/(.+?)(?:\/index)?\.astro$/.exec(file);
    if (page) {
      if (page[1].includes("[") || page[1].includes("]")) broad = true;
      else chosen.add("/" + page[1].replace(/\/index$/, "") + "/");
    }
  }
  return broad ? all : uniqueRoutes([...chosen].filter(route => all.includes(route)));
}

/** Only submit canonical URLs on Upkeep Atlas's actually verified production hostname. */
export function makeIndexNowPayload(routes, origin = INDEXNOW_ORIGIN) {
  const target = new URL(origin);
  if (target.protocol !== "https:" || target.host !== "upkeepatlas.pages.dev" ||
      target.pathname !== "/" || target.search || target.hash) {
    throw new Error("IndexNow can only notify the verified production host.");
  }
  const clean = uniqueRoutes(routes);
  if (clean.length !== routes.length) throw new Error("Invalid or duplicate IndexNow URLs.");
  if (clean.length > 10000) throw new Error("IndexNow batch limit exceeded.");
  return {
    host: target.host,
    key: INDEXNOW_KEY,
    keyLocation: origin + INDEXNOW_KEY_PATH,
    urlList: clean.map(route => origin + route),
  };
}
