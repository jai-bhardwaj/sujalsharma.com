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
    <section id="contact" className="px-5 md:px-10 py-16 md:py-28 rule-t">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10 md:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="label mb-6">Contact</h2>
          <p
            className="display text-[var(--ink)] mb-6"
            style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)' }}
          >
            Tell me what
            <br />
            you&apos;re building.
          </p>
          <p className="text-[17px] md:text-[19px] leading-[1.55] text-[var(--ink-muted)] mb-10 max-w-[42ch]">
            Recruiters, founders, collaborators — all welcome. I read every
            message and reply within a day.
          </p>

          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="group block mb-8"
          >
            <div className="label mb-1">Write me →</div>
            <div
              className="display text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors break-all"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
            >
              {SOCIAL_LINKS.email}
            </div>
          </a>

          <div
            className="flex flex-wrap gap-6 text-[14px]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink"
            >
              LinkedIn →
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink"
            >
              GitHub →
            </a>
          </div>

          <div
            className="mt-10 pt-6 rule-t text-[11px] tracking-[0.12em] uppercase text-[var(--ink-muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Based in {PERSON.location} · {PERSON.availability}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div>
            <label className="label block mb-1">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="your name"
              className={input}
            />
          </div>
          <div>
            <label className="label block mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="you@company.com"
              className={input}
            />
          </div>
          <div>
            <label className="label block mb-1">Message</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="what are you building?"
              className={`${input} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--ink)] text-[var(--bg)] font-medium text-[14px] hover:bg-[var(--accent)] transition-colors disabled:opacity-50"
          >
            {status === 'loading'
              ? 'Sending…'
              : status === 'success'
                ? '✓ Sent'
                : status === 'error'
                  ? 'Failed — try again'
                  : 'Send message'}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </motion.form>
      </div>
    </section>
  )
}
