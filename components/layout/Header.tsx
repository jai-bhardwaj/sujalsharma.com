'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const NAV = [
  { label: 'Work', href: '/#work' },
  { label: 'Race', href: '/race' },
  { label: 'Contact', href: '/#contact' },
]

function formatTime(d: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

export default function Header() {
  const [time, setTime] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()))
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-sm"
      style={{
        background:
          'linear-gradient(180deg, oklch(0.97 0.008 85 / 0.92), oklch(0.97 0.008 85 / 0.78))',
        borderBottom: '1px solid var(--rule-soft)',
      }}
    >
      <div
        className="mx-auto flex items-center justify-between gap-6"
        style={{
          maxWidth: '1080px',
          paddingLeft: 'clamp(24px, 5vw, 80px)',
          paddingRight: 'clamp(24px, 5vw, 80px)',
          height: 56,
        }}
      >
        <Link
          href="/"
          className="label"
          style={{
            color: 'var(--ink)',
            letterSpacing: '0.16em',
            textDecoration: 'none',
          }}
        >
          SUJAL SHARMA · NOTEBOOK
        </Link>

        <nav
          className="hidden md:flex items-center gap-7"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-ink"
              style={{
                fontSize: 'var(--t-sm)',
                color: 'var(--graphite)',
                textDecorationColor: 'transparent',
              }}
            >
              {item.label}
            </Link>
          ))}
          <span
            className="tab"
            style={{
              fontSize: 'var(--t-xs)',
              letterSpacing: '0.14em',
              color: 'var(--graphite)',
            }}
          >
            {time || '—'} IST
          </span>
        </nav>

        <button
          className="md:hidden flex flex-col items-center justify-center gap-1.5 w-9 h-9"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{ color: 'var(--ink)' }}
        >
          <span
            className="block w-5 h-px transition-transform"
            style={{
              background: 'currentColor',
              transform: open ? 'translateY(3px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block w-5 h-px transition-transform"
            style={{
              background: 'currentColor',
              transform: open ? 'translateY(-3px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>

      {open && (
        <div
          className="md:hidden"
          style={{ borderTop: '1px solid var(--rule)' }}
        >
          <nav
            className="flex flex-col px-6 py-2"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rule-soft-b"
                style={{
                  padding: '12px 0',
                  color: 'var(--ink)',
                  fontSize: 'var(--t-sm)',
                }}
              >
                {item.label}
              </Link>
            ))}
            <span
              className="label tab"
              style={{ padding: '12px 0', color: 'var(--graphite)' }}
            >
              {time || '—'} IST · Hyderabad
            </span>
          </nav>
        </div>
      )}
    </header>
  )
}
