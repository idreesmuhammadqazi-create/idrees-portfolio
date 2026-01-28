'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Mail, ExternalLink, Code2, Eye, EyeOff } from 'lucide-react'
import { SiDiscord } from 'react-icons/si'
import { addAchievement } from '@/lib/easter-eggs'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/idreesmuhammadqazi-create',
    icon: Github,
    trivia: '🐙 Did you know? GitHub was founded on April 10, 2008, and its mascot is named "Octocat"!',
  },
  {
    name: 'Discord',
    href: 'https://discord.com/users/1386752392602718271',
    icon: SiDiscord,
    trivia: '🎮 Discord was originally built for gamers but now serves 150M+ monthly active users!',
  },
  {
    name: 'Email',
    href: 'mailto:idreesmuhammadqazi@gmail.com',
    icon: Mail,
    trivia: '📧 The first email was sent by Ray Tomlinson to himself in 1971. He chose the @ symbol!',
  },
]

const quickLinks = [
  { 
    name: 'Projects', 
    href: '/projects',
    trivia: '💡 Fun fact: The average developer writes 10-12 lines of code per day (that actually ship!)',
  },
  { 
    name: 'About', 
    href: '/about',
    trivia: '🎯 Easter egg hint: Try typing "about:blank" anywhere on the site!',
  },
  { 
    name: 'Process', 
    href: '/process',
    trivia: '⚡ Vibecoding philosophy: When the code just flows, you know you\'re in the zone!',
  },
  { 
    name: 'Contact', 
    href: '/contact',
    trivia: '🤝 Random fact: 70% of jobs are found through networking, not job boards!',
  },
]

const projectLinks = [
  { 
    name: 'PseudoRun', 
    href: 'https://pseudorun.tech',
    trivia: '🚀 This project helps students understand algorithms by visualizing pseudocode execution!',
  },
  { 
    name: 'CodeLens', 
    href: 'https://codelen.vercel.app',
    trivia: '🔍 Fun fact: CodeLens analyzes code complexity faster than you can say "Big O notation"!',
  },
  { 
    name: 'DevToolsHub', 
    href: 'https://devtoolshub-chi.vercel.app',
    trivia: '🛠️ Did you know? Developers use an average of 11 different tools per day!',
  },
]

const getTimeBasedMessage = (): string => {
  const hour = new Date().getHours()
  
  if (hour >= 5 && hour < 12) {
    return '🌅 "The best time to plant a tree was 20 years ago. The second best time is now." - Chinese Proverb'
  } else if (hour >= 12 && hour < 17) {
    return '☀️ "Code is like humor. When you have to explain it, it\'s bad." - Cory House'
  } else if (hour >= 17 && hour < 21) {
    return '🌆 "Make it work, make it right, make it fast." - Kent Beck'
  } else if (hour >= 21 && hour < 24) {
    return '🌙 "Talk is cheap. Show me the code." - Linus Torvalds'
  } else {
    return '🌃 "The only way to learn a new programming language is by writing programs in it." - Dennis Ritchie'
  }
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [inspectorMode, setInspectorMode] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [timeBasedQuote, setTimeBasedQuote] = useState('')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setTimeBasedQuote(getTimeBasedMessage())
    
    // Update quote every hour
    const interval = setInterval(() => {
      setTimeBasedQuote(getTimeBasedMessage())
    }, 60 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (inspectorMode) {
      document.body.classList.add('inspector-mode')
      
      // Add achievement for discovering inspector mode
      addAchievement({
        id: 'inspector-mode',
        name: '🔍 Inspector Gadget',
        description: 'Activated Inspector Mode in the footer',
      })
    } else {
      document.body.classList.remove('inspector-mode')
    }
  }, [inspectorMode])

  const handleCopyrightClick = () => {
    setClickCount(prev => prev + 1)
    
    if (clickCount + 1 === 3) {
      setInspectorMode(!inspectorMode)
      setClickCount(0)
      
      // Show achievement notification
      if (!inspectorMode) {
        console.log('🔍 Inspector Mode Activated! Hover over elements to see hidden details.')
      }
    }
    
    // Reset counter after 2 seconds of no clicks
    setTimeout(() => setClickCount(0), 2000)
  }

  const handleMouseMove = (e: React.MouseEvent, itemId: string) => {
    if (hoveredItem === itemId) {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
  }

  const TriviaTooltip = ({ text }: { text: string }) => {
    if (!hoveredItem) return null

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y - 60}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-xs max-w-xs shadow-lg border border-white/10 dark:border-black/10">
            {text}
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <footer className="bg-muted/50 dark:bg-muted/20 border-t border-border relative">
      {inspectorMode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-accent/10 border-b border-accent px-4 py-2 text-center"
        >
          <p className="text-xs font-mono text-accent flex items-center justify-center gap-2">
            <Eye className="w-3 h-3" />
            Inspector Mode Active - Hover over elements to see hidden trivia
          </p>
        </motion.div>
      )}
      
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white dark:text-black" />
              </div>
              <span className="font-bold text-lg">
                Idrees<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Student Developer & Creator. Building tools that solve real problems through vibecoding.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <div
                  key={link.name}
                  onMouseEnter={() => setHoveredItem(`social-${link.name}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onMouseMove={(e) => handleMouseMove(e, `social-${link.name}`)}
                  className="relative"
                >
                  <motion.a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                    aria-label={link.name}
                  >
                    <link.icon className="w-4 h-4" />
                  </motion.a>
                  {hoveredItem === `social-${link.name}` && (
                    <TriviaTooltip text={link.trivia} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li
                  key={link.name}
                  onMouseEnter={() => setHoveredItem(`quick-${link.name}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onMouseMove={(e) => handleMouseMove(e, `quick-${link.name}`)}
                  className="relative"
                >
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm inline-block"
                  >
                    {link.name}
                  </Link>
                  {hoveredItem === `quick-${link.name}` && (
                    <TriviaTooltip text={link.trivia} />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="font-semibold mb-4">Featured Projects</h3>
            <ul className="space-y-2">
              {projectLinks.map((link) => (
                <li
                  key={link.name}
                  onMouseEnter={() => setHoveredItem(`project-${link.name}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onMouseMove={(e) => handleMouseMove(e, `project-${link.name}`)}
                  className="relative"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm inline-flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  {hoveredItem === `project-${link.name}` && (
                    <TriviaTooltip text={link.trivia} />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Get in Touch</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Have a project idea or want to collaborate? Let&apos;s build something together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </Link>
          </div>
        </div>

        {/* Time-based Quote */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 pt-6 border-t border-border"
        >
          <p className="text-muted-foreground text-sm text-center italic">
            {timeBasedQuote}
          </p>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <motion.p
            onClick={handleCopyrightClick}
            className="text-muted-foreground text-sm cursor-pointer select-none hover:text-foreground transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            title="Click 3 times to toggle Inspector Mode"
          >
            {inspectorMode && <Eye className="w-3 h-3 text-accent" />}
            © {currentYear} Idrees Muhammad Qazi. All rights reserved.
          </motion.p>
          <p className="text-muted-foreground text-sm">
            Built with{' '}
            <span className="text-accent">Next.js</span>,{' '}
            <span className="text-accent">TypeScript</span> &{' '}
            <span className="text-accent">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
