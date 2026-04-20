'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import ArenaHUD from './ArenaHUD'
import { useArenaGame } from '@/hooks/useArenaGame'

const ArenaScene = dynamic(() => import('@/components/3d/ArenaScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0A0E13]" />,
})

export default function Race() {
  const { state, leaderboard, arm, fire, reset } = useArenaGame()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== ' ' && e.key !== 'Enter') return
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      // only respond when the user is actually looking at this section
      const el = document.getElementById('race')
      if (!el) return
      const rect = el.getBoundingClientRect()
      const inView =
        rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4
      if (!inView) return
      e.preventDefault()
      if (state.kind === 'idle' || state.kind === 'missed' || state.kind === 'resolved') {
        if (state.kind === 'idle') arm()
        else {
          reset()
          setTimeout(arm, 120)
        }
      } else {
        fire()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state.kind, arm, fire, reset])

  return (
    <section
      id="race"
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Chapter header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[0.4em] uppercase text-[var(--text-secondary)] mb-6 flex items-center gap-3"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span className="w-8 h-px bg-[#00E5FF]" />
          chapter 02 · on the side
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-bold tracking-tight leading-[0.95] mb-8"
          style={{
            fontSize: 'clamp(2.25rem, 7vw, 5.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
          }}
        >
          I built an HFT engine
          <br />
          <span className="text-[var(--text-secondary)]">for fun.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base md:text-lg text-[var(--text-secondary)] leading-[1.65] max-w-2xl mb-10 md:mb-14"
        >
          Mach-Zero is a C++20 match engine I built solo — not in production,
          not making money, just the system I wish existed so I could learn
          how the real ones work. Target: sub-microsecond matching.{' '}
          <span className="text-[var(--text-primary)]">
            Click below. The engine will beat you by ~6 orders of magnitude.
          </span>
        </motion.p>

        {/* Race arena card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="relative w-full overflow-hidden rounded-lg border border-[rgba(0,229,255,0.15)] bg-[rgba(10,14,19,0.6)]"
          style={{ height: 'min(70vh, 620px)', minHeight: '480px' }}
          onPointerDown={() => {
            if (state.kind === 'armed' || state.kind === 'live') fire()
          }}
        >
          <ArenaScene state={state} onFire={fire} onOrbClick={fire} />
          <ArenaHUD
            state={state}
            leaderboard={leaderboard}
            onArm={arm}
            onReset={reset}
          />
        </motion.div>
      </div>
    </section>
  )
}
