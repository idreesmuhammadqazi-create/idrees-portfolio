'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy, Share2, Download, Lock, Unlock, Award, Target, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { loadEasterEggState, Achievement, EasterEggState } from '@/lib/easter-eggs'
import { Card } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

interface AchievementsModalProps {
  isOpen: boolean
  onClose: () => void
}

const TOTAL_ACHIEVEMENTS = 11
const ALL_POSSIBLE_ACHIEVEMENTS = [
  { id: 'dev-console-found', name: 'Console Cowboy', description: 'Discovered the secret developer console', icon: '🖥️' },
  { id: 'project-viewer', name: 'Project Explorer', description: 'Viewed the secret projects list', icon: '🚀' },
  { id: 'secret-unlocker', name: 'Secret Keeper', description: 'Unlocked the hidden feature via console', icon: '🔐' },
  { id: 'konami-master', name: 'Konami Master', description: 'Activated the legendary Konami Code', icon: '🎮' },
  { id: 'cursor-explorer', name: 'Cursor Explorer', description: 'Discovered the custom cursor feature', icon: '🖱️' },
  { id: 'easter-egg-hunter', name: 'Easter Egg Hunter', description: 'Found 5 different easter eggs', icon: '🥚' },
  { id: 'completionist', name: 'Completionist', description: 'Unlocked all achievements', icon: '💯' },
  { id: 'speed-runner', name: 'Speed Runner', description: 'Found 3 secrets in under 5 minutes', icon: '⚡' },
  { id: 'night-owl', name: 'Night Owl', description: 'Visited the site past midnight', icon: '🦉' },
  { id: 'social-butterfly', name: 'Social Butterfly', description: 'Shared achievements on social media', icon: '🦋' },
  { id: 'vault-explorer', name: 'Vault Explorer', description: 'Discovered the secret page with behind-the-scenes stories', icon: '🔐' },
]

export default function AchievementsModal({ isOpen, onClose }: AchievementsModalProps) {
  const [state, setState] = useState<EasterEggState>({
    achievements: [],
    secretCommands: {},
    konamiCodeActivated: false,
  })
  const [newlyUnlocked, setNewlyUnlocked] = useState<string[]>([])
  const [shareNotification, setShareNotification] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const currentState = loadEasterEggState()
      setState(currentState)
    }
  }, [isOpen])

  const achievedIds = new Set(state.achievements.map(a => a.id))
  const progressPercentage = Math.round((state.achievements.length / TOTAL_ACHIEVEMENTS) * 100)
  const commandsUsed = Object.keys(state.secretCommands).length

  const triggerUnlockAnimation = (achievementId: string) => {
    setNewlyUnlocked(prev => [...prev, achievementId])
    setTimeout(() => {
      setNewlyUnlocked(prev => prev.filter(id => id !== achievementId))
    }, 2000)
  }

  const getAchievementStatus = (achievementId: string) => {
    return achievedIds.has(achievementId)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const generateShareText = () => {
    const unlockedCount = state.achievements.length
    const percentage = progressPercentage
    return `🏆 I've unlocked ${unlockedCount}/${TOTAL_ACHIEVEMENTS} achievements (${percentage}%) on this portfolio! Can you find them all? 🎮✨`
  }

  const handleShare = async () => {
    const shareText = generateShareText()
    
    if (navigator.share) {
      try {
        await navigator.share({
          text: shareText,
        })
        setShareNotification(true)
        setTimeout(() => setShareNotification(false), 3000)
      } catch (err) {
        copyToClipboard(shareText)
      }
    } else {
      copyToClipboard(shareText)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setShareNotification(true)
      setTimeout(() => setShareNotification(false), 3000)
    })
  }

  const handleDownloadStats = () => {
    const statsData = {
      totalAchievements: TOTAL_ACHIEVEMENTS,
      unlockedAchievements: state.achievements.length,
      progressPercentage,
      achievements: state.achievements,
      secretCommandsUsed: commandsUsed,
      konamiCodeActivated: state.konamiCodeActivated,
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(statsData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `achievements-${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl md:h-auto md:max-h-[90vh] z-50"
          >
            <Card className="h-full flex flex-col bg-background/95 backdrop-blur-md border-2 overflow-hidden" hover={false}>
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Trophy className="w-8 h-8 text-yellow-500" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold">Achievements</h2>
                    <p className="text-sm text-muted-foreground">
                      {state.achievements.length} of {TOTAL_ACHIEVEMENTS} unlocked
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-6 py-4 bg-muted/30 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm font-bold">{progressPercentage}%</span>
                </div>
                <div className="relative h-3 bg-background rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                  />
                </div>

                <div className="flex items-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="text-muted-foreground">Commands: {commandsUsed}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-500" />
                    <span className="text-muted-foreground">
                      Konami: {state.konamiCodeActivated ? '✅' : '❌'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ALL_POSSIBLE_ACHIEVEMENTS.map((achievement) => {
                    const isUnlocked = getAchievementStatus(achievement.id)
                    const unlockedData = state.achievements.find(a => a.id === achievement.id)
                    const isNew = newlyUnlocked.includes(achievement.id)

                    return (
                      <motion.div
                        key={achievement.id}
                        initial={false}
                        animate={
                          isNew
                            ? {
                                scale: [1, 1.05, 1],
                                rotate: [0, 2, -2, 0],
                              }
                            : {}
                        }
                        transition={{ duration: 0.5 }}
                        className={cn(
                          'relative p-4 rounded-lg border-2 transition-all',
                          isUnlocked
                            ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                            : 'bg-muted/30 border-border opacity-60'
                        )}
                      >
                        {isNew && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full"
                          >
                            NEW!
                          </motion.div>
                        )}

                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              'text-3xl flex-shrink-0',
                              !isUnlocked && 'opacity-30 grayscale'
                            )}
                          >
                            {achievement.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3
                                className={cn(
                                  'font-semibold text-sm',
                                  isUnlocked ? 'text-foreground' : 'text-muted-foreground'
                                )}
                              >
                                {achievement.name}
                              </h3>
                              {isUnlocked ? (
                                <Unlock className="w-4 h-4 text-green-500 flex-shrink-0" />
                              ) : (
                                <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {isUnlocked ? achievement.description : '???'}
                            </p>
                            {unlockedData?.discoveredAt && (
                              <Badge variant="outline" size="sm" className="text-xs">
                                {formatDate(unlockedData.discoveredAt)}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {isUnlocked && (
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 origin-left"
                          />
                        )}
                      </motion.div>
                    )
                  })}
                </div>

                {state.achievements.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <Star className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No Achievements Yet</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Start exploring the site to discover hidden easter eggs and unlock achievements!
                      Try the developer console, look for secret commands, or find special interactions.
                    </p>
                  </motion.div>
                )}
              </div>

              <div className="p-6 border-t border-border bg-muted/30">
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    leftIcon={<Share2 className="w-4 h-4" />}
                    onClick={handleShare}
                    disabled={state.achievements.length === 0}
                  >
                    Share Progress
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    leftIcon={<Download className="w-4 h-4" />}
                    onClick={handleDownloadStats}
                    disabled={state.achievements.length === 0}
                  >
                    Export Stats
                  </Button>
                  {progressPercentage === 100 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="ml-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-lg font-bold"
                    >
                      <Trophy className="w-5 h-5" />
                      <span>100% Complete!</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>

          <AnimatePresence>
            {shareNotification && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-4 right-4 z-[60] bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-medium flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                <span>Copied to clipboard!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
