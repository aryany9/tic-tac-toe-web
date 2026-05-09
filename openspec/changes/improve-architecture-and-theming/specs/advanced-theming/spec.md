## ADDED Requirements

### Requirement: Advanced theming system
The system SHALL provide multiple aesthetic themes beyond simple light/dark mode, allowing users to select their preferred visual style.

#### Scenario: User selects a new theme
- **WHEN** the user selects a new theme from the UI (e.g., "Cyberpunk")
- **THEN** the application's visual style SHALL immediately update to the selected theme.
- **THEN** the selected theme preference SHALL be persisted across sessions.

#### Scenario: Theme applied on initial load
- **WHEN** the application loads
- **THEN** the system SHALL apply the user's last selected theme or a default theme if none is set.

#### Scenario: Theme data is defined via CSS variables
- **WHEN** new themes are introduced or existing themes are modified
- **THEN** all theme-related styles (colors, fonts, etc.) SHALL be defined using CSS variables scoped by a `data-theme` attribute on the `<html>` element.
