'use client'

import { useEffect, useState } from 'react'

function formatUptime(fromMs: number, nowMs: number): string {
  const diff = Math.max(0, nowMs - fromMs)
  const sec = Math.floor(diff / 1000)
  const days = Math.floor(sec / 86400)
  const hours = Math.floor((sec % 86400) / 3600)
  const minutes = Math.floor((sec % 3600) / 60)
  return `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`
}

/**
 * Live-ticking uptime string. Returns null until the client has mounted
 * to avoid SSR/hydration drift.
 */
export function useUptime(since: string): string | null {
  const [display, setDisplay] = useState<string | null>(null)

  useEffect(() => {
    const sinceMs = new Date(since).getTime()
    const tick = () => setDisplay(formatUptime(sinceMs, Date.now()))
    tick()
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [since])

  return display
}
