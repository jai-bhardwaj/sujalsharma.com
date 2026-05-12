'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useMemo } from 'react'
import RaceHUD from './RaceHUD'
import PencilArrow from '@/components/notebook/PencilArrow'
import { useArenaGame, formatMs } from '@/hooks/useArenaGame'

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
      {/* Top nav — single bar holding the back link on the left and
          the live status + best time on the right. Both halves shrink
          gracefully on narrow screens. */}
      <div
        className="absolute top-0 left-0 right-0 z-20 px-5 md:px-10 py-4 md:py-5 flex items-center justify-between gap-4 text-[11px] tracking-[0.18em] uppercase text-[rgba(230,237,243,0.65)] pointer-events-auto"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <Link
          href="/"
          className="group flex items-center gap-2 md:gap-3 hover:text-[#F5F7FA] transition-colors"
        >
          <span className="back-nudge inline-block">
            <PencilArrow direction="left" size={24} />
          </span>
          <span className="hidden sm:inline">back to notebook</span>
          <span className="sm:hidden">back</span>
        </Link>
        <div className="flex items-center gap-3 md:gap-5">
          <span className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] pulse" />
            <span>Mach-Zero · reaction bench</span>
          </span>
          <span className="tab whitespace-nowrap">
            best · <span className="text-[#E6EDF3]">{best != null ? formatMs(best) : '—'}</span>
          </span>
        </div>
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
