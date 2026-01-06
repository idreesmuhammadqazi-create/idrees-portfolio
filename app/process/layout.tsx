import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Process',
  description:
    'Discover my development process, vibecoding philosophy, workflow, and the tech stack I use to build production-ready applications.',
  openGraph: {
    title: 'Process | Idrees Qazi',
    description:
      'Discover my development process, vibecoding philosophy, workflow, and tech stack.',
  },
}

export default function ProcessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
