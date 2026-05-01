'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  formatMs,
  formatMultiplier,
  formatNs,
  type GameState,
} from '@/hooks/useArenaGame'

type Props = {
  state: GameState
  best: number | null
  onArm: () => void
  onReset: () => void
}

export default function RaceHUD({ state, best, onArm, onReset }: Props) {
  // 'live' is the only state that wants to dominate the full canvas;
  // every other state pulls up so it doesn't sit on top of the engine.
  const isCenteredState = state.kind === 'live'

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* Top scrim: keeps headline legible over whatever the scene does
          to render in the upper half. Dark fade-out into the scene below. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[58vh] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,9,13,0.92) 0%, rgba(7,9,13,0.78) 35%, rgba(7,9,13,0.40) 70%, rgba(7,9,13,0) 100%)',
        }}
      />

      <div className="relative h-full w-full flex flex-col">
        {/* Top meta */}
        <div
          className="flex items-center justify-between px-6 md:px-10 py-5 text-[11px] tracking-[0.18em] uppercase text-[rgba(230,237,243,0.7)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] pulse" />
            Mach-Zero · reaction bench
          </span>
          <span className="tab">
            best · <span className="text-[#E6EDF3]">{best != null ? formatMs(best) : '—'}</span>
          </span>
        </div>

        {/* Content panel — pushed to the upper portion of the viewport
            in idle/armed/resolved/missed; centered only for the LIVE state
            (where the giant CLICK NOW landscape is the point). */}
        <div
          className={`flex-1 flex justify-center px-6 ${
            isCenteredState ? 'items-center' : 'items-start pt-[6vh] md:pt-[10vh]'
          }`}
        >
          <AnimatePresence mode="wait">
            {state.kind === 'idle' && <Idle key="idle" onArm={onArm} />}
            {state.kind === 'armed' && <Armed key="armed" />}
            {state.kind === 'live' && <Live key="live" />}
            {state.kind === 'resolved' && (
              <Result key="resolved" state={state} best={best} onReset={onReset} />
            )}
            {state.kind === 'missed' && <Missed key="missed" onReset={onReset} />}
          </AnimatePresence>
        </div>

        {/* Bottom hint */}
        <div
          className="flex items-center justify-between px-6 md:px-10 py-5 text-[11px] tracking-[0.18em] uppercase text-[rgba(230,237,243,0.45)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span>click · spacebar · enter</span>
          <span>p50 800ns · p99 2.4μs</span>
        </div>
      </div>
    </div>
  )
}

function Idle({ onArm }: { onArm: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="pointer-events-auto text-center max-w-lg"
    >
      <div
        className="text-[10px] tracking-[0.28em] uppercase text-[rgba(230,237,243,0.6)] mb-5"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        // race the engine
      </div>
      <h1
        className="display text-[#F5F7FA] mb-4"
        style={{ fontSize: 'clamp(2.25rem, 6vw, 4rem)', fontWeight: 500 }}
      >
        Click to begin.
      </h1>
      <p className="text-[15px] md:text-[17px] leading-[1.55] text-[rgba(230,237,243,0.65)] mb-8">
        A yellow orb will appear somewhere in the next{' '}
        <span className="text-[#F5F7FA]">1–3 seconds</span>. Click it as fast
        as you can.
      </p>
      <button
        onClick={onArm}
        className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#F5F7FA] text-[#07090D] font-medium text-[14px] hover:bg-[#22C55E] hover:text-white transition-colors"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current pulse" />
        Arm — press [space]
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>
    </motion.div>
  )
}

function Armed() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="text-center"
    >
      <div
        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[rgba(234,179,8,0.4)] bg-[rgba(234,179,8,0.08)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-[#EAB308]"
        />
        <span className="text-xs tracking-[0.25em] uppercase text-[#EAB308]">
          Arming · hold steady
        </span>
      </div>
      <p
        className="mt-3 text-[11px] text-[rgba(230,237,243,0.5)] tracking-[0.2em] uppercase"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        wait for the orb
      </p>
    </motion.div>
  )
}

