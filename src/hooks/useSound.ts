'use client'

import { useCallback, useEffect, useRef } from 'react'

type SoundName = 'move' | 'win' | 'draw'

const SOUND_SOURCES: Record<SoundName, string> = {
  move: '/sounds/move.wav',
  win: '/sounds/win.wav',
  draw: '/sounds/draw.wav',
}

export function useSound(): {
  playMove: () => void
  playWin: () => void
  playDraw: () => void
} {
  const soundsRef = useRef<Map<SoundName, HTMLAudioElement>>(new Map())

  useEffect(() => {
    const sounds = new Map<SoundName, HTMLAudioElement>()
    for (const [name, src] of Object.entries(SOUND_SOURCES) as [SoundName, string][]) {
      const audio = new Audio(src)
      audio.preload = 'auto'
      sounds.set(name, audio)
    }
    soundsRef.current = sounds
  }, [])

  const playSound = useCallback((name: SoundName) => {
    const sound = soundsRef.current.get(name)
    if (!sound) return
    sound.currentTime = 0
    void sound.play().catch((error) => {
      console.warn(`Failed to play "${name}" sound:`, error)
    })
  }, [])

  const playMove = useCallback(() => {
    playSound('move')
  }, [playSound])

  const playWin = useCallback(() => {
    playSound('win')
  }, [playSound])

  const playDraw = useCallback(() => {
    playSound('draw')
  }, [playSound])

  return { playMove, playWin, playDraw }
}
