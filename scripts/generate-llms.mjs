import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { APPROVED_SOURCES } from "../api/ask/source-manifest.mjs";

// Generates public/llms.txt (https://llmstxt.org) so AI tools get a plain index of the framework and posts.
const ROOT = process.cwd();
const ORIGIN = "https://www.lifeeducation.org";

function field(source, name) {
  const value = source.match(new RegExp(`${name}:\\s*(?:\\n\\s*)?(["'])((?:\\\\.|(?!\\1)[\\s\\S])*?)\\1,`))?.[2];
  return value === undefined ? undefined : value.replace(/\\(["'\\])/g, "$1").replace(/\s+/g, " ").trim();
}

const clean = (value) => String(value).replace(/\s+/g, " ").trim();
const link = (title, url, description) => `- [${clean(title).replace(/[[\]]/g, "")}](${url})${description ? `: ${clean(description)}` : ""}`;

const postsDir = path.join(ROOT, "src", "content", "posts");
const posts = readdirSync(postsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => readFileSync(path.join(postsDir, entry.name, "meta.ts"), "utf8"))
  .map((source) => ({
    slug: field(source, "slug"),
    title: field(source, "title"),
    excerpt: field(source, "excerpt"),
    publishedAt: field(source, "publishedAt") ?? "",
    status: field(source, "status"),
  }))
  .filter((post) => post.slug && post.title && post.status !== "Draft" && post.status !== "Coming Soon")
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

const domainSource = readFileSync(path.join(ROOT, "src", "data", "domainsData.ts"), "utf8");
const domains = [...domainSource.matchAll(/"slug": "([^"]+)"[\s\S]*?"title": "([^"]+)"[\s\S]*?"number": "([^"]+)"/g)]
  .map(([, slug, title, number]) => ({ slug, title, number }));

const lines = [
  "# LifeEducation.org",
  "",
  "> LifeEducation.org is a lightweight operating system for raising capable, self-directed humans outside the default school script. It defines a minimum adulthood capability contract (the 18-Year-Old Floor) and a broader ten-domain capability map.",
  "",
  "The core framework pages are authoritative; posts are supporting essays. Q&A answers common questions and objections.",
  "",
  "## Core framework",
  "",
  ...APPROVED_SOURCES.map((source) => link(source.title, source.publicUrl)),
  "",
  "## The 10 Domains",
  "",
  ...domains.map((domain) => link(`Domain ${domain.number}: ${domain.title}`, `${ORIGIN}/domains/${domain.slug}`)),
  "",
  "## Posts",
  "",
  ...posts.map((post) => link(post.title, `${ORIGIN}/posts/${post.slug}`, post.excerpt)),
  "",
  "## Other",
  "",
  link("Ask LifeEducation", `${ORIGIN}/ask`, "Source-backed answers about the public framework (beta)."),
  link("Contact", `${ORIGIN}/contact`),
  link("Sitemap", `${ORIGIN}/sitemap.xml`),
];

writeFileSync(path.join(ROOT, "public", "llms.txt"), `${lines.join("\n")}\n`);
console.log(`Generated public/llms.txt with ${posts.length} posts and ${domains.length} domains.`);
