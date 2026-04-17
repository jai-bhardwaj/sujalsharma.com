'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  formatMs,
  formatMultiplier,
  formatNs,
  type GameState,
  type Score,
} from '@/hooks/useArenaGame'
import { PERSON } from '@/lib/constants'

type Props = {
  state: GameState
  leaderboard: Score[]
  onArm: () => void
  onReset: () => void
}

export default function ArenaHUD({ state, leaderboard, onArm, onReset }: Props) {
  // On resolved/missed, show the card centered (it needs to be the focus).
  // Otherwise, text lives in the left column; scene breathes on the right.
  const centered = state.kind === 'resolved' || state.kind === 'missed' || state.kind === 'live'

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <div
        className={`h-full w-full flex px-6 md:px-12 lg:px-20 ${
          centered ? 'items-center justify-center' : 'items-center'
        }`}
      >
        <div
          className={
            centered
              ? 'w-full max-w-3xl text-center'
              : 'w-full md:max-w-xl text-center md:text-left'
          }
        >
          <AnimatePresence mode="wait">
            {state.kind === 'idle' && <IdlePanel key="idle" onArm={onArm} />}
            {state.kind === 'armed' && <ArmedPanel key="armed" />}
            {state.kind === 'live' && <LivePanel key="live" />}
            {state.kind === 'resolved' && (
              <ResultPanel key="resolved" state={state} onReset={onReset} />
            )}
            {state.kind === 'missed' && <MissedPanel key="missed" onReset={onReset} />}
          </AnimatePresence>
        </div>
      </div>

      <Leaderboard scores={leaderboard} />
    </div>
  )
}

function IdlePanel({ onArm }: { onArm: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="inline-flex items-center gap-2 mb-5 px-3 py-1 text-[10px] tracking-[0.3em] uppercase text-[#00E5FF] border border-[rgba(0,229,255,0.25)] rounded bg-[rgba(10,14,19,0.4)] backdrop-blur-sm"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
        ~/{PERSON.handle} · {PERSON.role}
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-5">
        <span className="block text-[var(--text-primary)]">{PERSON.firstName}</span>
        <span className="block text-gradient">{PERSON.lastName}</span>
      </h1>

      <p
        className="text-sm md:text-base text-[var(--text-secondary)] mb-7 max-w-md mx-auto md:mx-0 leading-relaxed"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        You think you&apos;re fast. My C++ match engine is faster.
        <br />
        <span className="text-[#FFD600]">Race it →</span>
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start items-center pointer-events-auto">
        <button
          onClick={onArm}
          className="px-7 py-3 bg-[#00E5FF] text-[#0A0E13] font-bold text-xs tracking-[0.25em] uppercase rounded-md hover:shadow-[0_0_32px_rgba(0,229,255,0.55)] transition-all duration-300"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          ► start the race
        </button>
        <a
          href="#projects"
          className="px-7 py-3 text-xs tracking-[0.25em] uppercase text-[var(--text-secondary)] border border-[rgba(138,148,166,0.3)] rounded-md hover:text-[#00E5FF] hover:border-[#00E5FF] transition-all duration-300"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          view work
        </a>
      </div>
    </motion.div>
  )
}

function ArmedPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
    >
      <div
        className="inline-flex items-center gap-3 px-5 py-2.5 border border-[rgba(255,214,0,0.4)] bg-[rgba(255,214,0,0.05)] backdrop-blur rounded-full"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-[#FFD600]"
        />
        <span className="text-xs tracking-[0.3em] uppercase text-[#FFD600]">
          arming · hold steady
        </span>
      </div>
      <p
        className="mt-4 text-[11px] text-[var(--text-secondary)] tracking-[0.25em] uppercase"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        wait for the orb. don&apos;t jump the gun.
      </p>
    </motion.div>
  )
}

function LivePanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
    >
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 0.45, repeat: Infinity }}
        className="text-5xl md:text-7xl font-bold text-[#FFD600] tracking-tight"
        style={{
          fontFamily: 'var(--font-mono)',
          textShadow: '0 0 40px rgba(255,214,0,0.75)',
        }}
      >
        CLICK NOW
      </motion.div>
    </motion.div>
  )
}

