'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import { StatsGrid } from '@/components/StatCard'
import { FeaturedProjects } from '@/components/ProjectCard'
import { getFeaturedProjects } from '@/lib/projects'
import { stats } from '@/lib/skills'
import { ArrowRight, Code2, Lightbulb, Rocket, Users } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

const features = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description:
      'Building complete applications from frontend to backend with modern technologies like Next.js, TypeScript, and Firebase.',
  },
  {
    icon: Lightbulb,
    title: 'Problem Solving',
    description:
      'Creating tools that address real-world problems, from educational platforms to developer utilities.',
  },
  {
    icon: Rocket,
    title: 'Rapid Prototyping',
    description:
      'Quickly turning ideas into working products with a focus on user experience and clean code.',
  },
  {
    icon: Users,
    title: 'User-Focused Design',
    description:
      'Designing intuitive interfaces that prioritize accessibility and ease of use for all users.',
  },
]

export default function HomePage() {
  const featuredProjects = getFeaturedProjects()

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsGrid stats={stats} />

      {/* Featured Projects */}
      <FeaturedProjects projects={featuredProjects} />

      {/* What I Do Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Do</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I specialize in building production-ready applications with a focus on
              solving real problems and creating great user experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card hover:border-accent/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black dark:bg-white text-white dark:text-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let&apos;s Build Something Together
            </h2>
            <p className="text-white/70 dark:text-black/70 mb-8 text-lg">
              Have a project idea or want to collaborate? I&apos;m always open to
              discussing new opportunities and interesting projects.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="bg-white dark:bg-black text-black dark:text-white hover:bg-white/90 dark:hover:bg-black/90"
                >
                  Get in Touch
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 dark:border-black/30 text-white dark:text-black hover:bg-white/10 dark:hover:bg-black/10"
                >
                  Learn More About Me
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
