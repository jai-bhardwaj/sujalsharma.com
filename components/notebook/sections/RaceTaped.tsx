'use client'

import Link from 'next/link'
import TapedCard from '../TapedCard'
import PencilArrow from '../PencilArrow'

export default function RaceTaped() {
  return (
    <section
      className="reveal"
      style={{
        marginBottom: 'var(--s-section)',
        animationDelay: '460ms',
      }}
      aria-label="Taped-in race link"
    >
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center">
        <Link
          href="/race"
          className="block group"
          aria-label="Open the race game"
          style={{ color: 'var(--ink)' }}
        >
          <TapedCard rotation={-1.5}>
            <RaceThumbnail />
          </TapedCard>
        </Link>

        <div>
          <div
            className="label"
            style={{ marginBottom: 'var(--s-3)', color: 'var(--graphite)' }}
          >
            Taped-in
          </div>
          <h3
            className="display"
            style={{
              fontSize: 'var(--t-xl)',
              fontStyle: 'italic',
              color: 'var(--ink)',
              fontWeight: 500,
              marginBottom: 'var(--s-4)',
            }}
          >
            Race the engine.
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--t-base)',
              lineHeight: 1.6,
              color: 'var(--ink)',
              maxWidth: '42ch',
              marginBottom: 'var(--s-5)',
            }}
          >
            A reaction-time bench against Mach-Zero. You click as fast as you
            can. The C++ matcher beats you by ~6 orders of magnitude.
          </p>
          <Link
            href="/race"
            className="inline-flex items-center gap-3 link-ink"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--t-sm)',
              color: 'var(--stamp)',
              textDecorationColor: 'var(--stamp)',
            }}
          >
            <PencilArrow direction="down-right" size={32} />
            <span>open the bench</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

function RaceThumbnail() {
  return (
    <div
      className="relative w-full max-w-[320px] aspect-[4/3] overflow-hidden"
      style={{ background: '#0B0F14' }}
    >
      <svg
        viewBox="0 0 320 240"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        {/* Subtle grid */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 40}
            y1={0}
            x2={i * 40}
            y2={240}
            stroke="rgba(230,237,243,0.05)"
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={i * 40}
            x2={320}
            y2={i * 40}
            stroke="rgba(230,237,243,0.05)"
          />
        ))}

        {/* Center engine glow */}
        <circle
          cx={160}
          cy={120}
          r={32}
          fill="oklch(0.45 0.18 32 / 0.6)"
          filter="blur(12px)"
        />
        <circle
          cx={160}
          cy={120}
          r={6}
          fill="#E6EDF3"
        />

        {/* Side nodes */}
        <circle cx={56} cy={120} r={5} fill="oklch(0.6 0.16 50)" />
        <circle cx={264} cy={120} r={5} fill="oklch(0.7 0.18 250)" />

        {/* Connecting beams */}
        <line
          x1={56}
          y1={120}
          x2={160}
          y2={120}
          stroke="oklch(0.6 0.16 50 / 0.6)"
          strokeWidth="1"
        />
        <line
          x1={264}
          y1={120}
          x2={160}
          y2={120}
          stroke="oklch(0.7 0.18 250 / 0.6)"
          strokeWidth="1"
        />
      </svg>

      <div
        className="absolute left-3 top-3 tab"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.14em',
          color: 'rgba(230,237,243,0.7)',
          textTransform: 'uppercase',
        }}
      >
        Race · /bench
      </div>
      <div
        className="absolute right-3 bottom-3 tab"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'rgba(230,237,243,0.55)',
        }}
      >
        p50 · 800 ns
      </div>
    </div>
  )
}
