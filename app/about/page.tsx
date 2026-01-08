'use client'

import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail, MapPin, Calendar, Code2 } from 'lucide-react'
import { SkillsGrid } from '@/components/SkillCard'
import Timeline from '@/components/Timeline'
import { skills, softSkills, timeline } from '@/lib/skills'
import Badge from '@/components/ui/Badge'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/idreesmuhammadqazi-create',
    icon: Github,
    username: '@idreesmuhammadqazi-create',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/crypt0phage',
    icon: Twitter,
    username: '@crypt0phage',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/idreesqazi',
    icon: Linkedin,
    username: 'idreesqazi',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container-custom">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-32 h-32 mx-auto mb-6 rounded-full bg-muted dark:bg-muted/50 border-4 border-accent/20 dark:border-accent/30 flex items-center justify-center"
          >
            <Code2 className="w-16 h-16 text-accent" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Idrees Muhammad Qazi
          </h1>
          <p className="text-xl text-accent font-medium mb-4">
            Student Developer & Creator
          </p>

          {/* Quick Info */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Building Globally</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Active since 2023</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-3">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                aria-label={link.name}
              >
                <link.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Bio Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">About Me</h2>
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <p className="text-muted-foreground leading-relaxed mb-4">
              I&apos;m a student developer passionate about building tools that solve real problems. 
              My journey started with frustration—existing tools were either ad-ridden or didn&apos;t 
              work the way I needed. So I started building my own.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              My flagship project, <strong>PseudoRun</strong>, is a browser-based pseudocode interpreter 
              for IGCSE Computer Science students. It&apos;s been featured on 8+ platforms and maintains 
              a 5/5 star rating on Firefox Add-ons.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I believe in <strong>&quot;vibecoding&quot;</strong>—building with intuition, shipping fast, 
              and iterating based on real user feedback. Every project I create is designed to be 
              useful, accessible, and well-crafted.
            </p>
          </div>
        </motion.section>

        {/* Soft Skills */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">What I Bring</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {softSkills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Badge variant="outline" size="md">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technical Skills */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-2 text-center">Technical Skills</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Technologies I use to bring ideas to life, with proficiency levels based on project experience
          </p>
          <SkillsGrid skills={skills} />
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-2 text-center">My Journey</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Key milestones in my development journey
          </p>
          <div className="max-w-4xl mx-auto">
            <Timeline items={timeline} />
          </div>
        </motion.section>

        {/* Philosophy */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="p-8 rounded-xl bg-muted/50 dark:bg-muted/30 border border-border text-center">
            <h2 className="text-2xl font-bold mb-4">My Philosophy</h2>
            <blockquote className="text-lg italic text-muted-foreground mb-4">
              &quot;Build what you wish existed. Ship fast. Iterate based on feedback. 
              The best code is code that solves real problems for real people.&quot;
            </blockquote>
            <p className="text-sm text-muted-foreground/80">— The Vibecoding Manifesto</p>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