function ResultPanel({
  state,
  onReset,
}: {
  state: Extract<GameState, { kind: 'resolved' }>
  onReset: () => void
}) {
  const { userMs, engineNs, multiplier } = state.result
  const beatable = multiplier < 100_000
  const share = () => {
    const text = `I just raced Sujal's C++ match engine. I clicked in ${formatMs(userMs)}. It won in ${formatNs(engineNs)}. I lost by ${formatMultiplier(multiplier)}. → ${typeof window !== 'undefined' ? window.location.href : ''}`
    if (navigator.share) navigator.share({ text }).catch(() => copyToClipboard(text))
    else copyToClipboard(text)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45 }}
      className="pointer-events-auto w-full max-w-3xl mx-auto"
    >
      <div className="border border-[rgba(0,229,255,0.25)] bg-[rgba(10,14,19,0.82)] backdrop-blur rounded-xl p-6 md:p-8">
        <div
          className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)] mb-5"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          race · complete
        </div>

        <div className="grid grid-cols-2 gap-6 md:gap-10 items-end mb-6">
          <div>
            <div
              className="text-[10px] tracking-[0.3em] uppercase text-[#FF6B35] mb-2"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              you · reaction
            </div>
            <div
              className="text-3xl md:text-5xl font-bold text-[#FF6B35]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {formatMs(userMs)}
            </div>
          </div>
          <div className="text-right">
            <div
              className="text-[10px] tracking-[0.3em] uppercase text-[#00E5FF] mb-2"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              mach-zero · match
            </div>
            <div
              className="text-3xl md:text-5xl font-bold text-[#00E5FF]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {formatNs(engineNs)}
            </div>
          </div>
        </div>

        <div className="relative h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden mb-6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00E5FF] via-[#FF2E92] to-[#FF6B35]"
          />
        </div>

        <div className="text-center mb-6">
          <div
            className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)] mb-1"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            you&apos;re slower by
          </div>
          <div
            className="text-5xl md:text-7xl font-bold text-gradient"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {formatMultiplier(multiplier)}
          </div>
          <div
            className="text-xs text-[var(--text-secondary)] mt-2"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {beatable
              ? 'respectable. now imagine this decision happening a million times a second.'
              : 'biology has limits. silicon doesn\u2019t.'}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onReset}
            className="px-6 py-2.5 bg-[#00E5FF] text-[#0A0E13] font-bold text-xs tracking-[0.25em] uppercase rounded-md hover:shadow-[0_0_24px_rgba(0,229,255,0.5)] transition-all"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ► race again
          </button>
          <button
            onClick={share}
            className="px-6 py-2.5 border border-[rgba(255,46,146,0.4)] text-[#FF2E92] text-xs tracking-[0.25em] uppercase rounded-md hover:bg-[rgba(255,46,146,0.1)] transition-all"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            share result
          </button>
          <a
            href="#projects"
            className="px-6 py-2.5 border border-[rgba(138,148,166,0.3)] text-[var(--text-secondary)] text-xs tracking-[0.25em] uppercase rounded-md hover:text-[#00E5FF] hover:border-[#00E5FF] transition-all"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            see the engine
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function MissedPanel({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="pointer-events-auto text-center max-w-md mx-auto"
    >
      <div
        className="inline-block mb-4 px-3 py-1 text-[10px] tracking-[0.3em] uppercase text-[#FF2E92] border border-[rgba(255,46,146,0.4)] rounded bg-[rgba(10,14,19,0.6)] backdrop-blur"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        invalid · null trade
      </div>
      <h3
        className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        false start or missed window
      </h3>
      <p
        className="text-sm text-[var(--text-secondary)] mb-6"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        wait for the yellow orb. don&apos;t click early.
      </p>
      <button
        onClick={onReset}
        className="px-6 py-2.5 bg-[#00E5FF] text-[#0A0E13] font-bold text-xs tracking-[0.25em] uppercase rounded-md"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        ► retry
      </button>
    </motion.div>
  )
}

function Leaderboard({ scores }: { scores: Score[] }) {
  if (scores.length === 0) return null
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="absolute bottom-6 left-6 hidden md:block"
    >
      <div
        className="border border-[rgba(0,229,255,0.2)] bg-[rgba(10,14,19,0.7)] backdrop-blur rounded-lg px-4 py-3 min-w-[200px]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <div className="text-[9px] tracking-[0.3em] uppercase text-[var(--text-secondary)] mb-2">
          your best · today
        </div>
        <ol className="space-y-1">
          {scores.map((s, i) => (
            <li
              key={s.at}
              className={`flex items-center justify-between text-xs ${
                i === 0 ? 'text-[#FFD600]' : 'text-[var(--text-primary)]'
              }`}
            >
              <span className="text-[var(--text-secondary)]">#{i + 1}</span>
              <span>{formatMs(s.userMs)}</span>
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  )
}

function copyToClipboard(text: string) {
  if (typeof navigator === 'undefined') return
  navigator.clipboard?.writeText(text).catch(() => {})
}
