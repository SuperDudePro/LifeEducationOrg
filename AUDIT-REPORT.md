# LifeEducation.org audit — 2026-09-30

Scope: `main` at `242fc6c` (Sep 28, 2026). Checked: code/build, SEO, AI-search visibility (AIO), accessibility, security, performance. This follows the same method as the Our Old Dad audit.

Method:
- `npm ci` and `npm run check`: lint, Ask tests, IndexNow tests, post contract, build, and all validators.
- `npm audit` and `npm outdated`.
- axe-core WCAG 2.0–2.2 A/AA on **all 36 sitemap routes** in Chromium.
- Layout-shift attribution.
- A browser test with the new CSP **enforced**.
- A code read of the `api/` routes (including the Ask endpoint), the route prerenderer, and `vercel.json`.
- A live check of production (`www.lifeeducation.org`) through the Vercel connector.

**Bottom line:** The codebase is solid. Lint, tests and every validator pass, and the Ask endpoint is carefully designed. The significant problems:

1. **Production serves none of the configured security headers.** This is the same `routes` bug found on Our Old Dad. Fixed.
2. **The Ask beta had no site-wide spending or email ceiling.** Fixed.
3. **Social previews and AI crawlers saw no images, and non-post pages were empty without JavaScript.** Fixed.

Status legend: **FIXED** = in this PR · **OPEN** = recommended, not changed · **INFO** = no action.

---

## High

| # | Area | Finding | Status |
|---|---|---|---|
| H1 | Security / config | **Production (checked 2026-09-30) returned none of the `vercel.json` security headers:** nosniff, frame DENY, referrer policy and permissions policy. Only Vercel's default HSTS came through. The cause is the legacy `routes` block overriding `headers`. The fix removes `routes`: the apex→www 308 stays in `redirects`, and unknown paths still get `404.html` by Vercel default. The same fix was verified on the Our Old Dad preview and production. | FIXED |
| H2 | Security / cost | **The Ask endpoint had only per-IP limits** (12 per 15 min). Someone rotating IPs could run up OpenAI spend without bound. They could also flood your inbox, because **every** question, including blocked and off-topic ones, triggers a "question record" email. The fix adds durable site-wide daily ceilings: 300 model calls (`ASK_DAILY_MODEL_LIMIT`) and 200 record emails (`ASK_DAILY_RECORD_LIMIT`). Both can be changed through env vars. | FIXED |
| H3 | Security | **"Send me a copy" on `/api/ask-escalate` mails any address the visitor types**, with visitor-controlled text, from your domain. The only limit was 4 per IP per hour, so it could be abused as a spam relay, which hurts domain reputation. The fix adds a limit of 2 copies per recipient per day. | FIXED |
| H4 | SEO / social | **No page had `og:image` or `twitter:image`, yet every page declares `twitter:card=summary_large_image`.** Shared links therefore showed no image. Posts now get their card image, via Vite's build manifest. Other pages get a default image: `lifeeducation_break_navigator.webp` (1400×763). Posts' Article JSON-LD also gains `image` and `dateModified`. | FIXED |
| H5 | AIO / SEO | **Non-post pages shipped an empty `<div id="root">`.** Why, Floor, By 18, Domains, the domain pages, Q&A, Posts and home had no content or links for crawlers that don't run JavaScript. They now include a heading, site navigation, and the page's public text, reused from the Ask corpus the build already generates. That is about 8–37 KB of text per core page. | FIXED |

## Medium

