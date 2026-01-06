'use client'

import { motion } from 'framer-motion'
import { TimelineItem } from '@/lib/skills'

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

      <div className="space-y-8 md:space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={item.year + item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex items-start gap-6 md:gap-0 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-card border-2 border-accent rounded-full flex items-center justify-center -translate-x-1/2 z-10">
              <span className="text-sm">{item.icon}</span>
            </div>

            {/* Content */}
            <div
              className={`ml-12 md:ml-0 md:w-1/2 ${
                index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
              }`}
            >
              <div className="p-4 rounded-xl border border-border bg-card hover:border-accent/50 transition-colors">
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-accent/10 text-accent rounded-full mb-2">
                  {item.year}
                </span>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            </div>

            {/* Spacer for alternating layout */}
            <div className="hidden md:block md:w-1/2" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
