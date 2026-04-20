'use client'

import { useEffect, useState } from 'react'

type Session = 'ASIA' | 'EU' | 'US' | 'OFF'

function istParts(d: Date): { time: string; hour: number } {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const parts = fmt.formatToParts(d)
  const map: Record<string, string> = {}
  for (const p of parts) map[p.type] = p.value
  const time = `${map.hour}:${map.minute}:${map.second}`
  return { time, hour: parseInt(map.hour, 10) }
}

function sessionOf(hour: number): Session {
  // Rough global session rotation keyed to IST
  if (hour >= 6 && hour < 14) return 'ASIA'
  if (hour >= 14 && hour < 20) return 'EU'
  if (hour >= 20 || hour < 2) return 'US'
  return 'OFF'
}

export function useClock() {
  const [{ time, hour }, setNow] = useState(() => istParts(new Date()))
  useEffect(() => {
    const id = window.setInterval(() => setNow(istParts(new Date())), 1000)
    return () => window.clearInterval(id)
  }, [])
  return {
    time,
    session: sessionOf(hour),
    tz: 'IST',
  }
}
