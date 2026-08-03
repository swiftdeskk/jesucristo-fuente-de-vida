# Jesucristo Fuente de Vida — Church Website

A production website for a multi-generational church in Huaral, Peru, rebuilt from a set of
eight hand-written HTML pages into a single-page React application.

The original site duplicated its navbar, footer and `<head>` across every page, shipped 28 MB
of unoptimised images, and pulled Font Awesome from a CDN. This rebuild keeps every piece of
the original content while replacing the architecture underneath it.

**Live site:** [jesucristofuentedevida.org](https://jesucristofuentedevida.org)

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| UI | **React 19** | Route-level code splitting via `lazy` + `Suspense` |
| Build | **Vite 6** | Native ESM dev server, Rollup manual chunking for vendor splits |
| Styling | **Tailwind CSS v4** | Via `@tailwindcss/vite`; design tokens live in a single `index.css` |
| Routing | **React Router 7** | `BrowserRouter` with a wildcard 404 and hash-aware scroll restoration |
| Animation | **Motion 12** | `MotionConfig reducedMotion="user"` enforces the OS preference globally |
| Icons | **lucide-react** | Tree-shaken imports, wrapped in a local registry |
| Image pipeline | **sharp** | Build-time resize, mozjpeg recompression and WebP generation |
| Hosting | **Vercel** | Static output with an SPA rewrite |

Roughly 6,200 lines across 10 route components, 12 shared components and 9 data modules.

---

## Architecture

### Content lives in a data layer, not in components

Every editable string, schedule, ministry, FAQ and donation method sits in `src/data/` as a
plain ES module. Components import and render — they never hold copy. Changing the church's
phone number is a one-line edit in `site.js` that propagates to the navbar, footer, contact
page, WhatsApp float and JSON-LD schema at once.

This is the change that made the rest possible: the previous version had the same phone number
written into eight separate HTML files.

### Three-tier blog resolution with a static admin panel

The site has no backend, but non-technical church staff still need to publish posts. `useBlogData`
resolves content through a priority cascade:

```js
const [data, setData] = useState(() => readDraft() ?? published ?? defaultBlogData)
```

1. **Local draft** — what the admin is editing right now, held in `localStorage`. Only visible in
   their own browser, so they can preview before shipping.
2. **`/data/posts.json`** — fetched once per session and cached in a module-level variable. This is
   what the public sees.
3. **Bundled fallback** — `src/data/blog.js`, compiled into the JS. Guarantees the blog renders
   even if the fetch fails or the JSON is missing.

`/admin` is a client-only editor guarded by SHA-256 hashes. It writes drafts to `localStorage` and
exports a `posts.json` for redeployment — it deliberately does not pretend to be a CMS, because a
static host cannot back one. A companion Node script (`export-posts.mjs`) regenerates the JSON from
the bundled fallback to keep both sources in sync.

> The hashes ship in the public bundle and are unsalted. The panel keeps casual visitors out of an
> editing UI; it is not an authentication boundary, and the code says so where it matters.

### Progressive images with a guaranteed fallback

`scripts/optimize-images.js` walks `public/images`, applies a per-directory width cap, recompresses
JPEG through mozjpeg and PNG through a palette, and emits a sibling `.webp` for every file. It only
overwrites the original when the result is genuinely smaller.

`SmartImage` then serves them through a `<picture>` element:

```jsx
<picture>
  {webp && <source srcSet={webp} type="image/webp" />}
  <img src={src} loading={priority ? 'eager' : 'lazy'} decoding="async" ... />
</picture>
```

The `.webp` is served when supported and the original stays as the fallback — which also keeps
`og:image` working, since some social scrapers still refuse WebP. Every image reserves its space
with `aspect-ratio` and fades in over a shimmering skeleton, so there is no cumulative layout shift.

### Bundle splitting

Only the home page is imported eagerly. The other nine routes are `lazy`-loaded behind a `Suspense`
boundary, and Rollup is configured to isolate React and Motion into their own vendor chunks:

```js
manualChunks: { react: ['react', 'react-dom', 'react-router-dom'], motion: ['motion'] }
```

A visitor who only reads the home page never downloads the admin panel, the donation flow or the
contact form.

### A local icon registry instead of a CDN font

`Icon.jsx` maps 70 semantic names (`'praying-hands'`, `'whatsapp'`, `'church'`) to components —
mostly tree-shaken lucide imports, plus a handful of hand-written SVGs for brands lucide does not
carry. Data modules reference icons by string, so `src/data/` stays free of JSX imports.

This replaced a Font Awesome CDN link that cost roughly 100 KB of CSS plus font files on every page.

### SEO managed at runtime

`Seo` is a headless component that rewrites `document.title`, the meta description, canonical link
and the full Open Graph / Twitter Card set on every route change, creating the tags if they do not
exist yet. `index.html` carries the global defaults and a `schema.org/Church` JSON-LD block with the
address, phone and service times.

### Theme without a flash

An inline script in `index.html` applies the stored theme class before React hydrates; `useTheme`
just reads the class already on `<html>`. The site is light by default and only goes dark when the
visitor explicitly asks — it deliberately ignores `prefers-color-scheme` so the church's identity is
consistent on first paint.

---

## Results

| | Before | After |
|---|---|---|
| Image payload | 28.8 MB | **5.3 MB** originals + 4.2 MB WebP siblings |
| Navbar logo | 2.5 MB, repeated on 8 pages | **72 KB**, served once |
| Font Awesome | ~100 KB CSS + font files, from a CDN | **removed** |
| CSS | 3 files, 5,661 lines | 1 file, **11.9 KB gzip** |
| Initial JS | — | **~90 KB gzip**, plus 17 KB React and 35 KB Motion |

Layout, footer and `<head>` went from eight duplicated copies to one component each.

### Accessibility

- Mobile menu with `aria-expanded`, `Escape` to close and background scroll locking.
- FAQ accordion built on real `<button>` elements — the previous version used non-focusable `<div>`s.
- Skip-to-content link, visible focus rings, and `prefers-reduced-motion` honoured globally through
  `MotionConfig`.

### Design system

One accent colour (`#4A90E2`, as a full scale) carries the entire interface; gold is reserved
exclusively for scripture quotes. Hierarchy is typographic — Bricolage Grotesque for headings,
Manrope for body — and blocks are separated by 1px rules rather than shadows, with shadows reserved
for elements that genuinely float. Animation is capped at 10px of travel and half a second.

---

## Deployment

The build is fully static — no server, database or serverless functions. `vercel.json` supplies the
only piece of configuration that matters:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

Without it, a hard refresh on `/ministerios` would 404, because no such file exists on disk. Vercel
autodetects Vite, runs the build and serves `dist/`.

---

## Structure

```
├── index.html                  # Shell, global meta, JSON-LD, no-flash theme script
├── vercel.json                 # SPA rewrite
├── public/
│   ├── images/                 # Optimised originals + .webp siblings
│   └── data/posts.json         # Published blog content
├── scripts/
│   ├── optimize-images.js      # sharp: resize, recompress, emit WebP
│   ├── brand-logos.mjs         # Logo and favicon generation
│   └── export-posts.mjs        # Bundled fallback → posts.json
└── src/
    ├── App.jsx                 # Routes, lazy loading, page transitions
    ├── index.css               # Design tokens, utilities, base layer
    ├── data/                   # All editable content, as plain modules
    ├── components/             # Navbar, Footer, PageHero, SmartImage, Icon, ui primitives
    ├── hooks/                  # useTheme, useBlogData
    └── pages/                  # One per route, including the admin panel
```

The contact form posts to Formspree, configured in `src/data/site.js`, with client-side validation
and a real success state.
