'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CursorPosition {
  x: number
  y: number
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  emoji?: string
}

interface TrailPoint {
  id: number
  x: number
  y: number
  timestamp: number
}

type CursorMode = 'default' | 'sparkles' | 'trail' | 'emoji' | 'rainbow'

interface CustomCursorProps {
  enabled?: boolean
  defaultMode?: CursorMode
  triggerKey?: string
  activateOnClicks?: number
}

const EMOJIS = ['✨', '⭐', '💫', '🌟', '💥', '🎉', '🎊', '🔥', '❤️', '💜']

export default function CustomCursor({
  enabled = true,
  defaultMode = 'default',
  triggerKey = 'c',
  activateOnClicks = 0,
}: CustomCursorProps) {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [mode, setMode] = useState<CursorMode>(defaultMode)
  const [particles, setParticles] = useState<Particle[]>([])
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [clickCount, setClickCount] = useState(0)
  const [isHolding, setIsHolding] = useState(false)
  
  const particleIdRef = useRef(0)
  const trailIdRef = useRef(0)
  const lastParticleTimeRef = useRef(0)
  const lastTrailTimeRef = useRef(0)

  const cycleModes = useCallback(() => {
    const modes: CursorMode[] = ['default', 'sparkles', 'trail', 'emoji', 'rainbow']
    const currentIndex = modes.indexOf(mode)
    const nextIndex = (currentIndex + 1) % modes.length
    setMode(modes[nextIndex])
  }, [mode])

  useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      const now = Date.now()

      if (mode === 'sparkles' && now - lastParticleTimeRef.current > 50) {
        lastParticleTimeRef.current = now
        
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4 - 2,
          life: 1,
          maxLife: Math.random() * 0.5 + 0.5,
        }
        
        setParticles(prev => [...prev, newParticle])
      }

      if (mode === 'trail' && now - lastTrailTimeRef.current > 20) {
        lastTrailTimeRef.current = now
        
        const newTrail: TrailPoint = {
          id: trailIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          timestamp: now,
        }
        
        setTrail(prev => [...prev, newTrail].slice(-20))
      }

      if (mode === 'emoji' && isHolding && now - lastParticleTimeRef.current > 100) {
        lastParticleTimeRef.current = now
        
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * -3 - 1,
          life: 1,
          maxLife: 2,
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        }
        
        setParticles(prev => [...prev, newParticle])
      }

      if (mode === 'rainbow' && now - lastTrailTimeRef.current > 15) {
        lastTrailTimeRef.current = now
        
        const newTrail: TrailPoint = {
          id: trailIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          timestamp: now,
        }
        
        setTrail(prev => [...prev, newTrail].slice(-30))
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleClick = (e: MouseEvent) => {
      if (activateOnClicks > 0) {
        setClickCount(prev => {
          const newCount = prev + 1
          if (newCount >= activateOnClicks && mode === 'default') {
            cycleModes()
            return 0
          }
          return newCount
        })
      }

      if (mode === 'sparkles' || mode === 'emoji') {
        for (let i = 0; i < 12; i++) {
          const angle = (Math.PI * 2 * i) / 12
          const speed = Math.random() * 3 + 2
          
          const newParticle: Particle = {
            id: particleIdRef.current++,
            x: e.clientX,
            y: e.clientY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            maxLife: 1.5,
            emoji: mode === 'emoji' ? EMOJIS[Math.floor(Math.random() * EMOJIS.length)] : undefined,
          }
          
          setParticles(prev => [...prev, newParticle])
        }
      }
    }

    const handleMouseDown = () => {
      setIsHolding(true)
    }

    const handleMouseUp = () => {
      setIsHolding(false)
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === triggerKey.toLowerCase()) {
        cycleModes()
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('click', handleClick)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('keypress', handleKeyPress)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('keypress', handleKeyPress)
    }
  }, [enabled, mode, isHolding, cycleModes, triggerKey, activateOnClicks])

  useEffect(() => {
    if (particles.length === 0) return

    const animationFrame = requestAnimationFrame(function animate() {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.15,
            life: p.life - 0.02,
          }))
          .filter(p => p.life > 0)
      )
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [particles])

  useEffect(() => {
    if (trail.length === 0) return

    const timeout = setTimeout(() => {
      const now = Date.now()
      setTrail(prev => prev.filter(t => now - t.timestamp < 500))
    }, 50)

    return () => clearTimeout(timeout)
  }, [trail])

  if (!enabled || !isVisible) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        animate={{
          x: cursorPosition.x - 10,
          y: cursorPosition.y - 10,
        }}
        transition={{
          type: 'spring',
          stiffness: mode === 'default' ? 500 : 800,
          damping: mode === 'default' ? 28 : 35,
          mass: 0.5,
        }}
      >
        <div
          className={`rounded-full border-2 ${
            mode === 'default'
              ? 'w-5 h-5 border-white'
              : mode === 'sparkles'
              ? 'w-6 h-6 border-yellow-300'
              : mode === 'trail'
              ? 'w-6 h-6 border-blue-400'
              : mode === 'emoji'
              ? 'w-7 h-7 border-pink-400'
              : 'w-6 h-6 border-purple-400'
          } transition-all duration-300`}
        />
      </motion.div>

      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="pointer-events-none fixed z-[9998]"
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: particle.x,
              y: particle.y,
              opacity: particle.life / particle.maxLife,
              scale: particle.life / particle.maxLife,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.1 }}
          >
            {particle.emoji ? (
              <span className="text-2xl select-none">{particle.emoji}</span>
            ) : (
              <div
                className={`w-2 h-2 rounded-full ${
                  mode === 'sparkles'
                    ? 'bg-yellow-300'
                    : mode === 'emoji'
                    ? 'bg-pink-400'
                    : 'bg-white'
                }`}
                style={{
                  boxShadow: `0 0 ${10 * (particle.life / particle.maxLife)}px ${
                    mode === 'sparkles'
                      ? 'rgba(253, 224, 71, 0.8)'
                      : mode === 'emoji'
                      ? 'rgba(244, 114, 182, 0.8)'
                      : 'rgba(255, 255, 255, 0.8)'
                  }`,
                }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {trail.map((point, index) => {
          const age = Date.now() - point.timestamp
          const opacity = Math.max(0, 1 - age / 500)
          const scale = opacity * 0.8

          return (
            <motion.div
              key={point.id}
              className="pointer-events-none fixed z-[9997]"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                x: point.x - 4,
                y: point.y - 4,
                opacity,
                scale,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.1 }}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  mode === 'rainbow'
                    ? ''
                    : 'bg-blue-400'
                }`}
                style={
                  mode === 'rainbow'
                    ? {
                        background: `hsl(${(index * 360) / trail.length}, 80%, 60%)`,
                      }
                    : {}
                }
              />
            </motion.div>
          )
        })}
      </AnimatePresence>

      {mode !== 'default' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none"
        >
          <div className="px-4 py-2 rounded-full bg-black/80 dark:bg-white/80 backdrop-blur-sm">
            <p className="text-sm font-medium text-white dark:text-black">
              Cursor Mode: <span className="capitalize">{mode}</span>
              <span className="ml-2 text-xs opacity-70">
                (Press &apos;{triggerKey}&apos; to cycle)
              </span>
            </p>
          </div>
        </motion.div>
      )}
    </>
  )
}
