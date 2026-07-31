import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { inspectImage } from './image-metadata.mjs';

const require = createRequire(import.meta.url);
const ts = require('typescript');

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const VALID_STATUSES = new Set(['Featured', 'Recent', 'Coming Soon', 'Draft']);
const REQUIRED_META_FIELDS = ['slug', 'title', 'excerpt', 'publishedAt', 'status', 'topic', 'tags', 'heroImage', 'heroAlt', 'cardImage', 'cardAlt'];
const CANONICAL_ORIGIN = 'https://www.lifeeducation.org';
const IMAGE_GEOMETRY = {
  card: { width: 960, height: 720 },
  hero: { width: 1600, height: 900 },
  body: { width: 1200, height: 900 },
};

function issue(ruleId, signature, message) {
  return { ruleId, signature, message };
}

function issueKey(value) {
  return `${value.ruleId}\u0000${value.signature}`;
}

function realIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function unwrap(node) {
  let current = node;
  while (current && (ts.isSatisfiesExpression(current) || ts.isAsExpression(current) || ts.isParenthesizedExpression(current))) {
    current = current.expression;
  }
  return current;
}

function staticValue(node) {
  const current = unwrap(node);
  if (!current) return undefined;
  if (ts.isStringLiteral(current) || ts.isNoSubstitutionTemplateLiteral(current)) return current.text;
  if (ts.isArrayLiteralExpression(current)) {
    const values = current.elements.map((element) => staticValue(element));
    return values.every((value) => typeof value === 'string') ? values : undefined;
  }
  return undefined;
}

function propertyName(node) {
  return ts.isIdentifier(node) || ts.isStringLiteral(node) ? node.text : undefined;
}

function parseImports(sourceFile) {
  const images = new Map();
  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    const moduleName = statement.moduleSpecifier.text;
    const identifier = statement.importClause?.name?.text;
    if (identifier && moduleName.startsWith('./images/') && IMAGE_EXTENSIONS.has(path.extname(moduleName).toLowerCase())) {
      images.set(identifier, moduleName.replace(/^\.\//, ''));
    }
  }
  return images;
}

function parseMetadata(source, filePath) {
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const errors = sourceFile.parseDiagnostics.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
  const imageImports = parseImports(sourceFile);
  const values = new Map();
  const identifiers = new Map();
  const fields = new Set();
  let object;
  let exported = false;

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    exported ||= statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) || false;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== 'metadata') continue;
      const initializer = unwrap(declaration.initializer);
      if (initializer && ts.isObjectLiteralExpression(initializer)) object = initializer;
    }
  }
  if (!object) errors.push('missing exported metadata object');
  if (!exported) errors.push('metadata object must be exported');
  if (object) {
    for (const property of object.properties) {
      if (ts.isPropertyAssignment(property)) {
        const name = propertyName(property.name);
        if (!name) continue;
        fields.add(name);
        const initializer = unwrap(property.initializer);
        values.set(name, staticValue(initializer));
        if (initializer && ts.isIdentifier(initializer)) identifiers.set(name, initializer.text);
      } else if (ts.isShorthandPropertyAssignment(property)) {
        const name = property.name.text;
        fields.add(name);
        identifiers.set(name, name);
      }
    }
  }
  return { errors, imageImports, values, identifiers, fields };
}

function jsxAttribute(opening, name) {
  const attribute = opening.attributes.properties.find(
    (candidate) => ts.isJsxAttribute(candidate) && candidate.name.text === name,
  );
  if (!attribute || !ts.isJsxAttribute(attribute) || !attribute.initializer) return undefined;
  if (ts.isStringLiteral(attribute.initializer)) return { value: attribute.initializer.text };
  if (ts.isJsxExpression(attribute.initializer)) {
    const expression = unwrap(attribute.initializer.expression);
    if (expression && ts.isIdentifier(expression)) return { identifier: expression.text };
    const value = staticValue(expression);
    if (typeof value === 'string') return { value };
  }
  return {};
}