| # | Area | Finding | Status |
|---|---|---|---|
| M1 | Security | There was no Content-Security-Policy. A `Content-Security-Policy-Report-Only` header is added: the GA snippet is allowed by hash, plus GA/GTM hosts, and there are no third-party embeds. `/api/csp-report` logs violations. `validate-site` fails the build if the inline script's hash drifts. With the policy enforced in Chromium, the tested routes (home, post, domain, Ask, contact, Q&A) showed 0 violations. Enforce it after about 2 weeks of clean logs. | FIXED (report-only) |
| M2 | Accessibility | **`/contact` had no `<h1>`.** It was the only page not using `PageIntro`. It now has the standard page header ("Send a Note"). | FIXED |
| M3 | Accessibility | **In-text links in posts were distinguishable only by color** (WCAG 1.4.1). The site-wide `a { text-decoration: none }` caused this; it was a serious axe finding on `/posts/run`. Plain links inside post paragraphs, lists and quotes are now underlined. Buttons and styled links are unchanged. | FIXED |
| M4 | Accessibility | **Color contrast on domain pages was below 4.5:1.** Affected: the "Not on the floor" label (4.48), the framework source note (4.35), the "On track"/"Worth investigating" labels, the "Long-form" kicker and "Read the full essay" (4.25). All now use existing darker palette colors, at 5.2–7.6:1. | FIXED |
| M5 | Accessibility | Heading order skipped a level on domain pages (h2 → h4). The age-band labels are now h3 with the same styling. | FIXED |
| M6 | Accessibility | Contact and subscribe status messages weren't announced to screen readers (WCAG 4.1.3). They are now in `aria-live` regions. Ask already did this. | FIXED |
| M7 | Performance / CWV | **Post pages had CLS 0.106**, just over the 0.1 "good" threshold. The footer jumped when the lazily loaded body chunk arrived. The hero now renders from post metadata while the body loads. The static shells add about 0.016 CLS at most; every audited route is ≤ 0.04. | FIXED |
| M8 | AIO | **No `llms.txt`.** One is now generated at build time: the core framework pages, all 10 domains, and the published posts with excerpts. | FIXED |
| M9 | AIO / schema | The Q&A page had no FAQ schema. **`FAQPage` JSON-LD** is now generated from `qaData.ts`, covering every question and answer. AI answer engines read this; Google shows FAQ rich results only for select sites. | FIXED |
| M10 | Dependencies | 2 high-severity dev-dependency CVEs: `nanoid` (via vite/postcss) and `brace-expansion`. Both are build-time only. `npm audit fix` changed only the lockfile; now 0 vulnerabilities. | FIXED |
| M11 | Ask UX / perf | Ask waits for the question-record email (up to 3 s) **before** it streams the answer. Sending the record after the response, or through a background mechanism, would cut perceived latency. This changes delivery guarantees, so it is left for you to decide. | OPEN |
| M12 | Ask policy | Blocked and off-topic questions also email you. With the new 200/day ceiling this is bounded. Consider recording only answered, unsupported and escalated questions. This is a product decision. | OPEN |
| M13 | Performance | Images come in one size only, with no `srcset`. Several post images are 400–490 KB, and the contact-desk break image is 598 KB at 2048 px wide. Responsive variants would help mobile LCP. You deferred this for Our Old Dad. | OPEN |

## Low

| # | Area | Finding | Status |
|---|---|---|---|
| L1 | Security | Server-side length checks for contact name/subject were missing. They now match the form limits (120/160). | FIXED |
| L2 | Hygiene | `public/deployment.json` and `public/llms.txt` are generated, so they are now in `.gitignore`. The unused `src/assets/hero.png` and a duplicate unused `clientIp` in `api/ask/lib.mjs` were removed. | FIXED |
| L3 | Coverage | The CI axe audit sampled 3 routes. It now also covers contact, a domain page, and a post. | FIXED |
| L4 | Schema / AIO | Articles name the author only as a bare `Person` ("Will Gayhart"). Add an `@id`, a `url` (e.g., the Our Old Dad about page or a LifeEducation about page) and `sameAs`, so engines connect the author across both sites. | OPEN |
| L5 | Security (publisher) | The shared publisher also publishes to this repo, so the Our Old Dad finding about its shared key and client-supplied branch/PR number applies here too. You chose to skip it. | OPEN (skipped) |
| L6 | Dependencies | Minor updates are available: vite 8.3, React 19.3, eslint 10.11, typescript-eslint 8.71. TypeScript 7 is a major upgrade. None are security fixes. | OPEN |
| L7 | Privacy | GA4 loads before consent, with `send_page_view: false` and manual page views. That's fine for a US audience. | INFO |

## Verified OK

- `npm run check` passes: lint, 14 Ask tests, IndexNow tests, post contract, build and all validators.
- **Ask design:**
  - retrieval is restricted to an approved public corpus
  - output uses a strict JSON schema
  - any citation that wasn't retrieved is rejected server-side
  - questions are screened for prompt injection, private-material requests, web requests and high-stakes topics before the model is called
  - `store: false`
  - request size caps and durable per-IP limits
  - question records contain no IP address
  - answers render as text, with no `dangerouslySetInnerHTML` anywhere in `src`
- **Other APIs:** same-origin checks, honeypots, request timeouts, and fail-closed Redis rate limits.
- **Redirects:** the apex → www 308 was confirmed live and is kept in `redirects`. Canonicals, sitemap, robots and JSON-LD types are checked by `validate:discovery`.
- **Accessibility after fixes:** 0 axe violations on all 36 routes, one h1 per page, and visible keyboard focus.

## Suggested next steps

1. Merge, then confirm the live headers: `curl -sI https://www.lifeeducation.org/floor`.
2. After about 2 weeks, review the CSP report logs, then enforce the CSP.
3. Decide M11/M12 (Ask record email timing and scope).
4. Author entity linking (L4). Responsive images (M13) when you revisit performance.
