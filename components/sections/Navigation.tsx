'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants'
import { useLivePrice, BINANCE_BTC_USDT } from '@/hooks/useLivePrice'

function compactPrice(display: string): string {
  // "BTC/USDT  $67,482.11" -> "$67.5k"
  const match = display.match(/\$([\d,]+\.?\d*)/)
  if (!match) return display
  const n = parseFloat(match[1].replace(/,/g, ''))
  if (!Number.isFinite(n)) return display
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`
  return `$${n.toFixed(2)}`
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState<string>('home')
  const btc = useLivePrice(BINANCE_BTC_USDT)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: keep the URL hash in sync with the most-visible section,
  // and clear it entirely when the user is back at the hero.
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

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <a
            href="#home"
            onClick={handleHomeClick}
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="text-[#00E5FF]">&lt;</span>
            <span className="text-[var(--text-primary)]">SS</span>
            <span className="text-[#00E5FF]"> /&gt;</span>
          </a>

          {/* Live BTC ticker — persistent across the whole site */}
          <a
            href="#race"
            className="hidden lg:flex items-center gap-2 text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors pl-5 border-l border-[rgba(255,255,255,0.08)]"
            style={{ fontFamily: 'var(--font-mono)' }}
            aria-label="Live BTC/USDT price"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                btc.isLive
                  ? 'bg-[#00FF94] animate-pulse'
                  : 'bg-[var(--text-secondary)] opacity-40'
              }`}
            />
            <span className="opacity-60">btc</span>
            <span className="text-[var(--text-primary)] tabular-nums min-w-[54px]">
              {compactPrice(btc.display)}
            </span>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace('#', '')
            const isActive = active === id
            const onClick = id === 'home' ? handleHomeClick : undefined
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={onClick}
                className={`text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
                  isActive
                    ? 'text-[#00E5FF]'
                    : 'text-[var(--text-secondary)] hover:text-[#00E5FF]'
                }`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {link.label}
              </a>
            )
          })}
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] hover:text-[#00E5FF] transition-colors duration-200"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            LinkedIn
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase px-4 py-1.5 border border-[#00E5FF] text-[#00E5FF] rounded hover:bg-[rgba(0,229,255,0.1)] transition-all duration-200"
            style={{ fontFamily: 'var(--font-mono)' }}
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
            className="block w-6 h-0.5 bg-[var(--text-primary)]"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-[var(--text-primary)]"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-[var(--text-primary)]"
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-[var(--text-secondary)] hover:text-[#00E5FF] transition-colors"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-[#00E5FF] transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}
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
