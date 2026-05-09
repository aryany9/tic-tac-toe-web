## Why

Build a fully functional tic-tac-toe web game from scratch that works completely offline, supports dark/light mode theming, and provides a polished user experience — all using Next.js and Tailwind CSS.

## What Changes

- Initialize a new Next.js project with Tailwind CSS configured
- Implement the core tic-tac-toe game logic (board state, turn management, win/draw detection)
- Build an interactive 3x3 game board UI with responsive design
- Add dark mode and light mode toggle with system preference detection
- Configure Progressive Web App (PWA) capabilities for full offline functionality
- Include a service worker to cache all assets for offline access

## Capabilities

### New Capabilities

- `game-board`: Interactive 3x3 tic-tac-toe board with click handling, turn indicators, and win/draw detection display
- `theme-toggle`: Dark mode and light mode support with system preference detection and persistent user preference
- `offline-support`: PWA configuration with service worker for complete offline functionality

### Modified Capabilities

<!-- None — this is a new project with no existing specs -->

## Impact

- New Next.js application (App Router) with Tailwind CSS
- Dependencies: next, react, tailwindcss, related tooling
- Public directory for PWA assets (manifest.json, icons, service worker registration)
