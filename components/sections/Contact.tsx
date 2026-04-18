'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SOCIAL_LINKS } from '@/lib/constants'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
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

  const inputClasses =
    'w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[#00E5FF] focus:shadow-[0_0_0_1px_rgba(0,229,255,0.3)] transition-all duration-300 text-sm'

  return (
    <section id="contact" className="py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span
            className="text-[10px] tracking-[0.3em] uppercase text-[#00E5FF] mb-4 block"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            // open an order
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight leading-[1.1]">
            Hiring a fast engineer?
          </h2>
          <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
            Tell me about the problem. I read every message.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="space-y-5"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-[var(--text-secondary)] mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="your name"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-[var(--text-secondary)] mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@company.com"
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.25em] uppercase text-[var(--text-secondary)] mb-2">
              Message
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="the role, the problem, the latency budget…"
              className={`${inputClasses} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 bg-[#00E5FF] text-[#0A0E13] font-bold text-xs tracking-[0.25em] uppercase rounded-md hover:shadow-[0_0_24px_rgba(0,229,255,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading'
              ? 'routing...'
              : status === 'success'
              ? '✓ order filled'
              : status === 'error'
              ? 'rejected — retry'
              : '► send'}
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-center gap-5 text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] hover:text-[#00E5FF] transition-colors"
          >
            github/{SOCIAL_LINKS.githubHandle}
          </a>
          <span className="hidden sm:inline text-[var(--text-secondary)] opacity-40">·</span>
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="text-[var(--text-secondary)] hover:text-[#00E5FF] transition-colors normal-case tracking-normal"
          >
            {SOCIAL_LINKS.email}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
