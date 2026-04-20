'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SOCIAL_LINKS, PERSON } from '@/lib/constants'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

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
    setTimeout(() => setStatus('idle'), 5000)
  }

  const fieldBase =
    'w-full bg-transparent px-0 py-3 text-base md:text-lg text-[var(--text-primary)] placeholder-[var(--text-secondary)] placeholder:opacity-40 border-0 border-b border-[rgba(255,255,255,0.1)] focus:outline-none focus:border-[#00E5FF] transition-colors duration-200'

  return (
    <section
      id="contact"
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '900px' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[0.4em] uppercase text-[var(--text-secondary)] mb-6 flex items-center gap-3"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span className="w-8 h-px bg-[#00E5FF]" />
          chapter 04 · contact
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-bold tracking-tight leading-[0.95] mb-8 md:mb-10"
          style={{
            fontSize: 'clamp(2.25rem, 7vw, 5.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
          }}
        >
          Let&apos;s talk.
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-start">
          {/* Primary: direct links — what most recruiters will use */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-base md:text-lg text-[var(--text-secondary)] leading-[1.65] max-w-xl">
              Hiring for something fast? Want to collaborate on a side project?
              Have a problem you think I&apos;d find interesting? Write me.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="group flex items-center gap-3 text-xl md:text-3xl font-semibold text-[var(--text-primary)] tracking-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                <span className="transition-colors group-hover:text-[#00E5FF]">
                  {SOCIAL_LINKS.email}
                </span>
                <span className="transition-transform group-hover:translate-x-1 text-[#00E5FF]">
                  →
                </span>
              </a>

              <div
                className="flex flex-wrap gap-x-8 gap-y-2 text-xs tracking-[0.25em] uppercase pt-3"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] hover:text-[#00E5FF] transition-colors"
                >
                  linkedin →
                </a>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] hover:text-[#00E5FF] transition-colors"
                >
                  github/{SOCIAL_LINKS.githubHandle} →
                </a>
              </div>
            </div>

            <div
              className="pt-4 text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)] opacity-60"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              based in {PERSON.location} · {PERSON.availability}
            </div>
          </motion.div>

          {/* Secondary: inline form for those who prefer it */}
          <motion.form
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.18 }}
            onSubmit={handleSubmit}
            className="lg:border-l lg:border-[rgba(255,255,255,0.06)] lg:pl-12 space-y-6"
          >
            <div
              className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)] opacity-70"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              or send a note here
            </div>

            <div className="space-y-5">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="your name"
                className={fieldBase}
              />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@company.com"
                className={fieldBase}
              />
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="what's on your mind"
                className={`${fieldBase} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="group flex items-center gap-2 text-sm tracking-[0.25em] uppercase text-[#00E5FF] border-b border-[#00E5FF]/30 pb-1 hover:border-[#00E5FF] transition disabled:opacity-50"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {status === 'loading'
                ? 'sending…'
                : status === 'success'
                  ? '✓ sent'
                  : status === 'error'
                    ? 'failed · retry'
                    : 'send'}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
