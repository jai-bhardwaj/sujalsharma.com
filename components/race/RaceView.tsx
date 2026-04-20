'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useMemo } from 'react'
import RaceHUD from './RaceHUD'
import { useArenaGame } from '@/hooks/useArenaGame'

const ArenaScene = dynamic(() => import('@/components/3d/ArenaScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 race-surface" />,
})

export default function RaceView() {
  const { state, leaderboard, arm, fire, reset } = useArenaGame()
  const best = useMemo(
    () => (leaderboard.length ? leaderboard[0].userMs : null),
    [leaderboard],
  )

  const trigger = () => {
    if (state.kind === 'armed' || state.kind === 'live') {
      fire()
    } else if (state.kind === 'resolved' || state.kind === 'missed') {
      reset()
      window.setTimeout(arm, 120)
    } else {
      arm()
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== ' ' && e.key !== 'Enter') return
      const t = e.target as HTMLElement | null
      const tag = t?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || t?.isContentEditable) return
      e.preventDefault()
      trigger()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state.kind])

  return (
    <main
      className="race-surface min-h-screen relative overflow-hidden"
      onPointerDown={() => {
        if (state.kind === 'armed' || state.kind === 'live') fire()
      }}
    >
      {/* Minimal top nav */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-10 py-5 flex items-center justify-between text-[11px] tracking-[0.18em] uppercase text-[rgba(230,237,243,0.6)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 hover:text-[#F5F7FA] transition-colors"
        >
          <span>←</span> back to portfolio
        </Link>
        <span className="hidden md:block">sujalsharma.com / race</span>
      </div>

      {/* Arena */}
      <div
        className="absolute inset-0"
        style={{ minHeight: '100dvh' }}
      >
        <ArenaScene state={state} onFire={fire} onOrbClick={fire} />
      </div>

      {/* HUD overlay */}
      <RaceHUD state={state} best={best} onArm={arm} onReset={reset} />
    </main>
  )
}
