'use client'

import { AnimatePresence, motion } from 'framer-motion'

import type { CellValue } from '@/hooks/useGameReducer'

interface CellProps {
  value: CellValue
  index: number
  onClick: (index: number) => void
  isWinningCell: boolean
  isDisabled: boolean
}

export default function Cell({ value, index, onClick, isWinningCell, isDisabled }: CellProps) {
  return (
    <button
      aria-label={`Cell ${Math.floor(index / 3) + 1}, ${(index % 3) + 1}${value ? `, ${value}` : ', empty'}`}
      className={[
        'flex h-20 w-20 items-center justify-center rounded-lg border-2 text-4xl font-bold transition-all duration-200',
        'border-[var(--border-color)]',
        !value && !isDisabled
          ? 'cursor-pointer bg-[var(--panel-bg)] hover:bg-[var(--panel-hover-bg)] active:scale-95'
          : value
            ? 'cursor-default bg-[var(--panel-bg)]'
            : 'cursor-not-allowed bg-[var(--panel-muted-bg)]',
        isWinningCell
          ? 'animate-win-pulse bg-[var(--win-bg)] ring-2 ring-[var(--win-ring)]'
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => onClick(index)}
      disabled={isDisabled || value !== null}
    >
      <AnimatePresence initial={false} mode="wait">
        {value ? (
          <motion.span
            key={`${index}-${value}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 20 }}
            className={value === 'X' ? 'text-[var(--x-color)]' : 'text-[var(--o-color)]'}
          >
            {value}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </button>
  )
}
