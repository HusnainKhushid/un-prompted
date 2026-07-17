# un_prompted — Home Page

Next.js implementation of the **un_prompted 2026** invite-only summit home page
(Craft Ventures internal), built from the Figma design.

## Stack

- **Next.js 16** (App Router) + React + TypeScript
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- Fonts loaded from Google Fonts via a `<link>` in `app/layout.tsx`
  (Martian Mono, Space Mono, Hanken Grotesk, Bricolage Grotesque)

> Note: `next/font/google` is intentionally **not** used — the Turbopack font
> loader failed to resolve in this environment, so fonts are pulled with a plain
> stylesheet link and wired to CSS variables in `app/globals.css`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Structure

```
app/
  layout.tsx            # root layout, fonts, metadata
  globals.css           # design tokens, matrix bg, glow, wordmark animation
  page.tsx              # assembles all sections
  components/
    shared.tsx          # Wordmark, MatrixBackground, GlowBlobs, ArrowButton, Eyebrow
    Nav.tsx  Hero.tsx  Thesis.tsx  WhoItsFor.tsx  WhatToExpect.tsx
    Speakers.tsx  Partners.tsx  Agenda.tsx  Apply.tsx  Footer.tsx
public/assets/          # images + SVGs exported from Figma
```

## Motion

Animations are an **additive layer** — every resting state is identical to the
static design; motion only animates *into* it. Built following Emil Kowalski's
principles (`.agents/skills/`), CSS-first for performance.

- `app/components/motion.tsx` — `Reveal` / `Stagger` client components using
  IntersectionObserver (with an immediate in-view check + scroll fallback so
  content is never stuck hidden).
- `app/globals.css` (MOTION section) — easing tokens (`--ease-out`,
  `--ease-in-out`), scroll-reveal + stagger classes, hero load fade-ups, ambient
  glow drift, press/hover/focus states.
- What moves: sections fade+rise on scroll; grids/cards/agenda rows stagger in;
  hero fades up on load; speaker photos zoom, agenda tags fill, nav links
  underline, buttons press (scale 0.97), inputs focus to green.
- Respects `prefers-reduced-motion` (drops movement, keeps fades) and
  `@media (scripting: none)` (no-JS shows everything). Hover effects gated to
  `(hover: hover) and (pointer: fine)`.

## Assets

All logos, icons and speaker photos were exported from the Figma file and live
in `public/assets/`. The large "un_prompted" wordmark and the small nav/footer
logotypes are rendered as live text (Space Mono) with a green `_` block rather
than as flattened images.
