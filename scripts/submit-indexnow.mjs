import { execFileSync } from "node:child_process";
import { selectIndexNowRoutes, urlsForSelection } from "./indexnow-routing.mjs";

const siteUrl = (process.env.SITE_URL || "").replace(/\/$/, "");
const key = process.env.INDEXNOW_KEY || "";
const expectedCommit = process.env.DEPLOY_SHA || process.env.GITHUB_SHA || "";
const beforeCommit = process.env.BEFORE_SHA || "";
const eventName = process.env.EVENT_NAME || process.env.GITHUB_EVENT_NAME || "";

if (!siteUrl) throw new Error("SITE_URL is required.");
if (!key) throw new Error("INDEXNOW_KEY is required.");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function validCommit(value) {
  return /^[0-9a-f]{7,40}$/i.test(value) && !/^0+$/.test(value);
}

function changedFiles() {
  if (eventName === "workflow_dispatch") return [];
  if (!validCommit(beforeCommit) || !validCommit(expectedCommit)) return null;

  try {
    return execFileSync(
      "git",
      ["diff", "--name-only", "--diff-filter=ACDMRTUXB", beforeCommit, expectedCommit],
      { encoding: "utf8" },
    )
      .split(/\r?\n/)
      .map((file) => file.trim())
      .filter(Boolean);
  } catch (error) {
    console.log(`Could not calculate changed files: ${error.message}`);
    return null;
  }
}

async function waitForDeployment() {
  if (!expectedCommit) return;
  const markerUrl = `${siteUrl}/deployment.json`;
  for (let attempt = 1; attempt <= 30; attempt += 1) {
    try {
      const response = await fetch(`${markerUrl}?t=${Date.now()}`, {
        headers: { "cache-control": "no-cache" },
      });
      if (response.ok) {
        const marker = await response.json();
        if (marker.commit === expectedCommit) {
          console.log(`Confirmed production deployment ${expectedCommit}.`);
          return;
        }
      }
    } catch (error) {
      console.log(`Deployment check ${attempt} failed: ${error.message}`);
    }
    console.log(`Waiting for production deployment (${attempt}/30)...`);
    await sleep(10000);
  }
  throw new Error(`Production did not reach commit ${expectedCommit} within five minutes.`);
}

function parseSitemap(xml) {
  return Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g), (match) => match[1].trim());
}

const files = changedFiles();
const selection = selectIndexNowRoutes(files, eventName);

if (selection.mode === "none") {
  console.log("No changed public URLs require an IndexNow submission.");
  process.exit(0);
}

await waitForDeployment();

const sitemapResponse = await fetch(`${siteUrl}/sitemap.xml?t=${Date.now()}`, {
  headers: { "cache-control": "no-cache" },
});
if (!sitemapResponse.ok) {
  throw new Error(`Could not fetch sitemap: HTTP ${sitemapResponse.status}`);
}

const sitemapUrls = parseSitemap(await sitemapResponse.text());
if (!sitemapUrls.length) throw new Error("The sitemap contained no URLs.");

const urlList = urlsForSelection(sitemapUrls, selection);
if (!urlList.length) {
  console.log("Changed public routes are not in the production sitemap; nothing was submitted.");
  process.exit(0);
}
if (urlList.length > 10000) {
  throw new Error("IndexNow accepts at most 10,000 URLs per request.");
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(siteUrl).host,
    key,
    keyLocation: `${siteUrl}/${key}.txt`,
    urlList,
  }),
});

if (![200, 202].includes(response.status)) {
  throw new Error(`IndexNow rejected the submission: HTTP ${response.status} ${await response.text()}`);
}
console.log(`Submitted ${urlList.length} changed URLs to IndexNow. HTTP ${response.status}.`);
