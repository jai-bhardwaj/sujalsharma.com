import { PERSON } from '@/lib/constants'
import Stamp from '../Stamp'

export default function Cover() {
  return (
    <section
      className="relative"
      style={{ marginBottom: 'var(--s-section)' }}
      aria-label="Cover page"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-12 gap-y-10 items-start">
        <div>
          <div
            className="label tab"
            style={{
              marginBottom: 'var(--s-5)',
              color: 'var(--graphite)',
            }}
          >
            NOTEBOOK_001 · {new Date().getFullYear()}
          </div>

          <h1
            className="display"
            style={{
              fontSize: 'var(--t-2xl)',
              fontStyle: 'italic',
              color: 'var(--ink)',
              fontWeight: 500,
            }}
          >
            Sujal
            <br />
            Sharma<span style={{ color: 'var(--graphite)' }}>.</span>
          </h1>

          <p
            className="reveal"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--t-lg)',
              lineHeight: 1.55,
              color: 'var(--ink)',
              marginTop: 'var(--s-7)',
              maxWidth: '36ch',
              animationDelay: '120ms',
            }}
          >
            Software engineer at{' '}
            <a
              href={PERSON.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink"
            >
              {PERSON.company}
            </a>
            , {PERSON.years} years in. Hyderabad, India.
          </p>

          <dl
            className="reveal grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-4"
            style={{
              marginTop: 'var(--s-7)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--t-xs)',
              animationDelay: '200ms',
            }}
          >
            <Datum label="Role" value="Software Eng" />
            <Datum label="Years" value={`${PERSON.years}Y`} />
            <Datum label="Where" value={PERSON.location.split(',')[0]} />
            <Datum label="Status" value="Open" stamp />
          </dl>
        </div>

        <div className="md:pt-12">
          <Stamp text="Shipping" rotation={-3} />
        </div>
      </div>
    </section>
  )
}

function Datum({
  label,
  value,
  stamp,
}: {
  label: string
  value: string
  stamp?: boolean
}) {
  return (
    <div>
      <dt
        className="label"
        style={{ color: 'var(--graphite)', marginBottom: 4 }}
      >
        {label}
      </dt>
      <dd
        className="tab"
        style={{
          color: stamp ? 'var(--stamp)' : 'var(--ink)',
          fontWeight: 500,
          letterSpacing: '0.04em',
        }}
      >
        {value}
      </dd>
    </div>
  )
}
