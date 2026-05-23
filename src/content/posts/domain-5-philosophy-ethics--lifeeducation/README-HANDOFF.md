# Post Handoff

Target site: LifeEducation  
Destination path: `lifeeducation-site/src/posts/domain-5-philosophy-ethics/`  
Post URL after deploy: `/posts/domain-5-philosophy-ethics`  
Slug: `domain-5-philosophy-ethics`  
Title: `Domain 5: Philosophy & Ethics Is More Than Having Opinions`  
Published date: `2026-05-23`  
Status: `Recent`  
Section/topic: `Domains`

## Copy This Folder

Copy:

`drop-in/domain-5-philosophy-ethics/`

To:

`lifeeducation-site/src/posts/domain-5-philosophy-ethics/`

## Included Images

- `images/hero-crossroads.webp` — hero/card image
- `images/fair-argument.webp` — inline image after the fair argument section
- `images/feelings-vs-verdicts.webp` — inline image after the feelings/verdicts section

## Build Check

From the LifeEducation repo root, run:

```bash
npm run build
```

If this is a clean install, run first:

```bash
npm ci
```

Additional checks:

- Hero image appears.
- Card image appears.
- Inline images appear in the post body.
- Post appears under `/posts/domain-5-philosophy-ethics`.
- Date sorts correctly.
- All public images have alt text.
