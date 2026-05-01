import Fig from '../Fig'
import { PROJECTS } from '@/lib/constants'

const TCP = PROJECTS.find((p) => p.id === 'tcp-engine') ?? PROJECTS[1]

export default function Tcp1Fig() {
  return (
    <section
      style={{ marginBottom: 'var(--s-9)', animationDelay: '380ms' }}
    >
      <Fig
        number="02"
        title="TCP Engine"
        caption="C++20 · OSS · networking primitive · zero-copy"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-x-10 gap-y-6 items-start">
          {/* Node graph */}
          <div
            style={{
              background: 'var(--paper)',
              padding: 'var(--s-6)',
              border: '1px solid var(--rule)',
            }}
            aria-label="Zero-copy node graph"
          >
            <NodeGraph />
            <div
              className="grid grid-cols-2 gap-x-6 mt-6 pt-6"
              style={{ borderTop: '1px solid var(--rule)' }}
            >
              <Spec label="throughput" value="1M+ msg/s" />
              <Spec label="cpu" value="< 8% / core" />
            </div>
          </div>

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
              {TCP.longDescription}
            </p>
            <a
              href={TCP.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--t-xs)',
                color: 'var(--ink)',
              }}
            >
              → source on github
            </a>
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
              {TCP.technologies.join(' · ')}
            </div>
          </div>
        </div>
      </Fig>
    </section>
  )
}

function NodeGraph() {
  // Five nodes arranged as a small zero-copy buffer ring
  const center = { x: 200, y: 80 }
  const r = 60
  const points = Array.from({ length: 5 }, (_, i) => {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2
    return { x: center.x + Math.cos(a) * r, y: center.y + Math.sin(a) * r }
  })

  return (
    <svg
      viewBox="0 0 400 160"
      className="w-full h-auto"
      style={{ maxHeight: 160 }}
      role="img"
      aria-label="Zero-copy buffer ring"
    >
      {/* Connecting ring */}
      {points.map((p, i) => {
        const next = points[(i + 1) % points.length]
        return (
          <line
            key={i}
            x1={p.x}
            y1={p.y}
            x2={next.x}
            y2={next.y}
            stroke="oklch(0.55 0.012 85)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        )
      })}
      {/* Nodes */}
      {points.map((p, i) => (
        <g key={i}>
          <circle
            cx={p.x}
            cy={p.y}
            r={9}
            fill="oklch(0.97 0.008 85)"
            stroke="oklch(0.20 0.012 85)"
            strokeWidth="1.4"
          />
          <text
            x={p.x}
            y={p.y + 4}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fontWeight="500"
            fill="oklch(0.20 0.012 85)"
          >
            {i + 1}
          </text>
        </g>
      ))}
      {/* Center label */}
      <text
        x={center.x}
        y={center.y + 4}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="0.14em"
        fill="oklch(0.55 0.012 85)"
      >
        io_uring
      </text>
    </svg>
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
