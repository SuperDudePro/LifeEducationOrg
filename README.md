# LifeEducation.org site

Vite + React source project. This keeps the same deployment shape as the original working site: the repo root contains `package.json`, `vite.config.ts`, `index.html`, `src/`, and `public/`.

## Source layout

```text
src/
  App.tsx                 # route selection, document titles, internal navigation handling
  main.tsx                # React entrypoint + shared CSS import
  components/             # reusable layout and document components
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
npm run build
npm run lint
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

Posts use the same lightweight folder model as the related blog project.

Add a new post by creating a folder under `src/posts`:

```text
src/posts/my-post-slug/
  index.tsx
  optional-image.webp
```

Each `index.tsx` exports one `LifeEducationPost` object. The post list is discovered automatically through `src/content/loadPosts.ts`, so no separate registry needs to be maintained.

Current starter post:

```text
src/posts/coming-soon/index.tsx
```
