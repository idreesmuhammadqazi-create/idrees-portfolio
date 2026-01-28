'use client'

import { useEffect, useCallback, useRef } from 'react'
import { 
  loadEasterEggState, 
  markSecretCommandDiscovered, 
  addAchievement 
} from '@/lib/easter-eggs'

interface SecretConsoleProps {
  enabled?: boolean
  onUnlockSecret?: () => void
}

const ASCII_ART = `
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   ██████╗ ███████╗██╗   ██╗    ██████╗ ██████╗ ███╗   ██╗║
║   ██╔══██╗██╔════╝██║   ██║   ██╔════╝██╔═══██╗████╗  ██║║
║   ██║  ██║█████╗  ██║   ██║   ██║     ██║   ██║██╔██╗ ██║║
║   ██║  ██║██╔══╝  ╚██╗ ██╔╝   ██║     ██║   ██║██║╚██╗██║║
║   ██████╔╝███████╗ ╚████╔╝    ╚██████╗╚██████╔╝██║ ╚████║║
║   ╚═════╝ ╚══════╝  ╚═══╝      ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝║
║                                                           ║
║   🎮 Welcome, curious developer! You found the secret!   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`

const CONSOLE_STYLES = {
  welcome: 'font-size: 12px; color: #00ff00; font-family: monospace; line-height: 1.2;',
  title: 'font-size: 18px; font-weight: bold; color: #00d9ff; text-shadow: 0 0 10px #00d9ff;',
  command: 'font-size: 14px; font-weight: bold; color: #ffaa00; background: #1a1a1a; padding: 2px 6px; border-radius: 3px;',
  info: 'font-size: 13px; color: #a0a0a0;',
  success: 'font-size: 14px; font-weight: bold; color: #00ff88; text-shadow: 0 0 8px #00ff88;',
  error: 'font-size: 14px; color: #ff4444;',
  warning: 'font-size: 14px; color: #ffbb33;',
  stats: 'font-size: 13px; color: #bb88ff; font-weight: bold;',
  emoji: 'font-size: 20px;',
}

const PROJECTS_DATA = [
  { name: 'Portfolio Website', tech: 'Next.js + TypeScript', status: '✅ Live' },
  { name: 'E-Commerce Platform', tech: 'React + Node.js', status: '🚀 In Progress' },
  { name: 'AI Chat Bot', tech: 'Python + OpenAI', status: '💡 Planning' },
  { name: 'Mobile App', tech: 'React Native', status: '📱 Prototype' },
]

