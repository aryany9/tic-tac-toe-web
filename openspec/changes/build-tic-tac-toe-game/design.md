## Context

This is a greenfield Next.js project. The application will be a single-page tic-tac-toe game built with the App Router, Tailwind CSS for styling, and PWA capabilities for offline access. No existing codebase or external APIs are involved — all logic runs client-side.

## Goals / Non-Goals

**Goals:**
- Fully playable two-player tic-tac-toe (local, same device)
- Complete offline functionality via PWA service worker caching
- Dark mode and light mode with system preference detection and manual toggle
- Responsive design that works on mobile and desktop
- Clean, maintainable code structure following Next.js best practices

**Non-Goals:**
- Multiplayer over network (no server-side game state)
- AI opponent
- Game history / replay feature
- Leaderboards or scoring persistence beyond the current session

## Decisions

1. **Next.js App Router with Client Components for game logic** — The game board and interaction are inherently client-driven. Using `"use client"` directives on interactive components keeps server/client boundaries clean while leveraging Next.js for routing, metadata, and PWA setup.

2. **Tailwind CSS with `class`-based dark mode (`darkMode: 'class'`)** — Enables explicit toggle control via a root class, rather than relying solely on system preference. User choice persists in `localStorage`.

3. **Single-player local two-player mode only** — Keeps scope manageable for the initial build. No WebSocket or API infrastructure needed.

4. **Game state managed with React `useState` and `useReducer`** — The board is a simple 9-element array; `useReducer` provides clear transition logic for turns, win detection, and reset without prop-drilling complexity.

5. **PWA via `next-pwa` or manual service worker + manifest** — Manual approach (custom `sw.js` in public directory + `manifest.json`) avoids an extra dependency and gives full control over caching strategy. All static assets are cached on install; the app shell is cache-first.

6. **Win detection algorithm** — Predefined set of 8 winning line indices checked after each move. O(1) per move, no recursion needed.

## Risks / Trade-offs

- [Service worker caching stale code] → Mitigation: Use a cache-busting strategy on the service worker filename or implement update detection with a "refresh to get latest" prompt.
- [localStorage for theme preference not available in private browsing] → Mitigation: Fall back to system preference (`prefers-color-scheme`) when localStorage is inaccessible.
- [No server means no game persistence across page reloads] → Acceptable trade-off; scope is a simple local game. Could add `sessionStorage` later if needed.
