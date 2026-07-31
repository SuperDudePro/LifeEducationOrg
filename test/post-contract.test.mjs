import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { candidateBaseline, evaluateBaseline, retrofitQueue, scanLifeEducation } from '../scripts/post-contract.mjs';

function webpFixture(width, height) {
  const bytes = Buffer.alloc(30);
  bytes.write('RIFF', 0, 'ascii');
  bytes.write('WEBP', 8, 'ascii');
  bytes.write('VP8X', 12, 'ascii');
  bytes[16] = 10;
  bytes.writeUIntLE(width - 1, 24, 3);
  bytes.writeUIntLE(height - 1, 27, 3);
  return bytes;
}

function createRepo({
  count = 4,
  cardFile = 'card-image.webp',
  heroFile = 'hero-image.webp',
  gap = false,
  blankAlt = false,
  invalidGeometry = false,
} = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'le-contract-'));
  const folder = path.join(root, 'src/content/posts/valid-post');
  const images = path.join(folder, 'images');
  fs.mkdirSync(images, { recursive: true });
  fs.mkdirSync(path.join(root, 'public'), { recursive: true });
  fs.writeFileSync(
    path.join(root, 'public/sitemap.xml'),
    '<urlset><url><loc>https://www.lifeeducation.org/contact</loc></url><url><loc>https://www.lifeeducation.org/posts/valid-post</loc></url></urlset>',
  );
  const bodyFiles = Array.from({ length: count }, (_, index) => `body-image-${gap && index === count - 1 ? index + 2 : index + 1}.webp`);
  fs.writeFileSync(path.join(images, cardFile), webpFixture(invalidGeometry ? 1000 : 960, invalidGeometry ? 750 : 720));
  fs.writeFileSync(path.join(images, heroFile), webpFixture(1600, 900));
  for (const file of bodyFiles) fs.writeFileSync(path.join(images, file), webpFixture(1200, 900));
  fs.writeFileSync(
    path.join(folder, 'meta.ts'),
    `import type { LifeEducationPostMeta } from "../../postTypes";
import cardImage from "./images/${cardFile}";
import heroImage from "./images/${heroFile}";
export const metadata = {
  slug: "valid-post",
  title: "Valid Post",
  excerpt: "A valid excerpt.",
  publishedAt: "2026-07-29",
  status: "Recent",
  topic: "Founding Notes",
  tags: ["LifeEducation"],
  cardImage,
  cardAlt: "Card.",
  heroImage,
  heroAlt: "Hero.",
} satisfies LifeEducationPostMeta;
`,
  );
  const imports = bodyFiles.map((file, index) => `import body${index + 1} from "./images/${file}";`).join('\n');
  const figures = bodyFiles
    .map((_, index) => `<PostFigure src={body${index + 1}} alt="${blankAlt && index === 0 ? '' : `Body ${index + 1}.`}" />`)
    .join('\n');
  fs.writeFileSync(
    path.join(folder, 'index.tsx'),
    `import type { LifeEducationPost } from "../../postTypes";
import { PostFigure } from "../../../components/PostFigure";
import { metadata } from "./meta";
${imports}
const post: LifeEducationPost = {
  ...metadata,
  body: <><p>Body.</p>${figures}<p><a href="/contact">Write to me.</a></p></>,
};
export default post;
`,
  );
  return root;
}

test('valid current-standard LifeEducation post passes', () => {
  const scan = scanLifeEducation(createRepo());
  assert.deepEqual(scan.posts[0].defects, []);
});

test('fewer than four body roles fails', () => {
  const scan = scanLifeEducation(createRepo({ count: 3 }));
  assert(scan.posts[0].defects.some((value) => value.ruleId === 'image.body.minimum'));
});

test('card or hero reuse and numbering gaps fail', () => {
  const reused = scanLifeEducation(createRepo({ cardFile: 'body-image-1.webp' }));
  assert(reused.posts[0].defects.some((value) => value.ruleId === 'image.role.body-reuse'));
  const gap = scanLifeEducation(createRepo({ gap: true }));
  assert(gap.posts[0].defects.some((value) => value.ruleId === 'image.body.sequence'));
});

test('code, file, and alt mismatch fails', () => {
  const scan = scanLifeEducation(createRepo({ blankAlt: true }));
  assert(scan.posts[0].defects.some((value) => value.ruleId === 'image.body.alt'));
});

test('invalid image geometry is reported before retrofit selection', () => {
  const scan = scanLifeEducation(createRepo({ invalidGeometry: true }));
  const defect = scan.posts[0].defects.find((value) => value.ruleId === 'image.role.card.geometry');
  assert.match(defect?.signature || '', /actual=1000x750;expected=960x720/);
});

test('only the exact reviewed legacy defect is allowed', () => {
  const root = createRepo({ count: 3 });
  const first = scanLifeEducation(root);
  const baseline = candidateBaseline(first);
  baseline.status = 'reviewed';
  baseline.reviewedAt = '2026-07-29';
  assert.deepEqual(evaluateBaseline(first, baseline), []);
  fs.unlinkSync(path.join(root, 'src/content/posts/valid-post/images/body-image-3.webp'));
  const sourcePath = path.join(root, 'src/content/posts/valid-post/index.tsx');
  fs.writeFileSync(sourcePath, fs.readFileSync(sourcePath, 'utf8').replace('import body3 from "./images/body-image-3.webp";', ''));
  const changed = scanLifeEducation(root);
  assert(evaluateBaseline(changed, baseline).some((value) => value.includes('unapproved')));
});

test('obsolete baseline defects fail until removed', () => {
  const legacy = scanLifeEducation(createRepo({ count: 3 }));
  const baseline = candidateBaseline(legacy);
  baseline.status = 'reviewed';
  const repaired = scanLifeEducation(createRepo());
  assert(evaluateBaseline(repaired, baseline).some((value) => value.includes('obsolete baseline entry')));
});

test('retrofit queue is newest-first and advances only after baseline retirement', () => {
  const scan = {
    posts: [
      { slug: 'older', title: 'Older', publishedAt: '2026-01-01', priority: 'P3 finish and cleanup' },
      { slug: 'newer', title: 'Newer', publishedAt: '2026-07-01', priority: 'P2 image completion' },
    ],
  };
  const baseline = {
    entries: {
      older: [{ ruleId: 'cta.contact.required', signature: '/contact' }],
      newer: [{ ruleId: 'image.body.geometry', signature: 'wrong-size' }],
    },
  };
  assert.equal(retrofitQueue(scan, baseline)[0].slug, 'newer');
  delete baseline.entries.newer;
  assert.equal(retrofitQueue(scan, baseline)[0].slug, 'older');
});
