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
npm run test:ask
```

## Hidden Ask LifeEducation beta

`/ask` is a direct-URL private beta. It is deliberately absent from site
navigation and `public/sitemap.xml`; its generated entry page is marked
`noindex, nofollow`.

The serverless answer endpoint retrieves only from the approved corpus generated
from the public LifeEducation data modules. The model must return a strict
structured result, and the server rejects any citation that was not in the
retrieved source packet. The current model floor is `gpt-5.6-sol` with medium
reasoning. The endpoint does not browse or read private Drive files.

Copy `.env.example` to your local environment or add the same server-side
variables to Vercel. `OPENAI_API_KEY` is required for model-backed answers.
Resend and the Ask/contact email variables enable “Send to Will.” These values
must not use the `VITE_` prefix.

The beta can run on Vercel’s current plan. OpenAI API usage and billing are
separate from the Vercel plan.

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
