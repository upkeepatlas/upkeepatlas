/**
 * Build-time public route discovery. The page files and guide content are the
 * source of truth; sitemap, SEO validation and IndexNow share this registry.
 * Do not import in browser-side code (filesystem access is build-time only).
 */
import { existsSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { guides as legacyGuides } from "../data/guides.mjs";

const root = fileURLToPath(new URL("../../", import.meta.url));
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function sourceFiles(directory, prefix) {
  const absolute = join(root, directory);
  if (!existsSync(absolute)) return [];
  return readdirSync(absolute, { withFileTypes: true }).flatMap(entry => {
    const path = prefix + "/" + entry.name;
    if (entry.isDirectory()) return sourceFiles(directory + "/" + entry.name, path);
    return entry.isFile() ? [path] : [];
  });
}

/**
 * Pure discovery for tests and for comparing a previous Git tree.
 * A new regular Astro page or Markdown guide is automatically included.
 * Unknown dynamic routes fail closed until they have an explicit enumerator.
 */
export function discoverRoutesFromPaths(paths, legacySlugs = []) {
  const routes = new Set();
  const guideSlugs = new Set();
  for (const raw of paths) {
    const file = raw.replaceAll("\\", "/");
    if (file === "src/pages/index.astro") {
      routes.add("/");
      continue;
    }
    if (file === "src/pages/404.astro") continue;
    if (file.startsWith("src/pages/") && file.endsWith(".astro")) {
      const name = file.slice("src/pages/".length, -".astro".length);
      if (name === "guides/[slug]") continue; // backed by guides below
      if (name.includes("[") || name.includes("]")) {
        throw new Error("Unregistered dynamic Astro route: " + file);
      }
      const segments = (name.endsWith("/index") ? name.slice(0, -"/index".length) : name)
        .split("/");
      if (!segments.every(segment => slugPattern.test(segment))) {
        throw new Error("Unsafe Astro route: " + file);
      }
      routes.add("/" + segments.join("/") + "/");
    }
    if (file.startsWith("src/content/guides/") && file.endsWith(".md")) {
      const slug = file.slice("src/content/guides/".length, -".md".length);
      if (!slugPattern.test(slug)) {
        throw new Error("Guide must have a flat, safe slug: " + file);
      }
      if (guideSlugs.has(slug)) throw new Error("Duplicate guide slug: " + slug);
      guideSlugs.add(slug);
    }
  }
  for (const slug of legacySlugs) {
    if (!slugPattern.test(slug) || guideSlugs.has(slug)) {
      throw new Error("Duplicate or unsafe legacy guide slug: " + slug);
    }
    guideSlugs.add(slug);
  }
  if (guideSlugs.size && !paths.includes("src/pages/guides/[slug].astro")) {
    throw new Error("Guide content exists without a dynamic guide page.");
  }
  for (const slug of guideSlugs) routes.add("/guides/" + slug + "/");
  if (!routes.has("/")) throw new Error("Homepage route is missing.");
  return [...routes].sort((a, b) => a.localeCompare(b));
}

export const PUBLIC_ROUTES = discoverRoutesFromPaths(
  [...sourceFiles("src/pages", "src/pages"), ...sourceFiles("src/content/guides", "src/content/guides")],
  legacyGuides.map(guide => guide.slug)
);

export function publishedOrigin(value) {
  const origin = value?.trim().replace(/\/$/, "");
  return origin && /^https:\/\/[a-z0-9.-]+(?::[0-9]+)?$/i.test(origin) ? origin : "";
}
