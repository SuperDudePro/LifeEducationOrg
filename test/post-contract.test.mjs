import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { candidateBaseline, evaluateBaseline, scanLifeEducation } from '../scripts/post-contract.mjs';

function createRepo({ count = 4, cardFile = 'card-image.webp', heroFile = 'hero-image.webp', gap = false, blankAlt = false } = {}) {
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
  for (const file of [cardFile, heroFile, ...bodyFiles]) fs.writeFileSync(path.join(images, file), '');
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
