## Context

The current Tic Tac Toe application is a simple React-based web app using Next.js and Tailwind CSS. While functional, it lacks persistence, advanced styling, and interactive polish. The state is managed locally in a hook and lost on refresh. The theme system is a binary light/dark toggle.

## Goals / Non-Goals

**Goals:**
- **Persistent State**: Game progress, scores, and settings should survive page reloads.
- **Enhanced Theming**: Support multiple named themes (Light, Dark, Cyberpunk, Retro, Pastel).
- **Visual Polish**: Add animations for board loading, cell marking, and game-over states.
- **Audio Feedback**: Add subtle sound effects for player actions and game outcomes.
- **Architecture**: Decouple state persistence from core logic and improve hook modularity.

**Non-Goals:**
- **Multiplayer**: No online real-time multiplayer (will remain local 2-player).
- **Backend**: No server-side persistence or database integration.
- **Complex State Libraries**: Avoid adding heavy state management libraries like Redux or MobX.

## Decisions

### 1. Persistent State Management
We will wrap the `useGameReducer` logic with a persistence layer.
- **Mechanism**: Use `localStorage` to store a serialized version of the game state.
- **Rationale**: Low complexity, no backend required, and fits the "offline-first" PWA nature of the project.
- **Alternatives**: IndexedDB (too complex for this data size), SessionStorage (doesn't survive tab closure).

### 2. Multi-Theme System via CSS Variables
The theme system will be refactored to use a centralized set of CSS variables defined in `globals.css`.
- **Mechanism**: A `data-theme` attribute on the `<html>` element will control which set of variables is active.
- **Rationale**: Highly performant, avoids JS-in-CSS overhead, and integrates perfectly with Tailwind's variable support.
- **Alternatives**: Utility-class swapping (becomes messy with many themes).

### 3. Animation Strategy with Framer Motion
- **Mechanism**: Use `LayoutGroup` and `AnimatePresence` from `framer-motion`.
- **Rationale**: Industry standard for React animations, handles exit animations cleanly, and provides physics-based motion.
- **Alternatives**: CSS Transitions (harder to coordinate for complex sequences like win strikes).

### 4. Audio Engine
- **Mechanism**: A simple custom hook `useSound` that manages a pool of `HTMLAudioElement` instances.
- **Rationale**: Minimal footprint, easy to trigger from the reducer or components.

## Risks / Trade-offs

- **[Risk] Hydration Mismatch** -> **[Mitigation]**: Ensure components that rely on `localStorage` state (like theme or scores) only render their content after the component has mounted on the client.
- **[Risk] State Corruption** -> **[Mitigation]**: Implement a basic versioning check in the persistence layer. If the stored schema is incompatible with the current code, reset to default state.
- **[Risk] Audio Autoplay Policies** -> **[Mitigation]**: Ensure audio only plays after the first user interaction (first move or button click) as per browser standards.
