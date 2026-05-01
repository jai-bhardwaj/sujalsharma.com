import Fig from '../Fig'
import { PROJECTS } from '@/lib/constants'

const K8 = PROJECTS.find((p) => p.id === 'k8secret') ?? PROJECTS[0]

export default function K8SecretFig() {
  return (
    <section style={{ marginBottom: 'var(--s-9)', animationDelay: '460ms' }}>
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
              padding: 'var(--s-6)',
              border: '1px solid var(--rule)',
            }}
            aria-label="K8Secret macOS window mockup"
          >
            <WindowMock />

            <div
              className="grid grid-cols-3 gap-x-6 mt-6 pt-6"
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
      viewBox="0 0 600 200"
      className="w-full h-auto"
      style={{ maxHeight: 200 }}
      role="img"
      aria-label="K8Secret window mock"
    >
      {/* Window frame */}
      <rect
        x={10}
        y={10}
        width={580}
        height={180}
        rx={6}
        fill="oklch(0.97 0.008 85)"
        stroke="oklch(0.20 0.012 85)"
        strokeWidth="1.2"
      />

      {/* Title bar */}
      <line
        x1={10}
        y1={36}
        x2={590}
        y2={36}
        stroke="oklch(0.20 0.012 85)"
        strokeWidth="1"
      />

      {/* Traffic lights */}
      <circle cx={28} cy={23} r={5} fill="oklch(0.65 0.18 25)" />
      <circle cx={46} cy={23} r={5} fill="oklch(0.78 0.16 80)" />
      <circle cx={64} cy={23} r={5} fill="oklch(0.68 0.18 145)" />

      {/* Title */}
      <text
        x={300}
        y={27}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.12em"
        fill="oklch(0.30 0.012 85)"
      >
        K8SECRET — production
      </text>

      {/* Sidebar */}
      <line
        x1={150}
        y1={36}
        x2={150}
        y2={190}
        stroke="oklch(0.20 0.012 85)"
        strokeWidth="0.6"
      />
      <SideItem y={56} label="Deployments" count="12" />
      <SideItem y={82} label="Pods" count="38" />
      <SideItem y={108} label="Services" count="9" />
      <SideItem y={134} label="Secrets" count="14" active />
      <SideItem y={160} label="Logs" />

      {/* Main pane: secret list */}
      <SecretRow y={56} name="api-keys" type="Opaque" status="●" />
      <SecretRow y={82} name="db-credentials" type="Opaque" status="●" />
      <SecretRow y={108} name="tls-cert" type="kubernetes.io/tls" status="●" />
      <SecretRow y={134} name="oauth-tokens" type="Opaque" status="●" />
      <SecretRow y={160} name="redis-password" type="Opaque" status="●" />
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
          x={16}
          y={y - 14}
          width={130}
          height={20}
          fill="oklch(0.45 0.18 32 / 0.12)"
          rx={2}
        />
      )}
      <text
        x={26}
        y={y}
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill={active ? 'oklch(0.45 0.18 32)' : 'oklch(0.30 0.012 85)'}
        fontWeight={active ? 600 : 400}
      >
        {label}
      </text>
      {count && (
        <text
          x={140}
          y={y}
          textAnchor="end"
          fontFamily="var(--font-mono)"
          fontSize="10"
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
        x={170}
        y={y}
        fontFamily="var(--font-mono)"
        fontSize="11"
        fill="oklch(0.20 0.012 85)"
        fontWeight={500}
      >
        {name}
      </text>
      <text
        x={350}
        y={y}
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill="oklch(0.55 0.012 85)"
      >
        {type}
      </text>
      <text
        x={570}
        y={y}
        textAnchor="end"
        fontFamily="var(--font-mono)"
        fontSize="11"
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
