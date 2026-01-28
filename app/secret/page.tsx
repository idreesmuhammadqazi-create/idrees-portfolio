'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code2, 
  Lightbulb, 
  Bug, 
  Coffee, 
  Zap, 
  Sparkles,
  Clock,
  Star,
  Eye,
  EyeOff,
  PartyPopper,
  Brain,
  Rocket,
  Heart,
  Laugh
} from 'lucide-react'
import { addAchievement } from '@/lib/easter-eggs'
import Badge from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface Secret {
  icon: React.ComponentType<{ className?: string }>
  title: string
  content: string
  emoji: string
  category: 'dev' | 'fun' | 'truth'
}

const secrets: Secret[] = [
  {
    icon: Coffee,
    title: 'The Truth About Development Time',
    content: "That 'simple' contact form? 3 hours. Making it look smooth with animations? 5 more hours. Overthinking the hover states? Another 2 hours. Actually sending emails? 30 minutes. Welcome to web development, where aesthetics take longer than functionality!",
    emoji: '☕',
    category: 'truth'
  },
  {
    icon: Bug,
    title: 'The Great Tailwind Typo',
    content: "Spent 45 minutes debugging why a button wouldn't center. The culprit? 'justify-cener' instead of 'justify-center'. The VSCode typo gods were laughing at me that day. Added a custom CSS linter rule immediately after.",
    emoji: '🐛',
    category: 'dev'
  },
  {
    icon: Brain,
    title: 'Variable Naming Philosophy',
    content: "I have a confession: sometimes I name variables 'thingy', 'stuff', or 'theActuallyImportantOne'. Then I refactor them to proper names before committing. It's part of my creative process, I swear!",
    emoji: '🧠',
    category: 'fun'
  },
  {
    icon: Clock,
    title: '3 AM Coding Sessions',
    content: "My best code is written at 3 AM when the world is quiet and the bugs are asleep. That's when I added the Konami code easter egg. Morning me was confused but impressed by night me's creativity.",
    emoji: '🌙',
    category: 'truth'
  },
  {
    icon: Zap,
    title: 'The Accidental Feature',
    content: "The logo rotation animation on hover? Originally a bug where I applied the wrong transform. Users liked it so much that it became a feature. Sometimes the best features are happy accidents!",
    emoji: '⚡',
    category: 'dev'
  },
  {
    icon: Lightbulb,
    title: 'Vibecoding Origins',
    content: "The term 'vibecoding' came from a friend who watched me code without planning for 4 hours straight and said 'You're just vibing with the code, aren't you?' It stuck. Now it's my whole philosophy.",
    emoji: '💡',
    category: 'fun'
  },
  {
    icon: Heart,
    title: 'Why I Build',
    content: "Every project starts with frustration. PseudoRun? Existing tools were garbage. This portfolio? Generic templates everywhere. I build what I wish existed. If it helps even one person, it's worth the late nights.",
    emoji: '❤️',
    category: 'truth'
  },
  {
    icon: Sparkles,
    title: 'The Easter Egg Obsession',
    content: "I spent more time building easter eggs and achievements for this portfolio than some of the actual pages. Why? Because life is too short for boring websites. You found this page, so you get it!",
    emoji: '✨',
    category: 'fun'
  },
  {
    icon: Code2,
    title: 'Git Commit Messages',
    content: "My commit history is a journey: 'initial commit' → 'fixed thing' → 'actually fixed thing' → 'seriously this time' → 'I give up' → 'ok one more try' → 'IT WORKS!!!'. Very professional, I know.",
    emoji: '📝',
    category: 'dev'
  },
  {
    icon: Rocket,
    title: 'The 100-Line Function',
    content: "There's a function in PseudoRun that's over 100 lines long. I know, I know, it should be refactored. But it works perfectly, and I'm scared to touch it. We call it 'The Monolith' and speak of it in hushed tones.",
    emoji: '🚀',
    category: 'dev'
  },
  {
    icon: Laugh,
    title: 'Console.log Debugging',
    content: "Yes, I use console.log for debugging. A lot. Sometimes I have 20+ console.logs scattered around. Then I spend 10 minutes removing them all before committing. It's not elegant, but it works!",
    emoji: '😂',
    category: 'truth'
  },
  {
    icon: PartyPopper,
    title: 'The Secret Achievement',
    content: "Fun fact: only 2% of visitors will ever find this page. You're in an elite club! You've unlocked the 'Vault Explorer' achievement. Check your achievements modal to see your reward!",
    emoji: '🎉',
    category: 'fun'
  }
]

const funFacts = [
  "This portfolio has more animations than some animated films",
  "The dark mode toggle has been clicked exactly 127,493 times (I'm lying, I don't track it)",
  "There are 7 hidden easter eggs on this site. You found one!",
  "The entire codebase is fueled by caffeine and late-night inspiration",
  "I rewrote the header component 4 times before settling on this version",
]

