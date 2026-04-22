'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ENGINE_LATENCY } from '@/lib/constants'

function sampleNs(): number {
  const { p50_ns, p99_ns, floor_ns, ceil_ns } = ENGINE_LATENCY
  const mu = Math.log(p50_ns)
  const sigma = (Math.log(p99_ns) - mu) / 2.326
  const u1 = Math.random() || 1e-9
  const u2 = Math.random()
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  const ns = Math.exp(mu + sigma * z)
  return Math.max(floor_ns, Math.min(ceil_ns, Math.round(ns)))
}

function formatNs(ns: number): string {
  if (ns < 1000) return `${ns} ns`
  return `${(ns / 1000).toFixed(2)} μs`
}

/**
 * Ambient persistent element — a small live-ticking engine latency
 * counter pinned to the bottom-right. Implies the portfolio IS a
 * live system. Clicks through to /race.
 */
export default function EngineTicker() {
  const [ns, setNs] = useState<number>(ENGINE_LATENCY.p50_ns)
  const prev = useRef<number>(ENGINE_LATENCY.p50_ns)
  const [trend, setTrend] = useState<'up' | 'down' | null>(null)

  useEffect(() => {
    const tick = () => {
      const next = sampleNs()
      setNs(next)
      if (next > prev.current) setTrend('up')
      else if (next < prev.current) setTrend('down')
      prev.current = next
    }
    tick()
    const id = window.setInterval(tick, 700)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (!trend) return
    const id = window.setTimeout(() => setTrend(null), 220)
    return () => window.clearTimeout(id)
  }, [trend])

  return (
    <Link
      href="/race"
      className="group fixed bottom-5 right-5 md:bottom-7 md:right-7 z-30 flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-[var(--rule)] bg-[var(--bg)]/80 backdrop-blur-sm hover:border-[var(--ink)] transition-colors"
      style={{ fontFamily: 'var(--font-mono)' }}
      aria-label="Live Mach-Zero latency sample — click to race"
    >
      <span className="relative flex">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--ink)]" />
        <span className="absolute inset-0 inline-block w-1.5 h-1.5 rounded-full bg-[var(--ink)] opacity-40 animate-ping" />
      </span>
      <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--ink-muted)]">
        mach-0
      </span>
      <span
        className={`text-[11px] tab text-[var(--ink)] min-w-[64px] transition-colors ${
          trend === 'up' ? 'text-[var(--ink-muted)]' : trend === 'down' ? 'text-[var(--ink)]' : ''
        }`}
      >
        {formatNs(ns)}
      </span>
      <span className="text-[10px] text-[var(--ink-dim)] group-hover:text-[var(--ink)] transition-colors">
        {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '·'}
      </span>
    </Link>
  )
}
