'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Toggles `is-visible` on `.reveal` elements as they enter the viewport,
 * so sections animate in fluidly on scroll. The hidden state lives under
 * `html.reveal-ready` in globals.css, meaning:
 *
 *   - default (no JS, or before this effect runs) = content visible
 *   - after this effect mounts, `reveal-ready` is added → elements hide,
 *     then the observer reveals each one as it scrolls in
 *   - a hard 1.2s safety timer reveals anything still hidden, so a stuck
 *     IO can never leave the page blank
 *
 * **Why pathname is a dep:** the root layout (where this component
 * lives) does NOT remount on App Router client-side navigation. Without
 * re-running, the new page's `.reveal` elements stay hidden forever after
 * a route change (e.g., /race → /). Re-running per pathname rescans and
 * (re)observes any not-yet-revealed elements.
 *
 * Reduced-motion: skip the hide-then-reveal dance entirely.
 */
export default function RevealRoot() {
  const pathname = usePathname()

  useEffect(() => {
    const all = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)'),
    )
    if (all.length === 0) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      all.forEach((el) => el.classList.add('is-visible'))
      return
    }

    // Hide all not-yet-revealed elements via the CSS gate (idempotent).
    document.documentElement.classList.add('reveal-ready')

    const inView: HTMLElement[] = []
    const below: HTMLElement[] = []
    all.forEach((el) => {
      const rect = el.getBoundingClientRect()
      ;(rect.top < window.innerHeight * 0.95 ? inView : below).push(el)
    })

    // Reveal in-view next frame so the hidden→visible transition runs.
    const raf = requestAnimationFrame(() => {
      inView.forEach((el) => el.classList.add('is-visible'))
    })

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    below.forEach((el) => io.observe(el))

    // Safety: force-show anything still hidden after 1.2s.
    const safety = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
        .forEach((el) => el.classList.add('is-visible'))
    }, 1200)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(safety)
      io.disconnect()
    }
  }, [pathname])

  return null
}