export default function SecretConsole({ 
  enabled = true,
  onUnlockSecret 
}: SecretConsoleProps) {
  const welcomeShownRef = useRef(false)
  const commandBufferRef = useRef<string>('')
  const commandTimeoutRef = useRef<NodeJS.Timeout>()

  const logStyled = useCallback((message: string, style: string, ...args: any[]) => {
    console.log(`%c${message}`, style, ...args)
  }, [])

  const showWelcome = useCallback(() => {
    if (welcomeShownRef.current) return
    welcomeShownRef.current = true

    console.clear()
    logStyled(ASCII_ART, CONSOLE_STYLES.welcome)
    logStyled('\n✨ Secret Developer Console Activated! ✨\n', CONSOLE_STYLES.title)
    logStyled('Type commands directly on the page (no need to focus console):', CONSOLE_STYLES.info)
    logStyled('/help', CONSOLE_STYLES.command)
    logStyled('  - Show all available commands', CONSOLE_STYLES.info)
    logStyled('/projects', CONSOLE_STYLES.command)
    logStyled('  - View project showcase', CONSOLE_STYLES.info)
    logStyled('/unlock', CONSOLE_STYLES.command)
    logStyled('  - Unlock a special secret', CONSOLE_STYLES.info)
    logStyled('/stats', CONSOLE_STYLES.command)
    logStyled('  - View your achievement statistics', CONSOLE_STYLES.info)
    logStyled('\n💡 Tip: Commands disappear after 2 seconds of inactivity!\n', CONSOLE_STYLES.warning)

    addAchievement({
      id: 'dev-console-found',
      name: 'Console Cowboy',
      description: 'Discovered the secret developer console',
    })
  }, [logStyled])

  const showHelp = useCallback(() => {
    console.group('%c📚 Available Commands', CONSOLE_STYLES.title)
    
    logStyled('\n/help', CONSOLE_STYLES.command)
    console.log('%c  Shows this help menu with all available commands', CONSOLE_STYLES.info)
    
    logStyled('\n/projects', CONSOLE_STYLES.command)
    console.log('%c  Displays a list of featured projects with tech stack', CONSOLE_STYLES.info)
    
    logStyled('\n/unlock', CONSOLE_STYLES.command)
    console.log('%c  Unlocks a special secret feature on the site', CONSOLE_STYLES.info)
    
    logStyled('\n/stats', CONSOLE_STYLES.command)
    console.log('%c  Shows your achievement progress and easter egg statistics', CONSOLE_STYLES.info)
    
    console.log('\n')
    console.groupEnd()

    markSecretCommandDiscovered('help')
  }, [logStyled])

  const showProjects = useCallback(() => {
    console.group('%c🚀 Featured Projects', CONSOLE_STYLES.title)
    
    PROJECTS_DATA.forEach((project, index) => {
      console.log('\n')
      logStyled(`${index + 1}. ${project.name}`, CONSOLE_STYLES.success)
      console.log(`%c   Tech: ${project.tech}`, CONSOLE_STYLES.info)
      console.log(`%c   Status: ${project.status}`, CONSOLE_STYLES.stats)
    })
    
    console.log('\n')
    console.groupEnd()

    markSecretCommandDiscovered('projects')
    addAchievement({
      id: 'project-viewer',
      name: 'Project Explorer',
      description: 'Viewed the secret projects list',
    })
  }, [logStyled])

  const unlockSecret = useCallback(() => {
    const messages = [
      '🔓 Initiating unlock sequence...',
      '⚡ Bypassing security protocols...',
      '🎯 Accessing hidden features...',
      '✨ Secret unlocked successfully!',
    ]

    console.group('%c🔐 Secret Unlock Protocol', CONSOLE_STYLES.title)
    
    messages.forEach((msg, index) => {
      setTimeout(() => {
        if (index === messages.length - 1) {
          logStyled(msg, CONSOLE_STYLES.success)
          logStyled('\n🎉 You\'ve unlocked a special easter egg!', CONSOLE_STYLES.emoji)
          console.log('\n')
          console.groupEnd()

          markSecretCommandDiscovered('unlock')
          addAchievement({
            id: 'secret-unlocker',
            name: 'Secret Keeper',
            description: 'Unlocked the hidden feature via console',
          })

          if (onUnlockSecret) {
            onUnlockSecret()
          }
        } else {
          logStyled(msg, CONSOLE_STYLES.warning)
        }
      }, index * 500)
    })
  }, [logStyled, onUnlockSecret])

  const showStats = useCallback(() => {
    const state = loadEasterEggState()
    const achievementCount = state.achievements.length
    const commandsDiscovered = Object.keys(state.secretCommands).length
    const konamiActivated = state.konamiCodeActivated

    console.group('%c📊 Achievement Statistics', CONSOLE_STYLES.title)
    
    console.log('\n')
    logStyled(`🏆 Achievements Unlocked: ${achievementCount}`, CONSOLE_STYLES.stats)
    logStyled(`🎮 Secret Commands Used: ${commandsDiscovered}`, CONSOLE_STYLES.stats)
    logStyled(`⬆️⬆️⬇️⬇️ Konami Code: ${konamiActivated ? '✅ Activated' : '❌ Not Found'}`, CONSOLE_STYLES.stats)
    
    if (state.achievements.length > 0) {
      console.log('\n%c🎖️ Your Achievements:', CONSOLE_STYLES.success)
      state.achievements.forEach((achievement, index) => {
        console.log(`\n%c  ${index + 1}. ${achievement.name}`, CONSOLE_STYLES.command)
        console.log(`%c     ${achievement.description}`, CONSOLE_STYLES.info)
        if (achievement.discoveredAt) {
          const date = new Date(achievement.discoveredAt)
          console.log(`%c     Discovered: ${date.toLocaleString()}`, CONSOLE_STYLES.info)
        }
      })
    } else {
      console.log('\n%c  No achievements yet. Keep exploring!', CONSOLE_STYLES.info)
    }
    
    console.log('\n')
    console.groupEnd()

    markSecretCommandDiscovered('stats')
  }, [logStyled])

  const executeCommand = useCallback((command: string) => {
    const cmd = command.toLowerCase().trim()

    if (!cmd.startsWith('/')) return

    console.log(`\n%c> ${command}`, CONSOLE_STYLES.command)

    switch (cmd) {
      case '/help':
        showHelp()
        break
      case '/projects':
        showProjects()
        break
      case '/unlock':
        unlockSecret()
        break
      case '/stats':
        showStats()
        break
      default:
        logStyled(`❌ Unknown command: ${command}`, CONSOLE_STYLES.error)
        logStyled('Type /help to see available commands', CONSOLE_STYLES.info)
    }
  }, [showHelp, showProjects, unlockSecret, showStats, logStyled])

  useEffect(() => {
    if (!enabled) return

    showWelcome()

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.altKey || event.metaKey) return
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return

      if (event.key === 'Enter') {
        if (commandBufferRef.current.trim()) {
          executeCommand(commandBufferRef.current.trim())
          commandBufferRef.current = ''
        }
        return
      }

      if (event.key === 'Escape') {
        commandBufferRef.current = ''
        console.log('%c⚠️ Command buffer cleared', CONSOLE_STYLES.warning)
        return
      }

      if (event.key.length === 1) {
        commandBufferRef.current += event.key

        if (commandTimeoutRef.current) {
          clearTimeout(commandTimeoutRef.current)
        }

        commandTimeoutRef.current = setTimeout(() => {
          if (commandBufferRef.current) {
            console.log('%c⏱️ Command timeout - buffer cleared', CONSOLE_STYLES.warning)
            commandBufferRef.current = ''
          }
        }, 2000)
      }
    }

    window.addEventListener('keypress', handleKeyPress)

    return () => {
      window.removeEventListener('keypress', handleKeyPress)
      if (commandTimeoutRef.current) {
        clearTimeout(commandTimeoutRef.current)
      }
    }
  }, [enabled, showWelcome, executeCommand])

  return null
}
