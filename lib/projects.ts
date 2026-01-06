export interface Project {
  id: string
  name: string
  emoji: string
  tagline: string
  description: string
  longDescription: string
  category: 'educational' | 'tools' | 'ai' | 'portfolio'
  technologies: string[]
  liveUrl: string
  githubUrl?: string
  image?: string
  metrics?: {
    label: string
    value: string
  }[]
  status: 'live' | 'in-progress' | 'archived'
  featured: boolean
  lastUpdated: string
}

export const projects: Project[] = [
  {
    id: 'pseudorun',
    name: 'PseudoRun',
    emoji: '📚',
    tagline: 'FLAGSHIP EDUCATIONAL TOOL',
    description: 'Browser-based pseudocode interpreter for IGCSE Computer Science students',
    longDescription: 'Built out of frustration with ads on existing tools, PseudoRun provides a clean, ad-free environment for writing, running, and debugging pseudocode with instant validation. Features a custom interpreter engine built from scratch.',
    category: 'educational',
    technologies: ['TypeScript', 'Vite', 'Firebase', 'Netlify'],
    liveUrl: 'https://pseudorun.tech',
    githubUrl: 'https://github.com/idreesmuhammadqazi-create/PseudoRun',
    metrics: [
      { label: 'Rating', value: '5/5 ⭐' },
      { label: 'Featured', value: '8+ platforms' },
      { label: 'Users', value: 'Global' },
    ],
    status: 'live',
    featured: true,
    lastUpdated: 'Dec 14, 2025',
  },
  {
    id: 'codelens',
    name: 'CodeLens',
    emoji: '🔍',
    tagline: 'CODE ANALYSIS TOOL',
    description: 'Modern code analysis and visualization tool for developers',
    longDescription: 'Helps developers understand code structure, relationships, and patterns through interactive visualization and analysis. Features real-time analysis and a modern responsive UI.',
    category: 'tools',
    technologies: ['Next.js 14+', 'TypeScript', 'Shadcn/ui', 'Tailwind CSS', 'pnpm', 'Vercel'],
    liveUrl: 'https://codelen.vercel.app/',
    metrics: [
      { label: 'Status', value: 'Active Dev' },
      { label: 'Stack', value: 'Modern' },
    ],
    status: 'in-progress',
    featured: true,
    lastUpdated: 'Dec 29, 2025',
  },
  {
    id: 'devtoolshub',
    name: 'DevToolsHub',
    emoji: '🛠️',
    tagline: 'DEVELOPER TOOLS AGGREGATOR',
    description: 'Centralized hub aggregating useful developer tools and utilities',
    longDescription: 'One-stop platform for common development tasks. Aggregates multiple tools for productivity and workflow optimization with a clean, user-focused interface.',
    category: 'tools',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://devtoolshub-chi.vercel.app',
    metrics: [
      { label: 'Tools', value: 'Multiple' },
      { label: 'Focus', value: 'Productivity' },
    ],
    status: 'live',
    featured: true,
    lastUpdated: 'Recent',
  },
  {
    id: 'yt-summariser',
    name: 'YT Video Summariser',
    emoji: '🎬',
    tagline: 'AI-POWERED VIDEO SUMMARIZATION',
    description: 'AI-powered tool that automatically summarizes YouTube videos',
    longDescription: 'Users paste a YouTube URL and get a concise summary, saving time and improving information retention. Features automatic video analysis and key points extraction.',
    category: 'ai',
    technologies: ['Python', 'Streamlit', 'AI/ML', 'NLP'],
    liveUrl: 'https://yt-videosummariser.streamlit.app/',
    metrics: [
      { label: 'Tech', value: 'AI/ML' },
      { label: 'Platform', value: 'Streamlit' },
    ],
    status: 'live',
    featured: false,
    lastUpdated: 'Recent',
  },
  {
    id: 'site-performance',
    name: 'Site Performance Monitor',
    emoji: '📊',
    tagline: 'PERFORMANCE ANALYTICS',
    description: 'Comprehensive website performance monitoring and analytics tool',
    longDescription: 'Tracks and analyzes website metrics, speed, and optimization opportunities. Provides actionable insights with real-time monitoring and performance dashboards.',
    category: 'tools',
    technologies: ['JavaScript', 'Neptune', 'Data Visualization'],
    liveUrl: 'https://site-performance-b83kdm.app.beta.neptune.dev/',
    metrics: [
      { label: 'Monitoring', value: 'Real-time' },
      { label: 'Insights', value: 'Actionable' },
    ],
    status: 'live',
    featured: false,
    lastUpdated: 'Recent',
  },
  {
    id: 'zaheer-portfolio',
    name: 'Zaheer Qazi Portfolio',
    emoji: '👤',
    tagline: 'PERSONAL PORTFOLIO',
    description: 'Professional portfolio website showcasing projects and skills',
    longDescription: 'Demonstrates portfolio design and implementation capabilities with a modern tech stack, responsive design, and professional aesthetics.',
    category: 'portfolio',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://zaheerqazi.vercel.app',
    metrics: [
      { label: 'Design', value: 'Modern' },
      { label: 'Responsive', value: 'Yes' },
    ],
    status: 'live',
    featured: false,
    lastUpdated: 'Recent',
  },
  {
    id: 'sir-faheem',
    name: 'Sir Faheem',
    emoji: '🌐',
    tagline: 'PROFESSIONAL WEBSITE',
    description: 'Professional website showcasing work and expertise',
    longDescription: 'Demonstrates web presence and professional branding capabilities with custom domain implementation and complete web presence.',
    category: 'portfolio',
    technologies: ['Modern Web Tech', 'Responsive Design'],
    liveUrl: 'https://sirfaheem.com',
    metrics: [
      { label: 'Domain', value: 'Custom' },
      { label: 'Branding', value: 'Professional' },
    ],
    status: 'live',
    featured: false,
    lastUpdated: 'Recent',
  },
]

export const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'educational', label: 'Educational' },
  { id: 'tools', label: 'Developer Tools' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'portfolio', label: 'Portfolios' },
]

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'all') return projects
  return projects.filter((p) => p.category === category)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}
