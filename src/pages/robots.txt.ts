import type { APIRoute } from "astro";
import {publishedOrigin} from "../lib/routes.mjs";
export const GET: APIRoute = ()=>{
  const origin=publishedOrigin(import.meta.env.PUBLIC_SITE_URL);
  const value=origin ? "User-agent: *\nAllow: /\n\nSitemap: "+origin+"/sitemap.xml\n" : "User-agent: *\nDisallow: /\n# Indexing intentionally disabled until PUBLIC_SITE_URL is verified.\n";
  return new Response(value,{headers:{"Content-Type":"text/plain; charset=utf-8"}});
};
