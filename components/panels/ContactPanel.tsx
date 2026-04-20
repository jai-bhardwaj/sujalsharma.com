'use client'

import { useState } from 'react'
import Panel from '@/components/terminal/Panel'
import { PERSON, SOCIAL_LINKS } from '@/lib/constants'

const ORDER_TYPES = ['hire', 'collab', 'advisory', 'chat'] as const
type OrderType = (typeof ORDER_TYPES)[number]

export default function ContactPanel() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [orderType, setOrderType] = useState<OrderType>('hire')
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
    window.setTimeout(() => setStatus('idle'), 5000)
  }

  const input =
    'w-full bg-transparent px-0 py-2 text-[15px] text-[var(--fg)] placeholder-[var(--dim)] placeholder:opacity-60 border-0 border-b border-[var(--rule)] focus:outline-none focus:border-[var(--accent)] transition-colors'

  return (
    <Panel
      symbol="ORDER"
      title="CONTACT"
      meta={
        <span className="label">
          tif · <span className="text-[var(--fg)]">GTC</span>
        </span>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16">
        {/* Order entry */}
        <form
          onSubmit={handleSubmit}
          className="space-y-7"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <div>
            <label className="label block mb-3">order type</label>
            <div className="flex flex-wrap gap-2">
              {ORDER_TYPES.map((t) => {
                const active = orderType === t
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setOrderType(t)}
                    className="px-3 py-1.5 text-[11px] tracking-[0.2em] uppercase border transition-colors"
                    style={{
                      borderColor: active ? 'var(--accent)' : 'var(--rule)',
                      color: active ? 'var(--accent)' : 'var(--dim)',
                    }}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <div>
              <label className="label block mb-1">from</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="your name"
                className={input}
                style={{ fontFamily: 'var(--font-sans)' }}
              />
            </div>
            <div>
              <label className="label block mb-1">reply-to</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="you@company.com"
                className={input}
                style={{ fontFamily: 'var(--font-sans)' }}
              />
            </div>
          </div>

          <div>
            <label className="label block mb-1">notes</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="the role, the problem, the latency budget…"
              className={`${input} resize-none`}
              style={{ fontFamily: 'var(--font-sans)' }}
            />
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <div className="label">routes direct to inbox</div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-5 py-2.5 text-[11px] tracking-[0.25em] uppercase border transition-colors disabled:opacity-50"
              style={{
                fontFamily: 'var(--font-mono)',
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
              }}
            >
              {status === 'loading'
                ? 'routing…'
                : status === 'success'
                  ? '✓ filled'
                  : status === 'error'
                    ? 'rejected · retry'
                    : 'place order →'}
            </button>
          </div>
        </form>

        {/* Direct links */}
        <div
          className="lg:border-l lg:border-[var(--rule)] lg:pl-10 space-y-5 text-[14px]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <div className="label">direct</div>

          <DirectLink
            label="email"
            value={SOCIAL_LINKS.email}
            href={`mailto:${SOCIAL_LINKS.email}`}
          />
          <DirectLink
            label="linkedin"
            value={`/in/${SOCIAL_LINKS.linkedinHandle}`}
            href={SOCIAL_LINKS.linkedin}
            external
          />
          <DirectLink
            label="github"
            value={`/${SOCIAL_LINKS.githubHandle}`}
            href={SOCIAL_LINKS.github}
            external
          />

          <div className="pt-5 border-t border-[var(--rule)] space-y-1 text-[11px] tracking-[0.2em] uppercase text-[var(--dim)]">
            <div>
              based in{' '}
              <span className="text-[var(--fg)]">{PERSON.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--up)] pulse" />
              <span>{PERSON.availability}</span>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  )
}

function DirectLink({
  label,
  value,
  href,
  external,
}: {
  label: string
  value: string
  href: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group block rule-b pb-3"
    >
      <div className="label mb-1">{label}</div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors truncate">
          {value}
        </span>
        <span className="text-[var(--accent)] transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </div>
    </a>
  )
}
