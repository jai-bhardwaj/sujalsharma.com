'use client'

import { useEffect, useRef, useState } from 'react'

export type PriceStream = {
  url: string
  parse: (msg: unknown) => number | null
  subscribe?: Record<string, unknown>
  format: (price: number) => string
  fallback: string
}

const THROTTLE_MS = 400 // max one display update per 400ms to avoid jitter

export function useLivePrice(stream: PriceStream) {
  const [display, setDisplay] = useState(stream.fallback)
  const [isLive, setIsLive] = useState(false)
  const streamRef = useRef(stream)
  streamRef.current = stream

  useEffect(() => {
    let cancelled = false
    let ws: WebSocket | null = null
    let retries = 0
    let latest: number | null = null
    let flushTimer: number | null = null

    const flush = () => {
      flushTimer = null
      if (latest !== null && !cancelled) {
        setDisplay(streamRef.current.format(latest))
        setIsLive(true)
        latest = null
      }
    }

    const connect = () => {
      if (cancelled) return
      try {
        ws = new WebSocket(streamRef.current.url)

        ws.onopen = () => {
          if (cancelled || !ws) return
          retries = 0
          const sub = streamRef.current.subscribe
          if (sub) ws.send(JSON.stringify(sub))
        }

        ws.onmessage = (event) => {
          if (cancelled) return
          try {
            const msg = JSON.parse(event.data)
            const price = streamRef.current.parse(msg)
            if (price !== null && Number.isFinite(price)) {
              latest = price
              if (flushTimer === null) {
                flushTimer = window.setTimeout(flush, THROTTLE_MS)
              }
            }
          } catch {
            /* skip malformed messages */
          }
        }

        ws.onclose = () => {
          if (cancelled) return
          setIsLive(false)
          retries++
          const delay = Math.min(30_000, 1000 * Math.pow(2, retries))
          window.setTimeout(connect, delay)
        }

        ws.onerror = () => {
          ws?.close()
        }
      } catch {
        if (!cancelled) window.setTimeout(connect, 5000)
      }
    }

    connect()

    return () => {
      cancelled = true
      if (flushTimer !== null) window.clearTimeout(flushTimer)
      ws?.close()
    }
  }, [stream.url])

  return { display, isLive }
}

function fmtUsd(p: number): string {
  return p.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export const BINANCE_BTC_USDT: PriceStream = {
  url: 'wss://stream.binance.com:9443/ws/btcusdt@ticker',
  parse: (msg) => {
    const m = msg as { c?: string }
    return m?.c ? parseFloat(m.c) : null
  },
  format: (p) => `BTC/USDT  $${fmtUsd(p)}`,
  fallback: 'BTC/USDT  $—',
}

export const COINBASE_ETH_USD: PriceStream = {
  url: 'wss://ws-feed.exchange.coinbase.com',
  subscribe: {
    type: 'subscribe',
    product_ids: ['ETH-USD'],
    channels: ['ticker'],
  },
  parse: (msg) => {
    const m = msg as { type?: string; product_id?: string; price?: string }
    if (m?.type !== 'ticker' || m?.product_id !== 'ETH-USD') return null
    return m.price ? parseFloat(m.price) : null
  },
  format: (p) => `ETH/USD  $${fmtUsd(p)}`,
  fallback: 'ETH/USD  $—',
}
