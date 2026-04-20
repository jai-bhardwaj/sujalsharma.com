'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const NAV = [
  { label: 'Home', href: '/#home' },
  { label: 'Work', href: '/#work' },
  { label: 'Race', href: '/race' },
  { label: 'Info', href: '/#info' },
  { label: 'Contact', href: '/#contact' },
]

function formatTime(d: Date): string {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  })
  return fmt.format(d)
}

export default function Header() {
  const [time, setTime] = useState<string>('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()))
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg)]/88 backdrop-blur-md rule-b">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-14 md:h-16 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[13px] md:text-[14px] font-semibold tracking-tight"
        >
          <span
            className="inline-block w-2 h-2 rounded-full bg-[var(--ink)] pulse"
            aria-hidden
          />
          Sujal Sharma
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[13px]">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-[var(--ink-muted)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span>Hyderabad, IN</span>
          <span className="text-[var(--ink-dim)]">—</span>
          <span className="tab text-[var(--ink)]">{time || '—'}</span>
        </div>

        <button
          className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-[1.5px] bg-[var(--ink)] transition-transform"
            style={{ transform: open ? 'translateY(3px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block w-5 h-[1.5px] bg-[var(--ink)] transition-transform"
            style={{ transform: open ? 'translateY(-3px) rotate(-45deg)' : 'none' }}
          />
        </button>
      </div>

      {open && (
        <div className="md:hidden rule-t">
          <nav className="flex flex-col px-5 py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 text-[15px] text-[var(--ink)] rule-soft-b last:border-none"
              >
                {item.label}
              </Link>
            ))}
            <div
              className="pt-3 text-[11px] tracking-[0.12em] uppercase text-[var(--ink-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Hyderabad, IN · <span className="tab text-[var(--ink)]">{time || '—'}</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
