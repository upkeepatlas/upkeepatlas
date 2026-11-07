import { defineConfig } from "astro/config";

const site = process.env.PUBLIC_SITE_URL?.trim();

export default defineConfig({
  site: site || undefined,
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
  vite: { build: { cssMinify: true } },
});
