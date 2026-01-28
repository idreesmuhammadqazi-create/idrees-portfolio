import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Idrees Qazi | Student Developer & Creator',
    template: '%s | Idrees Qazi',
  },
  description:
    'Student Developer & Creator building tools that solve real problems. Specializing in TypeScript, Next.js, and full-stack development with a vibecoding philosophy.',
  keywords: [
    'Idrees Qazi',
    'Student Developer',
    'TypeScript',
    'Next.js',
    'React',
    'Full Stack Developer',
    'Web Developer',
    'Portfolio',
    'PseudoRun',
    'CodeLens',
  ],
  authors: [{ name: 'Idrees Muhammad Qazi' }],
  creator: 'Idrees Muhammad Qazi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://idreesqazi.dev',
    siteName: 'Idrees Qazi Portfolio',
    title: 'Idrees Qazi | Student Developer & Creator',
    description:
      'Student Developer & Creator building tools that solve real problems. Specializing in TypeScript, Next.js, and full-stack development.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Idrees Qazi Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Idrees Qazi | Student Developer & Creator',
    description:
      'Student Developer & Creator building tools that solve real problems.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
