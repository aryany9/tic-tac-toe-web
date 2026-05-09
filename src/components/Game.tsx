'use client'

import { useEffect, useRef, useState } from 'react'

import Board from '@/components/Board'
import PlayerSettings from '@/components/PlayerSettings'
import Scoreboard from '@/components/Scoreboard'
import { useGameReducer } from '@/hooks/useGameReducer'
import { useSound } from '@/hooks/useSound'

export default function Game() {
  const {
    state,
    makeMove,
    resetGame,
    resetScores,
    setPlayerName,
    isHydrated,
  } = useGameReducer()
  const { playMove, playWin, playDraw } = useSound()
  const [isDrawAnimating, setIsDrawAnimating] = useState(false)
  const previousMarkedCells = useRef(0)
  const previousWinner = useRef(state.winner)
  const previousDraw = useRef(state.isDraw)
  const hasInitializedRef = useRef(false)

  let statusMessage: string
  let statusClassName: string

  if (state.winner) {
    statusMessage = `${state.winner === 'X' ? state.playerXName : state.playerOName} wins!`
    statusClassName = 'text-[var(--win-ring)]'
  } else if (state.isDraw) {
    statusMessage = `Draw: ${state.playerXName} and ${state.playerOName}`
    statusClassName = 'text-[var(--accent-color)]'
  } else {
    const currentName = state.currentPlayer === 'X' ? state.playerXName : state.playerOName
    statusMessage = `${currentName}'s turn`
    statusClassName = state.currentPlayer === 'X'
      ? 'text-[var(--x-color)]'
      : 'text-[var(--o-color)]'
  }

  useEffect(() => {
    if (!isHydrated) return

    const markedCells = state.board.filter((cell) => cell !== null).length
    if (!hasInitializedRef.current) {
      previousMarkedCells.current = markedCells
      previousWinner.current = state.winner
      previousDraw.current = state.isDraw
      hasInitializedRef.current = true
      return
    }

    if (markedCells > previousMarkedCells.current) {
      playMove()
    }

    if (!previousWinner.current && state.winner) {
      playWin()
    }

    if (!previousDraw.current && state.isDraw) {
      playDraw()
      setIsDrawAnimating(true)
      const timeoutId = window.setTimeout(() => {
        setIsDrawAnimating(false)
      }, 550)
      previousMarkedCells.current = markedCells
      previousWinner.current = state.winner
      previousDraw.current = state.isDraw
      return () => window.clearTimeout(timeoutId)
    }

    previousMarkedCells.current = markedCells
    previousWinner.current = state.winner
    previousDraw.current = state.isDraw
    return undefined
  }, [isHydrated, state.board, state.isDraw, state.winner, playDraw, playMove, playWin])

  if (!isHydrated) {
    return (
      <div className="flex min-h-[22rem] flex-col items-center justify-center gap-4">
        <p className="text-sm text-[var(--foreground)]/80">Loading saved game...</p>
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-6">
      <Scoreboard
        playerXName={state.playerXName}
        playerOName={state.playerOName}
        playerXScore={state.playerXScore}
        playerOScore={state.playerOScore}
        onResetScores={resetScores}
      />

      <h2
        aria-live="polite"
        className={`text-center text-2xl font-semibold sm:text-3xl ${statusClassName}`}
      >
        {statusMessage}
      </h2>

      <Board state={state} onMakeMove={makeMove} isDrawAnimating={isDrawAnimating} />

      <button
        onClick={resetGame}
        className="rounded-lg border border-[var(--border-color)] bg-[var(--panel-bg)] px-6 py-2.5 font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--panel-hover-bg)] active:scale-95"
      >
        New Game
      </button>

      <PlayerSettings
        playerXName={state.playerXName}
        playerOName={state.playerOName}
        onNameChange={setPlayerName}
      />
    </div>
  )
}
