'use client'

import { motion } from 'framer-motion'

import Cell from '@/components/Cell'
import type { GameState } from '@/hooks/useGameReducer'

interface BoardProps {
  state: GameState
  onMakeMove: (index: number) => void
  isDrawAnimating: boolean
}

export default function Board({ state, onMakeMove, isDrawAnimating }: BoardProps) {
  const isGameOver = !!state.winner || state.isDraw

  return (
    <motion.div
      role="grid"
      aria-label="Tic Tac Toe board"
      className="grid grid-cols-3 gap-2 sm:gap-3"
      animate={isDrawAnimating ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
      transition={isDrawAnimating ? { duration: 0.5, ease: 'easeInOut' } : { duration: 0.2 }}
    >
      {state.board.map((cell, index) => (
        <motion.div
          key={index}
          animate={
            state.winningLine?.includes(index)
              ? { scale: [1, 1.08, 1] }
              : { scale: 1 }
          }
          transition={
            state.winningLine?.includes(index)
              ? { duration: 0.9, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.2 }
          }
        >
          <Cell
            value={cell}
            index={index}
            onClick={onMakeMove}
            isWinningCell={state.winningLine?.includes(index) ?? false}
            isDisabled={isGameOver}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
