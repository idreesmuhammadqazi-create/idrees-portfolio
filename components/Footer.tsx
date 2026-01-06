'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail, ExternalLink, Code2 } from 'lucide-react'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/idreesmuhammadqazi-create',
    icon: Github,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/crypt0phage',
    icon: Twitter,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/idreesqazi',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:contact@idreesqazi.dev',
    icon: Mail,
  },
]

const quickLinks = [
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Process', href: '/process' },
  { name: 'Contact', href: '/contact' },
]

const projectLinks = [
  { name: 'PseudoRun', href: 'https://pseudorun.tech' },
  { name: 'CodeLens', href: 'https://codelen.vercel.app' },
  { name: 'DevToolsHub', href: 'https://devtoolshub-chi.vercel.app' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 dark:bg-muted/20 border-t border-border">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white dark:text-black" />
              </div>
              <span className="font-bold text-lg">
                Idrees<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Student Developer & Creator. Building tools that solve real problems through vibecoding.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  aria-label={link.name}
                >
                  <link.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="font-semibold mb-4">Featured Projects</h3>
            <ul className="space-y-2">
              {projectLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm inline-flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Get in Touch</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Have a project idea or want to collaborate? Let&apos;s build something together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Idrees Muhammad Qazi. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Built with{' '}
            <span className="text-accent">Next.js</span>,{' '}
            <span className="text-accent">TypeScript</span> &{' '}
            <span className="text-accent">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
