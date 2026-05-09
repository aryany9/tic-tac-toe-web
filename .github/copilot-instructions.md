# Copilot Instructions for this Repository

## Build, lint, and test commands

- Install deps: `npm install`
- Run dev server: `npm run dev`
- Build production app: `npm run build`
- Start production build: `npm run start`
- Lint: `npm run lint`

Testing is not currently wired in this repository (`package.json` has no `test` script and `src/` has no test files), so there is no project-specific single-test command yet.

## High-level architecture

- This is a **Next.js App Router** app. `src/app/layout.tsx` defines global metadata/viewport and injects a pre-hydration theme script; `src/app/page.tsx` composes the UI.
- Main page composition is: `Header` + `Game` + `ServiceWorkerRegistration`.
- Game state is centralized in `useGameReducer`:
  - Reducer owns board state, turn switching, win/draw detection, and reset behavior.
  - `Game.tsx` derives status text/classes from reducer state.
  - `Board.tsx` maps board cells and forwards interaction to `makeMove`.
  - `Cell.tsx` is a presentational button with accessibility labels and winner/disabled styling.
- Theme flow spans multiple files:
  - `layout.tsx` applies dark mode class before paint (prevents flash).
  - `useTheme.ts` persists theme in `localStorage` key `ttt-theme`, syncs `meta[name="theme-color"]`, and falls back to system preference.
  - `ThemeToggle.tsx` is the UI trigger.
- Offline/PWA flow:
  - `ServiceWorkerRegistration.tsx` registers `/sw.js` on client mount.
  - `public/sw.js` handles cache-first behavior and cache versioning.
  - `public/manifest.json` + icons define install metadata.

## Key conventions in this codebase

- Use the TS path alias `@/*` (configured in `tsconfig.json` with `baseUrl: "src"`).
- Components using hooks/browser APIs are explicitly client components via `'use client'`.
- Tic-tac-toe board indexing is fixed to a flat 9-cell array (`0..8`) with winning lines declared in `useGameReducer.ts`; keep all game-rule changes there rather than duplicating logic in UI components.
- Theme persistence and lookup must keep using `ttt-theme` to stay compatible with the inline layout script and `useTheme` hook.
- If you change offline-cached assets or caching strategy, update `CACHE_NAME`/asset list in `public/sw.js` accordingly.
