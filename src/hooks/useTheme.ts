'use client'

import { useCallback, useEffect, useState } from 'react'

export type ThemeId = 'light' | 'dark' | 'cyberpunk' | 'retro' | 'pastel'

interface ThemeOption {
  id: ThemeId
  label: string
  themeColor: string
}

const THEME_STORAGE_KEY = 'ttt-theme'

const THEMES: readonly ThemeOption[] = [
  { id: 'light', label: 'Light', themeColor: '#f8fafc' },
  { id: 'dark', label: 'Dark', themeColor: '#020617' },
  { id: 'cyberpunk', label: 'Cyberpunk', themeColor: '#09090f' },
  { id: 'retro', label: 'Retro', themeColor: '#f6edd9' },
  { id: 'pastel', label: 'Pastel', themeColor: '#f8f4ff' },
]

function isThemeId(value: string): value is ThemeId {
  return THEMES.some((theme) => theme.id === value)
}

function inferDefaultTheme(): ThemeId {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme(): {
  theme: ThemeId
  themes: readonly ThemeOption[]
  setTheme: (theme: ThemeId) => void
  isInitialized: boolean
} {
  const [theme, setTheme] = useState<ThemeId>('light')
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
      if (stored && isThemeId(stored)) {
        setTheme(stored)
      } else {
        setTheme(inferDefaultTheme())
      }
    } catch (error) {
      console.warn('Unable to read stored theme, using system preference:', error)
      setTheme(inferDefaultTheme())
    }
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    try {
      const hasStored = window.localStorage.getItem(THEME_STORAGE_KEY) !== null
      if (hasStored) return
    } catch (error) {
      console.warn('Unable to read stored theme while subscribing to system preference:', error)
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!isInitialized) return
    const root = window.document.documentElement
    root.setAttribute('data-theme', theme)

    const metaTag = window.document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null
    const selectedTheme = THEMES.find((entry) => entry.id === theme)
    if (metaTag) {
      metaTag.content = selectedTheme?.themeColor ?? '#f8fafc'
    }

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch (error) {
      console.warn('Unable to persist selected theme:', error)
    }
  }, [theme, isInitialized])

  const setCurrentTheme = useCallback((nextTheme: ThemeId) => {
    setTheme(nextTheme)
  }, [])

  return {
    theme,
    themes: THEMES,
    setTheme: setCurrentTheme,
    isInitialized,
  }
}
