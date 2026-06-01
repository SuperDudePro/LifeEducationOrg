# LifeEducation Site Code Cleanup Notes

## Main cleanup

- Moved post source files from `src/posts/*` to `src/content/posts/*` so post content now lives inside the content layer, matching the cleaner OurOldDad organization.
- Updated `src/content/loadPosts.ts` so it loads from `src/content/posts/*/index.tsx`.
- Added post helper functions:
  - `getFeaturedPost()`
  - `getPostsByTopic()`
  - `getPostHref()`
  - `getPostImage()`
- Added duplicate-slug protection during post loading.
- Added a `Draft` post status so a post can exist in the repo without being included publicly.
- Added a shared `PostFigure` component and replaced ad hoc inline post figure markup with it.
- Removed stale Vite/demo/legacy source files:
  - `src/LifeEducationApp.tsx`
  - `src/App.css`
  - `src/index.css`
  - `src/assets/react.svg`
  - `src/assets/vite.svg`

## Growth cleanup, 2026-05-31

- Split each post into `meta.ts` plus `index.tsx`.
- Updated `src/content/loadPosts.ts` so list pages load only post metadata eagerly.
- Added lazy loading for full post bodies on `/posts/{slug}`.
- Kept duplicate-slug and folder-slug validation in the loader.
- Updated the sitemap generator to derive post/domain routes from source files and skip drafts/placeholders.
- Regenerated `public/sitemap.xml`; it now includes the domain 9 and domain 10 essays.
- Removed stale tracked assets that were no longer imported:
  - unused PNG originals from `seven-years-to-build-a-different-way`
  - unused SVG wrappers from domain 5 and domain 6
  - stale `BrandHeader.tsx`
- Updated Vite and related transitive packages through `npm audit fix`; `npm audit` now reports 0 vulnerabilities.
- Added `npm run check` as the standard local lint/build gate.

## Why I did not copy the OurOldDad post renderer exactly

OurOldDad currently stores post bodies as raw `bodyHtml` strings and renders them with `dangerouslySetInnerHTML`.

That works for fast blog-post conversion, but LifeEducation already has React/TSX post bodies with imported images. I kept that safer pattern and only copied the better structural idea: posts belong inside the content layer and should be loaded/processed by a small post registry.

## Build note

Current local verification passes:

```bash
npm ci
npm run lint
npm run build
npm audit --audit-level=moderate
```
