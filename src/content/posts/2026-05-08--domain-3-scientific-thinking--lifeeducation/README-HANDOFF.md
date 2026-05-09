# Post Handoff

Target site: LifeEducation  
Destination path: `lifeeducation-site/src/posts/domain-3-scientific-thinking/`  
Post URL after deploy: `/posts/domain-3-scientific-thinking`  
Slug: `domain-3-scientific-thinking`  
Title: `Domain 3: Scientific Thinking Is More Than Science Class`  
Published date: `2026-05-08`  
Status: `Recent`  
Section/topic: `Domains`

## Copy This Folder

Copy:

`drop-in/domain-3-scientific-thinking/`

To:

`lifeeducation-site/src/posts/domain-3-scientific-thinking/`

## Build Check

Run from the LifeEducation repo root:

```bash
npm run build
npm run lint
```

If dependencies are not installed yet, run:

```bash
npm ci
```

## Package Contents

```text
source/
  post.md
  image-notes.md
drop-in/
  domain-3-scientific-thinking/
    index.tsx
    images/
      scientific-thinking-observation-hero.webp
      scientific-thinking-evidence-collage.webp
```

## Post Metadata

- Topic: `Domains`
- Tags: `LifeEducation`, `Domains`, `Scientific Thinking`, `The Floor`, `Adult Capability`
- Hero/card image: `scientific-thinking-observation-hero.webp`
- Inline image: `scientific-thinking-evidence-collage.webp`

## Manual Checks After Copy

- Hero image appears on the post page.
- Card image appears on the post listing card.
- Inline image appears after the "Real life does not hand you a lab sheet" section.
- Post appears under Domains / recent posts.
- Date sorts correctly.
- All public images have alt text.
- Build passes.
