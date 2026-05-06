import Fig from '../Fig'
import { PROJECTS } from '@/lib/constants'

const PNCL = PROJECTS.find((p) => p.id === 'pinnacle') ?? PROJECTS[0]

export default function PinnacleFig() {
  return (
    <section style={{ marginBottom: 'var(--s-section)', animationDelay: '380ms' }}>
      <Fig
        number="02"
        title="Pinnacle Trading Platform"
        caption="Python + TypeScript · OSS · pub/sub backend + Next.js control plane · Angel One"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-x-10 gap-y-8 items-start">
          {/* Pipeline diagram */}
          <div
            style={{
              background: 'var(--paper)',
              padding: 'var(--s-card)',
              border: '1px solid var(--rule)',
            }}
            aria-label="Pinnacle trading pipeline: strategy engine -> Redis -> order manager -> Angel One"
          >
            <PipelineDiagram />

            <div
              className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 mt-6 pt-6"
              style={{ borderTop: '1px solid var(--rule)' }}
            >
              <Spec label="broker" value="Angel One" sub="paper + live" />
              <Spec label="transport" value="Redis p/s" sub="fan-out" />
              <Spec label="strategies" value="MA · RSI" sub="extensible" />
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
              {PNCL.longDescription}
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
              {PNCL.repos?.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-ink"
                    style={{ color: 'var(--ink)' }}
                  >
                    → {r.label} repo
                  </a>
                </li>
              ))}
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
              {PNCL.technologies.join(' · ')}
            </div>
          </div>
        </div>
      </Fig>
    </section>
  )
}

function PipelineDiagram() {
  // Five stages in a row, with broker as terminal node
  return (
    <svg
      viewBox="0 0 600 220"
      className="w-full h-auto"
      style={{ maxHeight: 220, minHeight: 140 }}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Pinnacle trading pipeline diagram"
    >
      <Stage x={10} y={70} label="STRATEGY" sub="ma · rsi · …" />
      <Stage x={140} y={70} label="REDIS PUB/SUB" sub="signal bus" />
      <Stage x={290} y={70} label="ORDER MGR" sub="lifecycle" highlight />
      <Stage x={420} y={70} label="ANGEL ONE" sub="paper + live" terminal />

      <Arrow x1={130} y1={100} x2={140} y2={100} />
      <Arrow x1={270} y1={100} x2={290} y2={100} />
      <Arrow x1={400} y1={100} x2={420} y2={100} />

      {/* Flowing signal pulse: travels strategy → broker, paced to
          the natural rhythm of a strategy emitting a fill. */}
      <g
        className="flow-dot"
        style={
          {
            '--flow-distance': '410px',
            '--flow-dur': '4.4s',
          } as React.CSSProperties
        }
      >
        <circle cx={130} cy={100} r={4.5} fill="oklch(0.45 0.18 32)" />
        <circle cx={130} cy={100} r={9} fill="oklch(0.45 0.18 32)" opacity={0.25} />
      </g>

      {/* Frontend branch */}
      <line
        x1={365}
        y1={130}
        x2={365}
        y2={185}
        stroke="oklch(0.20 0.012 85)"
        strokeWidth="1.2"
        strokeDasharray="3 4"
      />
      <text
        x={377}
        y={188}
        fontFamily="var(--font-mono)"
        fontSize="14"
        letterSpacing="0.1em"
        fill="oklch(0.55 0.012 85)"
      >
        ↳ next.js · prisma · postgres
      </text>
    </svg>
  )
}

function Stage({
  x,
  y,
  label,
  sub,
  highlight,
  terminal,
}: {
  x: number
  y: number
  label: string
  sub: string
  highlight?: boolean
  terminal?: boolean
}) {
  const w = 120
  const h = 60
  const fill = highlight
    ? 'oklch(0.94 0.012 85)'
    : terminal
      ? 'oklch(0.45 0.18 32 / 0.10)'
      : 'transparent'
  const stroke = terminal ? 'oklch(0.45 0.18 32)' : 'oklch(0.20 0.012 85)'
  const labelColor = terminal ? 'oklch(0.45 0.18 32)' : 'oklch(0.20 0.012 85)'
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={fill}
        stroke={stroke}
        strokeWidth="1.4"
      />
      <text
        x={x + w / 2}
        y={y + 26}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="13"
        fontWeight="500"
        letterSpacing="0.12em"
        fill={labelColor}
      >
        {label}
      </text>
      <text
        x={x + w / 2}
        y={y + 46}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        fill="oklch(0.55 0.012 85)"
      >
        {sub}
      </text>
    </g>
  )
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
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
      />
      <polygon
        points={`${x2},${y2 - 4} ${x2 + 6},${y2} ${x2},${y2 + 4}`}
        fill="oklch(0.20 0.012 85)"
      />
    </>
  )
}

function Spec({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) {
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
      {sub && (
        <div
          style={{
            marginTop: 2,
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--graphite)',
          }}
        >
          {sub}
        </div>
      )}
    </div>
  )
}
