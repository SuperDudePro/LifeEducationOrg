import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';

const ORIGIN = 'https://www.lifeeducation.org';
const ROOT = process.cwd();
const PUBLIC = resolve('public');
const DIST = resolve('dist');
const errors = [];
const assetExts = new Set(['.avif', '.css', '.gif', '.html', '.ico', '.jpeg', '.jpg', '.json', '.pdf', '.png', '.svg', '.txt', '.webp', '.xml', '.zip']);
const sourceExts = new Set(['.css', '.html', '.js', '.jsx', '.md', '.mjs', '.ts', '.tsx']);

const rel = (path) => relative(ROOT, path).split(sep).join('/');
const fail = (source, target, reason) => errors.push(`${source}: ${target} — ${reason}`);
const normalizeRoute = (value) => {
  let path = decodeURI(value || '/').replace(/\\/g, '/').replace(/\/{2,}/g, '/');
  if (!path.startsWith('/')) path = `/${path}`;
  return path.length > 1 ? path.replace(/\/+$/, '') : path;
};

function walk(path) {
  if (!existsSync(path)) return [];
  if (statSync(path).isFile()) return [path];
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) =>
    ['node_modules', 'dist', '.git'].includes(entry.name) ? [] : walk(join(path, entry.name)),
  );
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|amp|quot|apos|lt|gt);/g, ' ')
    .replace(/&#(?:x[0-9a-f]+|\d+);/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const sitemapPath = resolve('public/sitemap.xml');
if (!existsSync(sitemapPath)) fail('public/sitemap.xml', '(missing)', 'sitemap was not generated');
const sitemap = existsSync(sitemapPath) ? readFileSync(sitemapPath, 'utf8') : '';
const locs = [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) => match[1].trim());
const routes = new Set();
for (const loc of locs) {
  try {
    const url = new URL(loc);
    if (url.origin !== ORIGIN) fail('public/sitemap.xml', loc, `wrong origin; expected ${ORIGIN}`);
    if (url.search || url.hash) fail('public/sitemap.xml', loc, 'sitemap URL contains a query or fragment');
    const route = normalizeRoute(url.pathname);
    if (routes.has(route)) fail('public/sitemap.xml', loc, 'duplicate normalized route');
    routes.add(route);
  } catch {
    fail('public/sitemap.xml', loc, 'invalid URL');
  }
}
if (!routes.size) fail('public/sitemap.xml', '<loc>', 'sitemap has no routes');
if (!routes.has('/ask')) fail('public/sitemap.xml', '/ask', 'public Ask route is absent from the sitemap');

for (const route of routes) {
  const html = route === '/' ? join(DIST, 'index.html') : join(DIST, ...route.slice(1).split('/'), 'index.html');
  if (!existsSync(html)) {
    fail(rel(html), route, 'sitemap route has no generated entry page');
    continue;
  }
  const routeHtml = readFileSync(html, 'utf8');
  const canonical = `${ORIGIN}${route === '/' ? '/' : route}`;
  if (!routeHtml.includes(`<link rel="canonical" href="${canonical}" />`)) {
    fail(rel(html), 'canonical', `expected ${canonical}`);
  }
  if (route.startsWith('/posts/')) {
    if (!/<title>.+ \| LifeEducation\.org<\/title>/.test(routeHtml)) {
      fail(rel(html), 'title', 'post route is missing its static post title');
    }
    if (!/<article\b[^>]*data-static-post/.test(routeHtml)) {
      fail(rel(html), 'static article', 'post route is missing crawler-readable article markup');
    }
    if (!/<h1>[^<]+<\/h1>/.test(routeHtml)) {
      fail(rel(html), 'static h1', 'post route is missing a crawler-readable H1');
    }
    const bodyMatch = routeHtml.match(/<div\b[^>]*data-static-post-body[^>]*>([\s\S]*?)<\/div>\s*<\/article>/i);
    const bodyText = bodyMatch ? visibleText(bodyMatch[1]) : '';
    if (bodyText.length < 200) {
      fail(rel(html), 'static body', `crawler-readable post body is too short (${bodyText.length} characters)`);
    }
    if (bodyMatch?.[1].includes('${')) {
      fail(rel(html), 'static body', 'crawler-readable post body contains unresolved template expressions');
    }
  }
}

