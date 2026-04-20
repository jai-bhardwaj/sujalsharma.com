'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import ArenaHUD from './ArenaHUD'
import { useArenaGame } from '@/hooks/useArenaGame'

const ArenaScene = dynamic(() => import('@/components/3d/ArenaScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#07090D]" />,
})

export default function Race() {
  const { state, leaderboard, arm, fire, reset } = useArenaGame()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== ' ' && e.key !== 'Enter') return
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
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
      className="relative overflow-hidden py-28 md:py-40 px-6 md:px-12 lg:px-20"
      style={{ background: 'var(--ink)', color: 'var(--cream)' }}
    >
      {/* Bright sticker dots on dark */}
      <div
        className="absolute top-16 right-[6%] rounded-full opacity-90"
        style={{
          width: 'clamp(120px, 16vw, 260px)',
          height: 'clamp(120px, 16vw, 260px)',
          background: 'var(--pink)',
          filter: 'blur(60px)',
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-20 left-[4%] rounded-full opacity-90"
        style={{
          width: 'clamp(100px, 14vw, 220px)',
          height: 'clamp(100px, 14vw, 220px)',
          background: 'var(--cyan)',
          filter: 'blur(60px)',
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[0.4em] uppercase mb-6 flex items-center gap-3"
          style={{ fontFamily: 'var(--font-mono)', color: 'rgba(250,246,236,0.65)' }}
        >
          <span className="w-10 h-px opacity-40" style={{ background: 'var(--cream)' }} />
          chapter 02 · on the side
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-bold tracking-tight leading-[0.9] mb-8"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 9vw, 7.5rem)',
            letterSpacing: '-0.03em',
          }}
        >
          I built an{' '}
          <span style={{ color: 'var(--lime)' }}>HFT engine</span>
          <br />
          <span style={{ color: 'rgba(250,246,236,0.5)' }}>for fun.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base md:text-xl leading-[1.55] max-w-2xl mb-12 md:mb-16 font-medium"
          style={{ color: 'rgba(250,246,236,0.85)' }}
        >
          Mach-Zero is a C++20 match engine I built solo — not in production,
          not making money, just the system I wish existed so I could learn
          how the real ones work. Target: sub-microsecond matching.{' '}
          <span style={{ color: 'var(--lime)' }}>
            Click the card. The engine will beat you by ~6 orders of magnitude.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="relative w-full overflow-hidden rounded-3xl arena-surface"
          style={{
            height: 'min(72vh, 640px)',
            minHeight: '480px',
            border: '2px solid var(--lime)',
            boxShadow: '0 30px 80px -20px rgba(194, 255, 0, 0.25)',
          }}
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
