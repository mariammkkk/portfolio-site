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

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo -> Vercel auto-detects Next.js, no config needed.
3. Deploy. Every push to `main` redeploys automatically.

Or via CLI:

```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```
