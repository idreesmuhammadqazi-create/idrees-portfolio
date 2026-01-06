import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Idrees Qazi. Have a project idea, want to collaborate, or just want to say hi? Send a message or connect on social media.',
  openGraph: {
    title: 'Contact | Idrees Qazi',
    description:
      'Get in touch with Idrees Qazi. Have a project idea or want to collaborate?',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
