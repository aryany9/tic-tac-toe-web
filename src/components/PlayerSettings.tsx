'use client'

import type { Player } from '@/hooks/useGameReducer'

interface PlayerSettingsProps {
  playerXName: string
  playerOName: string
  onNameChange: (player: Player, name: string) => void
}

export default function PlayerSettings({
  playerXName,
  playerOName,
  onNameChange,
}: PlayerSettingsProps) {
  return (
    <fieldset
      className="w-full max-w-md rounded-xl border border-[var(--border-color)] bg-[var(--panel-bg)] p-4"
      aria-label="Player settings"
    >
      <legend className="px-1 text-sm font-semibold text-[var(--foreground)]/90">Player Settings</legend>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-[var(--x-color)]">Player X Name</span>
          <input
            type="text"
            value={playerXName}
            onChange={(event) => onNameChange('X', event.target.value)}
            className="rounded-lg border border-[var(--border-color)] bg-[var(--panel-muted-bg)] px-3 py-2 text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/30"
            maxLength={20}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-[var(--o-color)]">Player O Name</span>
          <input
            type="text"
            value={playerOName}
            onChange={(event) => onNameChange('O', event.target.value)}
            className="rounded-lg border border-[var(--border-color)] bg-[var(--panel-muted-bg)] px-3 py-2 text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/30"
            maxLength={20}
          />
        </label>
      </div>
    </fieldset>
  )
}
