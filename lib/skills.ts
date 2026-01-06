export interface SkillItem {
  name: string
  proficiency: 'expert' | 'advanced' | 'intermediate'
  percentage: number
  projects?: string[]
}

export interface SkillCategory {
  category: string
  icon: string
  items: SkillItem[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    icon: '💻',
    items: [
      {
        name: 'TypeScript',
        proficiency: 'expert',
        percentage: 95,
        projects: ['PseudoRun', 'CodeLens', 'DevToolsHub', 'Zaheer Portfolio'],
      },
      {
        name: 'JavaScript',
        proficiency: 'advanced',
        percentage: 85,
        projects: ['Site Performance Monitor'],
      },
      {
        name: 'Python',
        proficiency: 'advanced',
        percentage: 80,
        projects: ['YT Video Summariser'],
      },
      {
        name: 'C#',
        proficiency: 'intermediate',
        percentage: 60,
      },
    ],
  },
  {
    category: 'Frontend Frameworks',
    icon: '⚛️',
    items: [
      {
        name: 'Next.js',
        proficiency: 'expert',
        percentage: 95,
        projects: ['CodeLens', 'DevToolsHub', 'Zaheer Portfolio'],
      },
      {
        name: 'React',
        proficiency: 'expert',
        percentage: 90,
      },
      {
        name: 'Vite',
        proficiency: 'advanced',
        percentage: 85,
        projects: ['PseudoRun'],
      },
    ],
  },
  {
    category: 'Styling & UI',
    icon: '🎨',
    items: [
      {
        name: 'Tailwind CSS',
        proficiency: 'expert',
        percentage: 95,
        projects: ['CodeLens', 'DevToolsHub', 'Zaheer Portfolio'],
      },
      {
        name: 'Shadcn/ui',
        proficiency: 'advanced',
        percentage: 85,
        projects: ['CodeLens'],
      },
      {
        name: 'CSS/SCSS',
        proficiency: 'expert',
        percentage: 90,
      },
    ],
  },
  {
    category: 'Backend & Database',
    icon: '🗄️',
    items: [
      {
        name: 'Firebase',
        proficiency: 'advanced',
        percentage: 85,
        projects: ['PseudoRun'],
      },
      {
        name: 'Streamlit',
        proficiency: 'advanced',
        percentage: 80,
        projects: ['YT Video Summariser'],
      },
    ],
  },
  {
    category: 'Deployment & DevOps',
    icon: '🚀',
    items: [
      {
        name: 'Vercel',
        proficiency: 'expert',
        percentage: 95,
        projects: ['CodeLens', 'DevToolsHub', 'Zaheer Portfolio'],
      },
      {
        name: 'Netlify',
        proficiency: 'advanced',
        percentage: 85,
        projects: ['PseudoRun'],
      },
      {
        name: 'GitHub',
        proficiency: 'expert',
        percentage: 95,
      },
    ],
  },
  {
    category: 'AI/ML & Data',
    icon: '🤖',
    items: [
      {
        name: 'AI Model Integration',
        proficiency: 'advanced',
        percentage: 80,
        projects: ['YT Video Summariser'],
      },
      {
        name: 'Data Visualization',
        proficiency: 'advanced',
        percentage: 80,
        projects: ['Site Performance Monitor'],
      },
    ],
  },
]

export const softSkills = [
  'Rapid Prototyping',
  'Problem-Solving',
  'User-Focused Design',
  'Documentation',
  'Community Engagement',
  'Self-Learning',
  'AI-Assisted Development',
  'Vibecoding Philosophy',
]

export interface TimelineItem {
  year: string
  title: string
  description: string
  icon: string
}

export const timeline: TimelineItem[] = [
  {
    year: '2023',
    title: 'Started Coding Journey',
    description: 'Began learning programming with a focus on web development',
    icon: '🚀',
  },
  {
    year: '2024',
    title: 'First Projects',
    description: 'Built initial projects and started contributing to open source',
    icon: '💡',
  },
  {
    year: '2025',
    title: 'PseudoRun Launch',
    description: 'Launched flagship project with 5/5 stars on Firefox Add-ons',
    icon: '⭐',
  },
  {
    year: '2025',
    title: '50+ Repositories',
    description: 'Reached milestone of 50+ GitHub repositories with 247+ contributions',
    icon: '📈',
  },
  {
    year: '2026',
    title: 'Expanding Horizons',
    description: 'Working on CodeLens and exploring new technologies',
    icon: '🔮',
  },
]

export const stats = [
  { number: 7, label: 'Live Projects', icon: '🚀' },
  { number: 50, label: 'GitHub Repos', suffix: '+', icon: '📁' },
  { number: 247, label: 'Contributions', suffix: '+', icon: '💻' },
  { number: 5, label: 'Star Rating', suffix: '/5', icon: '⭐' },
]
