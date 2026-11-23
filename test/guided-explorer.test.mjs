import { readFileSync, existsSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const explorer = readFileSync("src/components/GuidedExplorer.tsx", "utf8");
const home = readFileSync("src/pages/HomePage.tsx", "utf8");
const site = readFileSync("src/data/site.ts", "utf8");
const domainSource = readFileSync("src/data/domainsData.ts", "utf8");

test("homepage exposes a landmark and the existing navigation stays unchanged", () => {
  assert.match(home, /<GuidedExplorer \/>/);
  assert.match(explorer, /<section[^>]*aria-labelledby="guided-explorer-title"/);
  assert.match(explorer, /<h2 id="guided-explorer-title">/);
  assert.match(explorer, /<h3>\{journey.question\}<\/h3>/);
  assert.doesNotMatch(site, /guided.explorer/i, "do not change the existing global navigation");
});

test("every guided link resolves to an existing framework route or published post", () => {
  const hrefs = [...explorer.matchAll(/href: "(\/[^"]+)"/g)].map((match) => match[1]);
  assert.ok(hrefs.length >= 8, "expected several direct reading paths");
  assert.equal(new Set(hrefs).size, hrefs.length, "do not repeat destinations");
  const slugs = new Set([...domainSource.matchAll(/"slug": "([^"]+)"/g)].map((match) => match[1]));
  const knownPages = new Set(["/why", "/floor", "/by-18", "/domains"]);
  for (const href of hrefs) {
    if (href.startsWith("/domains/")) {
      assert.ok(slugs.has(href.slice("/domains/".length)), `missing domain: ${href}`);
    } else if (href.startsWith("/posts/")) {
      const path = `src/content/posts/${href.slice("/posts/".length)}/meta.ts`;
      assert.ok(existsSync(path), `missing article: ${href}`);
      const post = readFileSync(path, "utf8");
      assert.match(post, /status:\s*"(?!Draft|Coming Soon)[^"]+"/, `unpublished article: ${href}`);
    } else {
      assert.ok(knownPages.has(href), `unknown destination: ${href}`);
    }
  }
});

test("guided discovery is navigational, not a visitor assessment", () => {
  assert.doesNotMatch(explorer, /<form|<input|<select|<button|fetch\(|localStorage|sessionStorage/);
  assert.match(explorer, /<a key=\{link.href\} href=\{link.href\}>/);
});
