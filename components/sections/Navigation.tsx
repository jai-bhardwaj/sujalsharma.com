'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants'
import { useLivePrice, BINANCE_BTC_USDT } from '@/hooks/useLivePrice'

function compactPrice(display: string): string {
  const match = display.match(/\$([\d,]+\.?\d*)/)
  if (!match) return display
  const n = parseFloat(match[1].replace(/,/g, ''))
  if (!Number.isFinite(n)) return display
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`
  return `$${n.toFixed(2)}`
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState<string>('home')
  const btc = useLivePrice(BINANCE_BTC_USDT)

  useEffect(() => {
    const ids = ['home', 'now', 'race', 'projects', 'contact']
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)
    if (elements.length === 0) return

    const visibility = new Map<string, number>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visibility.set(e.target.id, e.intersectionRatio)
        let best: { id: string; ratio: number } = { id: 'home', ratio: 0 }
        for (const [id, ratio] of visibility) {
          if (ratio > best.ratio) best = { id, ratio }
        }
        if (best.ratio <= 0) return
        setActive(best.id)
        const target = best.id === 'home' ? '' : `#${best.id}`
        const current = window.location.hash
        if (current !== target) {
          const url = target || window.location.pathname + window.location.search
          history.replaceState(null, '', url)
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    elements.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    history.replaceState(null, '', window.location.pathname + window.location.search)
    setMobileOpen(false)
  }

  // White text + mix-blend-difference inverts against whatever color
  // sits behind the nav, so it reads on cream / blue / black / pink / lime.
  const blendStyle: React.CSSProperties = {
    color: '#FFFFFF',
    mixBlendMode: 'difference',
    fontFamily: 'var(--font-mono)',
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      <div
        className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between pointer-events-auto"
        style={blendStyle}
      >
        <div className="flex items-center gap-5">
          <a
            href="#home"
            onClick={handleHomeClick}
            className="text-lg font-bold tracking-tight"
          >
            <span>&lt;</span>
            <span>SS</span>
            <span> /&gt;</span>
          </a>

          <a
            href="#race"
            className="hidden lg:flex items-center gap-2 text-[11px] pl-5 border-l border-current/40"
            aria-label="Live BTC/USDT price"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            <span className="opacity-70">btc</span>
            <span className="tabular-nums min-w-[54px]">
              {compactPrice(btc.display)}
            </span>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace('#', '')
            const isActive = active === id
            const onClick = id === 'home' ? handleHomeClick : undefined
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={onClick}
                className={`text-xs tracking-[0.25em] uppercase transition-opacity ${
                  isActive ? 'opacity-100' : 'opacity-65 hover:opacity-100'
                }`}
              >
                {link.label}
              </a>
            )
          })}
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.25em] uppercase opacity-65 hover:opacity-100 transition-opacity"
          >
            LinkedIn
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.25em] uppercase opacity-65 hover:opacity-100 transition-opacity"
          >
            GitHub
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-current"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-current"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-current"
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pointer-events-auto"
            style={{ background: 'rgba(10,10,10,0.96)', color: 'var(--cream)' }}
          >
            <div
              className="px-6 py-5 flex flex-col gap-4 text-sm tracking-[0.25em] uppercase"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-[var(--lime)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="h-px bg-[rgba(250,246,236,0.15)] my-1" />
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="hover:text-[var(--lime)] transition-colors"
              >
                LinkedIn →
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="hover:text-[var(--lime)] transition-colors"
              >
                GitHub →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
