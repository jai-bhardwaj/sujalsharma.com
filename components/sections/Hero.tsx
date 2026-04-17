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

export default function Hero() {
  const { state, leaderboard, arm, fire, reset } = useArenaGame()

  // Keyboard: space = fire / arm / reset depending on state
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== ' ' && e.key !== 'Enter') return
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
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
      id="home"
      className="relative h-screen min-h-[720px] flex items-center justify-center overflow-hidden"
      onPointerDown={() => {
        // Catch clicks outside the canvas too (during live state only — avoid stealing button clicks)
        if (state.kind === 'armed' || state.kind === 'live') fire()
      }}
    >
      <ArenaScene state={state} onFire={fire} onOrbClick={fire} />
      <ArenaHUD state={state} leaderboard={leaderboard} onArm={arm} onReset={reset} />

      {/* Scroll hint */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)] hover:text-[#00E5FF] transition-colors"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        scroll · work
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="inline-block"
        >
          ↓
        </motion.span>
      </motion.a>
    </section>
  )
}
