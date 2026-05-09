## ADDED Requirements

### Requirement: Application supports both dark and light visual themes
The application SHALL provide two distinct visual themes — a light mode with light backgrounds/dark text, and a dark mode with dark backgrounds/light text.

#### Scenario: Light mode renders correctly
- **WHEN** the application is in light mode
- **THEN** backgrounds are light-colored and text/icons are dark-colored for readability

#### Scenario: Dark mode renders correctly
- **WHEN** the application is in dark mode
- **THEN** backgrounds are dark-colored and text/icons are light-colored for readability

### Requirement: Application detects system color scheme preference on first load
The application SHALL read the user's operating system `prefers-color-scheme` media query to set the initial theme.

#### Scenario: System prefers dark
- **WHEN** the user's OS is set to dark mode and they visit for the first time
- **THEN** the application renders in dark mode by default

#### Scenario: System prefers light
- **WHEN** the user's OS is set to light mode and they visit for the first time
- **THEN** the application renders in light mode by default

### Requirement: User can manually toggle between themes
The application SHALL provide a visible toggle control (button or switch) that switches between dark and light modes.

#### Scenario: User toggles from light to dark
- **WHEN** the app is in light mode and the user activates the theme toggle
- **THEN** the entire UI switches to dark mode immediately

#### Scenario: User toggles from dark to light
- **WHEN** the app is in dark mode and the user activates the theme toggle
- **THEN** the entire UI switches to light mode immediately

### Requirement: Theme preference persists across page reloads
The application SHALL store the user's selected theme preference so it survives page navigation and browser restarts.

#### Scenario: Preference survives reload
- **WHEN** a user manually selects dark mode and then reloads the page
- **THEN** the application renders in dark mode on load

### Requirement: Theme change applies without flash of incorrect theme
The application SHALL apply the correct theme before initial paint to avoid a visible flash.

#### Scenario: No flash on load
- **WHEN** the page loads with a stored theme preference
- **THEN** the correct theme is applied synchronously before content renders, preventing any flash of unstyled or incorrectly themed content
