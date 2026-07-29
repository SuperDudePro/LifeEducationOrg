import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
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

function decodeStringLiteral(value) {
  return value.replace(/\\(?:u\{([0-9a-f]+)\}|u([0-9a-f]{4})|x([0-9a-f]{2})|([\\'"bfnrtv0]))/gi, (match, codePoint, unicode, hex, escaped) => {
    if (codePoint) return String.fromCodePoint(Number.parseInt(codePoint, 16));
    if (unicode) return String.fromCharCode(Number.parseInt(unicode, 16));
    if (hex) return String.fromCharCode(Number.parseInt(hex, 16));
    return { "\\": "\\", "'": "'", '"': '"', b: "\b", f: "\f", n: "\n", r: "\r", t: "\t", v: "\v", 0: "\0" }[escaped] ?? match;
  });
}

function extractField(source, field) {
  const value = source.match(new RegExp(`${field}:\\s*(?:\\n\\s*)?(["'])((?:\\\\.|(?!\\1)[\\s\\S])*?)\\1,`))?.[2];
  if (value === undefined) throw new Error(`Could not read post ${field} for route metadata.`);
  return decodeStringLiteral(value).replace(/\s+/g, " ").trim();
}

function escapeAttribute(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function replaceMetadata(html, name, value, attribute = "name") {
  const pattern = new RegExp(`<meta ${attribute}="${name}" content="[^"]*" \\/>`);
  return html.replace(pattern, `<meta ${attribute}="${name}" content="${escapeAttribute(value)}" />`);
}

const [sitemap, indexHtml, postEntries] = await Promise.all([
  readFile(sitemapPath, "utf8"),
  readFile(indexPath, "utf8"),
  readdir(path.join(rootDir, "src", "content", "posts"), { withFileTypes: true }),
]);

for (const entry of postEntries.filter((item) => item.isDirectory())) {
  const source = await readFile(path.join(rootDir, "src", "content", "posts", entry.name, "meta.ts"), "utf8");
  const slug = extractField(source, "slug");
  routeMetadata.set(`/posts/${slug}`, {
    title: `${extractField(source, "title")} | LifeEducation.org`,
    description: extractField(source, "excerpt"),
    article: {
      title: extractField(source, "title"),
      publishedAt: extractField(source, "publishedAt"),
      topic: extractField(source, "topic"),
    },
  });
}

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
    const type = metadata.article ? "article" : "website";
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
        metadata.article ? {
          "@type": "Article",
          "@id": `${canonicalUrl}#article`,
          headline: metadata.article.title,
          description: metadata.description,
          url: canonicalUrl,
          mainEntityOfPage: canonicalUrl,
          datePublished: metadata.article.publishedAt,
          author: { "@type": "Person", name: "Will Gayhart" },
          publisher: { "@id": `${canonicalHost}/#organization` },
          isPartOf: { "@id": `${canonicalHost}/#website` },
          articleSection: metadata.article.topic,
        } : {
          "@type": "WebPage",
          "@id": `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: metadata.title,
          description: metadata.description,
          isPartOf: { "@id": `${canonicalHost}/#website` },
        },
      ],
    }).replaceAll("<", "\\u003c");
    routeHtml = routeHtml
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttribute(metadata.title)}</title>`);
    routeHtml = replaceMetadata(routeHtml, "description", metadata.description);
    routeHtml = replaceMetadata(routeHtml, "og:title", metadata.title, "property");
    routeHtml = replaceMetadata(routeHtml, "og:description", metadata.description, "property");
    routeHtml = replaceMetadata(routeHtml, "og:type", type, "property");
    routeHtml = replaceMetadata(routeHtml, "twitter:title", metadata.title);
    routeHtml = replaceMetadata(routeHtml, "twitter:description", metadata.description);
    routeHtml = routeHtml
      .replace(
        /<script type="application\/ld\+json" data-site-jsonld>[\s\S]*?<\/script>/,
        `<script type="application/ld+json" data-site-jsonld>${jsonLd}</script>`,
      );
  }

  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), routeHtml, "utf8");
}

console.log(`Generated static entry pages for ${routes.size} public routes.`);
