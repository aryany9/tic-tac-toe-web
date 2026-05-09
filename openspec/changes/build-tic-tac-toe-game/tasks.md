## 1. Project Setup

- [x] 1.1 Initialize Next.js project with App Router (TypeScript)
- [x] 1.2 Configure Tailwind CSS with `darkMode: 'class'` in tailwind.config
- [x] 1.3 Set up the base page layout with `<html>` respecting dark class and `<body>` with Tailwind base styles

## 2. Theme Toggle (theme-toggle spec)

- [x] 2.1 Create a `useTheme` custom hook that reads/writes theme from localStorage, falls back to `prefers-color-scheme`, and exposes `{ theme, toggleTheme }`
- [x] 2.2 Add a `<script>` in the layout `<head>` that applies the stored theme class synchronously before paint (no flash)
- [x] 2.3 Build a `ThemeToggle` component with a button/switch UI to toggle between dark and light modes
- [x] 2.4 Place the `ThemeToggle` component in the main layout header

## 3. Game Logic & State Management (game-board spec)

- [x] 3.1 Create a `useGameReducer` hook with actions: `MAKE_MOVE`, `RESET_GAME`; state includes `board` (9-element array), `currentPlayer`, `winner`, `winningLine`, `isDraw`
- [x] 3.2 Implement win detection logic — check all 8 winning combinations after each move, return winner + line indices or null
- [x] 3.3 Implement draw detection logic — board full with no winner returns true

## 4. Game Board UI (game-board spec)

- [x] 4.1 Build a `Cell` component that renders the cell content (X, O, or empty), handles click, and applies winning-line highlight styling
- [x] 4.2 Build a `Board` component that renders a 3x3 grid of `Cell` components using CSS Grid
- [x] 4.3 Add a status display showing current player turn, win message, or draw message
- [x] 4.4 Add a "New Game" reset button wired to the `RESET_GAME` action

## 5. Styling & Responsive Design

- [x] 5.1 Style the board with Tailwind — cell borders, hover states, X/O colors (distinct per player), responsive sizing
- [x] 5.2 Apply dark mode variants across all components (backgrounds, text, borders, hover states)
- [x] 5.3 Ensure layout is centered and responsive on mobile, tablet, and desktop viewports

## 6. PWA / Offline Support (offline-support spec)

- [x] 6.1 Create `public/manifest.json` with app name, short name, start URL, display mode (`standalone`), icons, and theme colors
- [x] 6.2 Link the manifest in the layout `<head>` via `<link rel="manifest">`
- [x] 6.3 Set dynamic `<meta name="theme-color">` based on current theme (light/dark)
- [x] 6.4 Create `public/sw.js` service worker with cache-first strategy for app shell, CSS, JS bundles, and static assets
- [x] 6.5 Register the service worker in a client component or script tag (check for `navigator.serviceWorker`)
- [x] 6.6 Generate PWA icons (at minimum: 192x192 and 512x512 PNG) and place in `public/icons/`

## 7. Polish & Testing

- [ ] 7.1 Verify the game is fully playable offline (disconnect network, reload, play a full game)
- [ ] 7.2 Verify theme toggle persists across reloads and respects system preference on first visit
- [ ] 7.3 Test installability prompt appears on supported browsers/devices
- [x] 7.4 Review accessibility: keyboard navigation for cells (button elements), ARIA labels for board state, sufficient color contrast in both themes
