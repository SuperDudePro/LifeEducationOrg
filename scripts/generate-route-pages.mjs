import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import ts from "typescript";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sitemapPath = path.join(rootDir, "public", "sitemap.xml");
const distDir = path.join(rootDir, "dist");
const indexPath = path.join(distDir, "index.html");
const canonicalHost = "https://www.lifeeducation.org";
const manifestDir = path.join(distDir, ".vite");
const manifestPath = path.join(manifestDir, "manifest.json");
// Vite's manifest maps each imported source image to its hashed built file.
const assetManifest = existsSync(manifestPath) ? JSON.parse(await readFile(manifestPath, "utf8")) : {};
const defaultShareImage = {
  url: `${canonicalHost}/lifeeducation_break_navigator.webp`,
  alt: "Young person navigating a foreign city with a map",
};
const { CORPUS } = await import(path.join(rootDir, "api", "ask", "corpus.generated.mjs"));
const floorPath = path.join(rootDir, "src", "data", "floorData.ts");
const FLOOR_DATA = loadDataExport(await readFile(floorPath, "utf8"), "FLOOR_DATA", floorPath);
const by18Path = path.join(rootDir, "src", "data", "by18Data.ts");
const BY18_DATA = loadDataExport(await readFile(by18Path, "utf8"), "BY18_DATA", by18Path);
const domainsHubPath = path.join(rootDir, "src", "data", "domainsHub.ts");
const DOMAINS_HUB = loadDataExport(await readFile(domainsHubPath, "utf8"), "DOMAINS_HUB", domainsHubPath);
const routeMetadata = new Map([
  ["/why", {
    title: "Why LifeEducation.org Exists | LifeEducation.org",
    description: "The founding statement for LifeEducation: not anti-education, but anti school-as-default-authority, with real capability as the standard.",
  }],
  ["/floor", {
    title: FLOOR_DATA.seoTitle,
    description: FLOOR_DATA.seoDescription,
  }],
  ["/by-18", {
    title: BY18_DATA.seoTitle,
    description: BY18_DATA.seoDescription,
  }],
  ["/domains", {
    title: DOMAINS_HUB.seoTitle,
    description: DOMAINS_HUB.seoDescription,
  }],
  ["/posts", {
    title: "Posts | LifeEducation.org",
    description: "Field notes and essays on school legitimacy, the Floor, the Domains, and building LifeEducation in real life.",
  }],
  ["/qa", {
    title: "LifeEducation Q&A | LifeEducation.org",
    description: "Plain answers to common questions and objections, including the distinction between education, schooling, and school-as-default-authority.",
  }],
  ["/contact", {
    title: "Contact | LifeEducation.org",
    description: "Send questions, corrections, objections, examples, or serious feedback about LifeEducation.",
  }],
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

function optionalField(source, field) {
  try {
    return extractField(source, field);
  } catch {
    return undefined;
  }
}

function postShareImage(source, postDir) {
  for (const [imageField, altField] of [["cardImage", "cardAlt"], ["heroImage", "heroAlt"]]) {
    const identifier = source.match(new RegExp(`\\b${imageField}:\\s*([A-Za-z_$][\\w$]*)`))?.[1];
    const importPath = identifier && source.match(new RegExp(`import\\s+${identifier}\\s+from\\s+["']\\./([^"']+)["']`))?.[1];
    if (!importPath) continue;
    const sourceKey = path.relative(rootDir, path.join(postDir, importPath)).split(path.sep).join("/");
    const built = assetManifest[sourceKey]?.file;
    if (built) return { url: `${canonicalHost}/${built}`, alt: optionalField(source, altField) ?? "" };
  }
  return undefined;
}

function loadDataExport(source, exportName, filename) {
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: filename,
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(compiled, { exports: module.exports, module }, { filename });
  return module.exports[exportName];
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

function addShareImage(html, image) {
  const tags = [
    `<meta property="og:image" content="${escapeAttribute(image.url)}" />`,
    ...(image.alt ? [`<meta property="og:image:alt" content="${escapeAttribute(image.alt)}" />`] : []),
    `<meta name="twitter:image" content="${escapeAttribute(image.url)}" />`,
    ...(image.alt ? [`<meta name="twitter:image:alt" content="${escapeAttribute(image.alt)}" />`] : []),
  ];
  return html.replace("</head>", `    ${tags.join("\n    ")}\n  </head>`);
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

const [sitemap, indexHtml, postEntries, domainSource] = await Promise.all([
  readFile(sitemapPath, "utf8"),
  readFile(indexPath, "utf8"),
  readdir(path.join(rootDir, "src", "content", "posts"), { withFileTypes: true }),
  readFile(path.join(rootDir, "src", "data", "domainsData.ts"), "utf8"),
]);

const awaitStaticSources = {
  floor: await readFile(path.join(rootDir, "src", "data", "floorByDomain.ts"), "utf8"),
  ages: await readFile(path.join(rootDir, "src", "data", "ageBandByDomain.ts"), "utf8"),
};
const domainCopyPath = path.join(rootDir, "src", "data", "domainPageCopy.ts");
const DOMAIN_PAGE_COPY = loadDataExport(await readFile(domainCopyPath, "utf8"), "DOMAIN_PAGE_COPY", domainCopyPath);

for (const match of domainSource.matchAll(/"slug": "([^"]+)"[\s\S]*?"title": "([^"]+)"[\s\S]*?"number": "([^"]+)"/g)) {
  const [, slug, title, number] = match;
  routeMetadata.set(`/domains/${slug}`, {
    title: `${DOMAIN_PAGE_COPY[slug]?.seoTitle ?? title} | LifeEducation.org`,
    description: DOMAIN_PAGE_COPY[slug]?.description ?? `LifeEducation Domain ${number}: ${title}.`,
    intro: DOMAIN_PAGE_COPY[slug]?.intro,
    scope: DOMAIN_PAGE_COPY[slug]?.scope,
    domainNumber: number,
  });
}

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
      modifiedAt: optionalField(source, "modifiedAt"),
      status: optionalField(source, "status"),
      image: postShareImage(source, postDir),
      bodyHtml: extractPostBody(bodySource, path.join(postDir, "index.tsx")),
    },
  });
}

