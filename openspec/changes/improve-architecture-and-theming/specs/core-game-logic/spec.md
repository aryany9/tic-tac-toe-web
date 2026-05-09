## ADDED Requirements

### Requirement: Game logic supports player names and scores
The core game logic SHALL be updated to incorporate player names and maintain a persistent score for each player.

#### Scenario: Game state includes player names
- **WHEN** the game starts or resets
- **THEN** the game state SHALL include fields for Player X's name and Player O's name.
- **THEN** these names SHALL default to "Player X" and "Player O" if not customized.

#### Scenario: Game state includes player scores
- **WHEN** the game starts or resets
- **THEN** the game state SHALL include fields for Player X's score and Player O's score.
- **THEN** these scores SHALL be initialized to zero and incremented upon a win.

#### Scenario: Player names displayed during turn
- **WHEN** it is a player's turn
- **THEN** the status message SHALL display the current player's custom name (e.g., "Alice's turn").

#### Scenario: Player names displayed on win/draw
- **WHEN** the game ends in a win or draw
- **THEN** the status message SHALL display the winning player's custom name (e.g., "Bob wins!") or acknowledge a draw with player names.
