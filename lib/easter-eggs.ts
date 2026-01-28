'use client'

import { useEffect, useState, useCallback } from 'react'

export interface Achievement {
  id: string
  name: string
  description: string
  discoveredAt?: string
}

export interface EasterEggState {
  achievements: Achievement[]
  secretCommands: Record<string, boolean>
  konamiCodeActivated: boolean
}

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

const STORAGE_KEY = 'easter-eggs-state'

export const loadEasterEggState = (): EasterEggState => {
  if (typeof window === 'undefined') {
    return {
      achievements: [],
      secretCommands: {},
      konamiCodeActivated: false,
    }
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load easter egg state:', error)
  }

  return {
    achievements: [],
    secretCommands: {},
    konamiCodeActivated: false,
  }
}

export const saveEasterEggState = (state: EasterEggState): void => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save easter egg state:', error)
  }
}

export const addAchievement = (achievement: Omit<Achievement, 'discoveredAt'>): void => {
  const state = loadEasterEggState()
  
  const exists = state.achievements.some(a => a.id === achievement.id)
  if (exists) return

  const newAchievement: Achievement = {
    ...achievement,
    discoveredAt: new Date().toISOString(),
  }

  state.achievements.push(newAchievement)
  saveEasterEggState(state)
}

export const markSecretCommandDiscovered = (commandId: string): void => {
  const state = loadEasterEggState()
  state.secretCommands[commandId] = true
  saveEasterEggState(state)
}

export const markKonamiCodeActivated = (): void => {
  const state = loadEasterEggState()
  state.konamiCodeActivated = true
  saveEasterEggState(state)
}

export const resetEasterEggs = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

export const useKonamiCode = (onActivate: () => void): void => {
  const [keys, setKeys] = useState<string[]>([])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeys(prevKeys => {
        const newKeys = [...prevKeys, event.key]
        
        if (newKeys.length > KONAMI_CODE.length) {
          newKeys.shift()
        }

        if (
          newKeys.length === KONAMI_CODE.length &&
          newKeys.every((key, index) => key === KONAMI_CODE[index])
        ) {
          onActivate()
          return []
        }

        return newKeys
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onActivate])
}

export interface SecretCommand {
  pattern: RegExp | string
  execute: () => void
}

export const parseSecretCommand = (input: string, commands: SecretCommand[]): boolean => {
  for (const command of commands) {
    if (typeof command.pattern === 'string') {
      if (input.toLowerCase() === command.pattern.toLowerCase()) {
        command.execute()
        return true
      }
    } else {
      if (command.pattern.test(input)) {
        command.execute()
        return true
      }
    }
  }
  return false
}

export const useSecretCommandListener = (commands: SecretCommand[]): void => {
  const [buffer, setBuffer] = useState<string>('')

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.altKey || event.metaKey) return
      
      if (event.key === 'Enter') {
        if (buffer.trim()) {
          parseSecretCommand(buffer.trim(), commands)
          setBuffer('')
        }
        return
      }

      if (event.key === 'Escape') {
        setBuffer('')
        return
      }

      if (event.key.length === 1) {
        setBuffer(prev => prev + event.key)

        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          setBuffer('')
        }, 3000)
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => {
      window.removeEventListener('keypress', handleKeyPress)
      clearTimeout(timeoutId)
    }
  }, [buffer, commands])
}

export const useAchievementTracker = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([])

  useEffect(() => {
    const state = loadEasterEggState()
    setAchievements(state.achievements)
  }, [])

  const addNewAchievement = useCallback((achievement: Omit<Achievement, 'discoveredAt'>) => {
    addAchievement(achievement)
    const state = loadEasterEggState()
    setAchievements(state.achievements)
  }, [])

  const hasAchievement = useCallback(
    (achievementId: string): boolean => {
      return achievements.some(a => a.id === achievementId)
    },
    [achievements]
  )

  const getAchievementCount = useCallback((): number => {
    return achievements.length
  }, [achievements])

  return {
    achievements,
    addAchievement: addNewAchievement,
    hasAchievement,
    getAchievementCount,
  }
}
