#!/usr/bin/env node
/**
 * IndexNow notification script.
 * --check: locally validate the public key and canonical routes.
 * --dry-run: list changed canonical URLs without network requests.
 * --submit: wait for the exact production deploy, validate the LIVE key, POST to Bing.
 */
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { PUBLIC_ROUTES } from "../src/lib/routes.mjs";
import {
  INDEXNOW_KEY, INDEXNOW_KEY_PATH, INDEXNOW_ORIGIN, INDEXNOW_ENDPOINT,
  routesForChangedFiles, makeIndexNowPayload
} from "../src/lib/indexnow.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const keyFile = resolve(root, "public", INDEXNOW_KEY + ".txt");
const expectedSha = process.env.INDEXNOW_EXPECT_SHA?.trim() || "";
const forceAll = process.env.INDEXNOW_FORCE_ALL === "true";
const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

function git(args) {
  return execFileSync("git", args, {cwd:root, encoding:"utf8", stdio:["ignore","pipe","pipe"]}).trim();
}
function checkConfiguration() {
  if (!/^[A-Za-z0-9-]{8,128}$/.test(INDEXNOW_KEY)) throw Error("IndexNow key has an invalid format.");
  if (!existsSync(keyFile) || readFileSync(keyFile,"utf8").trim() !== INDEXNOW_KEY) {
    throw Error("Public IndexNow root key file missing or incorrect.");
  }
  const data = makeIndexNowPayload(PUBLIC_ROUTES);
  if (data.host !== "upkeepatlas.pages.dev" ||
      data.keyLocation !== INDEXNOW_ORIGIN + INDEXNOW_KEY_PATH) throw Error("IndexNow host/key mismatch.");

  const dist = resolve(root, "dist");
  const outputKey = resolve(dist, INDEXNOW_KEY + ".txt");
  if (existsSync(dist) && (!existsSync(outputKey) ||
       readFileSync(outputKey,"utf8").trim() !== INDEXNOW_KEY)) {
    throw Error("Built site is missing the IndexNow root key file.");
  }
  console.log("PASS: IndexNow ownership key and " + PUBLIC_ROUTES.length + " production routes.");
}
function getPreviousRoutes() {
  try {
    const source = git(["show", "HEAD^:src/lib/routes.mjs"]);
    return [...source.matchAll(/"((?:\/[a-z0-9-]+)*\/)"/g)].map(match => match[1]);
  } catch {
    return [];
  }
}
function getChangedRoutes() {
  if (forceAll) {
    console.log("Manual full-site submission explicitly requested.");
    return [...PUBLIC_ROUTES];
  }
  let files;
  try {
    files = git(["diff", "--name-only", "--diff-filter=ACMRTD", "HEAD^", "HEAD"])
      .split("\n").filter(Boolean);
  } catch {
    console.warn("No parent commit available: using all current URLs for initial setup.");
    return [...PUBLIC_ROUTES];
  }
  console.log("Changed source files: " + (files.length ? files.join(", ") : "none"));
  return routesForChangedFiles(files, PUBLIC_ROUTES, getPreviousRoutes());
}
async function awaitDeployedCommit(sha) {
  const url = INDEXNOW_ORIGIN + "/?indexnow-deploy=" + encodeURIComponent(sha);
  for (let attempt = 1; attempt <= 45; attempt++) {
    try {
      const response = await fetch(url, {headers: {"Cache-Control":"no-cache"}});
      if (response.ok && (await response.text()).includes('name="upkeepatlas-deploy-commit" content="' + sha + '"')) {
        console.log("Production HTML matches approved Git commit " + sha.slice(0,12));
        return;
      }
    } catch (error) {
      console.warn("Readiness check: " + (error instanceof Error ? error.message : String(error)));
    }
    if (attempt % 6 === 0) console.log("Waiting for the matching Cloudflare Pages deployment (" + attempt + "/45).");
    if (attempt !== 45) await sleep(10000);
  }
  throw Error("Matching production deployment not observed; did NOT submit any URLs.");
}
async function verifyLiveOwnershipKey() {
  const url = INDEXNOW_ORIGIN + INDEXNOW_KEY_PATH + "?verify=" + expectedSha;
  const response = await fetch(url, {headers: {"Cache-Control":"no-cache"}});
  if (!response.ok || (await response.text()).trim() !== INDEXNOW_KEY) {
    throw Error("Live IndexNow ownership key is inaccessible or incorrect; no URLs submitted.");
  }
  console.log("Verified live IndexNow key file at " + INDEXNOW_ORIGIN + INDEXNOW_KEY_PATH);
}
async function main() {
  const mode = process.argv[2] || "--check";
  if (!["--check","--dry-run","--submit"].includes(mode)) throw Error("Invalid mode: " + mode);
  checkConfiguration();
  if (mode === "--check") return;
  const routes = getChangedRoutes();
  if (routes.length === 0) {
    console.log("No published page content changed. Skipping IndexNow notification.");
    return;
  }
  const payload = makeIndexNowPayload(routes);
  console.log("Selected " + payload.urlList.length + " canonical URLs:\n" + payload.urlList.join("\n"));
  if (mode === "--dry-run") return;

  if (!/^[a-f0-9]{40}$/.test(expectedSha)) {
    throw Error("INDEXNOW_EXPECT_SHA must be the 40-character production commit hash.");
  }
  await awaitDeployedCommit(expectedSha);
  await verifyLiveOwnershipKey();
  const response = await fetch(INDEXNOW_ENDPOINT, {
    method:"POST",
    headers:{"Content-Type":"application/json; charset=utf-8"},
    body:JSON.stringify(payload),
  });
  const responseBody = (await response.text()).slice(0,1000);
  if (response.status !== 200 && response.status !== 202) {
    throw Error("Bing IndexNow HTTP " + response.status + ": " + responseBody);
  }
  console.log("Bing IndexNow HTTP " + response.status + ": received " + payload.urlList.length +
    " URL notifications" + (response.status === 202 ? " (verification pending)" : "") +
    ". Receipt does NOT guarantee crawling or indexing.");
}
main().catch(error => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode=1;
});