function parseBody(source, filePath) {
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const errors = sourceFile.parseDiagnostics.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
  const imageImports = parseImports(sourceFile);
  const figures = [];
  const links = [];
  let spreadsMetadata = false;
  let defaultExport = false;

  function visit(node) {
    if (ts.isSpreadAssignment(node) && ts.isIdentifier(node.expression) && node.expression.text === 'metadata') spreadsMetadata = true;
    if (ts.isExportAssignment(node) && !node.isExportEquals && ts.isIdentifier(node.expression) && node.expression.text === 'post') defaultExport = true;
    if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
      const tag = node.tagName.getText(sourceFile);
      if (tag === 'PostFigure') figures.push({ src: jsxAttribute(node, 'src'), alt: jsxAttribute(node, 'alt') });
      if (tag === 'img') errors.push('body images must use PostFigure instead of raw img');
      if (tag === 'a') links.push(jsxAttribute(node, 'href')?.value || '');
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  if (!spreadsMetadata) errors.push('post object must spread metadata');
  if (!defaultExport) errors.push('file must export default post');
  return { errors, imageImports, figures, links };
}

function sitemapRoutes(root) {
  const sitemapPath = path.join(root, 'public', 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) return new Set();
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  return new Set(
    [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)]
      .map((match) => {
        try {
          return new URL(match[1]).pathname.replace(/\/+$/, '') || '/';
        } catch {
          return '';
        }
      })
      .filter(Boolean),
  );
}

function localHrefPath(href) {
  if (!href || href.startsWith('#') || /^(?:mailto|tel):/i.test(href)) return null;
  try {
    const url = href.startsWith('/') ? new URL(href, CANONICAL_ORIGIN) : new URL(href);
    if (url.origin === CANONICAL_ORIGIN || url.origin === 'https://lifeeducation.org') {
      return url.pathname.replace(/\/+$/, '') || '/';
    }
    return false;
  } catch {
    return undefined;
  }
}

function priorityFor(defects) {
  if (!defects.length) return 'current';
  if (defects.some((value) =>
    value.ruleId.startsWith('structure.')
    || value.ruleId.startsWith('metadata.')
    || value.ruleId.startsWith('identity.')
    || value.ruleId.startsWith('code.')
    || /image\.role\.(?:card|hero)\.missing/.test(value.ruleId),
  )) return 'P1 structural';
  if (defects.some((value) =>
    value.ruleId.startsWith('image.body.')
    || /^image\.role\.(?:card|hero)\.geometry$/.test(value.ruleId),
  )) return 'P2 image completion';
  return 'P3 finish and cleanup';
}

