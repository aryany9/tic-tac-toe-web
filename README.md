# Tic-Tac-Toe Web

A modern, offline-capable Tic-Tac-Toe game built with **Next.js** and **TypeScript**.  
The app is designed for smooth gameplay, accessibility, theme customization, and installable PWA behavior.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Development Approach (OpenSpec)](#development-approach-openspec)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Screenshot](#screenshot)
- [Contributing](#contributing)
- [License](#license)

## Features

### Gameplay

- 3x3 Tic-Tac-Toe board with turn management
- Reliable win detection for all 8 winning combinations
- Draw detection when the board is full with no winner
- New Game flow that resets the board while preserving player scores
- Dedicated score reset flow

### Player Experience

- Customizable player names
- Real-time game status messaging (turn, win, draw)
- Sound effects for move, win, and draw events
- Animation-enhanced interactions and state feedback

### Persistence, Theming, and Offline

- Local persistence of game state and scoreboard
- Theme persistence in local storage (`ttt-theme`)
- Multiple themes: Light, Dark, Cyberpunk, Retro, Pastel
- PWA install support through manifest + icons
- Service worker caching for offline play

## Tech Stack

- **Framework**: Next.js (App Router)
- **UI**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Offline/PWA**: Service Worker + Web App Manifest

## Getting Started

### Prerequisites

- Node.js (current LTS recommended)
- npm

### Local Setup

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Build production app |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Development Approach (OpenSpec)

This repository uses **OpenSpec** with a **spec-driven** workflow (`openspec/config.yaml` uses `schema: spec-driven`).

All major work is tracked as changes under `openspec/changes/<change-id>/`, with:

- `proposal.md` for problem statement and scope
- `design.md` for architecture and design decisions
- `tasks.md` for implementation checklist
- `specs/**/spec.md` for capability requirements and scenarios

Current implemented change sets include:

- `build-tic-tac-toe-game`
- `improve-architecture-and-theming`

## Architecture Overview

- `src/app/layout.tsx`: Global layout and theme bootstrapping before paint
- `src/app/page.tsx`: Main page composition
- `src/components/Game.tsx`: Game orchestration and UI composition
- `src/hooks/useGameReducer.ts`: Core reducer-based game logic and persistence
- `src/hooks/useTheme.ts`: Theme state, persistence, and theme-color synchronization
- `public/sw.js`: Service worker for caching and offline behavior

### Core Design Notes

- Game rules are centralized in `useGameReducer` (single source of truth)
- Theme state is persisted and synchronized with `<meta name="theme-color">`
- Service worker uses cache-first strategy for app shell/static assets

## Project Structure

```text
src/
  app/         # App Router pages and layout
  components/  # UI components (Board, Game, Header, etc.)
  hooks/       # Game/theme/sound hooks
public/
  icons/       # PWA icons
  sounds/      # Audio assets
  sw.js        # Service worker
openspec/
  config.yaml  # OpenSpec config (spec-driven schema)
  changes/     # Change proposals, designs, tasks, and capability specs
```


## Screenshot

<img src="public/game-screenshot.png" alt="Tic-Tac-Toe game screenshot" width="720" />

## Contributing

Contributions are welcome and appreciated.

### Ways to Contribute

- Report bugs
- Improve docs
- Propose/implement new features
- Improve accessibility, performance, or UX
- Refactor while preserving behavior

### Before You Start

1. Check existing issues/PRs to avoid duplicated work.
2. For meaningful feature or behavior changes, create or extend an OpenSpec change under `openspec/changes/`.
3. Keep changes focused and minimal to the intended scope.

### Development Workflow

1. Fork the repository and create a branch:

   ```bash
   git checkout -b feat/short-description
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Make your changes following the existing architecture and conventions.
4. Run quality checks:

   ```bash
   npm run lint
   npm run build
   ```

5. Commit with clear messages and open a pull request.

### OpenSpec Workflow for Feature Work

When your contribution changes behavior or adds capabilities, include spec artifacts:

1. Create `openspec/changes/<your-change-id>/`
2. Add `proposal.md`, `design.md`, `tasks.md`
3. Add capability specs under `specs/<capability>/spec.md`
4. Implement tasks and keep `tasks.md` updated
5. Reference the OpenSpec change in your PR description

### Pull Request Checklist

- Scope is clear and focused
- README/docs updated (if behavior or usage changed)
- Lint/build pass locally
- No unrelated refactors bundled in the same PR
- OpenSpec artifacts included when applicable


## License

This project is licensed under the **ISC License**.

See [LICENSE](LICENSE) for full text.