const askHtmlPath = join(DIST, 'ask', 'index.html');
if (!existsSync(askHtmlPath)) {
  fail(rel(askHtmlPath), '/ask', 'public Ask route has no generated entry page');
} else {
  const askHtml = readFileSync(askHtmlPath, 'utf8');
  if (/<meta name="robots" content="noindex/i.test(askHtml)) {
    fail(rel(askHtmlPath), 'robots', 'public Ask route must be indexable');
  }
  if (!/<title>Ask LifeEducation \| Questions About the Framework<\/title>/.test(askHtml)) {
    fail(rel(askHtmlPath), 'title', 'public Ask route is missing its static search title');
  }
  if (!/data-site-jsonld/.test(askHtml) || !/"url":"https:\/\/www\.lifeeducation\.org\/ask"/.test(askHtml)) {
    fail(rel(askHtmlPath), 'structured data', 'public Ask route is missing route-specific JSON-LD');
  }
}

function validateTarget(source, raw) {
  const target = raw.trim();
  if (!target || target.startsWith('{') || target.includes('${') || target.startsWith('#') || /^(mailto|tel|data|blob):/i.test(target)) return;
  if (target.startsWith('//')) return fail(source, target, 'protocol-relative URL is not allowed');
  let path = target;
  if (/^https?:\/\//i.test(target)) {
    try {
      const url = new URL(target);
      if (url.origin !== ORIGIN) return;
      path = `${url.pathname}${url.search}${url.hash}`;
    } catch {
      return fail(source, target, 'malformed absolute URL');
    }
  }
  if (!path.startsWith('/')) return;
  const clean = path.split(/[?#]/)[0];
  if (clean.startsWith('/src/')) return;
  let decoded;
  try { decoded = decodeURI(clean); } catch { return fail(source, target, 'malformed percent encoding'); }
  const ext = extname(decoded).toLowerCase();
  if (ext && assetExts.has(ext)) {
    const asset = join(PUBLIC, ...normalizeRoute(decoded).slice(1).split('/'));
    if (!existsSync(asset)) fail(source, target, `missing public asset (${rel(asset)})`);
    return;
  }
  const route = normalizeRoute(decoded);
  if (!routes.has(route)) fail(source, target, 'internal route is absent from the sitemap');
}

const files = ['src', 'index.html'].flatMap((entry) => walk(resolve(entry))).filter((file) => sourceExts.has(extname(file).toLowerCase()));
const patterns = [
  /\b(?:href|src|poster|action|to)\s*=\s*["'`]([^"'`]+)["'`]/g,
  /\b(?:href|src|poster|action|to|png|pdf|image|cardImage|heroImage|url)\s*:\s*["'`]([^"'`]+)["'`]/g,
  /\b(?:href|src|poster|action|to)\s*=\s*\{\s*["'`]([^"'`]+)["'`]\s*\}/g,
];
for (const file of files) {
  const source = rel(file);
  const text = readFileSync(file, 'utf8');
  for (const pattern of patterns) for (const match of text.matchAll(pattern)) validateTarget(source, match[1]);
  for (const match of text.matchAll(/\bsrcSet\s*=\s*(?:\{\s*)?["'`]([^"'`]+)["'`]/g)) {
    for (const part of match[1].split(',')) validateTarget(source, part.trim().split(/\s+/)[0]);
  }
}

if (errors.length) {
  console.error(`Site validation failed with ${errors.length} problem${errors.length === 1 ? '' : 's'}:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Site validation passed: ${routes.size} sitemap routes checked.`);
