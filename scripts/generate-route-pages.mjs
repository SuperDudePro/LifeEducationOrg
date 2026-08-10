import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

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
const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);

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

function escapeHtml(value) {
  return String(value)
    .replace(/&(?!#\d+;|#x[0-9a-f]+;|[a-z][a-z0-9]+;)/gi, "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function replaceMetadata(html, name, value, attribute = "name") {
  const pattern = new RegExp(`<meta ${attribute}="${name}" content="[^"]*" \\/>`);
  return html.replace(pattern, `<meta ${attribute}="${name}" content="${escapeAttribute(value)}" />`);
}

function unwrap(node) {
  let current = node;
  while (current && (ts.isParenthesizedExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current))) {
    current = current.expression;
  }
  return current;
}

function jsxAttributeValue(attribute) {
  if (!attribute.initializer) return true;
  if (ts.isStringLiteral(attribute.initializer)) return attribute.initializer.text;
  if (!ts.isJsxExpression(attribute.initializer)) return undefined;
  const expression = unwrap(attribute.initializer.expression);
  if (!expression) return undefined;
  if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) return expression.text;
  if (ts.isNumericLiteral(expression)) return expression.text;
  if (expression.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (expression.kind === ts.SyntaxKind.FalseKeyword) return false;
  return undefined;
}

function renderAttributes(attributes, sourceFile) {
  const output = [];
  for (const property of attributes.properties) {
    if (!ts.isJsxAttribute(property)) continue;
    const rawName = property.name.getText(sourceFile);
    const name = rawName === "className" ? "class" : rawName;
    if (["src", "srcSet"].includes(name)) continue;
    const value = jsxAttributeValue(property);
    if (value === true) output.push(name);
    else if (value !== false && value !== undefined) output.push(`${name}="${escapeAttribute(value)}"`);
  }
  return output.length ? ` ${output.join(" ")}` : "";
}

function renderJsxNode(node, sourceFile) {
  if (ts.isJsxText(node)) return escapeHtml(node.text.replace(/\s+/g, " "));
  if (ts.isJsxExpression(node)) {
    const expression = unwrap(node.expression);
    if (!expression) return "";
    if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) return escapeHtml(expression.text);
    if (ts.isNumericLiteral(expression)) return expression.text;
    return "";
  }
  if (ts.isJsxFragment(node)) return node.children.map((child) => renderJsxNode(child, sourceFile)).join("");
  if (ts.isJsxElement(node)) {
    const tag = node.openingElement.tagName.getText(sourceFile);
    if (!/^[a-z][a-z0-9-]*$/.test(tag)) return "";
    const attributes = renderAttributes(node.openingElement.attributes, sourceFile);
    const children = node.children.map((child) => renderJsxNode(child, sourceFile)).join("");
    return `<${tag}${attributes}>${children}</${tag}>`;
  }
  if (ts.isJsxSelfClosingElement(node)) {
    const tag = node.tagName.getText(sourceFile);
    if (!/^[a-z][a-z0-9-]*$/.test(tag)) return "";
    const attributes = renderAttributes(node.attributes, sourceFile);
    return voidTags.has(tag) ? `<${tag}${attributes}>` : `<${tag}${attributes}></${tag}>`;
  }
  return "";
}

function objectStringProperty(node, name, sourceFile) {
  if (!ts.isObjectLiteralExpression(node)) return undefined;
  for (const property of node.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    const key = property.name.getText(sourceFile).replace(/^['"]|['"]$/g, "");
    if (key !== name) continue;
    const value = unwrap(property.initializer);
    if (value && (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value))) return value.text;
  }
  return undefined;
}

function renderParagraphBlockArrays(initializers, sourceFile) {
  let best = "";
  for (const initializer of initializers.values()) {
    const array = unwrap(initializer);
    if (!array || !ts.isArrayLiteralExpression(array)) continue;
    const paragraphs = [];
    for (const element of array.elements) {
      const item = unwrap(element);
      if (!item || !ts.isObjectLiteralExpression(item)) continue;
      if (objectStringProperty(item, "type", sourceFile) !== "paragraph") continue;
      const text = objectStringProperty(item, "text", sourceFile);
      if (text) paragraphs.push(`<p>${escapeHtml(text)}</p>`);
    }
    const rendered = paragraphs.join("");
    if (rendered.length > best.length) best = rendered;
  }
  return best;
}

function extractPostBody(source, filename) {
  const sourceFile = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const parseErrors = sourceFile.parseDiagnostics.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
  if (parseErrors.length) throw new Error(`Could not parse ${filename}: ${parseErrors.join("; ")}`);

  const initializers = new Map();
  let bodyNode;
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name)) continue;
      initializers.set(declaration.name.text, declaration.initializer);
      if (declaration.name.text !== "post") continue;
      const initializer = unwrap(declaration.initializer);
      if (!initializer || !ts.isObjectLiteralExpression(initializer)) continue;
      for (const property of initializer.properties) {
        if (!ts.isPropertyAssignment(property) || property.name.getText(sourceFile) !== "body") continue;
        bodyNode = unwrap(property.initializer);
      }
    }
  }
  if (!bodyNode) throw new Error(`Could not read post body from ${filename}.`);
  if (ts.isIdentifier(bodyNode) && initializers.has(bodyNode.text)) bodyNode = unwrap(initializers.get(bodyNode.text));

  const rendered = bodyNode ? renderJsxNode(bodyNode, sourceFile).trim() : "";
  const renderedText = rendered.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (renderedText.length >= 200) return rendered;

  const blockFallback = renderParagraphBlockArrays(initializers, sourceFile);
  if (blockFallback) return blockFallback;
  return rendered;
}

function staticPostArticle(metadata) {
  const publishedAt = metadata.article.publishedAt;
  return [
    "<main data-static-post-shell>",
    "<article data-static-post>",
    `<header><h1>${escapeHtml(metadata.article.title)}</h1><p>${escapeHtml(metadata.description)}</p><p><time datetime="${escapeAttribute(publishedAt)}">${escapeHtml(publishedAt)}</time></p></header>`,
    `<div data-static-post-body>${metadata.article.bodyHtml}</div>`,
    "</article>",
    "</main>",
  ].join("");
}

const [sitemap, indexHtml, postEntries] = await Promise.all([
  readFile(sitemapPath, "utf8"),
  readFile(indexPath, "utf8"),
  readdir(path.join(rootDir, "src", "content", "posts"), { withFileTypes: true }),
]);

for (const entry of postEntries.filter((item) => item.isDirectory())) {
  const postDir = path.join(rootDir, "src", "content", "posts", entry.name);
  const [source, bodySource] = await Promise.all([
    readFile(path.join(postDir, "meta.ts"), "utf8"),
    readFile(path.join(postDir, "index.tsx"), "utf8"),
  ]);
  const slug = extractField(source, "slug");
  routeMetadata.set(`/posts/${slug}`, {
    title: `${extractField(source, "title")} | LifeEducation.org`,
    description: extractField(source, "excerpt"),
    article: {
      title: extractField(source, "title"),
      publishedAt: extractField(source, "publishedAt"),
      topic: extractField(source, "topic"),
      bodyHtml: extractPostBody(bodySource, path.join(postDir, "index.tsx")),
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
    if (metadata.article) {
      routeHtml = routeHtml.replace(/<div id="root"><\/div>/, `<div id="root">${staticPostArticle(metadata)}</div>`);
    }
  }

  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), routeHtml, "utf8");
}

console.log(`Generated static entry pages for ${routes.size} public routes.`);
