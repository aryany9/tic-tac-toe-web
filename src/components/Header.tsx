'use client'

import ThemeToggle from '@/components/ThemeToggle'

export default function Header() {
  return (
    <header className="flex w-full max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
      <h1 className="text-lg font-bold tracking-tight sm:text-xl">Tic Tac Toe</h1>
      <ThemeToggle />
    </header>
  )
}
