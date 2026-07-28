import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sitemapPath = path.join(rootDir, "public", "sitemap.xml");
const distDir = path.join(rootDir, "dist");
const indexPath = path.join(distDir, "index.html");
const canonicalHost = "https://www.lifeeducation.org";
const hiddenRoutes = new Set(["/ask"]);

const [sitemap, indexHtml] = await Promise.all([
  readFile(sitemapPath, "utf8"),
  readFile(indexPath, "utf8"),
]);

const routes = new Set();
const locationPattern = /<loc>https?:\/\/[^/]+([^<]*)<\/loc>/gi;
let match;

while ((match = locationPattern.exec(sitemap)) !== null) {
  const pathname = decodeURIComponent(match[1] || "/").replace(/\/+$/, "") || "/";
  if (pathname !== "/") routes.add(pathname);
}

for (const route of new Set([...routes, ...hiddenRoutes])) {
  const relativePath = route.replace(/^\/+/, "");
  const routeDir = path.join(distDir, relativePath);
  const canonicalUrl = `${canonicalHost}${route}`;
  let routeHtml = indexHtml
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`);

  if (hiddenRoutes.has(route)) {
    routeHtml = routeHtml
      .replace(/<script type="application\/ld\+json" data-site-jsonld>[\s\S]*?<\/script>/, "")
      .replace(/<title>[\s\S]*?<\/title>/, "<title>Ask LifeEducation | Private Beta</title>")
      .replace(
        /<meta name="description" content="[^"]*" \/>/,
        '<meta name="description" content="A source-grounded private beta for questions about the current LifeEducation materials." />',
      )
      .replace("</head>", '    <meta name="robots" content="noindex, nofollow" />\n  </head>');
  }

  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), routeHtml, "utf8");
}

console.log(`Generated static entry pages for ${routes.size} public routes and ${hiddenRoutes.size} hidden route.`);
