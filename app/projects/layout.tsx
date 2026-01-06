import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore my portfolio of 7 live projects including PseudoRun, CodeLens, DevToolsHub, and more. Educational tools, developer utilities, and AI-powered applications.',
  openGraph: {
    title: 'Projects | Idrees Qazi',
    description:
      'Explore my portfolio of 7 live projects including PseudoRun, CodeLens, DevToolsHub, and more.',
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
