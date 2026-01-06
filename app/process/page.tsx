'use client'

import { motion } from 'framer-motion'
import {
  Lightbulb,
  Code2,
  Rocket,
  RefreshCw,
  Zap,
  Heart,
  Target,
  Users,
  CheckCircle2,
} from 'lucide-react'
import Badge from '@/components/ui/Badge'

const philosophyPoints = [
  {
    icon: Lightbulb,
    title: 'Build What You Wish Existed',
    description:
      'Every project starts with a real problem. If a tool frustrates me, I build a better one.',
  },
  {
    icon: Rocket,
    title: 'Ship Fast, Iterate Faster',
    description:
      'Get a working version out quickly. Real user feedback beats theoretical perfection.',
  },
  {
    icon: Heart,
    title: 'User Experience First',
    description:
      'Clean interfaces, intuitive flows, and accessibility are non-negotiable.',
  },
  {
    icon: RefreshCw,
    title: 'Continuous Improvement',
    description:
      'No project is ever "done." Listen to users and keep making it better.',
  },
]

const workflowSteps = [
  {
    step: '01',
    title: 'Identify the Problem',
    description:
      'Start with a real pain point. What frustrates me or others? What tool is missing?',
    color: 'bg-blue-500',
  },
  {
    step: '02',
    title: 'Research & Plan',
    description:
      'Explore existing solutions, identify gaps, and sketch out the core features.',
    color: 'bg-green-500',
  },
  {
    step: '03',
    title: 'Build MVP',
    description:
      'Create the minimum viable product with core functionality. No feature creep.',
    color: 'bg-yellow-500',
  },
  {
    step: '04',
    title: 'Test & Deploy',
    description:
      'Test thoroughly, deploy to production, and get it in front of real users.',
    color: 'bg-orange-500',
  },
  {
    step: '05',
    title: 'Gather Feedback',
    description:
      'Listen to users, track issues, and understand how people actually use it.',
    color: 'bg-red-500',
  },
  {
    step: '06',
    title: 'Iterate & Improve',
    description:
      'Continuously improve based on feedback. Add features that users actually need.',
    color: 'bg-purple-500',
  },
]

const techStack = [
  {
    category: 'Frontend',
    tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    tools: ['Firebase', 'Streamlit', 'Python'],
  },
  {
    category: 'Deployment',
    tools: ['Vercel', 'Netlify', 'GitHub Actions'],
  },
  {
    category: 'Tools',
    tools: ['VS Code', 'Git', 'Figma', 'AI Assistants'],
  },
]

const principles = [
  'Write clean, readable code',
  'Document everything important',
  'Test before shipping',
  'Optimize for user experience',
  'Keep dependencies minimal',
  'Make it accessible',
  'Ship early, ship often',
  'Learn from every project',
]

export default function ProcessPage() {
  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Process</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            How I approach building software—from idea to production. A peek into
            my workflow, philosophy, and the tools I use.
          </p>
        </motion.div>

        {/* Philosophy Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-2 text-center">
            The Vibecoding Philosophy
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Building with intuition, shipping with purpose
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {philosophyPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card hover:border-accent/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <point.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
                <p className="text-muted-foreground">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Workflow Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-2 text-center">My Workflow</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            A systematic approach to turning ideas into shipped products
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-6 rounded-xl border border-border bg-card"
              >
                <div
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full ${step.color} flex items-center justify-center text-white font-bold text-sm`}
                >
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2 pr-12">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech Stack Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-2 text-center">Tech Stack</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            The tools and technologies I use to build
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <h3 className="font-semibold mb-4">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.tools.map((tool) => (
                    <Badge key={tool} variant="secondary" size="sm">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Principles Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-2 text-center">
            Guiding Principles
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Rules I try to follow in every project
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{principle}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-8 rounded-xl bg-muted/50 border border-border text-center">
            <Zap className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h2 className="text-2xl font-bold mb-4">Want to Work Together?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              I&apos;m always open to discussing new projects, creative ideas, or
              opportunities to be part of something amazing.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <Target className="w-4 h-4" />
              Get in Touch
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
