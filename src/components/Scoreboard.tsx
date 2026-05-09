'use client'

interface ScoreboardProps {
  playerXName: string
  playerOName: string
  playerXScore: number
  playerOScore: number
  onResetScores: () => void
}

export default function Scoreboard({
  playerXName,
  playerOName,
  playerXScore,
  playerOScore,
  onResetScores,
}: ScoreboardProps) {
  return (
    <section
      className="w-full max-w-md rounded-xl border border-[var(--border-color)] bg-[var(--panel-bg)] p-4"
      aria-label="Scoreboard"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-[var(--foreground)]/90">Scoreboard</h3>
        <button
          type="button"
          onClick={onResetScores}
          className="rounded-md border border-[var(--border-color)] bg-[var(--panel-muted-bg)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--panel-hover-bg)]"
        >
          Reset Scores
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-lg border border-[var(--border-color)] bg-[var(--panel-muted-bg)] p-3">
          <p className="font-medium text-[var(--x-color)]">{playerXName}</p>
          <p className="mt-1 text-2xl font-bold text-[var(--foreground)]">{playerXScore}</p>
        </div>
        <div className="rounded-lg border border-[var(--border-color)] bg-[var(--panel-muted-bg)] p-3">
          <p className="font-medium text-[var(--o-color)]">{playerOName}</p>
          <p className="mt-1 text-2xl font-bold text-[var(--foreground)]">{playerOScore}</p>
        </div>
      </div>
    </section>
  )
}
