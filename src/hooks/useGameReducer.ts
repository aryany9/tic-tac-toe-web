'use client'

import { useCallback, useEffect, useReducer, useState } from 'react'

export type Player = 'X' | 'O'
export type CellValue = Player | null
export type Board = CellValue[] // 9 elements

export interface GameState {
  board: Board
  currentPlayer: Player
  winner: Player | null
  winningLine: number[] | null
  isDraw: boolean
  playerXName: string
  playerOName: string
  playerXScore: number
  playerOScore: number
}

type GameAction =
  | { type: 'MAKE_MOVE'; index: number }
  | { type: 'RESET_GAME' }
  | { type: 'RESET_SCORES' }
  | { type: 'SET_PLAYER_NAME'; player: Player; name: string }
  | { type: 'HYDRATE'; state: GameState }

const GAME_STATE_STORAGE_KEY = 'ttt-game-state-v1'
const GAME_STATE_VERSION = 1
const DEFAULT_PLAYER_X_NAME = 'Player X'
const DEFAULT_PLAYER_O_NAME = 'Player O'

const WINNING_LINES: readonly number[][] = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6],
]

const createInitialState = (): GameState => ({
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  winningLine: null,
  isDraw: false,
  playerXName: DEFAULT_PLAYER_X_NAME,
  playerOName: DEFAULT_PLAYER_O_NAME,
  playerXScore: 0,
  playerOScore: 0,
})

const INITIAL_STATE: GameState = createInitialState()

function checkWinner(board: Board): { winner: Player | null; line: number[] | null } {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line }
    }
  }
  return { winner: null, line: null }
}

function checkDraw(board: Board): boolean {
  return board.every((cell) => cell !== null)
}

function isPlayer(value: unknown): value is Player {
  return value === 'X' || value === 'O'
}

function isCellValue(value: unknown): value is CellValue {
  return value === 'X' || value === 'O' || value === null
}

function sanitizeName(name: string, player: Player): string {
  const trimmed = name.trim()
  if (trimmed.length > 0) return trimmed
  return player === 'X' ? DEFAULT_PLAYER_X_NAME : DEFAULT_PLAYER_O_NAME
}

function validatePersistedState(raw: unknown): GameState | null {
  if (!raw || typeof raw !== 'object') return null

  const data = raw as Record<string, unknown>
  if (data.version !== GAME_STATE_VERSION) return null
  if (!data.state || typeof data.state !== 'object') return null

  const state = data.state as Record<string, unknown>

  if (!Array.isArray(state.board) || state.board.length !== 9 || !state.board.every(isCellValue)) {
    return null
  }
  if (!isPlayer(state.currentPlayer)) return null
  if (!(state.winner === null || isPlayer(state.winner))) return null
  if (state.winningLine !== null) {
    if (!Array.isArray(state.winningLine) || !state.winningLine.every((n) => Number.isInteger(n) && n >= 0 && n < 9)) {
      return null
    }
  }
  if (typeof state.isDraw !== 'boolean') return null
  if (typeof state.playerXName !== 'string' || typeof state.playerOName !== 'string') return null
  if (typeof state.playerXScore !== 'number' || state.playerXScore < 0 || !Number.isFinite(state.playerXScore)) return null
  if (typeof state.playerOScore !== 'number' || state.playerOScore < 0 || !Number.isFinite(state.playerOScore)) return null

  return {
    board: [...state.board],
    currentPlayer: state.currentPlayer,
    winner: state.winner,
    winningLine: state.winningLine ? [...state.winningLine] : null,
    isDraw: state.isDraw,
    playerXName: sanitizeName(state.playerXName, 'X'),
    playerOName: sanitizeName(state.playerOName, 'O'),
    playerXScore: Math.floor(state.playerXScore),
    playerOScore: Math.floor(state.playerOScore),
  }
}

function loadPersistedState(): GameState | null {
  if (typeof window === 'undefined') return null

  const raw = window.localStorage.getItem(GAME_STATE_STORAGE_KEY)
  if (!raw) return null

  try {
    return validatePersistedState(JSON.parse(raw))
  } catch (error) {
    console.warn('Failed to parse persisted game state:', error)
    return null
  }
}

function persistState(state: GameState): void {
  if (typeof window === 'undefined') return
  const payload = {
    version: GAME_STATE_VERSION,
    state,
  }
  try {
    window.localStorage.setItem(GAME_STATE_STORAGE_KEY, JSON.stringify(payload))
  } catch (error) {
    console.warn('Failed to persist game state:', error)
  }
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'MAKE_MOVE': {
      // Ignore if game is over or cell is occupied
      if (state.winner || state.isDraw || state.board[action.index] !== null) {
        return state
      }

      const newBoard = [...state.board]
      newBoard[action.index] = state.currentPlayer

      const { winner, line } = checkWinner(newBoard)
      const draw = !winner && checkDraw(newBoard)

      if (winner) {
        return {
          ...state,
          board: newBoard,
          winner,
          winningLine: line,
          playerXScore: winner === 'X' ? state.playerXScore + 1 : state.playerXScore,
          playerOScore: winner === 'O' ? state.playerOScore + 1 : state.playerOScore,
        }
      }

      if (draw) {
        return {
          ...state,
          board: newBoard,
          isDraw: true,
        }
      }

      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
      }
    }

    case 'RESET_GAME':
      return {
        ...createInitialState(),
        playerXName: state.playerXName,
        playerOName: state.playerOName,
        playerXScore: state.playerXScore,
        playerOScore: state.playerOScore,
      }

    case 'RESET_SCORES':
      return {
        ...state,
        playerXScore: 0,
        playerOScore: 0,
      }

    case 'SET_PLAYER_NAME':
      if (action.player === 'X') {
        return {
          ...state,
          playerXName: sanitizeName(action.name, 'X'),
        }
      }

      return {
        ...state,
        playerOName: sanitizeName(action.name, 'O'),
      }

    case 'HYDRATE':
      return action.state

    default:
      return state
  }
}

export function useGameReducer(): {
  state: GameState
  makeMove: (index: number) => void
  resetGame: () => void
  resetScores: () => void
  setPlayerName: (player: Player, name: string) => void
  isHydrated: boolean
} {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const persisted = loadPersistedState()
    if (persisted) {
      dispatch({ type: 'HYDRATE', state: persisted })
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    persistState(state)
  }, [isHydrated, state])

  const makeMove = useCallback((index: number) => {
    dispatch({ type: 'MAKE_MOVE', index })
  }, [])

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' })
  }, [])

  const resetScores = useCallback(() => {
    dispatch({ type: 'RESET_SCORES' })
  }, [])

  const setPlayerName = useCallback((player: Player, name: string) => {
    dispatch({ type: 'SET_PLAYER_NAME', player, name })
  }, [])

  return { state, makeMove, resetGame, resetScores, setPlayerName, isHydrated }
}
