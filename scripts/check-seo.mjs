import fs from "node:fs";
import path from "node:path";
import {PUBLIC_ROUTES,publishedOrigin} from "../src/lib/routes.mjs";
const output=path.resolve("dist");
if(!fs.existsSync(output))throw new Error("Missing dist directory; run npm run build first.");
const errors=[];const titles=new Set();const origin=publishedOrigin(process.env.PUBLIC_SITE_URL);
const read=(name)=>fs.readFileSync(path.join(output,name),"utf8");
for(const route of PUBLIC_ROUTES){
  const file=path.join(output,route,"index.html");
  if(!fs.existsSync(file)){errors.push("Missing rendered page "+route);continue;}
  const html=fs.readFileSync(file,"utf8");
  const title=html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  if(!title)errors.push(route+": title missing");
  else if(titles.has(title))errors.push(route+": duplicate title "+title);else titles.add(title);
  const count=(html.match(/<h1(?:\s[^>]*)?>/gi)||[]).length;
  if(count!==1)errors.push(route+": expected one H1; found "+count);
  if(!/<meta\s+name="description"\s+content="[^"]+"/i.test(html))errors.push(route+": description missing");
  if(!html.includes('lang="en-US"'))errors.push(route+": missing language declaration");
  if(origin){
    if(!html.includes('rel="canonical" href="'+origin+route+'"'))errors.push(route+": canonical incorrect");
    if(html.includes('content="noindex'))errors.push(route+": incorrectly noindex");
  }else{
    if(!html.includes('content="noindex,nofollow"'))errors.push(route+": staging must be noindex");
    if(html.includes('rel="canonical"'))errors.push(route+": guessed canonical");
  }
  for(const match of html.matchAll(/href="(\/[^"#?]*)"/g)){
    const ref=match[1];if(ref.startsWith("//"))continue;
    const target=path.join(output,ref);
    const found=/\.[a-z0-9]{2,8}$/i.test(ref)?fs.existsSync(target):fs.existsSync(path.join(target,"index.html"));
    if(!found)errors.push(route+": broken link "+ref);
  }
}
if(!fs.existsSync(path.join(output,"robots.txt")))errors.push("robots.txt missing");
if(!fs.existsSync(path.join(output,"sitemap.xml")))errors.push("sitemap.xml missing");
if(!fs.existsSync(path.join(output,"404.html")))errors.push("404.html missing");
if(errors.length===0){
  const robots=read("robots.txt");const sitemap=read("sitemap.xml");
  if(origin){
    if(!robots.includes("Sitemap: "+origin+"/sitemap.xml"))errors.push("robots sitemap reference incorrect");
    for(const route of PUBLIC_ROUTES)if(!sitemap.includes("<loc>"+origin+route+"</loc>"))errors.push("sitemap missing "+route);
  }else{
    if(!robots.includes("Disallow: /"))errors.push("unverified site has open robots");
    if(sitemap.includes("<loc>"))errors.push("unverified site has public sitemap URLs");
  }
}
console.log("Generated-output SEO audit:",PUBLIC_ROUTES.length,"pages;",origin?"verified-origin mode":"unverified-safe-staging mode");
if(errors.length){for(const issue of errors)console.error("FAIL",issue);process.exitCode=1;}else console.log("PASS: pages, metadata, internal links, safe indexing controls, sitemap and robots.");
