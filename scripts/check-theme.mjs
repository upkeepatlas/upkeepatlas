import fs from "node:fs";
import path from "node:path";
import {PUBLIC_ROUTES} from "../src/lib/routes.mjs";

const errors=[];
const root=path.resolve("dist");
const styles=path.join(root,"_astro");
if(!fs.existsSync(root))throw new Error("Run npm run build before the theme audit.");

for(const route of PUBLIC_ROUTES){
  const file=path.join(root,route,"index.html");
  if(!fs.existsSync(file)){errors.push(route+": generated HTML missing");continue;}
  const html=fs.readFileSync(file,"utf8");
  if((html.match(/data-theme-toggle/g)||[]).length!==1)errors.push(route+": expected one accessible theme button");
  if(!html.includes('upkeepatlas-theme') || !html.includes("prefers-color-scheme: dark"))errors.push(route+": missing early appearance preference bootstrap");
  if(!html.includes('meta name="theme-color"'))errors.push(route+": missing browser bar theme metadata");
  if(!html.includes('aria-label="Switch to night mode"'))errors.push(route+": missing accessible initial theme label");
}
const css=fs.existsSync(styles)?fs.readdirSync(styles).filter(name=>name.endsWith(".css"))
  .map(name=>fs.readFileSync(path.join(styles,name),"utf8")).join("\n"):"";
if(!/data-theme=['"]?dark['"]?/.test(css))errors.push("dark palette selector missing from generated CSS");
if(!/color-scheme:\s*dark/.test(css))errors.push("native dark form control styling missing");
if(!css.includes("theme-toggle"))errors.push("theme toggle styling missing");
if(!css.includes("@media print"))errors.push("light print fallback missing");
console.log("Night mode output audit:",PUBLIC_ROUTES.length,"HTML pages");
if(errors.length){errors.forEach(error=>console.error("FAIL",error));process.exitCode=1;}
else console.log("PASS: early theme bootstrap, single accessible toggle, dark surfaces and print styles.");
