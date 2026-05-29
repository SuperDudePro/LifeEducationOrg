import { readdirSync, writeFileSync } from "fs";

const BASE = "https://lifeeducation.org";
const today = "2026-05-28";

const staticPages = [
  { path: "/", freq: "weekly", pri: "1.0" },
  { path: "/why", freq: "monthly", pri: "0.8" },
  { path: "/floor", freq: "monthly", pri: "0.8" },
  { path: "/by-18", freq: "monthly", pri: "0.8" },
  { path: "/domains", freq: "monthly", pri: "0.8" },
  { path: "/posts", freq: "weekly", pri: "0.7" },
  { path: "/qa", freq: "monthly", pri: "0.7" },
];

const domainSlugs = [
  "literacy-communication","mathematics-logic","scientific-thinking-observation",
  "social-studies-civics","philosophy-ethics","economics-finance",
  "health-physical-development","creative-expression","technology-media-ai-literacy",
  "life-skills-project-execution",
];

// Discover published posts from the content folder, excluding the coming-soon placeholder.
const postDirs = readdirSync("src/content/posts", { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== "coming-soon")
  .map((d) => d.name)
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