function Live() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.45, repeat: Infinity }}
        className="display text-[#EAB308]"
        style={{
          fontSize: 'clamp(3rem, 9vw, 8rem)',
          textShadow: '0 0 60px rgba(234,179,8,0.55)',
          fontWeight: 600,
        }}
      >
        CLICK NOW
      </motion.div>
    </motion.div>
  )
}

function Result({
  state,
  best,
  onReset,
}: {
  state: Extract<GameState, { kind: 'resolved' }>
  best: number | null
  onReset: () => void
}) {
  const { userMs, engineNs, multiplier } = state.result
  const isNewBest = best != null && userMs <= best
  const share = () => {
    const text = `I raced Sujal's C++ match engine. Reaction: ${formatMs(userMs)}. Engine: ${formatNs(engineNs)}. Beaten by ${formatMultiplier(multiplier)}. → ${typeof window !== 'undefined' ? window.location.origin : ''}`
    if (navigator.share) {
      navigator.share({ text }).catch(() => navigator.clipboard?.writeText(text))
    } else {
      navigator.clipboard?.writeText(text)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      className="pointer-events-auto w-full max-w-3xl text-center"
    >
      <div
        className="text-[10px] tracking-[0.28em] uppercase text-[rgba(230,237,243,0.6)] mb-4"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Resolved {isNewBest ? '· new best' : ''}
      </div>

      <div className="grid grid-cols-2 gap-6 md:gap-12 items-end mb-6">
        <div className="text-right">
          <div
            className="text-[10px] tracking-[0.28em] uppercase text-[rgba(230,237,243,0.55)] mb-2"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            You
          </div>
          <div
            className="tab text-[#EF4444]"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
              fontWeight: 500,
            }}
          >
            {formatMs(userMs)}
          </div>
        </div>
        <div className="text-left">
          <div
            className="text-[10px] tracking-[0.28em] uppercase text-[rgba(230,237,243,0.55)] mb-2"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Mach-Zero
          </div>
          <div
            className="tab text-[#22C55E]"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
              fontWeight: 500,
            }}
          >
            {formatNs(engineNs)}
          </div>
        </div>
      </div>

      <div
        className="text-[10px] tracking-[0.28em] uppercase text-[rgba(230,237,243,0.55)] mb-1"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Slower by
      </div>
      <div
        className="display text-[#F5F7FA] mb-6"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(3rem, 10vw, 7rem)',
          fontWeight: 500,
        }}
      >
        {formatMultiplier(multiplier)}
      </div>
      <p className="text-[14px] text-[rgba(230,237,243,0.6)] mb-8">
        Biology has limits. Silicon doesn&apos;t.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={onReset}
          className="px-5 py-2.5 rounded-full bg-[#F5F7FA] text-[#07090D] font-medium text-[13px] hover:bg-[#22C55E] hover:text-white transition-colors"
        >
          Race again →
        </button>
        <button
          onClick={share}
          className="px-5 py-2.5 rounded-full border border-[rgba(245,247,250,0.4)] text-[#F5F7FA] font-medium text-[13px] hover:bg-[rgba(245,247,250,0.08)] transition-colors"
        >
          Share result
        </button>
      </div>
    </motion.div>
  )
}

function Missed({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="pointer-events-auto text-center max-w-md"
    >
      <div
        className="inline-block mb-4 px-3 py-1 text-[10px] tracking-[0.28em] uppercase text-[#EF4444] border border-[rgba(239,68,68,0.4)] rounded-full"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Invalid trade
      </div>
      <h3
        className="display text-[#F5F7FA] mb-3"
        style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 500 }}
      >
        False start.
      </h3>
      <p className="text-[14px] text-[rgba(230,237,243,0.6)] mb-6">
        Wait for the yellow orb before you click.
      </p>
      <button
        onClick={onReset}
        className="px-5 py-2.5 rounded-full bg-[#F5F7FA] text-[#07090D] font-medium text-[13px]"
      >
        Retry →
      </button>
    </motion.div>
  )
}
