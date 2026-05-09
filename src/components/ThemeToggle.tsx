'use client'

import { useTheme } from '@/hooks/useTheme'

export default function ThemeToggle() {
  const { theme, themes, setTheme, isInitialized } = useTheme()

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
      <span className="sr-only">Theme</span>
      <select
        aria-label="Select theme"
        value={theme}
        onChange={(event) => setTheme(event.target.value as typeof theme)}
        disabled={!isInitialized}
        className="h-10 rounded-lg border border-[var(--border-color)] bg-[var(--panel-bg)] px-3 text-sm text-[var(--foreground)] outline-none transition-colors hover:bg-[var(--panel-hover-bg)] focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/30 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {themes.map((themeOption) => (
          <option key={themeOption.id} value={themeOption.id}>
            {themeOption.label}
          </option>
        ))}
      </select>
    </label>
  )
}
