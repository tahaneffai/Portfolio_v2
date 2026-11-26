# Taha Yassine Neffai, portfolio v2

Style: cream, ink and lime, tall condensed type (Oswald) with JetBrains Mono, pill buttons, coloured project cards
scrolling sideways, and a stack ticker. Inspired by the look of a Dribbble shot Taha liked, rebuilt with his own content.

React 19 + TypeScript + Vite + Tailwind CSS 4 + GSAP (useGSAP, ScrollTrigger, SplitText, DrawSVG, Flip).

- All text, in French and English, lives in `src/content.ts`. French is the default; `?lang=en` or the FR/EN switch shows English.
- Images are in `public/img` (webp), the CV in `public/cv-taha-neffai-fr.pdf`, fonts in `public/fonts` (preloaded).
- All motion is wrapped in `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`.

## Run

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Deploy (Vercel, when you are ready)

1. Create a new GitHub repo and push this folder.
2. On vercel.com: Add New > Project > import the repo. Framework preset: Vite. Build `npm run build`, output `dist`.
3. Or from the terminal: `npx vercel` (preview), then `npx vercel --prod`.
