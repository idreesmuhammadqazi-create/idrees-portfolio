'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, X } from 'lucide-react'
import { 
  loadEasterEggState, 
  saveEasterEggState, 
  addAchievement as addAchievementToStorage,
  Achievement,
  EasterEggState 
} from '@/lib/easter-eggs'

interface EasterEggContextType {
  state: EasterEggState
  addAchievement: (achievement: Omit<Achievement, 'discoveredAt'>) => void
  hasAchievement: (achievementId: string) => boolean
  getAchievementCount: () => number
  showAchievementsModal: () => void
  hideAchievementsModal: () => void
  isAchievementsModalOpen: boolean
}

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined)

export function useEasterEgg() {
  const context = useContext(EasterEggContext)
  if (!context) {
    throw new Error('useEasterEgg must be used within EasterEggProvider')
  }
  return context
}

interface AchievementNotification {
  id: string
  achievement: Achievement
  timestamp: number
}

export function EasterEggProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EasterEggState>({
    achievements: [],
    secretCommands: {},
    konamiCodeActivated: false,
  })
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false)
  const [notifications, setNotifications] = useState<AchievementNotification[]>([])

  useEffect(() => {
    const loadedState = loadEasterEggState()
    setState(loadedState)

    const handleStorageChange = () => {
      const updatedState = loadEasterEggState()
      setState(updatedState)
    }

    window.addEventListener('storage', handleStorageChange)
    
    const interval = setInterval(() => {
      const currentState = loadEasterEggState()
      setState(currentState)
    }, 1000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const addAchievement = useCallback((achievement: Omit<Achievement, 'discoveredAt'>) => {
    const exists = state.achievements.some(a => a.id === achievement.id)
    if (exists) return

    const newAchievement: Achievement = {
      ...achievement,
      discoveredAt: new Date().toISOString(),
    }

    const newState = {
      ...state,
      achievements: [...state.achievements, newAchievement],
    }

    setState(newState)
    saveEasterEggState(newState)
    addAchievementToStorage(achievement)

    const notification: AchievementNotification = {
      id: `${achievement.id}-${Date.now()}`,
      achievement: newAchievement,
      timestamp: Date.now(),
    }

    setNotifications(prev => [...prev, notification])

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id))
    }, 5000)
  }, [state])

  const hasAchievement = useCallback(
    (achievementId: string): boolean => {
      return state.achievements.some(a => a.id === achievementId)
    },
    [state.achievements]
  )

  const getAchievementCount = useCallback((): number => {
    return state.achievements.length
  }, [state.achievements])

  const showAchievementsModal = useCallback(() => {
    setIsAchievementsModalOpen(true)
  }, [])

  const hideAchievementsModal = useCallback(() => {
    setIsAchievementsModalOpen(false)
  }, [])

  const dismissNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
  }, [])

  return (
    <EasterEggContext.Provider
      value={{
        state,
        addAchievement,
        hasAchievement,
        getAchievementCount,
        showAchievementsModal,
        hideAchievementsModal,
        isAchievementsModalOpen,
      }}
    >
      {children}
      
      <div className="fixed top-20 right-4 z-[9999] pointer-events-none">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="mb-3 pointer-events-auto"
            >
              <div className="bg-gradient-to-r from-yellow-500/90 via-orange-500/90 to-pink-500/90 backdrop-blur-md rounded-lg shadow-2xl border-2 border-white/20 overflow-hidden max-w-sm">
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: 3,
                      }}
                    >
                      <Trophy className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-xs font-bold text-white/90 uppercase tracking-wider">
                          Achievement Unlocked!
                        </p>
                        <button
                          onClick={() => dismissNotification(notification.id)}
                          className="p-1 rounded hover:bg-white/20 transition-colors"
                          aria-label="Dismiss notification"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                      <h4 className="text-base font-bold text-white mb-1">
                        {notification.achievement.name}
                      </h4>
                      <p className="text-sm text-white/80">
                        {notification.achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className="h-1 bg-white/30"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </EasterEggContext.Provider>
  )
}