export function scanLifeEducation(root = process.cwd()) {
  const postsDir = path.join(root, 'src', 'content', 'posts');
  const routes = sitemapRoutes(root);
  if (fs.existsSync(postsDir)) {
    for (const entry of fs.readdirSync(postsDir, { withFileTypes: true })) {
      if (entry.isDirectory()) routes.add(`/posts/${entry.name}`);
    }
  }
  const posts = [];
  const seenSlugs = new Map();

  if (!fs.existsSync(postsDir)) {
    return {
      site: 'LifeEducation',
      repository: 'SuperDudePro/LifeEducationOrg',
      posts: [],
      repositoryDefects: [issue('repository.posts-directory.required', 'src/content/posts', 'Missing src/content/posts.')],
    };
  }

  for (const entry of fs.readdirSync(postsDir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    const folder = path.join(postsDir, slug);
    const metaPath = path.join(folder, 'meta.ts');
    const indexPath = path.join(folder, 'index.tsx');
    const imagesDir = path.join(folder, 'images');
    const defects = [];
    const add = (ruleId, signature, message) => defects.push(issue(ruleId, signature, message));

    for (const [file, rule] of [[metaPath, 'structure.meta.required'], [indexPath, 'structure.index.required']]) {
      if (!fs.existsSync(file)) add(rule, path.basename(file), `The post folder is missing ${path.basename(file)}.`);
    }
    if (!fs.existsSync(imagesDir) || !fs.statSync(imagesDir).isDirectory()) add('structure.images.required', 'images/', 'The post folder is missing images/.');
    for (const child of fs.readdirSync(folder, { withFileTypes: true })) {
      if (['meta.ts', 'index.tsx', 'images'].includes(child.name)) continue;
      add('structure.extra-file.forbidden', child.name, `Unexpected production-folder entry: ${child.name}.`);
    }
    if (!fs.existsSync(metaPath) || !fs.existsSync(indexPath)) {
      posts.push({ slug, title: '', publishedAt: '', defects, priority: priorityFor(defects) });
      continue;
    }

    const metadata = parseMetadata(fs.readFileSync(metaPath, 'utf8'), metaPath);
    const body = parseBody(fs.readFileSync(indexPath, 'utf8'), indexPath);
    for (const message of metadata.errors) add('code.meta.parse', message, message);
    for (const message of body.errors) add('code.body.parse', message, message);
    const value = (field) => metadata.values.get(field);
    const sourceSlug = value('slug') || '';
    const title = value('title') || '';
    const publishedAt = value('publishedAt') || '';

    for (const field of REQUIRED_META_FIELDS) {
      const current = value(field);
      if (
        !metadata.fields.has(field)
        || (Array.isArray(current) && !current.length)
        || (!Array.isArray(current) && !current && !metadata.identifiers.has(field))
      ) {
        add(`metadata.${field}.required`, field, `Missing required metadata field ${field}.`);
      }
    }
    if (sourceSlug && sourceSlug !== slug) {
      add('identity.folder-slug', `folder=${slug};slug=${sourceSlug}`, `Folder "${slug}" does not match slug "${sourceSlug}".`);
    }
    if (sourceSlug) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(sourceSlug)) add('identity.slug-format', sourceSlug, 'Slug must be lowercase kebab-case.');
      const duplicate = seenSlugs.get(sourceSlug);
      if (duplicate) add('identity.slug-unique', `slug=${sourceSlug};other=${duplicate}`, `Duplicate slug also used by ${duplicate}.`);
      else seenSlugs.set(sourceSlug, slug);
    }
    if (value('publishedAt') && !realIsoDate(value('publishedAt'))) {
      add('metadata.publishedAt.date', value('publishedAt'), 'publishedAt must be a real YYYY-MM-DD date.');
    }
    if (value('modifiedAt') && !realIsoDate(value('modifiedAt'))) {
      add('metadata.modifiedAt.date', value('modifiedAt'), 'modifiedAt must be a real YYYY-MM-DD date.');
    }
    if (value('status') && !VALID_STATUSES.has(value('status'))) {
      add('metadata.status.allowed', value('status'), `Invalid status "${value('status')}".`);
    }

    const roleFiles = new Map();
    for (const [field, expected] of [['cardImage', 'images/card-image.webp'], ['heroImage', 'images/hero-image.webp']]) {
      const identifier = metadata.identifiers.get(field);
      const file = identifier ? metadata.imageImports.get(identifier) : undefined;
      const altField = field === 'cardImage' ? 'cardAlt' : 'heroAlt';
      const role = field === 'cardImage' ? 'card' : 'hero';
      if (!identifier || !file) add(`image.role.${role}.missing`, expected, `Missing dedicated ${role} image import and field.`);
      else {
        roleFiles.set(role, file);
        if (file !== expected) add(`image.role.${role}.filename`, `actual=${file};expected=${expected}`, `${role} image must be named ${expected}.`);
      }
      if (!value(altField)?.trim()) add(`image.role.${role}.alt`, altField, `Missing ${altField}.`);
    }
    if (roleFiles.get('card') && roleFiles.get('card') === roleFiles.get('hero')) {
      add('image.role.distinct', roleFiles.get('card'), 'Card and hero roles reuse the same image.');
    }

    const bodyFiles = [];
    for (const figure of body.figures) {
      const identifier = figure.src?.identifier;
      if (!identifier || !body.imageImports.has(identifier)) {
        add('image.body.reference', identifier || '(missing)', `PostFigure source "${identifier || '(missing)'}" does not match a local image import.`);
        continue;
      }
      const file = body.imageImports.get(identifier);
      bodyFiles.push(file);
      if (!figure.alt?.value?.trim()) add('image.body.alt', file, `Body image ${file} has empty alt text.`);
    }
    const uniqueBodyFiles = [...new Set(bodyFiles)];
    if (uniqueBodyFiles.length < 4) {
      add('image.body.minimum', `count=${uniqueBodyFiles.length}`, `Only ${uniqueBodyFiles.length} distinct body images; current minimum is 4.`);
    }
    if (bodyFiles.length !== uniqueBodyFiles.length) {
      add('image.body.distinct', `files=${bodyFiles.join(',')}`, 'One or more body images are rendered more than once.');
    }
    const expectedBodyFiles = Array.from({ length: uniqueBodyFiles.length }, (_, index) => `images/body-image-${index + 1}.webp`);
    if (uniqueBodyFiles.join('|') !== expectedBodyFiles.join('|')) {
      add(
        'image.body.sequence',
        `actual=${uniqueBodyFiles.join(',')};expected=${expectedBodyFiles.join(',')}`,
        `Body roles must use the exact sequential filenames ${expectedBodyFiles.join(', ') || '(none)'}.`,
      );
    }
    for (const [role, file] of roleFiles) {
      if (uniqueBodyFiles.includes(file)) add('image.role.body-reuse', `${role}=${file}`, `${role} image is reused as a body image.`);
    }

    const assets = new Set();
    if (fs.existsSync(imagesDir)) {
      for (const child of fs.readdirSync(imagesDir, { withFileTypes: true })) {
        if (!child.isFile() || !IMAGE_EXTENSIONS.has(path.extname(child.name).toLowerCase())) {
          add('structure.images.extra-entry', child.name, `Unexpected entry in images/: ${child.name}.`);
          continue;
        }
        assets.add(`images/${child.name}`);
      }
    }
    const importedFiles = new Set([...metadata.imageImports.values(), ...body.imageImports.values()]);
    for (const file of assets) {
      if (!importedFiles.has(file)) add('asset.stale', file, `Asset ${file} is not imported by meta.ts or index.tsx.`);
    }
    for (const file of importedFiles) {
      if (!assets.has(file)) add('asset.missing', file, `Imported image ${file} does not exist.`);
    }

    const checkGeometry = (role, file, ruleId) => {
      if (!file || !assets.has(file)) return;
      const expected = IMAGE_GEOMETRY[role];
      try {
        const actual = inspectImage(path.join(folder, file));
        if (actual.width !== expected.width || actual.height !== expected.height) {
          add(
            ruleId,
            `file=${file};actual=${actual.width}x${actual.height};expected=${expected.width}x${expected.height}`,
            `${file} is ${actual.width}x${actual.height}; the ${role} role requires ${expected.width}x${expected.height}.`,
          );
        }
      } catch {
        add(
          ruleId,
          `file=${file};actual=unreadable;expected=${expected.width}x${expected.height}`,
          `${file} does not contain readable PNG, JPEG, or WebP image data; the ${role} role requires ${expected.width}x${expected.height}.`,
        );
      }
    };
    checkGeometry('card', roleFiles.get('card'), 'image.role.card.geometry');
    checkGeometry('hero', roleFiles.get('hero'), 'image.role.hero.geometry');
    for (const file of uniqueBodyFiles) checkGeometry('body', file, 'image.body.geometry');

    const publishable = value('status') !== 'Draft';
    const hasContactCta = body.links.some((href) => localHrefPath(href) === '/contact');
    if (publishable && !hasContactCta) add('cta.contact.required', '/contact', 'Post is missing a reader CTA linking to the contact page.');
    for (const href of body.links) {
      const local = localHrefPath(href);
      if (local === undefined) add('link.url.valid', href, `Malformed link: ${href}.`);
      else if (local === false) {
        try {
          const url = new URL(href);
          if (url.protocol !== 'https:') add('link.external.https', href, `External link must use HTTPS: ${href}.`);
        } catch {
          // The malformed case is handled above.
        }
      } else if (local && routes.size && !routes.has(local)) {
        add('link.internal.route', href, `Internal link is absent from the sitemap: ${href}.`);
      }
    }

    const deduped = [...new Map(defects.map((current) => [issueKey(current), current])).values()]
      .sort((a, b) => issueKey(a).localeCompare(issueKey(b)));
    posts.push({ slug, title, publishedAt, defects: deduped, priority: priorityFor(deduped) });
  }
  return { site: 'LifeEducation', repository: 'SuperDudePro/LifeEducationOrg', posts, repositoryDefects: [] };
}