const qaPath = path.join(rootDir, "src", "data", "qaData.ts");
const qaData = loadDataExport(await readFile(qaPath, "utf8"), "QA_DATA", qaPath);
const faqEntities = (qaData?.sections ?? []).flatMap((section) => section.items.map((item) => ({
  "@type": "Question",
  name: item.question,
  acceptedAnswer: { "@type": "Answer", text: [item.answer].flat().join("\n\n") },
})));

// Non-post pages get a crawlable shell (heading, intro, site links, and public page text) that the app
// replaces on load, so crawlers that do not run JavaScript still see content and internal links.
const siteNavMarkup = `<nav aria-label="Site sections"><ul>${[
  ["/", "Home"], ["/why", "Why"], ["/floor", "The Floor"], ["/by-18", "By 18"], ["/domains", "The 10 Domains"],
  ["/posts", "Posts"], ["/qa", "Q&A"], ["/ask", "Ask LifeEducation"], ["/contact", "Contact"],
].map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`).join("")}</ul></nav>`;

function paragraphs(text) {
  return String(text).split(/\n+/).map((line) => line.trim()).filter(Boolean).map((line) => `<p>${escapeHtml(line)}</p>`).join("");
}

function corpusSections(chunks) {
  const sections = [];
  for (const chunk of chunks) {
    const heading = chunk.heading.replace(/ \(part \d+\)$/, "");
    const last = sections.at(-1);
    if (last?.heading === heading) last.text += `\n${chunk.text}`;
    else sections.push({ heading, text: chunk.text });
  }
  return sections.map(({ heading, text }) =>
    `<section>${heading === "Introduction" ? "" : `<h2>${escapeHtml(heading)}</h2>`}${paragraphs(text)}</section>`).join("");
}

function publishedPostLinks(limit) {
  const items = [...routeMetadata.entries()]
    .filter(([route, metadata]) => metadata.article && routes.has(route))
    .sort(([, a], [, b]) => b.article.publishedAt.localeCompare(a.article.publishedAt))
    .slice(0, limit);
  return `<ul>${items.map(([route, metadata]) => `<li><a href="${route}">${escapeHtml(metadata.article.title)}</a> <time datetime="${escapeAttribute(metadata.article.publishedAt)}">${escapeHtml(metadata.article.publishedAt)}</time><p>${escapeHtml(metadata.description)}</p></li>`).join("")}</ul>`;
}

function staticPageShell(route, metadata) {
  const heading = route === "/domains/literacy-communication" ? "Literacy & Communication" : route === "/" ? "LifeEducation.org" : route === "/domains" ? DOMAINS_HUB.heading : route === "/by-18" ? BY18_DATA.title : route === "/floor" ? FLOOR_DATA.title : metadata.title.replace(/ \| LifeEducation\.org$/, "");
  const sourceId = { "/why": "why", "/floor": "floor", "/by-18": "by-18", "/qa": "qa", "/domains": "domains" }[route];
  let body = "";
  if (route === "/") {
    body = `<h2>Latest field notes</h2>${publishedPostLinks(8)}`;
  } else if (route === "/posts") {
    body = publishedPostLinks();
  } else if (route === "/domains/literacy-communication") {
    const data = loadDataExport(domainSource, "DOMAINS", "src/data/domainsData.ts").find((d) => d.slug === "literacy-communication");
    const floorFile = path.join(rootDir, "src", "data", "floorByDomain.ts");
    const ageFile = path.join(rootDir, "src", "data", "ageBandByDomain.ts");
    const floor = loadDataExport(awaitStaticSources.floor, "FLOOR_BY_DOMAIN", floorFile).find((d) => d.number === "1");
    const ages = loadDataExport(awaitStaticSources.ages, "AGE_BAND_BY_DOMAIN", ageFile).find((d) => d.number === "1");
    const list = (values) => `<ul>${values.map((value) => `<li>${escapeHtml(value)}</li>`).join("")}</ul>`;
    const headings = [["floor", "The Floor"], ["map", "The Broader Map"], ["runway", "How It Builds"], ["essay", "The Essay"]];
    const essay = [...routeMetadata.entries()].find(([url]) => /^\/posts\/domain-1-/.test(url));
    body = `<section><h2>Communication Skills That Matter in Adult Life</h2><p>${escapeHtml(metadata.scope)}</p><p><a href="/by-18">What young adults should be able to do by 18</a> · <a href="/floor#floor-domain-1">The formal Floor: Domain 1</a></p></section>`
      + `<nav aria-label="On this page">${headings.filter(([id]) => id !== "essay" || essay).map(([id, title]) => `<a href="#${id}">${escapeHtml(title)}</a>`).join(" · ")}</nav>`
      + `<section id="floor"><h2>The Floor for This Domain</h2><p>The non-negotiable minimum. This is the contract, not the menu — what a floor-complete 18-year-old must actually be able to do.</p>${list(floor.canDo)}<h3>Not on the Floor</h3>${list(floor.notOnFloor)}</section>`
      + `<section id="map"><h2>The Broader Map</h2><p>The fuller landscape this domain engages over time. Inclusion here does not by itself make a competency mandatory.</p><h3>Core Outcomes</h3>${list(data.coreOutcomes)}<h3>Key Competencies</h3>${list(data.competencies)}<h3>Evidence Examples</h3><p>${escapeHtml(data.evidence)}</p></section>`
      + `<section id="runway"><h2>How It Builds</h2><p>${escapeHtml(ages.runwayNote)}</p><p>Written for adults: developmental signals are prompts to investigate, not diagnoses or verdicts.</p>${ages.bands.map((band) => `<section><h3>${escapeHtml(band.band)}</h3><h4>On track</h4>${list(band.onTrack)}<h4>Worth investigating</h4>${list(band.redFlags)}<p>What's building: ${escapeHtml(band.building)}</p></section>`).join("")}</section>`
      + (essay ? `<section id="essay"><h2>The Essay</h2><p><a href="${escapeAttribute(essay[0])}">${escapeHtml(essay[1].article?.title ?? "Read the Domain 1 essay")}</a></p></section>` : "");
  } else if (route.startsWith("/domains/")) {
    const number = metadata.domainNumber;
    body = `${metadata.scope ? `<section><h2>What this capability includes</h2><p>${escapeHtml(metadata.scope)}</p><p><a href="/by-18">What young adults should be able to do by 18</a> · <a href="/floor">The formal Floor</a></p></section>` : ""}${corpusSections(CORPUS.filter((chunk) => chunk.sourceId === "domains" && chunk.heading.startsWith(`Domain ${number}:`)))}`;
  } else if (sourceId) {
    if (route === "/floor") {
      const domainSlugs = loadDataExport(domainSource, "DOMAINS", "src/data/domainsData.ts");
      const markup = (block) => {
        if (block.type === "paragraph") return `<p>${escapeHtml(block.text)}</p>`;
        if (block.type === "list") return `<ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
        const match = block.text.match(/^Domain (\d+) — /);
        if (match) {
          const domain = domainSlugs.find((d) => d.number === match[1]);
          return `<h3 id="floor-domain-${match[1]}">${escapeHtml(block.text)}</h3>${domain ? `<p><a href="/domains/${escapeAttribute(domain.slug)}">Explore ${escapeHtml(domain.title)}</a></p>` : ""}`;
        }
        return block.level >= 3 ? `<h4>${escapeHtml(block.text)}</h4>` : `<h3>${escapeHtml(block.text)}</h3>`;
      };
      body = `<p>${escapeHtml(FLOOR_DATA.intro[0])}</p><p><a href="/by-18">By 18: What You Can Do</a></p>`
        + `<nav aria-label="On this page"><ol>${FLOOR_DATA.sections.map((section) => `<li><a href="#${escapeAttribute(section.id)}">${escapeHtml(section.heading)}</a></li>`).join("")}</ol></nav>`
        + FLOOR_DATA.sections.map((section) => `<section id="${escapeAttribute(section.id)}"><h2>${escapeHtml(section.heading)}</h2>${section.id === "domain-floor-capabilities" ? `<nav aria-label="Jump to a Floor domain">${domainSlugs.map((d) => `<a href="#floor-domain-${escapeAttribute(d.number)}">${escapeHtml(d.number)}. ${escapeHtml(d.title)}</a> · `).join("")}</nav>` : ""}${section.blocks.map(markup).join("")}</section>`).join("")
        + `<section><p>For the plain-language adulthood target, <a href="/by-18">read By 18</a>. For the broader map, <a href="/domains">explore the 10 Domains</a>.</p></section>`;
    } else     if (route === "/by-18") {
      const stripCodes = (text) => text.replace(/\s*\(D\d+(?:, D\d+)*\)$/, "");
      const relatedSlugs = [["life-skills-project-execution", "social-studies-civics"], ["literacy-communication", "philosophy-ethics"], ["scientific-thinking-observation", "mathematics-logic"], ["social-studies-civics"], ["economics-finance"], ["health-physical-development"], ["technology-media-ai-literacy"], ["creative-expression"], ["philosophy-ethics"]];
      const domainNames = loadDataExport(domainSource, "DOMAINS", "src/data/domainsData.ts");
      body = `<section><h2>What this benchmark means</h2><p>${escapeHtml(BY18_DATA.thesis)}</p>${BY18_DATA.intro.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}</section>`
        + `<nav aria-label="Jump to capability areas"><h2>Explore the nine capability areas</h2><ol>${BY18_DATA.groups.map((group, i) => `<li><a href="#${["run-your-life", "communication-relationships", "thinking-evidence", "power-society", "money-value", "health", "technology", "making-creating", "ethics-values"][i]}">${escapeHtml(group.title)}</a></li>`).join("")}</ol></nav>`
        + BY18_DATA.groups.map((group, i) => `<section id="${["run-your-life", "communication-relationships", "thinking-evidence", "power-society", "money-value", "health", "technology", "making-creating", "ethics-values"][i]}"><h2>${escapeHtml(group.title)}</h2><ul>${group.items.map((item) => `<li>${escapeHtml(stripCodes(item))}</li>`).join("")}</ul><p>Explore related domains: ${relatedSlugs[i].map((slug) => { const domain = domainNames.find((d) => d.slug === slug); return `<a href="/domains/${escapeAttribute(slug)}">${escapeHtml(domain?.title ?? slug)}</a>`; }).join(" · ")}</p></section>`).join("")
        + `<section>${BY18_DATA.closing.map((p) => `<p>${escapeHtml(stripCodes(p))}</p>`).join("")}<p>The Floor is the minimum. <a href="/domains">Explore the 10 Domains</a> for the broader map of learning and possibility.</p><p><a href="/floor">Read the formal Floor</a></p></section>`;
    } else if (route === "/domains") {
      const domains = loadDataExport(domainSource, "DOMAINS", "src/data/domainsData.ts");
      body = `<section><h2>What this map covers</h2><p>${escapeHtml(DOMAINS_HUB.introduction)}</p><p>${escapeHtml(DOMAINS_HUB.distinction)}</p></section>`
        + `<section><h2>Start with the adulthood target</h2><p><a href="/by-18">What young adults should be able to do by 18</a> · <a href="/floor">The 18-Year-Old Floor</a></p></section>`
        + `<section><h2>The 10 Areas of Capability</h2><ol>${domains.map((domain) => `<li><a href="/domains/${escapeAttribute(domain.slug)}">${escapeHtml(domain.title)}</a><p>${escapeHtml(DOMAINS_HUB.cards[domain.slug])}</p></li>`).join("")}</ol></section>`;
    } else {
      body = corpusSections(CORPUS.filter((chunk) => chunk.sourceId === sourceId));
    }
  }
  return `<main data-static-page-shell><header><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(route === "/domains" ? DOMAINS_HUB.subtitle : route === "/by-18" ? BY18_DATA.subtitle : route === "/floor" ? FLOOR_DATA.subtitle : metadata.intro || metadata.description)}</p></header>${siteNavMarkup}${body}</main>`;
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
          ...(metadata.article.modifiedAt ? { dateModified: metadata.article.modifiedAt } : {}),
          ...(metadata.article.image ? { image: metadata.article.image.url } : {}),
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
        ...(route === "/qa" && faqEntities.length ? [{
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#faq`,
          url: canonicalUrl,
          mainEntity: faqEntities,
        }] : []),
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
    const shell = metadata.article ? staticPostArticle(metadata) : staticPageShell(route, metadata);
    routeHtml = routeHtml.replace(/<div id="root"><\/div>/, `<div id="root">${shell}</div>`);
  }
  routeHtml = addShareImage(routeHtml, metadata?.article?.image ?? defaultShareImage);

  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), routeHtml, "utf8");
}

// The home page is dist/index.html itself; give it the default share image and a crawlable shell last,
// after the other routes were built from the clean template.
await writeFile(indexPath, addShareImage(indexHtml, defaultShareImage).replace(/<div id="root"><\/div>/, `<div id="root">${staticPageShell("/", {
  title: "LifeEducation.org",
  description: "A lightweight operating system for raising capable, self-directed humans outside the default school script.",
})}</div>`), "utf8");

// The manifest is only a build input; do not deploy it.
await rm(manifestDir, { recursive: true, force: true });

console.log(`Generated static entry pages for ${routes.size} public routes plus the home page shell.`);
