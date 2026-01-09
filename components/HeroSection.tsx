'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'

const roles = [
  'Student Developer',
  'Full-Stack Builder',
  'Tool Creator',
  'Vibecoder',
]

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentRole.length) {
            setDisplayText(currentRole.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setRoleIndex((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 100
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-50 dark:opacity-20" />
      
      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-10 w-20 h-20 bg-accent/10 dark:bg-accent/20 rounded-full blur-xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 dark:bg-accent/20 rounded-full blur-xl"
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Photo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-accent/30 dark:border-accent/40 overflow-hidden relative shadow-xl"
          >
            <Image
              src="/profile-photo.png"
              alt="Idrees Muhammad Qazi"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Available for projects</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Hi, I&apos;m{' '}
            <span className="relative">
              Idrees
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-3 bg-accent/30 dark:bg-accent/40 -z-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
            </span>
          </motion.h1>

          {/* Animated Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 h-10"
          >
            <span className="text-accent font-semibold">{displayText}</span>
            <span className="animate-pulse">|</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            I build tools that solve real problems. From educational platforms to developer utilities, 
            I create production-ready applications with a focus on user experience and clean code.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/projects">
              <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore My Work
              </Button>
            </Link>
            <a
              href="https://github.com/idreesmuhammadqazi-create"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" leftIcon={<Github className="w-4 h-4" />}>
                View GitHub
              </Button>
            </a>
          </motion.div>

          {/* Quick Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12"
          >
            {[
              { value: '7', label: 'Live Projects' },
              { value: '50+', label: 'Repositories' },
              { value: '247+', label: 'Contributions' },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  className="text-3xl md:text-4xl font-bold"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>


    </section>
  )
}