export default function SecretPage() {
  const [hasUnlockedAchievement, setHasUnlockedAchievement] = useState(false)
  const [revealedSecrets, setRevealedSecrets] = useState<Set<number>>(new Set())
  const [currentFact, setCurrentFact] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasUnlockedAchievement) {
        addAchievement({
          id: 'vault-explorer',
          name: 'Vault Explorer',
          description: 'Discovered the secret page with behind-the-scenes stories',
        })
        setHasUnlockedAchievement(true)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 5000)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [hasUnlockedAchievement])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % funFacts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const toggleSecret = (index: number) => {
    setRevealedSecrets((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const revealAll = () => {
    setRevealedSecrets(new Set(secrets.map((_, i) => i)))
  }

  const hideAll = () => {
    setRevealedSecrets(new Set())
  }

  const devSecrets = secrets.filter(s => s.category === 'dev')
  const funSecrets = secrets.filter(s => s.category === 'fun')
  const truthSecrets = secrets.filter(s => s.category === 'truth')

  return (
    <div className="min-h-screen py-12 md:py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
              rotate: [0, 360],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {['🎮', '🚀', '✨', '🎉', '💡', '🔥', '⚡', '🌟'][i % 8]}
          </motion.div>
        ))}
      </div>

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: -50,
                  rotate: 0,
                }}
                animate={{
                  y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 50,
                  rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  ease: 'linear',
                }}
              >
                {['🎉', '✨', '🎊', '⭐', '💫'][i % 5]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="inline-block mb-4"
          >
            <div className="text-6xl">🔐</div>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The Secret Vault
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Behind-the-scenes stories, development confessions, and the truth about building this portfolio
          </p>
          
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Badge variant="default" size="md" className="bg-gradient-to-r from-purple-500 to-pink-500">
              <Sparkles className="w-3 h-3 mr-1" />
              Easter Egg Found
            </Badge>
            <Badge variant="outline" size="md">
              Top Secret
            </Badge>
            <Badge variant="outline" size="md">
              {secrets.length} Stories
            </Badge>
          </div>
        </motion.div>

        {/* Fun Facts Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-yellow-500/10 border-2 border-purple-500/30">
            <div className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Star className="w-5 h-5 text-yellow-500" />
                <h3 className="text-sm font-bold uppercase tracking-wide">Fun Fact</h3>
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentFact}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg font-medium"
                >
                  {funFacts[currentFact]}
                </motion.p>
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>

        {/* Control Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <Button
            variant="primary"
            size="md"
            leftIcon={<Eye className="w-4 h-4" />}
            onClick={revealAll}
          >
            Reveal All
          </Button>
          <Button
            variant="outline"
            size="md"
            leftIcon={<EyeOff className="w-4 h-4" />}
            onClick={hideAll}
          >
            Hide All
          </Button>
        </motion.div>

        {/* Development Secrets */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold">Development Chronicles</h2>
            <Badge variant="outline" size="sm">{devSecrets.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {devSecrets.map((secret, index) => {
              const actualIndex = secrets.indexOf(secret)
              const isRevealed = revealedSecrets.has(actualIndex)
              return (
                <SecretCard
                  key={actualIndex}
                  secret={secret}
                  isRevealed={isRevealed}
                  onToggle={() => toggleSecret(actualIndex)}
                  delay={index * 0.1}
                />
              )
            })}
          </div>
        </motion.section>

        {/* Truth Bombs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold">Truth Bombs</h2>
            <Badge variant="outline" size="sm">{truthSecrets.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {truthSecrets.map((secret, index) => {
              const actualIndex = secrets.indexOf(secret)
              const isRevealed = revealedSecrets.has(actualIndex)
              return (
                <SecretCard
                  key={actualIndex}
                  secret={secret}
                  isRevealed={isRevealed}
                  onToggle={() => toggleSecret(actualIndex)}
                  delay={index * 0.1}
                />
              )
            })}
          </div>
        </motion.section>

        {/* Fun Stuff */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Laugh className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold">Just For Fun</h2>
            <Badge variant="outline" size="sm">{funSecrets.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {funSecrets.map((secret, index) => {
              const actualIndex = secrets.indexOf(secret)
              const isRevealed = revealedSecrets.has(actualIndex)
              return (
                <SecretCard
                  key={actualIndex}
                  secret={secret}
                  isRevealed={isRevealed}
                  onToggle={() => toggleSecret(actualIndex)}
                  delay={index * 0.1}
                />
              )
            })}
          </div>
        </motion.section>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30">
            <div className="p-8">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="text-5xl mb-4"
              >
                🎉
              </motion.div>
              <h3 className="text-2xl font-bold mb-3">
                Congratulations, Secret Keeper!
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto mb-4">
                You&apos;ve uncovered the hidden vault and earned the &apos;Vault Explorer&apos; achievement. 
                You now know the truth behind the code. Use this knowledge wisely!
              </p>
              <p className="text-sm text-muted-foreground italic">
                &quot;The best code is written with passion, a bit of chaos, and a lot of heart.&quot; - Me, probably at 3 AM
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

interface SecretCardProps {
  secret: Secret
  isRevealed: boolean
  onToggle: () => void
  delay: number
}

function SecretCard({ secret, isRevealed, onToggle, delay }: SecretCardProps) {
  const Icon = secret.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      className="cursor-pointer"
      onClick={onToggle}
    >
      <Card 
        className={`h-full transition-all duration-300 ${
          isRevealed 
            ? 'bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30' 
            : 'bg-muted/30 border-border hover:border-accent/20'
        }`}
      >
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <motion.div
              animate={isRevealed ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.5 }}
              className={`text-3xl ${!isRevealed && 'opacity-50'}`}
            >
              {secret.emoji}
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">{secret.title}</h3>
                <motion.div
                  animate={isRevealed ? { rotate: 180 } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isRevealed ? (
                    <Eye className="w-5 h-5 text-accent" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-muted-foreground" />
                  )}
                </motion.div>
              </div>
              
              <AnimatePresence mode="wait">
                {isRevealed ? (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    {secret.content}
                  </motion.p>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-muted-foreground italic"
                  >
                    Click to reveal the secret...
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {isRevealed && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              className="h-1 bg-gradient-to-r from-accent/50 to-accent rounded-full origin-left"
            />
          )}
        </div>
      </Card>
    </motion.div>
  )
}
