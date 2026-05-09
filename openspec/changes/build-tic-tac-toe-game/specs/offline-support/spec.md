## ADDED Requirements

### Requirement: Application registers a service worker for caching
The application SHALL register a service worker that caches all critical assets on first load.

#### Scenario: Service worker installs on first visit
- **WHEN** the user visits the application for the first time with an internet connection
- **THEN** the service worker installs and caches the app shell, CSS, JavaScript bundles, and static assets

### Requirement: Application provides a valid web app manifest
The application SHALL include a `manifest.json` file that declares the app's name, icons, display mode, and theme colors.

#### Scenario: Manifest is accessible
- **WHEN** the browser requests `/manifest.json`
- **THEN** a valid JSON response with `name`, `short_name`, `start_url`, `display`, and `icons` fields is returned

### Requirement: Application functions fully without an internet connection
The application SHALL be fully playable after initial load even when the network is disconnected.

#### Scenario: Playable offline
- **WHEN** the user loads the app online, then disconnects from the network and reloads
- **THEN** the game renders correctly and all gameplay features (moves, win/draw detection, reset) work without errors

### Requirement: Application is installable on supported devices
The application SHALL meet PWA install criteria so users can add it to their home screen or app launcher.

#### Scenario: Install prompt appears
- **WHEN** the user visits the app on a supporting browser (Chrome mobile, Safari iOS with "Add to Home Screen")
- **THEN** the browser offers an option to install/add the application

### Requirement: Theme colors match the current mode in the manifest and meta tags
The application SHALL set `<meta name="theme-color">` and manifest `theme_color` / `background_color` values that correspond to the active theme.

#### Scenario: Light mode theme color
- **WHEN** the app is in light mode
- **THEN** the browser chrome (address bar, status bar) uses a light theme color

#### Scenario: Dark mode theme color
- **WHEN** the app is in dark mode
- **THEN** the browser chrome uses a dark theme color
