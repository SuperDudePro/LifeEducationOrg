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

## Why I did not copy the OurOldDad post renderer exactly

OurOldDad currently stores post bodies as raw `bodyHtml` strings and renders them with `dangerouslySetInnerHTML`.

That works for fast blog-post conversion, but LifeEducation already has React/TSX post bodies with imported images. I kept that safer pattern and only copied the better structural idea: posts belong inside the content layer and should be loaded/processed by a small post registry.

## Build note

I could not complete a local `npm ci` / build verification in this environment because dependency installation did not finish. The code changes are structural and syntax-reviewed, but run this after unzipping:

```bash
npm install
npm run build
```