export function retrofitQueue(scan, baseline) {
  const posts = new Map(scan.posts.map((post) => [post.slug, post]));
  const queue = Object.entries(baseline?.entries || {})
    .map(([slug, defects]) => {
      const post = posts.get(slug);
      return {
        slug,
        title: post?.title || '',
        publishedAt: post?.publishedAt || '',
        priority: post?.priority || 'P1 structural',
        defects: defects.map(({ ruleId, signature, reason, message }) => ({
          ruleId,
          signature,
          message: reason || message || '',
        })),
      };
    })
    .sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt)
      || a.slug.localeCompare(b.slug),
    );
  return queue.map((entry, index) => ({
    queueNumber: index + 1,
    queueTotal: queue.length,
    ...entry,
  }));
}

export function candidateBaseline(scan) {
  return {
    schemaVersion: 1,
    site: scan.site,
    repository: scan.repository,
    status: 'candidate',
    reviewedAt: null,
    entries: Object.fromEntries(
      scan.posts
        .filter((post) => post.defects.length)
        .map((post) => [
          post.slug,
          post.defects.map(({ ruleId, signature, message }) => ({ ruleId, signature, reason: message })),
        ]),
    ),
  };
}

export function evaluateBaseline(scan, baseline, { touchedSlugs = new Set() } = {}) {
  const errors = [];
  if (baseline?.status !== 'reviewed') errors.push('Legacy baseline is not marked reviewed.');
  if (baseline?.repository !== scan.repository) errors.push(`Baseline repository must be ${scan.repository}.`);
  const posts = new Map(scan.posts.map((post) => [post.slug, post]));
  for (const post of scan.posts) {
    const allowed = new Map((baseline?.entries?.[post.slug] || []).map((entry) => [issueKey(entry), entry]));
    const current = new Map(post.defects.map((entry) => [issueKey(entry), entry]));
    for (const defect of post.defects) {
      if (!allowed.has(issueKey(defect))) errors.push(`${post.slug}: unapproved ${defect.ruleId} (${defect.signature}) — ${defect.message}`);
    }
    for (const entry of allowed.values()) {
      if (!current.has(issueKey(entry))) errors.push(`${post.slug}: obsolete baseline entry ${entry.ruleId} (${entry.signature}) must be removed.`);
    }
    if (touchedSlugs.has(post.slug) && post.defects.length) {
      errors.push(`${post.slug}: materially touched legacy post must meet the complete current contract.`);
    }
  }
  for (const slug of Object.keys(baseline?.entries || {})) {
    if (!posts.has(slug)) errors.push(`${slug}: baseline entry refers to a post that no longer exists.`);
  }
  return [...new Set(errors)];
}

