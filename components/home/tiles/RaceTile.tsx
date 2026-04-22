'use client'

import { useEffect, useRef, useState } from 'react'
import Tile from './Tile'
import { ENGINE_LATENCY } from '@/lib/constants'

function sampleNs(): number {
  const { p50_ns, p99_ns, floor_ns, ceil_ns } = ENGINE_LATENCY
  const mu = Math.log(p50_ns)
  const sigma = (Math.log(p99_ns) - mu) / 2.326
  const u1 = Math.random() || 1e-9
  const u2 = Math.random()
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  return Math.max(
    floor_ns,
    Math.min(ceil_ns, Math.round(Math.exp(mu + sigma * z))),
  )
}

function formatNs(ns: number): string {
  if (ns < 1000) return `${ns} ns`
  return `${(ns / 1000).toFixed(2)} μs`
}

const HISTORY = 28

export default function RaceTile() {
  const [ns, setNs] = useState<number>(ENGINE_LATENCY.p50_ns)
  const [history, setHistory] = useState<number[]>(() =>
    Array.from({ length: HISTORY }, () => ENGINE_LATENCY.p50_ns),
  )
  const prev = useRef<number>(ENGINE_LATENCY.p50_ns)
  const [trend, setTrend] = useState<'up' | 'down' | null>(null)

  useEffect(() => {
    const tick = () => {
      const next = sampleNs()
      setNs(next)
      setHistory((h) => [...h.slice(1), next])
      if (next > prev.current) setTrend('up')
      else if (next < prev.current) setTrend('down')
      prev.current = next
      window.setTimeout(() => setTrend(null), 220)
    }
    tick()
    const id = window.setInterval(tick, 800)
    return () => window.clearInterval(id)
  }, [])

  const min = Math.min(...history)
  const max = Math.max(...history)
  const range = Math.max(1, max - min)

  return (
    <Tile
      label="SS · 03"
      href="/race"
      className="md:col-span-7 md:row-span-2 min-h-[360px]"
      delay={0.1}
    >
      <div className="absolute inset-0 flex flex-col p-7 md:p-10">
        {/* Top status row */}
        <div
          className="absolute top-5 right-5 md:top-6 md:right-6 flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-[var(--ink-muted)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--ink)]" />
          live
        </div>

        <div className="mt-auto">
          {/* Mini sparkline */}
          <svg
            viewBox="0 0 280 60"
            className="w-full h-16 md:h-20 mb-6 md:mb-8"
            preserveAspectRatio="none"
            aria-hidden
          >
            <polyline
              points={history
                .map((v, i) => {
                  const x = (i / (HISTORY - 1)) * 280
                  const y = 50 - ((v - min) / range) * 40
                  return `${x.toFixed(1)},${y.toFixed(1)}`
                })
                .join(' ')}
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity="0.9"
            />
            <line
              x1="0"
              y1="58"
              x2="280"
              y2="58"
              stroke="var(--rule)"
              strokeWidth="1"
            />
          </svg>

          {/* Giant live number */}
          <div
            className="flex items-baseline gap-4 flex-wrap"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span
              className="text-[var(--ink)] tab transition-colors"
              style={{
                fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
                letterSpacing: '-0.04em',
                fontWeight: 500,
                color:
                  trend === 'up'
                    ? 'var(--ink-muted)'
                    : trend === 'down'
                      ? 'var(--ink)'
                      : 'var(--ink)',
              }}
            >
              {formatNs(ns)}
            </span>
            <span className="text-[12px] tracking-[0.12em] uppercase text-[var(--ink-muted)]">
              mach-0 · p50 sample
            </span>
          </div>

          <div className="mt-6 md:mt-8 flex items-center justify-between">
            <div className="max-w-[34ch]">
              <div
                className="display text-[var(--ink)]"
                style={{
                  fontSize: 'clamp(1.25rem, 2.6vw, 1.75rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                Race my C++ match engine.
              </div>
              <div className="text-[13px] text-[var(--ink-muted)] mt-1">
                You&apos;ll lose by ~300,000×.
              </div>
            </div>
            <span className="text-[15px] text-[var(--ink)] group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </div>
    </Tile>
  )
}
