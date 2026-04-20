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
    'w-full bg-transparent px-0 py-3 text-base md:text-lg text-[var(--ink)] placeholder-[rgba(10,10,10,0.4)] border-0 border-b-2 border-[rgba(10,10,10,0.15)] focus:outline-none focus:border-[var(--ink)] transition-colors duration-200 font-medium'

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 md:py-40 px-6 md:px-12 lg:px-20"
      style={{ background: 'var(--lime)', color: 'var(--ink)' }}
    >
      {/* Decorations */}
      <div
        className="absolute left-[8%] top-[10%] rounded-full"
        style={{
          width: 'clamp(140px, 16vw, 240px)',
          height: 'clamp(140px, 16vw, 240px)',
          background: 'var(--blue)',
          opacity: 0.9,
        }}
        aria-hidden
      />
      <div
        className="absolute right-[-6%] bottom-[8%] rounded-full"
        style={{
          width: 'clamp(180px, 22vw, 340px)',
          height: 'clamp(180px, 22vw, 340px)',
          background: 'var(--pink)',
          opacity: 0.85,
        }}
        aria-hidden
      />
      <div className="noise-overlay" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[0.4em] uppercase mb-6 flex items-center gap-3"
          style={{ fontFamily: 'var(--font-mono)', color: 'rgba(10,10,10,0.7)' }}
        >
          <span className="w-10 h-px bg-[var(--ink)] opacity-50" />
          chapter 04 · contact
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-bold tracking-tight leading-[0.9] mb-10 md:mb-14"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.75rem, 10vw, 9rem)',
            letterSpacing: '-0.03em',
          }}
        >
          Let&apos;s talk.
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-start">
          {/* Primary CTA — huge email */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <p className="text-xl md:text-2xl leading-[1.5] max-w-xl font-medium">
              Hiring for something fast? Want to collaborate on a side project?
              Have an interesting problem? Write me.
            </p>

            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="group block"
            >
              <span
                className="block font-bold tracking-tight leading-[0.95] break-all"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 4.5vw, 3.6rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                {SOCIAL_LINKS.email}
                <span className="inline-block transition-transform group-hover:translate-x-2 ml-2">
                  →
                </span>
              </span>
            </a>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 font-semibold text-sm hover:scale-[1.04] transition-transform"
                style={{
                  borderColor: 'var(--ink)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                LinkedIn →
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 font-semibold text-sm hover:scale-[1.04] transition-transform"
                style={{
                  borderColor: 'var(--ink)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                GitHub →
              </a>
            </div>

            <div
              className="pt-4 text-[11px] tracking-[0.3em] uppercase"
              style={{ fontFamily: 'var(--font-mono)', color: 'rgba(10,10,10,0.6)' }}
            >
              {PERSON.location} · {PERSON.availability}
            </div>
          </motion.div>

          {/* Secondary: small form */}
          <motion.form
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="lg:pl-10 lg:border-l-2 lg:border-[rgba(10,10,10,0.1)] space-y-5"
          >
            <div
              className="text-[10px] tracking-[0.3em] uppercase opacity-70"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              or drop a note
            </div>

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

            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-[0.1em] uppercase hover:scale-[1.04] transition-transform disabled:opacity-50"
              style={{
                background: 'var(--ink)',
                color: 'var(--lime)',
                fontFamily: 'var(--font-display)',
              }}
            >
              {status === 'loading'
                ? 'sending…'
                : status === 'success'
                  ? '✓ sent'
                  : status === 'error'
                    ? 'failed · retry'
                    : 'send →'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
