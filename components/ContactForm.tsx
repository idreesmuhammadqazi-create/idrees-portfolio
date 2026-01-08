'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  )

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-2 text-foreground"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={cn(
            'w-full px-4 py-3 rounded-lg border bg-background dark:bg-card text-foreground transition-colors',
            'placeholder:text-muted-foreground dark:placeholder:text-muted-foreground/60',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
            errors.name ? 'border-red-500' : 'border-border'
          )}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-2 text-foreground"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={cn(
            'w-full px-4 py-3 rounded-lg border bg-background dark:bg-card text-foreground transition-colors',
            'placeholder:text-muted-foreground dark:placeholder:text-muted-foreground/60',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
            errors.email ? 'border-red-500' : 'border-border'
          )}
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium mb-2 text-foreground"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={cn(
            'w-full px-4 py-3 rounded-lg border bg-background dark:bg-card text-foreground transition-colors',
            'placeholder:text-muted-foreground dark:placeholder:text-muted-foreground/60',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
            errors.subject ? 'border-red-500' : 'border-border'
          )}
          placeholder="What's this about?"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-2 text-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={cn(
            'w-full px-4 py-3 rounded-lg border bg-background dark:bg-card text-foreground transition-colors resize-none',
            'placeholder:text-muted-foreground dark:placeholder:text-muted-foreground/60',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
            errors.message ? 'border-red-500' : 'border-border'
          )}
          placeholder="Tell me about your project or idea..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        isLoading={isSubmitting}
        leftIcon={
          submitStatus === 'success' ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : submitStatus === 'error' ? (
            <AlertCircle className="w-4 h-4" />
          ) : (
            <Send className="w-4 h-4" />
          )
        }
      >
        {isSubmitting
          ? 'Sending...'
          : submitStatus === 'success'
          ? 'Message Sent!'
          : submitStatus === 'error'
          ? 'Failed to Send'
          : 'Send Message'}
      </Button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-green-600 dark:text-green-400"
        >
          Thanks for reaching out! I&apos;ll get back to you soon.
        </motion.p>
      )}

      {submitStatus === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-red-600 dark:text-red-400"
        >
          Something went wrong. Please try again or email me directly.
        </motion.p>
      )}
    </motion.form>
  )
}
