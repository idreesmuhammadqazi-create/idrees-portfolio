'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, categories, getProjectsByCategory } from '@/lib/projects'
import ProjectCard from '@/components/ProjectCard'
import FilterButtons from '@/components/FilterButtons'

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const filteredProjects = getProjectsByCategory(activeFilter)

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A collection of {projects.length} live projects showcasing my work in
            educational tools, developer utilities, and AI-powered applications.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <FilterButtons
            filters={categories}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">
              No projects found in this category.
            </p>
          </motion.div>
        )}

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 p-8 rounded-xl bg-muted/50 border border-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">{projects.length}</div>
              <div className="text-muted-foreground text-sm">Total Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                {projects.filter((p) => p.status === 'live').length}
              </div>
              <div className="text-muted-foreground text-sm">Live & Active</div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                {new Set(projects.flatMap((p) => p.technologies)).size}
              </div>
              <div className="text-muted-foreground text-sm">Technologies Used</div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                {projects.filter((p) => p.featured).length}
              </div>
              <div className="text-muted-foreground text-sm">Featured Projects</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
