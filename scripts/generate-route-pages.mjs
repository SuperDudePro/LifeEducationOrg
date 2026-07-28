import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sitemapPath = path.join(rootDir, "public", "sitemap.xml");
const distDir = path.join(rootDir, "dist");
const indexPath = path.join(distDir, "index.html");
const canonicalHost = "https://www.lifeeducation.org";
const routeMetadata = new Map([
  ["/ask", {
    title: "Ask LifeEducation | Questions About the Framework",
    description: "Ask questions about the LifeEducation Floor, Domains, purpose, and public framework, with source-backed answers.",
  }],
]);

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

for (const route of routes) {
  const relativePath = route.replace(/^\/+/, "");
  const routeDir = path.join(distDir, relativePath);
  const canonicalUrl = `${canonicalHost}${route}`;
  let routeHtml = indexHtml
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`);

  const metadata = routeMetadata.get(route);
  if (metadata) {
    const jsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${canonicalHost}/#organization`,
          name: "LifeEducation.org",
          url: `${canonicalHost}/`,
        },
        {
          "@type": "WebSite",
          "@id": `${canonicalHost}/#website`,
          url: `${canonicalHost}/`,
          name: "LifeEducation.org",
          publisher: { "@id": `${canonicalHost}/#organization` },
        },
        {
          "@type": "WebPage",
          "@id": `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: metadata.title,
          description: metadata.description,
          isPartOf: { "@id": `${canonicalHost}/#website` },
        },
      ],
    });
    routeHtml = routeHtml
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${metadata.title}</title>`)
      .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${metadata.description}" />`)
      .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${metadata.title}" />`)
      .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${metadata.description}" />`)
      .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${metadata.title}" />`)
      .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${metadata.description}" />`)
      .replace(
        /<script type="application\/ld\+json" data-site-jsonld>[\s\S]*?<\/script>/,
        `<script type="application/ld+json" data-site-jsonld>${jsonLd}</script>`,
      );
  }

  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), routeHtml, "utf8");
}

console.log(`Generated static entry pages for ${routes.size} public routes.`);
