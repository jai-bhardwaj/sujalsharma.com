import Fig from '../Fig'
import { PROJECTS } from '@/lib/constants'

const RP = PROJECTS.find((p) => p.id === 'restore-proof') ?? PROJECTS[0]

/**
 * FIG. 06 — restore-proof.
 *
 * Printed output again, same as FIG. 04 and 05. Here the thing worth showing
 * is the FAILED line: the verifier catching a restored cluster that started
 * perfectly and contained nothing. That is the case the project exists for,
 * and it happened for real during development.
 */
export default function RestoreProofFig() {
  return (
    <section style={{ marginBottom: 'var(--s-section)' }}>
      <Fig
        number="06"
        title="restore-proof"
        caption="PostgreSQL · streaming replication · WAL archiving · PITR · Ansible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-x-10 gap-y-8 items-start">
          <div
            style={{
              background: 'var(--paper)',
              padding: 'var(--s-card)',
              border: '1px solid var(--rule)',
            }}
            aria-label="restore-proof verifier output"
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
              <Spec label="rows recovered" value="5,000" sum="" sub="sum 2,512,153.06" />
              <Spec label="pitr drill" value="100" sub="real rows, all back" />
              <Spec label="states" value="3" sub="none of them OK" />
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
              {RP.longDescription}
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
              {RP.repos?.map((r) => (
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
              {RP.technologies.join(' · ')}
            </div>
          </div>
        </div>
      </Fig>
    </section>
  )
}

const LINES: Array<[string, 'dim' | 'ink' | 'flag' | 'good']> = [
  ['$ ./scripts/take-basebackup.sh', 'ink'],
  ['  backup written: 39824 KiB', 'dim'],
  ['  status is UNVERIFIED. It stays that way', 'dim'],
  ['  until verify-restore.sh restores it.', 'dim'],
  ['', 'dim'],
  ['$ ./scripts/verify-restore.sh      # first attempt', 'ink'],
  ['  state -> FAILED', 'flag'],
  ['  restored instance started but the', 'dim'],
  ['  ledger table is unreadable', 'dim'],
  ['', 'dim'],
  ['$ ./scripts/verify-restore.sh      # after the fix', 'ink'],
  ['  VERIFIED - 5000 rows, sum=2512153.06', 'good'],
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
      aria-label="restore-proof output: a backup marked UNVERIFIED, a failed restore caught, then a verified one"
    >
      {LINES.map(([text, tone], i) => (
        <div
          key={i}
          style={{
            color:
              tone === 'flag'
                ? 'var(--stamp)'
                : tone === 'good' || tone === 'ink'
                  ? 'var(--ink)'
                  : 'var(--graphite)',
            fontWeight: tone === 'flag' || tone === 'good' ? 600 : 400,
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
  sum?: string
  sub?: string
}) {
  return (
    <div>
      <div className="label" style={{ marginBottom: 4, color: 'var(--graphite)' }}>
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
