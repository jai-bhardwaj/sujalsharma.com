import Fig from '../Fig'
import { PROJECTS } from '@/lib/constants'

const MACH = PROJECTS.find((p) => p.id === 'mach-zero') ?? PROJECTS[0]

export default function Mach0Fig() {
  return (
    <section
      style={{
        marginBottom: 'var(--s-9)',
        animationDelay: '300ms',
      }}
    >
      <Fig
        number="01"
        title="Match Engine"
        caption="C++20 · OSS · personal project · target sub-microsecond"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-x-10 gap-y-8 items-start">
          {/* Architecture diagram (hand-drafted SVG) */}
          <div
            style={{
              background: 'var(--paper)',
              padding: 'var(--s-6)',
              border: '1px solid var(--rule)',
            }}
            aria-label="Match engine architecture diagram"
          >
            <ArchitectureDiagram />

            <div
              className="grid grid-cols-3 gap-x-6 mt-6 pt-6"
              style={{ borderTop: '1px solid var(--rule)' }}
            >
              <Spec label="p50 target" value="< 1 μs" />
              <Spec label="p99 target" value="< 2.5 μs" />
              <Spec label="tput target" value="1M+ msg/s" />
            </div>
          </div>

          {/* Description + links */}
          <div style={{ maxWidth: '38ch' }}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--t-base)',
                lineHeight: 1.6,
                color: 'var(--ink)',
                marginBottom: 'var(--s-6)',
              }}
            >
              {MACH.longDescription}
            </p>

            <ul
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--t-xs)',
                color: 'var(--graphite)',
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--s-3)',
              }}
            >
              <li>
                <a
                  href={MACH.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-ink"
                  style={{ color: 'var(--ink)' }}
                >
                  → source on github
                </a>
              </li>
              {MACH.links.demo && (
                <li>
                  <a
                    href={MACH.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-ink"
                    style={{ color: 'var(--ink)' }}
                  >
                    → live demo
                  </a>
                </li>
              )}
              <li>
                <a href="/race" className="link-ink" style={{ color: 'var(--stamp)' }}>
                  → race the engine
                </a>
              </li>
            </ul>

            <div
              style={{
                marginTop: 'var(--s-6)',
                paddingTop: 'var(--s-4)',
                borderTop: '1px solid var(--rule)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--t-xs)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--graphite)',
                lineHeight: 1.7,
              }}
            >
              {MACH.technologies.join(' · ')}
            </div>
          </div>
        </div>
      </Fig>
    </section>
  )
}

function ArchitectureDiagram() {
  // Three boxes connected by lines: feed -> matcher -> WAL
  return (
    <svg
      viewBox="0 0 600 200"
      className="w-full h-auto"
      style={{ maxHeight: 200 }}
      role="img"
      aria-label="Match engine pipeline: market feed flows into matcher then to WAL"
    >
      {/* Boxes */}
      <Node x={20} y={70} label="MARKET FEED" sub="binance · nse" />
      <Node x={220} y={70} label="MATCHER" sub="lock-free" highlight />
      <Node x={420} y={70} label="WAL + REPLAY" sub="postgres · questdb" />

      {/* Connecting lines */}
      <Line x1={180} y1={100} x2={220} y2={100} />
      <Line x1={380} y1={100} x2={420} y2={100} />

      {/* Below: risk-check branch */}
      <Line x1={300} y1={130} x2={300} y2={170} dashed />
      <text
        x={310}
        y={170}
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="0.1em"
        fill="oklch(0.55 0.012 85)"
      >
        ↳ risk · pre-trade checks
      </text>
    </svg>
  )
}

function Node({
  x,
  y,
  label,
  sub,
  highlight,
}: {
  x: number
  y: number
  label: string
  sub: string
  highlight?: boolean
}) {
  const w = 160
  const h = 60
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={highlight ? 'oklch(0.94 0.012 85)' : 'transparent'}
        stroke="oklch(0.20 0.012 85)"
        strokeWidth="1.4"
      />
      <text
        x={x + w / 2}
        y={y + 25}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        fontWeight="500"
        letterSpacing="0.14em"
        fill="oklch(0.20 0.012 85)"
      >
        {label}
      </text>
      <text
        x={x + w / 2}
        y={y + 44}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill="oklch(0.55 0.012 85)"
      >
        {sub}
      </text>
    </g>
  )
}

function Line({
  x1,
  y1,
  x2,
  y2,
  dashed,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  dashed?: boolean
}) {
  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="oklch(0.20 0.012 85)"
        strokeWidth="1.2"
        strokeDasharray={dashed ? '3 4' : undefined}
      />
      {!dashed && (
        <polygon
          points={`${x2},${y2 - 4} ${x2 + 6},${y2} ${x2},${y2 + 4}`}
          fill="oklch(0.20 0.012 85)"
        />
      )}
    </>
  )
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        className="label"
        style={{ marginBottom: 4, color: 'var(--graphite)' }}
      >
        {label}
      </div>
      <div
        className="tab"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--t-base)',
          color: 'var(--ink)',
          fontWeight: 500,
        }}
      >
        {value}
      </div>
    </div>
  )
}
