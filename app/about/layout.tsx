import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Idrees Muhammad Qazi - a student developer passionate about building tools that solve real problems. Skills, journey, and philosophy.',
  openGraph: {
    title: 'About | Idrees Qazi',
    description:
      'Learn about Idrees Muhammad Qazi - a student developer passionate about building tools that solve real problems.',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
