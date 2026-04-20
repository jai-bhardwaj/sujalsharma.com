'use client'

import dynamic from 'next/dynamic'
import { useEffect, useMemo } from 'react'
import Panel from '@/components/terminal/Panel'
import {
  useArenaGame,
  formatMs,
  formatNs,
  formatMultiplier,
} from '@/hooks/useArenaGame'

const ArenaScene = dynamic(() => import('@/components/3d/ArenaScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[var(--bg)]" />,
})

export default function BenchPanel() {
  const { state, leaderboard, arm, fire, reset } = useArenaGame()
  const best = useMemo(
    () => (leaderboard.length ? leaderboard[0].userMs : null),
    [leaderboard],
  )

  const stateLabel =
    state.kind === 'idle'
      ? 'IDLE'
      : state.kind === 'armed'
        ? 'ARMED'
        : state.kind === 'live'
          ? 'LIVE'
          : state.kind === 'resolved'
            ? 'RESOLVED'
            : 'MISSED'

  const stateColor =
    state.kind === 'live'
      ? 'var(--accent)'
      : state.kind === 'armed'
        ? 'var(--accent)'
        : state.kind === 'resolved'
          ? 'var(--up)'
          : state.kind === 'missed'
            ? 'var(--down)'
            : 'var(--dim)'

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

  // Space bar → trigger. Works from anywhere (not just when focused).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== ' ') return
      const t = e.target as HTMLElement | null
      const tag = t?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || t?.isContentEditable) return
      e.preventDefault()
      trigger()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state.kind])

  const userMs = state.kind === 'resolved' ? state.result.userMs : null
  const engineNs = state.kind === 'resolved' ? state.result.engineNs : null
  const multiplier = state.kind === 'resolved' ? state.result.multiplier : null

  return (
    <Panel
      symbol="BENCH"
      title="REACTION-TIME VS C++ MATCH ENGINE"
      meta={<span className="label">press [SPC] to run</span>}
    >
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-0 border border-[var(--rule)]">
        {/* Left: arena visualizer */}
        <div
          className="relative"
          style={{ height: 'min(60vh, 520px)', minHeight: 380 }}
          onPointerDown={(e) => {
            if (state.kind === 'idle' || state.kind === 'resolved' || state.kind === 'missed') {
              // Clicking the arena while idle starts the race.
              e.stopPropagation()
              trigger()
            }
            // When armed/live the ArenaScene's own onFire fires the trade.
          }}
        >
          <ArenaScene state={state} onFire={fire} onOrbClick={fire} />
          {/* Idle overlay hint */}
          {state.kind === 'idle' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="px-4 py-2 border border-[var(--rule)] text-[11px] tracking-[0.25em] uppercase bg-[var(--bg)]/70 backdrop-blur-sm text-[var(--fg)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                click or press [spc] to arm
              </div>
            </div>
          )}
        </div>

        {/* Right: live data pane */}
        <div
          className="md:border-l md:border-t-0 border-t border-[var(--rule)] p-5 md:p-6 space-y-1"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <div className="flex items-baseline justify-between rule-b py-2">
            <span className="label">state</span>
            <span
              className="text-[13px] tracking-[0.2em]"
              style={{ color: stateColor }}
            >
              {stateLabel}
            </span>
          </div>

          <Row
            label="reaction"
            value={userMs != null ? formatMs(userMs) : '—'}
            color={state.kind === 'resolved' ? 'var(--down)' : 'var(--fg)'}
          />
          <Row
            label="engine"
            value={engineNs != null ? formatNs(engineNs) : '—'}
            color={state.kind === 'resolved' ? 'var(--up)' : 'var(--fg)'}
          />
          <Row
            label="ratio"
            value={multiplier != null ? formatMultiplier(multiplier) : '—'}
          />
          <Row
            label="best"
            value={best != null ? formatMs(best) : '—'}
            color="var(--accent)"
          />

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={trigger}
              className="px-4 py-2 text-[11px] tracking-[0.25em] uppercase border transition-colors"
              style={{
                fontFamily: 'var(--font-mono)',
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
              }}
            >
              {state.kind === 'idle'
                ? '▶ arm'
                : state.kind === 'armed' || state.kind === 'live'
                  ? '▶ fire'
                  : '▶ race again'}
            </button>
            {(state.kind === 'resolved' || state.kind === 'missed') && (
              <button
                onClick={() => reset()}
                className="px-4 py-2 text-[11px] tracking-[0.25em] uppercase border transition-colors text-[var(--dim)] border-[var(--rule)] hover:text-[var(--fg)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                reset
              </button>
            )}
          </div>

          {state.kind === 'resolved' && multiplier != null && (
            <p className="pt-4 text-[12px] text-[var(--dim)] leading-relaxed">
              Biology has limits. Silicon doesn&apos;t.
              <br />
              You lost by{' '}
              <span className="text-[var(--fg)] tab">
                {formatMultiplier(multiplier)}
              </span>
              .
            </p>
          )}
          {state.kind === 'missed' && (
            <p className="pt-4 text-[12px] text-[var(--down)]">
              Invalid trade. False start or window missed. Retry.
            </p>
          )}
        </div>
      </div>
    </Panel>
  )
}

function Row({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color?: string
}) {
  return (
    <div className="flex items-baseline justify-between rule-b py-2">
      <span className="label">{label}</span>
      <span
        className="text-[15px] tab"
        style={{ color: color ?? 'var(--fg)' }}
      >
        {value}
      </span>
    </div>
  )
}
