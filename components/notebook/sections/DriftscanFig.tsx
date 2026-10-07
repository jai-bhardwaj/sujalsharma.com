import Fig from '../Fig'
import { PROJECTS } from '@/lib/constants'

const DS = PROJECTS.find((p) => p.id === 'driftscan') ?? PROJECTS[0]

/**
 * FIG. 04 — driftscan.
 *
 * The other figures carry a drawn diagram. This one carries the tool's actual
 * terminal output, because that IS the artifact: a drift report whose whole
 * point is what it refuses to claim. Drawing a picture of it would be less
 * honest than printing it.
 */
export default function DriftscanFig() {
  return (
    <section style={{ marginBottom: 'var(--s-section)' }}>
      <Fig
        number="04"
        title="driftscan"
        caption="Python · bucketed count+XOR · ClickHouse → Postgres · zero dependencies"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-x-10 gap-y-8 items-start">
          <div
            style={{
              background: 'var(--paper)',
              padding: 'var(--s-card)',
              border: '1px solid var(--rule)',
            }}
            aria-label="driftscan report output"
          >
            <div className="diagram-scroll">
              <div className="diagram-scroll-inner">
                <Report />
              </div>
            </div>

            <div
              className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 mt-6 pt-6"
              style={{ borderTop: '1px solid var(--rule)' }}
            >
              <Spec label="rows compared" value="50,000" sub="per side" />
              <Spec label="read individually" value="2.39%" sub="1,195 rows" />
              <Spec label="verdicts" value="3" sub="incl. not fully checked" />
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
              {DS.longDescription}
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
              {DS.repos?.map((r) => (
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
              {DS.technologies.join(' · ')}
            </div>
          </div>
        </div>
      </Fig>
    </section>
  )
}

const LINES: Array<[string, 'dim' | 'ink' | 'flag']> = [
  ['sync job says: OK, 49996 rows written', 'dim'],
  ['', 'dim'],
  ['DRIFT REPORT  clickhouse.transactions -> postgres.transactions', 'ink'],
  ['  rows       source 50000   |   target 49996', 'dim'],
  ['  buckets    256 compared, 250 equal, 0 unread', 'dim'],
  ['  coverage   100.0%', 'dim'],
  ['', 'dim'],
  ['VERDICT: DRIFTED  (6 rows)', 'flag'],
  ['  missing-in-target    4', 'dim'],
  ['  value-differs        2', 'dim'],
  ['    value-differs  key=777    columns=amount', 'dim'],
  ['    value-differs  key=41003  columns=account', 'dim'],
]

function Report() {
  return (
    <pre
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--t-xs)',
        lineHeight: 1.75,
        margin: 0,
        minWidth: 440,
        whiteSpace: 'pre',
      }}
      aria-label="Example driftscan report: six drifted rows found in fifty thousand"
    >
      {LINES.map(([text, tone], i) => (
        <div
          key={i}
          style={{
            color:
              tone === 'flag'
                ? 'var(--stamp)'
                : tone === 'ink'
                  ? 'var(--ink)'
                  : 'var(--graphite)',
            fontWeight: tone === 'flag' ? 600 : 400,
            minHeight: '1.75em',
          }}
        >
          {text}
        </div>
      ))}
    </pre>
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
