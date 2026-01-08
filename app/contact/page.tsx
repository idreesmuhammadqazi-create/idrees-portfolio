'use client'

import { motion } from 'framer-motion'
import {
  Mail,
  Github,
  MapPin,
  Clock,
  MessageSquare,
} from 'lucide-react'
import { SiDiscord } from 'react-icons/si'
import ContactForm from '@/components/ContactForm'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'idreesmuhammadqazi@gmail.com',
    href: 'mailto:idreesmuhammadqazi@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Building Globally',
    href: null,
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Usually within 24 hours',
    href: null,
  },
]

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/idreesmuhammadqazi-create',
    icon: Github,
    description: '50+ repositories',
  },
  {
    name: 'Discord',
    href: 'https://discord.com/users/1386752392602718271',
    icon: SiDiscord,
    description: 'Chat with me',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a project idea, want to collaborate, or just want to say hi?
            I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
              <p className="text-muted-foreground">
                Fill out the form below and I&apos;ll get back to you as soon as
                possible.
              </p>
            </motion.div>

            <ContactForm />
          </div>

          {/* Contact Info & Social */}
          <div>
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6">Contact Info</h2>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {info.label}
                      </div>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="font-medium hover:text-accent transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="font-medium">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6">Connect Online</h2>
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-accent/50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                      <link.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium group-hover:text-accent transition-colors">
                        {link.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {link.description}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Quick Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 rounded-xl bg-muted/50 border border-border"
            >
              <div className="flex items-start gap-4">
                <MessageSquare className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">A Quick Note</h3>
                  <p className="text-muted-foreground text-sm">
                    I&apos;m always interested in hearing about new projects,
                    especially those that involve building tools that help people.
                    Whether it&apos;s a collaboration, a job opportunity, or just a
                    chat about tech—don&apos;t hesitate to reach out!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
