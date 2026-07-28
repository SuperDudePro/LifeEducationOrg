import assert from "node:assert/strict";
import test from "node:test";
import { selectIndexNowRoutes, urlsForSelection } from "../scripts/indexnow-routing.mjs";

const sitemap = [
  "https://www.lifeeducation.org/",
  "https://www.lifeeducation.org/why",
  "https://www.lifeeducation.org/floor",
  "https://www.lifeeducation.org/domains",
  "https://www.lifeeducation.org/posts",
  "https://www.lifeeducation.org/posts/example-post",
  "https://www.lifeeducation.org/domains/communication",
];

test("manual runs and uncertain commit ranges safely select the full sitemap", () => {
  assert.equal(selectIndexNowRoutes([], "workflow_dispatch").mode, "full");
  assert.equal(selectIndexNowRoutes(null, "push").mode, "full");
});

test("a changed post selects the post, listing, and homepage", () => {
  const selection = selectIndexNowRoutes([
    "src/content/posts/example-post/index.tsx",
    "src/content/posts/example-post/images/hero-image.webp",
  ]);
  assert.deepEqual(urlsForSelection(sitemap, selection), [
    "https://www.lifeeducation.org/",
    "https://www.lifeeducation.org/posts",
    "https://www.lifeeducation.org/posts/example-post",
  ]);
});

test("a static-page change selects only its corresponding public route", () => {
  const selection = selectIndexNowRoutes(["src/pages/WhyPage.tsx"]);
  assert.deepEqual(urlsForSelection(sitemap, selection), [
    "https://www.lifeeducation.org/why",
  ]);
});

test("domain data selects the homepage, domains listing, and domain detail routes", () => {
  const selection = selectIndexNowRoutes(["src/data/domainsData.ts"]);
  assert.deepEqual(urlsForSelection(sitemap, selection), [
    "https://www.lifeeducation.org/",
    "https://www.lifeeducation.org/domains",
    "https://www.lifeeducation.org/domains/communication",
  ]);
});

test("Ask, API, workflow, test, and generated-file changes submit nothing", () => {
  const selection = selectIndexNowRoutes([
    "api/ask.js",
    "src/pages/AskPage.tsx",
    "src/styles/ask.css",
    "test/ask/api.test.mjs",
    ".github/workflows/indexnow.yml",
    "scripts/submit-indexnow.mjs",
    "public/deployment.json",
    "public/sitemap.xml",
  ]);
  assert.equal(selection.mode, "none");
  assert.deepEqual(urlsForSelection(sitemap, selection), []);
});

test("shared public UI changes select the full sitemap", () => {
  const selection = selectIndexNowRoutes(["src/components/SiteNav.tsx"]);
  assert.equal(selection.mode, "full");
  assert.deepEqual(urlsForSelection(sitemap, selection), sitemap);
});
