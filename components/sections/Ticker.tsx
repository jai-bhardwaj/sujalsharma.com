const TICKER_ITEMS = [
  { label: 'p50', value: '800ns', tone: 'cyan' },
  { label: 'p99', value: '2.4μs', tone: 'cyan' },
  { label: 'tick→trade', value: '<25μs', tone: 'cyan' },
  { label: 'throughput', value: '1M+ msg/s', tone: 'green' },
  { label: 'engine', value: 'C++20 · io_uring', tone: 'orange' },
  { label: 'markets', value: 'Binance · NSE', tone: 'magenta' },
  { label: 'syscalls', value: 'zero-copy', tone: 'green' },
  { label: 'memory', value: 'lock-free · SPSC', tone: 'cyan' },
  { label: 'simd', value: 'AVX2 / AVX-512', tone: 'orange' },
  { label: 'control plane', value: 'Next.js 16 · React 19', tone: 'magenta' },
]

const toneColor: Record<string, string> = {
  cyan: '#00E5FF',
  green: '#00FF94',
  orange: '#FF6B35',
  magenta: '#FF2E92',
}

export default function Ticker() {
  // Duplicate the items so the translateX(-50%) loop is seamless
  const loop = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div
      className="relative w-full border-y border-[rgba(0,229,255,0.12)] bg-[rgba(10,14,19,0.7)] backdrop-blur-sm overflow-hidden py-4"
      style={{ fontFamily: 'var(--font-mono)' }}
      aria-hidden
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          width: 'max-content',
          animation: 'ticker-scroll 48s linear infinite',
        }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-8 text-xs tracking-[0.25em] uppercase"
          >
            <span className="text-[var(--text-secondary)]">{item.label}</span>
            <span style={{ color: toneColor[item.tone] }} className="font-semibold">
              {item.value}
            </span>
            <span className="text-[var(--text-secondary)] opacity-30 text-base">·</span>
          </span>
        ))}
      </div>

      {/* Fade edges */}
      <div
        className="absolute inset-y-0 left-0 w-24 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #0A0E13 0%, transparent 100%)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, #0A0E13 0%, transparent 100%)' }}
      />
    </div>
  )
}
