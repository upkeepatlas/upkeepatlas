import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ledgerPath = path.join(root, "docs/production/assets.csv");
const columns = ["task_id","target_path","asset_kind","originating_url","creator","license_name","license_url","attribution_text","changes_made","accessed_date","factual_or_illustrative","width","height","byte_count","rights_check"];
const issues = [];
function csvRows(source) {
  const rows = []; let row = [], field = "", quoted = false;
  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    if (quoted) {
      if (ch === '"' && source[i+1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') { if (field) throw Error("Unexpected quote"); quoted = true; }
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n") { row.push(field.replace(/\r$/, "")); rows.push(row); row=[]; field=""; }
    else field += ch;
  }
  if (quoted) throw Error("Unclosed CSV quote");
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}
function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry => {
    const name = path.join(dir,entry.name);
    return entry.isDirectory() ? walk(name) : entry.isFile() ? [name] : [];
  });
}
function check({ledger = ledgerPath, publicDir = path.join(root,"public"), distDir = path.join(root,"dist")} = {}) {
  const errors = [];
  const rows = csvRows(fs.readFileSync(ledger,"utf8"));
  if (JSON.stringify(rows.shift()) !== JSON.stringify(columns)) errors.push("Asset ledger header does not match contract");
  const registered = new Set();
  for (const [i, row] of rows.entries()) {
    if (row.length !== columns.length) { errors.push("CSV row "+(i+2)+": expected "+columns.length+" fields"); continue; }
    const entry = Object.fromEntries(columns.map((key,j)=>[key,row[j].trim()]));
    const name = entry.target_path;
    if (!name.startsWith("public/assets/") || name.includes("..") || name.includes("\\")) errors.push("Row "+(i+2)+": unsafe asset path "+name);
    if (registered.has(name)) errors.push("Duplicate asset ledger entry "+name);
    registered.add(name);
    const file = path.resolve(root,name);
    if (!fs.existsSync(file)) { errors.push("Missing asset "+name); continue; }
    if (!entry.task_id || !entry.creator || !entry.license_name || !entry.originating_url || !entry.accessed_date || !entry.rights_check) errors.push("Incomplete rights evidence "+name);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.accessed_date)) errors.push("Invalid access date "+name);
    if (!["original","verified"].includes(entry.rights_check.toLowerCase())) errors.push("Rights must be original or verified "+name);
    if (entry.rights_check.toLowerCase() === "verified" && (!/^https:\/\//.test(entry.license_url) || !/^https:\/\//.test(entry.originating_url))) errors.push("Third-party asset needs source and license URLs "+name);
    for (const dim of ["width","height"]) if (!Number.isSafeInteger(Number(entry[dim])) || Number(entry[dim]) <= 0) errors.push("Invalid "+dim+" "+name);
    if (Number(entry.byte_count) !== fs.statSync(file).size) errors.push("Byte count mismatch "+name);
  }
  for (const file of walk(path.join(publicDir,"assets"))) {
    if (!/\.(svg|png|jpe?g|webp|avif|gif)$/i.test(file)) continue;
    const rel = path.relative(root,file).split(path.sep).join("/");
    if (!registered.has(rel)) errors.push("Unregistered media asset "+rel);
  }
  if (fs.existsSync(distDir)) for (const file of walk(distDir).filter(f=>f.endsWith(".html"))) {
    const html = fs.readFileSync(file,"utf8");
    for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
      const tag = match[0];
      const alt = tag.match(/\balt="([^"]*)"/i);
      if (!alt) errors.push(file+": image missing alt");
      if (!/\bwidth="\d+"/i.test(tag) || !/\bheight="\d+"/i.test(tag)) errors.push(file+": image missing intrinsic dimensions");
      const src = tag.match(/\bsrc="([^"]+)"/i)?.[1];
      if (src?.startsWith("/assets/") && !registered.has("public"+src)) errors.push(file+": image not in rights ledger "+src);
    }
  }
  return errors;
}
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  const errors = check();
  for (const error of errors) console.error("MEDIA FAIL:",error);
  if (errors.length) process.exitCode = 1;
  else console.log("PASS: media ledger, rights evidence, public asset inventory and rendered image alt/dimensions");
}
export { csvRows, check };
