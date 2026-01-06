'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FilterOption {
  id: string
  label: string
}

interface FilterButtonsProps {
  filters: FilterOption[]
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export default function FilterButtons({
  filters,
  activeFilter,
  onFilterChange,
}: FilterButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-all',
            activeFilter === filter.id
              ? 'bg-black dark:bg-white text-white dark:text-black'
              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
          )}
        >
          {filter.label}
        </motion.button>
      ))}
    </div>
  )
}
