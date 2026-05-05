import Fig from '../Fig'
import { PROJECTS } from '@/lib/constants'

const K8 = PROJECTS.find((p) => p.id === 'k8secret') ?? PROJECTS[0]

export default function K8SecretFig() {
  return (
    <section style={{ marginBottom: 'var(--s-section)', animationDelay: '460ms' }}>
      <Fig
        number="03"
        title="K8Secret"
        caption="Swift · macOS native · MIT · multi-cluster Kubernetes manager"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-x-10 gap-y-8 items-start">
          {/* macOS window mockup */}
          <div
            style={{
              background: 'var(--paper)',
              padding: 'var(--s-card)',
              border: '1px solid var(--rule)',
            }}
            aria-label="K8Secret macOS window mockup"
          >
            <WindowMock />

            <div
              className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 mt-6 pt-6"
              style={{ borderTop: '1px solid var(--rule)' }}
            >
              <Spec label="platform" value="macOS" sub="menu bar + windows" />
              <Spec label="license" value="MIT" sub="open source" />
              <Spec label="auth" value="kubeconfig" sub="multi-cluster" />
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
              {K8.longDescription}
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
              {K8.repos?.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-ink"
                    style={{ color: 'var(--ink)' }}
                  >
                    → {r.label} on github
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
              {K8.technologies.join(' · ')}
            </div>
          </div>
        </div>
      </Fig>
    </section>
  )
}

function WindowMock() {
  // Stylized macOS window with traffic lights and a small list of K8s resources
  return (
    <svg
      viewBox="0 0 600 240"
      className="w-full h-auto"
      style={{ maxHeight: 240, minHeight: 160 }}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="K8Secret window mock"
    >
      {/* Window frame */}
      <rect
        x={10}
        y={10}
        width={580}
        height={220}
        rx={6}
        fill="oklch(0.97 0.008 85)"
        stroke="oklch(0.20 0.012 85)"
        strokeWidth="1.2"
      />

      {/* Title bar */}
      <line
        x1={10}
        y1={42}
        x2={590}
        y2={42}
        stroke="oklch(0.20 0.012 85)"
        strokeWidth="1"
      />

      {/* Traffic lights */}
      <circle cx={28} cy={26} r={6} fill="oklch(0.65 0.18 25)" />
      <circle cx={48} cy={26} r={6} fill="oklch(0.78 0.16 80)" />
      <circle cx={68} cy={26} r={6} fill="oklch(0.68 0.18 145)" />

      {/* Title */}
      <text
        x={300}
        y={31}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="14"
        letterSpacing="0.12em"
        fill="oklch(0.30 0.012 85)"
      >
        K8SECRET — production
      </text>

      {/* Sidebar */}
      <line
        x1={170}
        y1={42}
        x2={170}
        y2={230}
        stroke="oklch(0.20 0.012 85)"
        strokeWidth="0.6"
      />
      <SideItem y={70} label="Deployments" count="12" />
      <SideItem y={102} label="Pods" count="38" />
      <SideItem y={134} label="Services" count="9" />
      <SideItem y={166} label="Secrets" count="14" active />
      <SideItem y={198} label="Logs" />

      {/* Main pane: secret list */}
      <SecretRow y={70} name="api-keys" type="Opaque" status="●" />
      <SecretRow y={102} name="db-credentials" type="Opaque" status="●" />
      <SecretRow y={134} name="tls-cert" type="tls" status="●" />
      <SecretRow y={166} name="oauth-tokens" type="Opaque" status="●" />
      <SecretRow y={198} name="redis-password" type="Opaque" status="●" />
    </svg>
  )
}

function SideItem({
  y,
  label,
  count,
  active,
}: {
  y: number
  label: string
  count?: string
  active?: boolean
}) {
  return (
    <g>
      {active && (
        <rect
          x={20}
          y={y - 16}
          width={144}
          height={24}
          fill="oklch(0.45 0.18 32 / 0.12)"
          rx={3}
        />
      )}
      <text
        x={32}
        y={y}
        fontFamily="var(--font-mono)"
        fontSize="13"
        fill={active ? 'oklch(0.45 0.18 32)' : 'oklch(0.30 0.012 85)'}
        fontWeight={active ? 600 : 400}
      >
        {label}
      </text>
      {count && (
        <text
          x={158}
          y={y}
          textAnchor="end"
          fontFamily="var(--font-mono)"
          fontSize="13"
          fill="oklch(0.55 0.012 85)"
        >
          {count}
        </text>
      )}
    </g>
  )
}

function SecretRow({
  y,
  name,
  type,
  status,
}: {
  y: number
  name: string
  type: string
  status: string
}) {
  return (
    <g>
      <text
        x={190}
        y={y}
        fontFamily="var(--font-mono)"
        fontSize="14"
        fill="oklch(0.20 0.012 85)"
        fontWeight={500}
      >
        {name}
      </text>
      <text
        x={400}
        y={y}
        fontFamily="var(--font-mono)"
        fontSize="12"
        fill="oklch(0.55 0.012 85)"
      >
        {type}
      </text>
      <text
        x={576}
        y={y}
        textAnchor="end"
        fontFamily="var(--font-mono)"
        fontSize="14"
        fill="oklch(0.45 0.18 145)"
      >
        {status}
      </text>
    </g>
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
