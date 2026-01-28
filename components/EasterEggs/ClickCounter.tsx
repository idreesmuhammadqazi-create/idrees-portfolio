'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MousePointerClick, Sparkles, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { addAchievement } from '@/lib/easter-eggs'

interface ClickCounterProps {
  children: React.ReactNode
  className?: string
}

interface Milestone {
  clicks: number
  message: string
  icon: string
  achievement?: {
    id: string
    name: string
    description: string
  }
}

const MILESTONES: Milestone[] = [
  {
    clicks: 5,
    message: 'Curious, are we?',
    icon: '👀',
  },
  {
    clicks: 10,
    message: 'You really like clicking!',
    icon: '🖱️',
    achievement: {
      id: 'logo-clicker',
      name: 'Logo Clicker',
      description: 'Clicked the logo 10 times',
    },
  },
  {
    clicks: 25,
    message: 'This is getting serious...',
    icon: '😮',
  },
  {
    clicks: 50,
    message: 'Half a hundred clicks!',
    icon: '🎉',
    achievement: {
      id: 'click-enthusiast',
      name: 'Click Enthusiast',
      description: 'Clicked the logo 50 times',
    },
  },
  {
    clicks: 100,
    message: 'Century Club member!',
    icon: '💯',
    achievement: {
      id: 'click-centurion',
      name: 'Click Centurion',
      description: 'Reached 100 logo clicks',
    },
  },
  {
    clicks: 250,
    message: 'You have dedication!',
    icon: '🏆',
  },
  {
    clicks: 500,
    message: 'Half a thousand! Wow!',
    icon: '⚡',
    achievement: {
      id: 'click-master',
      name: 'Click Master',
      description: 'Clicked the logo 500 times',
    },
  },
  {
    clicks: 1000,
    message: 'ONE THOUSAND CLICKS!',
    icon: '🌟',
    achievement: {
      id: 'click-legend',
      name: 'Click Legend',
      description: 'Achieved the legendary 1000 clicks',
    },
  },
]

const STORAGE_KEY = 'logo-click-count'
const SHOW_BADGE_THRESHOLD = 5

export default function ClickCounter({ children, className }: ClickCounterProps) {
  const [clickCount, setClickCount] = useState(0)
  const [showBadge, setShowBadge] = useState(false)
  const [secretMessage, setSecretMessage] = useState<string | null>(null)
  const [messageIcon, setMessageIcon] = useState<string>('')
  const [reachedMilestones, setReachedMilestones] = useState<Set<number>>(new Set())
  const [showClickAnimation, setShowClickAnimation] = useState(false)
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const count = parseInt(stored, 10)
      setClickCount(count)
      if (count >= SHOW_BADGE_THRESHOLD) {
        setShowBadge(true)
      }
      
      const reached = new Set<number>()
      MILESTONES.forEach(milestone => {
        if (count >= milestone.clicks) {
          reached.add(milestone.clicks)
        }
      })
      setReachedMilestones(reached)
    }
  }, [])

  const handleClick = useCallback((event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setClickPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })

    const newCount = clickCount + 1
    setClickCount(newCount)
    localStorage.setItem(STORAGE_KEY, newCount.toString())

    setShowClickAnimation(true)
    setTimeout(() => setShowClickAnimation(false), 300)

    if (newCount >= SHOW_BADGE_THRESHOLD && !showBadge) {
      setShowBadge(true)
    }

    const milestone = MILESTONES.find(m => m.clicks === newCount)
    if (milestone && !reachedMilestones.has(milestone.clicks)) {
      setSecretMessage(milestone.message)
      setMessageIcon(milestone.icon)
      setReachedMilestones(prev => {
        const newSet = new Set(prev)
        newSet.add(milestone.clicks)
        return newSet
      })

      if (milestone.achievement) {
        addAchievement(milestone.achievement)
      }

      setTimeout(() => {
        setSecretMessage(null)
        setMessageIcon('')
      }, 3000)
    }
  }, [clickCount, showBadge, reachedMilestones])

  const getNextMilestone = () => {
    return MILESTONES.find(m => m.clicks > clickCount)
  }

  const nextMilestone = getNextMilestone()

  return (
    <>
      <div className={cn('relative inline-block', className)} onClick={handleClick}>
        {children}
        {showClickAnimation && clickPosition && (
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute rounded-full bg-accent/30 w-8 h-8 pointer-events-none"
            style={{
              left: clickPosition.x - 16,
              top: clickPosition.y - 16,
            }}
          />
        )}
      </div>

      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed top-20 left-4 z-40"
          >
            <div className="bg-background/95 backdrop-blur-md border-2 border-border rounded-lg p-3 shadow-xl">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <MousePointerClick className="w-5 h-5 text-accent" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold">{clickCount}</span>
                    <span className="text-xs text-muted-foreground">clicks</span>
                  </div>
                  {nextMilestone && (
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(clickCount / nextMilestone.clicks) * 100}%` }}
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {nextMilestone.clicks}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {reachedMilestones.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 pt-2 border-t border-border"
                >
                  <div className="flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                    <span className="text-xs text-muted-foreground">
                      {reachedMilestones.size} milestone{reachedMilestones.size !== 1 ? 's' : ''}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {secretMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 p-0.5 rounded-xl shadow-2xl">
              <div className="bg-background rounded-lg px-6 py-4">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-3xl">{messageIcon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                        Milestone Reached!
                      </span>
                    </div>
                    <p className="text-base font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                      {secretMessage}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
