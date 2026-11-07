import fs from "node:fs";
import path from "node:path";
import {PUBLIC_ROUTES,publishedOrigin} from "../src/lib/routes.mjs";
import {INDEXNOW_KEY} from "../src/lib/indexnow.mjs";
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
  if(origin && process.env.CF_PAGES_BRANCH==="main" && process.env.CF_PAGES_COMMIT_SHA &&
    !html.includes('name="upkeepatlas-deploy-commit" content="'+process.env.CF_PAGES_COMMIT_SHA+'"')){
    errors.push(route+": missing production deployment fingerprint for IndexNow");
  }
  if(route==="/contact/"){
    if(!html.includes('action="https://formsubmit.co/upkeepatlas@protonmail.com"'))errors.push("Contact form: email delivery endpoint missing");
    if(!html.includes('method="POST"'))errors.push("Contact form: POST method missing");
    if(!html.includes('name="_honey"'))errors.push("Contact form: honeypot missing");
    if(!html.includes('name="email"')||!html.includes('name="message"'))errors.push("Contact form: required message fields missing");
  }
  // Verification markers must be in rendered HTML (not client-injected).
  if(!html.includes('name="google-site-verification" content="dLBYqjQSU_b8qIgIePwzoGsC7t8yMRd_7clA3LDZzvg"'))errors.push(route+": Google Search Console marker missing");
  if(!html.includes('name="msvalidate.01" content="6F5CEF54439CF26D57A6D6556901350F"'))errors.push(route+": Bing Webmaster marker missing");
  if(!html.includes('name="google-adsense-account" content="ca-pub-3399213817491318"'))errors.push(route+": Google AdSense account marker missing");
  const adsenseLoadCount=(html.match(/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-3399213817491318/g)||[]).length;
  if(origin && adsenseLoadCount!==1)errors.push(route+": expected one production AdSense script, found "+adsenseLoadCount);
  if(!origin && adsenseLoadCount!==0)errors.push(route+": AdSense must not load on unconfigured staging builds");
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
const indexNowFile=path.join(output,INDEXNOW_KEY+".txt");
if(!fs.existsSync(indexNowFile) || fs.readFileSync(indexNowFile,"utf8").trim()!==INDEXNOW_KEY)
  errors.push("IndexNow public ownership file missing or mismatched in build output");
const adsTxt=path.join(output,"ads.txt");
if(!fs.existsSync(adsTxt))errors.push("ads.txt missing");
else if(read("ads.txt").trim()!=="google.com, pub-3399213817491318, DIRECT, f08c47fec0942fa0")errors.push("ads.txt must contain the exact authorized Google publisher record");
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
