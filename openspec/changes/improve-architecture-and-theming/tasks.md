## 1. Setup and Dependencies

- [x] 1.1 Install `framer-motion` dependency.
- [x] 1.2 Identify and prepare audio assets for game events (move, win, draw).

## 2. Game State Persistence (`game-state-persistence`)

- [x] 2.1 Define a persisted state schema and storage key for game + player state.
- [x] 2.2 Load persisted state during reducer initialization; validate shape and fall back to default state if invalid/missing.
- [x] 2.3 Persist state after valid game transitions (move, win, draw, reset actions).
- [x] 2.4 Ensure "New Game" updates storage to the expected fresh-round state.
- [x] 2.5 Ensure persisted state includes board, turn, winner/draw state, names, and scores.

## 3. Core Game Logic + Player Management (`core-game-logic`, `player-management`)

- [x] 3.1 Extend `GameState` with `playerXName`, `playerOName`, `playerXScore`, and `playerOScore`.
- [x] 3.2 Set default names (`Player X`, `Player O`) and zeroed scores in initial state.
- [x] 3.3 Increment winning player's score on win scenarios.
- [x] 3.4 Update turn/win/draw status messaging to use custom player names.
- [x] 3.5 Add player settings UI for editing both player names.
- [x] 3.6 Add scoreboard UI that displays both players' win counts.
- [x] 3.7 Add scoreboard reset flow that resets both scores and persists the reset.

## 4. Advanced Theming (`advanced-theming`)

- [x] 4.1 Define named theme palettes in `globals.css` using CSS variables scoped by `html[data-theme="..."]`.
- [x] 4.2 Refactor `useTheme` to manage selected theme IDs and persist the selection.
- [x] 4.3 Update pre-hydration theme bootstrapping in `layout.tsx` to apply `data-theme` on `<html>`.
- [x] 4.4 Replace binary toggle UI with theme selection UI in `ThemeToggle`.
- [x] 4.5 Ensure initial-load behavior applies the saved theme or default theme consistently.

## 5. Interactive Feedback (`interactive-feedback`)

- [x] 5.1 Add move animation in `Cell` for symbol placement.
- [x] 5.2 Add winning-line animation in `Board` or relevant game container.
- [x] 5.3 Add draw-state visual feedback.
- [x] 5.4 Create `useSound` hook for move/win/draw cues.
- [x] 5.5 Trigger the correct cue for valid moves, wins, and draws.

## 6. Hydration Safety and Accessibility

- [x] 6.1 Prevent hydration mismatch for persisted game/player/theme state.
- [x] 6.2 Ensure theme, settings, and scoreboard controls are keyboard-accessible and properly labeled.
- [x] 6.3 Verify ARIA roles/labels remain correct after adding new interactive UI.
