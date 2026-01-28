'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, Code2, Sparkles, Palette, Smile, Zap, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import ClickCounter from '@/components/EasterEggs/ClickCounter'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/process', label: 'Process' },
  { href: '/contact', label: 'Contact' },
]

const SECRET_MENU_ITEMS = [
  { icon: Sparkles, label: 'Secret Menu', action: 'info' },
  { icon: Palette, label: 'Party Mode', action: 'party' },
  { icon: Heart, label: 'Made with Love', action: 'love' },
  { icon: Zap, label: 'Activate Easter Eggs', action: 'eggs' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showSecretMenu, setShowSecretMenu] = useState(false)
  const [partyMode, setPartyMode] = useState(false)
  const [partyModeClicks, setPartyModeClicks] = useState(0)
  const [showSecretNotification, setShowSecretNotification] = useState<string | null>(null)
  const pathname = usePathname()
  const logoRef = useRef<HTMLDivElement>(null)
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const themeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (partyMode) {
      document.documentElement.classList.add('party-mode')
    } else {
      document.documentElement.classList.remove('party-mode')
    }
  }, [partyMode])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  const handleThemeButtonClick = () => {
    if (partyMode) {
      setPartyMode(false)
      setPartyModeClicks(0)
      showNotification('Party mode disabled 🎈')
      return
    }

    const newCount = partyModeClicks + 1
    setPartyModeClicks(newCount)

    if (newCount === 7) {
      setPartyMode(true)
      showNotification('🎉 PARTY MODE ACTIVATED! 🎉')
      setPartyModeClicks(0)
    } else {
      toggleTheme()
    }

    setTimeout(() => {
      if (newCount < 7) {
        setPartyModeClicks(0)
      }
    }, 2000)
  }

  const handleLogoLongPressStart = () => {
    longPressTimer.current = setTimeout(() => {
      setShowSecretMenu(true)
      showNotification('🎁 Secret menu unlocked!')
      if (navigator.vibrate) {
        navigator.vibrate(50)
      }
    }, 1000)
  }

  const handleLogoLongPressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  const showNotification = (message: string) => {
    setShowSecretNotification(message)
    setTimeout(() => {
      setShowSecretNotification(null)
    }, 3000)
  }

  const handleSecretMenuAction = (action: string) => {
    setShowSecretMenu(false)

    switch (action) {
      case 'info':
        showNotification('👀 You found the secret menu!')
        break
      case 'party':
        setPartyMode(!partyMode)
        setPartyModeClicks(0)
        showNotification(partyMode ? 'Party mode disabled 🎈' : '🎉 PARTY MODE ACTIVATED! 🎉')
        break
      case 'love':
        showNotification('❤️ Thank you for exploring!')
        break
      case 'eggs':
        showNotification('🥚 Keep clicking around to find more!')
        break
    }
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm'
            : 'bg-transparent',
          partyMode && 'party-header'
        )}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <ClickCounter>
              <Link href="/" className="flex items-center gap-2 group">
                <motion.div
                  ref={logoRef}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  onMouseDown={handleLogoLongPressStart}
                  onMouseUp={handleLogoLongPressEnd}
                  onMouseLeave={handleLogoLongPressEnd}
                  onTouchStart={handleLogoLongPressStart}
                  onTouchEnd={handleLogoLongPressEnd}
                  className={cn(
                    'w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center',
                    partyMode && 'party-logo'
                  )}
                >
                  <Code2 className="w-5 h-5 text-white dark:text-black" />
                </motion.div>
                <span className={cn(
                  'font-bold text-lg hidden sm:block',
                  partyMode && 'party-text'
                )}>
                  Idrees<span className="text-accent">.</span>
                </span>
              </Link>
            </ClickCounter>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    pathname === item.href
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground',
                    partyMode && pathname === item.href && 'party-nav-active'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <motion.button
                ref={themeButtonRef}
                whileTap={{ scale: 0.95 }}
                onClick={handleThemeButtonClick}
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center hover:bg-muted transition-colors',
                  partyMode && 'party-button'
                )}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {partyMode ? (
                    <motion.div
                      key="party"
                      initial={{ rotate: -180, opacity: 0, scale: 0 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 180, opacity: 0, scale: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sparkles className="w-5 h-5 party-icon" />
                    </motion.div>
                  ) : isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-1 border-t border-border">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'block px-4 py-3 rounded-lg text-base font-medium transition-all',
                          pathname === item.href
                            ? 'bg-black dark:bg-white text-white dark:text-black'
                            : 'hover:bg-muted text-muted-foreground hover:text-foreground',
                          partyMode && pathname === item.href && 'party-nav-active'
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Secret Menu Dropdown */}
      <AnimatePresence>
        {showSecretMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSecretMenu(false)}
              className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="fixed top-24 left-4 z-[70] w-64"
            >
              <div className="bg-background/95 backdrop-blur-md border-2 border-accent rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 p-3">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Secret Menu
                  </h3>
                </div>
                <div className="p-2">
                  {SECRET_MENU_ITEMS.map((item, index) => (
                    <motion.button
                      key={item.action}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSecretMenuAction(item.action)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-all text-left group"
                    >
                      <item.icon className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Secret Notification */}
      <AnimatePresence>
        {showSecretNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80]"
          >
            <div className={cn(
              'px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md',
              partyMode 
                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500' 
                : 'bg-background/95 border-2 border-accent'
            )}>
              <p className={cn(
                'text-base font-bold text-center',
                partyMode ? 'text-white' : 'text-foreground'
              )}>
                {showSecretNotification}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
