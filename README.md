# LifeEducation.org site

Vite + React source project. This keeps the same deployment shape as the original working site: the repo root contains `package.json`, `vite.config.ts`, `index.html`, `src/`, and `public/`.

## Source layout

```text
src/
  App.tsx                 # route selection, document titles, internal navigation handling
  main.tsx                # React entrypoint + shared CSS import
  components/             # reusable layout and document components
  content/                # post metadata, TSX post bodies, and post loader
  data/                   # page/domain/Q&A content objects
  pages/                  # one file per site page
  styles/global.css       # universal stylesheet for the whole site
  types.ts
  utils/routing.ts
```

## Local commands

```bash
npm ci
npm run dev
npm run check
npm run build
npm run lint
npm run sitemap
```

## File Explorer upload rule

Copy the CONTENTS of this folder into the GitHub repo root.

The repo root should directly show:

```text
package.json
package-lock.json
vite.config.ts
index.html
src/
public/
```

Do not copy the enclosing folder itself.
Do not upload `.git`, `node_modules`, `dist`, or any old ZIPs into the repo.

## Posts workflow

Posts use a lightweight folder model under `src/content/posts`. Each post keeps
metadata separate from the full TSX body so list pages can stay fast as the
content library grows.

Add a new post by creating a folder under `src/content/posts`:

```text
src/content/posts/my-post-slug/
  meta.ts
  index.tsx
  images/
    optional-image.webp
```

Each `meta.ts` exports `metadata` with one `LifeEducationPostMeta` object. Each
`index.tsx` imports that metadata and exports one `LifeEducationPost` object with
the full `body`. The post list is discovered automatically through
`src/content/loadPosts.ts`, so no separate registry needs to be maintained.

Folder names must match `metadata.slug`; the loader and sitemap generator both
validate that. Set `status: "Draft"` to keep a post out of public lists, or
`status: "Coming Soon"` for a public placeholder that stays out of the sitemap.

```text
src/content/posts/coming-soon/
  meta.ts
  index.tsx
```

Run `npm run sitemap` after adding or renaming posts or domains.
