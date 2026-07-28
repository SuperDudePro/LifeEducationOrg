import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";

const BASE = "https://www.lifeeducation.org";

function getDateStamp(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const today = process.env.SITEMAP_LASTMOD ?? getDateStamp();

const staticPages = [
  { path: "/", freq: "weekly", pri: "1.0" },
  { path: "/why", freq: "monthly", pri: "0.8" },
  { path: "/floor", freq: "monthly", pri: "0.8" },
  { path: "/by-18", freq: "monthly", pri: "0.8" },
  { path: "/domains", freq: "monthly", pri: "0.8" },
  { path: "/posts", freq: "weekly", pri: "0.7" },
  { path: "/qa", freq: "monthly", pri: "0.7" },
  { path: "/ask", freq: "monthly", pri: "0.5" },
  { path: "/contact", freq: "monthly", pri: "0.6" },
];

function matchRequired(source, pattern, label) {
  const match = source.match(pattern);
  if (!match) {
    throw new Error(`Could not read ${label}`);
  }

  return match[1];
}

const domainSlugs = Array.from(
  readFileSync("src/data/domainsData.ts", "utf8").matchAll(/"slug": "([^"]+)"/g),
  (match) => match[1],
);

if (!domainSlugs.length) {
  throw new Error("No domain slugs found for sitemap generation.");
}

// Discover published posts from the content folder. `meta.ts` stays lightweight
// enough for this script to validate slugs without importing TSX post bodies.
const postDirs = readdirSync("src/content/posts", { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => {
    const metaSource = readFileSync(join("src/content/posts", d.name, "meta.ts"), "utf8");
    const slug = matchRequired(metaSource, /slug:\s*"([^"]+)"/, `${d.name} slug`);
    const status = matchRequired(metaSource, /status:\s*"([^"]+)"/, `${d.name} status`);

    if (slug !== d.name) {
      throw new Error(`Post folder "${d.name}" does not match metadata slug "${slug}".`);
    }

    return { slug, status };
  })
  .filter((post) => post.status !== "Draft" && post.status !== "Coming Soon")
  .map((post) => post.slug)
  .sort();

const urls = [
  ...staticPages.map((p) => ({ loc: BASE + p.path, freq: p.freq, pri: p.pri })),
  ...postDirs.map((slug) => ({ loc: `${BASE}/posts/${slug}`, freq: "monthly", pri: "0.6" })),
  ...domainSlugs.map((slug) => ({ loc: `${BASE}/domains/${slug}`, freq: "monthly", pri: "0.7" })),
];

const body = urls.map((u) =>
  `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.pri}</priority>\n  </url>`
).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
writeFileSync("public/sitemap.xml", xml);
console.log(`sitemap.xml written: ${urls.length} URLs`);
