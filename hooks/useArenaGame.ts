'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ENGINE_LATENCY, type ArenaResult } from '@/lib/constants'

export type GameState =
  | { kind: 'idle' }
  | { kind: 'armed'; spawnAt: number }
  | { kind: 'live'; spawnedAt: number }
  | { kind: 'resolved'; result: ArenaResult }
  | { kind: 'missed' }

const LEADERBOARD_KEY = 'jai_arena_leaderboard_v1'
const LEADERBOARD_MAX = 5
const LEADERBOARD_DAY_MS = 24 * 60 * 60 * 1000

export type Score = { userMs: number; at: number; name?: string }

function sampleEngineLatencyNs(): number {
  // Lognormal-ish: median ~p50, tail out to p99. Clamped to [floor, ceil].
  const { p50_ns, p99_ns, floor_ns, ceil_ns } = ENGINE_LATENCY
  const mu = Math.log(p50_ns)
  const sigma = (Math.log(p99_ns) - mu) / 2.326 // p99 → z≈2.326
  // Box-Muller
  const u1 = Math.random() || 1e-9
  const u2 = Math.random()
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  const ns = Math.exp(mu + sigma * z)
  return Math.max(floor_ns, Math.min(ceil_ns, Math.round(ns)))
}

function loadLeaderboard(): Score[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(LEADERBOARD_KEY)
    if (!raw) return []
    const all: Score[] = JSON.parse(raw)
    const cutoff = Date.now() - LEADERBOARD_DAY_MS
    return all.filter((s) => s.at >= cutoff).sort((a, b) => a.userMs - b.userMs)
  } catch {
    return []
  }
}

function saveLeaderboard(scores: Score[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(scores))
  } catch {
    /* quota or disabled — ignore */
  }
}

export function useArenaGame() {
  const [state, setState] = useState<GameState>({ kind: 'idle' })
  const [leaderboard, setLeaderboard] = useState<Score[]>([])
  const armTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const missTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setLeaderboard(loadLeaderboard())
  }, [])

  useEffect(() => {
    return () => {
      if (armTimer.current) clearTimeout(armTimer.current)
      if (missTimer.current) clearTimeout(missTimer.current)
    }
  }, [])

  const arm = useCallback(() => {
    if (armTimer.current) clearTimeout(armTimer.current)
    if (missTimer.current) clearTimeout(missTimer.current)
    const delay = 900 + Math.random() * 2600 // 0.9–3.5s unpredictability
    const spawnAt = performance.now() + delay
    setState({ kind: 'armed', spawnAt })
    armTimer.current = setTimeout(() => {
      const now = performance.now()
      setState({ kind: 'live', spawnedAt: now })
      // Missed window — 3.5s to click
      missTimer.current = setTimeout(() => {
        setState({ kind: 'missed' })
      }, 3500)
    }, delay)
  }, [])

  const fire = useCallback(() => {
    setState((prev) => {
      if (prev.kind === 'armed') {
        // Jumped the gun — false start
        if (armTimer.current) clearTimeout(armTimer.current)
        return { kind: 'missed' }
      }
      if (prev.kind !== 'live') return prev
      const userMs = performance.now() - prev.spawnedAt
      const engineNs = sampleEngineLatencyNs()
      const multiplier = (userMs * 1_000_000) / engineNs
      const result: ArenaResult = {
        userMs,
        engineNs,
        multiplier,
        at: Date.now(),
      }
      if (missTimer.current) clearTimeout(missTimer.current)
      const next: Score = { userMs, at: result.at }
      const updated = [...loadLeaderboard(), next]
        .sort((a, b) => a.userMs - b.userMs)
        .slice(0, LEADERBOARD_MAX)
      saveLeaderboard(updated)
      setLeaderboard(updated)
      return { kind: 'resolved', result }
    })
  }, [])

  const reset = useCallback(() => {
    if (armTimer.current) clearTimeout(armTimer.current)
    if (missTimer.current) clearTimeout(missTimer.current)
    setState({ kind: 'idle' })
  }, [])

  return { state, leaderboard, arm, fire, reset }
}

export function formatNs(ns: number): string {
  if (ns < 1000) return `${Math.round(ns)} ns`
  if (ns < 1_000_000) return `${(ns / 1000).toFixed(2)} μs`
  return `${(ns / 1_000_000).toFixed(2)} ms`
}

export function formatMs(ms: number): string {
  if (ms < 1) return `${(ms * 1000).toFixed(0)} μs`
  if (ms < 1000) return `${ms.toFixed(1)} ms`
  return `${(ms / 1000).toFixed(2)} s`
}

export function formatMultiplier(x: number): string {
  if (x >= 1_000_000) return `${(x / 1_000_000).toFixed(1)}M×`
  if (x >= 1_000) return `${(x / 1_000).toFixed(1)}k×`
  if (x >= 100) return `${Math.round(x)}×`
  return `${x.toFixed(1)}×`
}
