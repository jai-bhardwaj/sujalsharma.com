'use client'

import { useEffect, useRef, useState } from 'react'
import { PERSON } from '@/lib/constants'
import {
  useLivePrice,
  BINANCE_BTC_USDT,
  COINBASE_ETH_USD,
} from '@/hooks/useLivePrice'
import { useClock } from '@/hooks/useClock'

function fmtK(n: number): string {
  if (!Number.isFinite(n)) return '—'
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toFixed(2)
}

function priceNumber(display: string): number | null {
  const match = display.match(/\$([\d,]+\.?\d*)/)
  if (!match) return null
  const n = parseFloat(match[1].replace(/,/g, ''))
  return Number.isFinite(n) ? n : null
}

type Dir = 'up' | 'down' | null

function useDir(value: number | null): Dir {
  const prev = useRef<number | null>(null)
  const [dir, setDir] = useState<Dir>(null)
  useEffect(() => {
    if (value == null) return
    if (prev.current != null) {
      if (value > prev.current) setDir('up')
      else if (value < prev.current) setDir('down')
    }
    prev.current = value
    const id = window.setTimeout(() => setDir(null), 220)
    return () => window.clearTimeout(id)
  }, [value])
  return dir
}

function Price({
  symbol,
  stream,
}: {
  symbol: string
  stream: ReturnType<typeof useLivePrice>
}) {
  const n = priceNumber(stream.display)
  const dir = useDir(n)
  return (
    <span className="inline-flex items-center gap-2">
      <span className="text-[var(--dim)]">{symbol}</span>
      <span className={`tab ${dir === 'up' ? 'tick-up' : dir === 'down' ? 'tick-down' : ''}`}>
        ${n == null ? '—' : fmtK(n)}
      </span>
      <span className="text-[10px] text-[var(--dim)]">
        {dir === 'up' ? '▲' : dir === 'down' ? '▼' : '·'}
      </span>
    </span>
  )
}

export default function TickerTape() {
  const btc = useLivePrice(BINANCE_BTC_USDT)
  const eth = useLivePrice(COINBASE_ETH_USD)
  const { time, session, tz } = useClock()

  return (
    <div
      className="h-full px-3 md:px-4 flex items-center justify-between gap-4 text-[11px]"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-[var(--fg)] tracking-[0.15em]">
          {PERSON.full.split(' ').map((w) => w[0]).join('')}:SWE
        </span>
        <span className="text-[var(--up)] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--up)] pulse" />
          OPEN
        </span>
      </div>

      <div className="hidden sm:flex items-center gap-5 flex-1 justify-center overflow-hidden">
        <Price symbol="btc" stream={btc} />
        <span className="text-[var(--dim)]">·</span>
        <Price symbol="eth" stream={eth} />
      </div>

      <div className="flex items-center gap-3 text-[var(--dim)]">
        <span className="hidden md:inline">{session}</span>
        <span className="tab text-[var(--fg)]">
          {time} <span className="text-[var(--dim)]">{tz}</span>
        </span>
      </div>
    </div>
  )
}
