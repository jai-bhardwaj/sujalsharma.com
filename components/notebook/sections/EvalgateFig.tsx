import Fig from '../Fig'
import { PROJECTS } from '@/lib/constants'

const EG = PROJECTS.find((p) => p.id === 'evalgate') ?? PROJECTS[0]

/**
 * FIG. 05 — evalgate.
 *
 * Same treatment as FIG. 04: the panel prints the tool's real output rather
 * than a drawn diagram. Here it matters even more, because the thing worth
 * seeing is the verdict line — a harness declining to name a winner on an
 * effect it cannot resolve.
 */
export default function EvalgateFig() {
  return (
    <section style={{ marginBottom: 'var(--s-section)' }}>
      <Fig
        number="05"
        title="evalgate"
        caption="Python · Wilson intervals · paired bootstrap · zero dependencies"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-x-10 gap-y-8 items-start">
          <div
            style={{
              background: 'var(--paper)',
              padding: 'var(--s-card)',
              border: '1px solid var(--rule)',
            }}
            aria-label="evalgate report output"
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
              <Spec label="true effect" value="+4.0 pts" sub="known, simulated" />
              <Spec label="cases needed" value="1,117" sub="to resolve it" />
              <Spec label="cases run" value="60" sub="so: no winner" />
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
              {EG.longDescription}
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
              {EG.repos?.map((r) => (
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
              {EG.technologies.join(' · ')}
            </div>
          </div>
        </div>
      </Fig>
    </section>
  )
}

const LINES: Array<[string, 'dim' | 'ink' | 'flag']> = [
  ['VARIANT                 SCORE    95% CI    RUNS  FLAKY', 'ink'],
  ['prompt-A (baseline)     74.3%     69-79     300     50', 'dim'],
  ['prompt-B (candidate)    77.7%     73-82     300     45', 'dim'],
  ['', 'dim'],
  ['VERDICT: UNDERPOWERED', 'flag'],
  ['  difference  +3.3 points, 95% CI [-3.3, +9.7]', 'dim'],
  ['  cases       60 run, 1117 needed', 'dim'],
  ['', 'dim'],
  ['  60 cases cannot resolve a 5-point effect.', 'dim'],
  ['  The result is not "no difference",', 'dim'],
  ['  it is "not measured".', 'dim'],
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
      aria-label="Example evalgate report: a real improvement the suite is too small to detect, so no winner is declared"
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