export function inventoryMarkdown(scan) {
  const current = scan.posts.filter((post) => !post.defects.length);
  const legacy = scan.posts.filter((post) => post.defects.length);
  const lines = [
    `# ${scan.site} Post Contract Inventory`,
    '',
    'Generated by `scripts/validate-post-contract.mjs`. Do not hand-edit this report.',
    '',
    `- Repository: \`${scan.repository}\``,
    `- Posts scanned: ${scan.posts.length}`,
    `- Current-standard posts: ${current.length}`,
    `- Legacy posts needing retrofit: ${legacy.length}`,
    '',
    '## Current-standard posts',
    '',
    ...(current.length ? current.map((post) => `- \`${post.slug}\` — ${post.title}`) : ['- None']),
    '',
    '## Retrofit queue',
    '',
  ];
  for (const priority of ['P1 structural', 'P2 image completion', 'P3 finish and cleanup']) {
    const group = legacy.filter((post) => post.priority === priority);
    if (!group.length) continue;
    lines.push(`### ${priority}`, '');
    for (const post of group) {
      lines.push(`#### \`${post.slug}\` — ${post.title || '(title unavailable)'}`, '');
      for (const defect of post.defects) lines.push(`- \`${defect.ruleId}\` — ${defect.message}`);
      lines.push('');
    }
  }
  return `${lines.join('\n').trim()}\n`;
}
