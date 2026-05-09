# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Tasks

- Build the project: `npm run build`
- Run the development server: `npm run dev`
- Lint the code: `npm run lint`
- Run all tests: `npm run test`
- Run a specific test: `npx vitest <file_path>`
- Check types: `npm run type-check`
- Preview the build: `npm run preview`

## Project Architecture

This is a React web application built with Vite, TypeScript, and Tailwind CSS.

### Directory Structure

- `src/components/`: React components, organized by feature (e.g., `Board`, `Cell`, `GameInfo`).
- `src/hooks/`: Custom React hooks containing game logic (e.g., `useGameLogic.ts`).
- `src/utils/`: Pure utility functions for game logic and calculations (e.g., `gameUtils.ts`).
- `src/types/`: TypeScript type definitions (e.g., `game.ts`).
- `src/App.tsx`: Main application component.
- `src/main.tsx`: Application entry point.

### Tech Stack

- **Framework**: React
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Vitest
- **Linting**: ESLint
