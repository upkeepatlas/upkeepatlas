import type { APIRoute } from "astro";
import {PUBLIC_ROUTES,publishedOrigin} from "../lib/routes.mjs";
export const GET: APIRoute = ()=>{
  const origin=publishedOrigin(import.meta.env.PUBLIC_SITE_URL);
  const urls=origin?PUBLIC_ROUTES.map(route=>"<url><loc>"+origin+route+"</loc></url>").join(""):"";
  const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls+'</urlset>';
  return new Response(xml,{headers:{"Content-Type":"application/xml; charset=utf-8"}});
};
