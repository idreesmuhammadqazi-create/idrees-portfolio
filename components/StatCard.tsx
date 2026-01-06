'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StatCardProps {
  number: number
  label: string
  suffix?: string
  icon: string
  delay?: number
}

export default function StatCard({
  number,
  label,
  suffix = '',
  icon,
  delay = 0,
}: StatCardProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = number / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= number) {
        setCount(number)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, number])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={cn(
        'relative p-6 rounded-xl border border-border bg-card',
        'hover:border-accent/50 transition-colors group'
      )}
    >
      {/* Icon */}
      <div className="text-4xl mb-4">{icon}</div>

      {/* Number */}
      <div className="text-4xl md:text-5xl font-bold mb-2">
        {count}
        <span className="text-accent">{suffix}</span>
      </div>

      {/* Label */}
      <div className="text-muted-foreground font-medium">{label}</div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  )
}

interface StatsGridProps {
  stats: {
    number: number
    label: string
    suffix?: string
    icon: string
  }[]
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Building in Public
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Consistently shipping projects and contributing to the developer community
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              number={stat.number}
              label={stat.label}
              suffix={stat.suffix}
              icon={stat.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
