'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const NAV = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
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
    <header className="sticky top-0 z-40 bg-[var(--bg)]/90 backdrop-blur-sm">
      <div className="max-w-[960px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="text-[13px] tracking-[0.06em] text-[var(--ink)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          sujal sharma
        </Link>

        <nav
          className="hidden md:flex items-center gap-6 text-[13px]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <span className="text-[var(--ink-dim)] ml-2 tab">
            {time || '—'}
          </span>
        </nav>

        <button
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-px bg-[var(--ink)] transition-transform"
            style={{ transform: open ? 'translateY(3px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block w-5 h-px bg-[var(--ink)] transition-transform"
            style={{ transform: open ? 'translateY(-3px) rotate(-45deg)' : 'none' }}
          />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--rule)]">
          <nav
            className="flex flex-col px-6 py-2"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[14px] text-[var(--ink)] border-b border-[var(--rule-soft)] last:border-none"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
