'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SOCIAL_LINKS } from '@/lib/constants'

const ORDER_TYPES = ['full-time', 'contract', 'advisory', 'collab']

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [orderType, setOrderType] = useState<(typeof ORDER_TYPES)[number]>('full-time')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          message: `[order: ${orderType}]\n\n${formData.message}`,
        }),
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
    'w-full bg-transparent px-0 py-2 text-[var(--text-primary)] placeholder-[var(--text-secondary)] placeholder:opacity-50 border-0 border-b border-[rgba(255,255,255,0.08)] focus:outline-none focus:border-[#00E5FF] transition-colors duration-200 text-sm'

  return (
    <section
      id="contact"
      className="py-28 md:py-40 px-6 md:px-12 lg:px-16"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '900px' }}
    >
      <div
        className="max-w-3xl mx-auto"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#00E5FF] mb-4 block">
            // open an order
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3 tracking-tight leading-[1.1]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Hiring a fast engineer?
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
            Fill the ticket. I read every message.
          </p>
        </motion.div>

        {/* Command prompt lead-in */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-[13px] mb-4"
        >
          <span className="text-[#00FF94] opacity-80">sujal@mach-zero</span>
          <span className="text-[var(--text-secondary)]">:</span>
          <span className="text-[#FF2E92] opacity-80">~</span>
          <span className="text-[var(--text-secondary)] pr-1">$</span>
          <span className="text-[var(--text-primary)]">
            new-order --interactive
          </span>
        </motion.div>

        {/* Order ticket */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="rounded-md border border-[rgba(0,229,255,0.18)] bg-[rgba(10,14,19,0.72)] backdrop-blur-sm overflow-hidden"
        >
          {/* Ticket header */}
          <header className="flex items-center justify-between gap-3 px-6 py-3 border-b border-[rgba(0,229,255,0.1)] bg-[rgba(0,229,255,0.025)]">
            <div className="flex items-center gap-4 text-[11px] text-[var(--text-secondary)]">
              <span className="text-[#00E5FF]">NEW-ORDER</span>
              <span className="opacity-50">·</span>
              <span>ticker: SWE-1</span>
              <span className="opacity-50">·</span>
              <span>
                side: <span className="text-[#00FF94]">buy</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[#FFD600]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD600] animate-pulse" />
              pending
            </div>
          </header>

          {/* Ticket body */}
          <div className="p-6 md:p-8 space-y-7">
            {/* Order type selector */}
            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)] mb-3">
                order type
              </label>
              <div className="flex flex-wrap gap-2">
                {ORDER_TYPES.map((t) => {
                  const active = orderType === t
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setOrderType(t)}
                      className={`px-3 py-1.5 text-[11px] tracking-[0.15em] uppercase rounded border transition-all ${
                        active
                          ? 'border-[#00E5FF] bg-[rgba(0,229,255,0.08)] text-[#00E5FF]'
                          : 'border-[rgba(255,255,255,0.08)] text-[var(--text-secondary)] hover:border-[rgba(0,229,255,0.4)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Name + email (labeled rows) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)] mb-1">
                  from / name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="your name"
                  className={fieldBase}
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)] mb-1">
                  reply-to
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@company.com"
                  className={fieldBase}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)] mb-1">
                notes · role · latency budget
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="the role, the team, the problem you want solved…"
                className={`${fieldBase} resize-none`}
              />
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <div className="text-[10px] tracking-[0.25em] uppercase text-[var(--text-secondary)]">
                tif: gtc · routes direct to inbox
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#00E5FF] text-[#0A0E13] font-bold text-xs tracking-[0.25em] uppercase rounded-md hover:shadow-[0_0_24px_rgba(0,229,255,0.55)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading'
                  ? 'routing…'
                  : status === 'success'
                    ? '✓ filled'
                    : status === 'error'
                      ? 'rejected · retry'
                      : 'submit order →'}
              </button>
            </div>
          </div>
        </motion.form>

        {/* Fallback contact links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] tracking-[0.25em] uppercase"
        >
          <span className="text-[var(--text-secondary)] opacity-60">
            or skip the ticket —
          </span>
          <div className="flex items-center gap-5">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[#00E5FF] transition-colors"
            >
              github/{SOCIAL_LINKS.githubHandle}
            </a>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="text-[var(--text-secondary)] hover:text-[#00E5FF] transition-colors normal-case tracking-normal"
            >
              {SOCIAL_LINKS.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
