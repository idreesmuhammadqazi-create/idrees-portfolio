'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { SkillCategory, SkillItem as SkillItemType } from '@/lib/skills'

interface SkillCardProps {
  category: SkillCategory
  index?: number
}

export default function SkillCard({ category, index = 0 }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 rounded-xl border border-border bg-card"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{category.icon}</span>
        <h3 className="text-lg font-semibold">{category.category}</h3>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        {category.items.map((skill, skillIndex) => (
          <SkillItem key={skill.name} skill={skill} index={skillIndex} />
        ))}
      </div>
    </motion.div>
  )
}

interface SkillItemProps {
  skill: SkillItemType
  index: number
}

function SkillItem({ skill, index }: SkillItemProps) {
  const proficiencyColors = {
    expert: 'bg-green-500',
    advanced: 'bg-blue-500',
    intermediate: 'bg-yellow-500',
  }

  const proficiencyLabels = {
    expert: 'Expert',
    advanced: 'Advanced',
    intermediate: 'Intermediate',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium text-sm">{skill.name}</span>
        <span
          className={cn(
            'text-xs px-2 py-0.5 rounded-full',
            skill.proficiency === 'expert' && 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
            skill.proficiency === 'advanced' && 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
            skill.proficiency === 'intermediate' && 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
          )}
        >
          {proficiencyLabels[skill.proficiency]}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
          className={cn('h-full rounded-full', proficiencyColors[skill.proficiency])}
        />
      </div>
      {skill.projects && skill.projects.length > 0 && (
        <div className="mt-1 text-xs text-muted-foreground">
          Used in: {skill.projects.slice(0, 2).join(', ')}
          {skill.projects.length > 2 && ` +${skill.projects.length - 2} more`}
        </div>
      )}
    </motion.div>
  )
}

interface SkillsGridProps {
  skills: SkillCategory[]
}

export function SkillsGrid({ skills }: SkillsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((category, index) => (
        <SkillCard key={category.category} category={category} index={index} />
      ))}
    </div>
  )
}
