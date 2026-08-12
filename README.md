# Mariam Khan — Portfolio

A single-page portfolio site. Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion, statically generated and deployable to Vercel.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build locally
npm run lint    # eslint
```

## Where things live

**Content — [data/content.ts](data/content.ts)**
Every word on the site (profile info, about text, experience, projects, leadership entries, education, certifications, skills, nav links) lives in this one typed file. To update copy, reorder entries, or add a new job/project/leadership role, edit this file only — no component changes needed. Arrays render in the order you list them.

**Design & layout — `app/` and `components/`**
- `app/layout.tsx` — fonts, metadata, theme-init script
- `app/globals.css` — color tokens (light/dark), font tokens, Tailwind v4 theme
- `components/` — one file per section (`hero.tsx`, `experience.tsx`, `projects.tsx`, etc.) plus shared pieces (`nav.tsx`, `reveal.tsx` for scroll animations, `theme-provider.tsx`, `grain.tsx`)

If you want to change how something looks — spacing, animation timing, colors — that's in `components/` or `globals.css`. If you want to change what it says, that's `data/content.ts`.

## Adding assets

- **Resume:** drop your PDF at `public/resume.pdf` (referenced by the nav and footer "Resume" buttons — no code change needed).
- **Leadership photos:** drop images at `public/leadership/tech-collaborative.jpg` and `public/leadership/umr.jpg` (paths are set in `data/content.ts` under the `leadership` array's `photo` field). Photos are optional — if a file isn't present, that entry just renders without one, no broken image.

## Design notes

- **Accent color — deep amber (`#e2a23d`).** Chosen to avoid the blue/purple/teal palette nearly every AI-generated or templated portfolio defaults to. Amber reads warm and confident against the near-black editorial base, and doubles as a highlighter/ink accent rather than a "tech SaaS" signal.
- **Type pairing:** Fraunces (serif) for headings and the About pull-quote, IBM Plex Mono for labels/eyebrows/nav, Inter for body copy.
- **Dark only, deliberately** — one considered palette rather than a light/dark toggle. Background is a layered composition: a flat near-black base, a slow-drifting ambient amber glow (`components/ambient-background.tsx`), and an animated film-grain overlay (`components/grain.tsx`) — not a flat color or a stock gradient blob.
- All scroll/entrance and ambient background animations respect `prefers-reduced-motion`.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo — Vercel auto-detects Next.js, no config needed.
3. Deploy. Every push to `main` redeploys automatically.

Or via CLI:

```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```
