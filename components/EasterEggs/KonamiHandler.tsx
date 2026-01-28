'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Sparkles } from 'lucide-react'
import { useKonamiCode, markKonamiCodeActivated, addAchievement } from '@/lib/easter-eggs'

interface MatrixChar {
  id: number
  x: number
  y: number
  char: string
  speed: number
  opacity: number
}

interface KonamiHandlerProps {
  enabled?: boolean
}

const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const THEME_COLORS = [
  { name: 'Matrix Green', bg: '#0d1117', accent: '#00ff41', text: '#00ff41' },
  { name: 'Cyber Purple', bg: '#1a0b2e', accent: '#c724b1', text: '#e056fd' },
  { name: 'Neon Blue', bg: '#0a0e27', accent: '#00d9ff', text: '#0ff' },
  { name: 'Sunset Orange', bg: '#1f0d00', accent: '#ff6b35', text: '#ff9d76' },
  { name: 'Electric Pink', bg: '#2d0a1f', accent: '#ff006e', text: '#ff4da6' },
]

export default function KonamiHandler({ enabled = true }: KonamiHandlerProps) {
  const [isActivated, setIsActivated] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [matrixChars, setMatrixChars] = useState<MatrixChar[]>([])
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0)
  const [showMatrixRain, setShowMatrixRain] = useState(false)
  const [themeShiftActive, setThemeShiftActive] = useState(false)
  
  const charIdRef = useRef(0)
  const themeIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const triggerKonamiEffects = useCallback(() => {
    if (isActivated) return

    setIsActivated(true)
    markKonamiCodeActivated()
    addAchievement({
      id: 'konami-code-master',
      name: 'Konami Code Master',
      description: 'Discovered the legendary Konami Code',
    })

    setShowMatrixRain(true)
    
    setTimeout(() => {
      setShowMessage(true)
    }, 500)

    setTimeout(() => {
      setThemeShiftActive(true)
      
      themeIntervalRef.current = setInterval(() => {
        setCurrentThemeIndex(prev => (prev + 1) % THEME_COLORS.length)
      }, 2000)
    }, 1500)

    setTimeout(() => {
      setShowMessage(false)
      setShowMatrixRain(false)
      setThemeShiftActive(false)
      
      if (themeIntervalRef.current) {
        clearInterval(themeIntervalRef.current)
        themeIntervalRef.current = null
      }
      
      setMatrixChars([])
      setCurrentThemeIndex(0)
      
      document.documentElement.style.removeProperty('--konami-bg')
      document.documentElement.style.removeProperty('--konami-accent')
      document.documentElement.style.removeProperty('--konami-text')
    }, 10000)
  }, [isActivated])

  useKonamiCode(triggerKonamiEffects)

  useEffect(() => {
    if (!showMatrixRain) return

    const columns = Math.floor(window.innerWidth / 20)
    const initialChars: MatrixChar[] = []

    for (let i = 0; i < columns; i++) {
      initialChars.push({
        id: charIdRef.current++,
        x: i * 20,
        y: Math.random() * -500,
        char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
        speed: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.5,
      })
    }

    setMatrixChars(initialChars)

    const intervalId = setInterval(() => {
      setMatrixChars(prev => {
        const updated = prev.map(char => {
          const newY = char.y + char.speed
          
          if (newY > window.innerHeight + 50) {
            return {
              ...char,
              y: -50,
              x: Math.floor(Math.random() * columns) * 20,
              char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
              speed: Math.random() * 3 + 2,
              opacity: Math.random() * 0.5 + 0.5,
            }
          }

          return {
            ...char,
            y: newY,
            char: Math.random() > 0.95 
              ? MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
              : char.char,
          }
        })

        return updated
      })
    }, 50)

    return () => clearInterval(intervalId)
  }, [showMatrixRain])

  useEffect(() => {
    if (!themeShiftActive) return

    const theme = THEME_COLORS[currentThemeIndex]
    document.documentElement.style.setProperty('--konami-bg', theme.bg)
    document.documentElement.style.setProperty('--konami-accent', theme.accent)
    document.documentElement.style.setProperty('--konami-text', theme.text)
  }, [themeShiftActive, currentThemeIndex])

  useEffect(() => {
    return () => {
      if (themeIntervalRef.current) {
        clearInterval(themeIntervalRef.current)
      }
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <AnimatePresence>
        {showMatrixRain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9990] pointer-events-none overflow-hidden"
            style={{
              background: themeShiftActive 
                ? `var(--konami-bg, #000)` 
                : 'rgba(0, 0, 0, 0.9)',
            }}
          >
            {matrixChars.map(char => (
              <motion.div
                key={char.id}
                className="absolute font-mono text-lg font-bold select-none"
                style={{
                  left: char.x,
                  top: char.y,
                  color: themeShiftActive 
                    ? `var(--konami-accent, #00ff41)` 
                    : '#00ff41',
                  opacity: char.opacity,
                  textShadow: themeShiftActive
                    ? `0 0 10px var(--konami-accent, #00ff41)`
                    : '0 0 10px #00ff41',
                }}
              >
                {char.char}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            transition={{ 
              type: 'spring', 
              duration: 0.8,
              delay: 0.2,
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9995] pointer-events-none"
          >
            <motion.div
              animate={{
                rotate: [0, 2, -2, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-2xl blur-xl opacity-75 animate-pulse" />
              
              <div className="relative bg-background border-4 border-accent rounded-2xl px-12 py-8 shadow-2xl">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="flex items-center justify-center gap-4 mb-4"
                >
                  <Zap 
                    className="w-12 h-12"
                    style={{
                      color: themeShiftActive 
                        ? `var(--konami-accent, #00ff41)` 
                        : '#00ff41',
                    }}
                  />
                  <Sparkles 
                    className="w-12 h-12"
                    style={{
                      color: themeShiftActive 
                        ? `var(--konami-accent, #00ff41)` 
                        : '#00ff41',
                    }}
                  />
                </motion.div>

                <motion.h2
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="text-4xl font-bold text-center mb-3"
                  style={{
                    background: themeShiftActive
                      ? `linear-gradient(90deg, var(--konami-accent), var(--konami-text), var(--konami-accent))`
                      : 'linear-gradient(90deg, #00ff41, #00d9ff, #00ff41)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  KONAMI CODE ACTIVATED!
                </motion.h2>

                <p className="text-center text-lg font-semibold text-muted-foreground">
                  ↑ ↑ ↓ ↓ ← → ← → B A
                </p>

                <motion.p
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-center text-sm mt-4 font-medium"
                  style={{
                    color: themeShiftActive 
                      ? `var(--konami-text, #00ff41)` 
                      : '#00ff41',
                  }}
                >
                  You&apos;ve unlocked the secret realm!
                </motion.p>

                {themeShiftActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <p className="text-center text-xs font-medium text-muted-foreground">
                      Theme: <span 
                        className="font-bold"
                        style={{
                          color: themeShiftActive 
                            ? `var(--konami-accent, #00ff41)` 
                            : '#00ff41',
                        }}
                      >
                        {THEME_COLORS[currentThemeIndex].name}
                      </span>
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {themeShiftActive && !showMessage && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="fixed top-4 right-4 z-[9991] pointer-events-none"
          >
            <div 
              className="px-4 py-2 rounded-lg backdrop-blur-md shadow-lg border-2"
              style={{
                background: `${themeShiftActive ? 'var(--konami-bg, rgba(0, 0, 0, 0.8))' : 'rgba(0, 0, 0, 0.8)'}`,
                borderColor: `${themeShiftActive ? 'var(--konami-accent, #00ff41)' : '#00ff41'}`,
              }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <Sparkles 
                    className="w-4 h-4"
                    style={{
                      color: themeShiftActive 
                        ? `var(--konami-accent, #00ff41)` 
                        : '#00ff41',
                    }}
                  />
                </motion.div>
                <span 
                  className="text-sm font-bold"
                  style={{
                    color: themeShiftActive 
                      ? `var(--konami-text, #00ff41)` 
                      : '#00ff41',
                  }}
                >
                  {THEME_COLORS[currentThemeIndex].name}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
