'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SOCIAL_LINKS, PERSON } from '@/lib/constants'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
    window.setTimeout(() => setStatus('idle'), 5000)
  }

  const input =
    'w-full bg-transparent px-0 py-3 text-[16px] text-[var(--ink)] placeholder-[var(--ink-dim)] border-0 border-b border-[var(--rule)] focus:outline-none focus:border-[var(--ink)] transition-colors'

  return (
    <section
      id="contact"
      className="px-6 md:px-10 py-16 md:py-28"
    >
      <div className="max-w-[1080px] mx-auto">
        <h2
          className="text-[13px] tracking-[0.12em] uppercase text-[var(--ink-muted)] mb-8"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Contact
        </h2>

        <motion.a
          href={`mailto:${SOCIAL_LINKS.email}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="display block text-[var(--ink)] mb-10 break-all hover:text-[var(--ink-muted)] transition-colors"
          style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}
        >
          {SOCIAL_LINKS.email}
        </motion.a>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="max-w-[52ch] text-[17px] md:text-[19px] leading-[1.6] text-[var(--ink-muted)] mb-12"
        >
          Recruiters, founders, builders — all welcome. Short notes are fine,
          long ones are better. I read everything and reply within a day.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10 md:gap-16">
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.16 }}
            onSubmit={handleSubmit}
            className="space-y-7 max-w-[480px]"
          >
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
              className={input}
            />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@company.com"
              className={input}
            />
            <textarea
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="What are you working on?"
              className={`${input} resize-none`}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="text-[14px] text-[var(--ink)] link-ink disabled:opacity-50"
            >
              {status === 'loading'
                ? 'Sending…'
                : status === 'success'
                  ? '✓ Sent'
                  : status === 'error'
                    ? 'Failed — try again'
                    : 'Send →'}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="flex flex-col gap-4 text-[15px]"
          >
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink text-[var(--ink)]"
            >
              LinkedIn →
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink text-[var(--ink)]"
            >
              GitHub →
            </a>
            <span
              className="mt-4 text-[11px] tracking-[0.12em] uppercase text-[var(--ink-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {PERSON.location} · {PERSON.availability}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
