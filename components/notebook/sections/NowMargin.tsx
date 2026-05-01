import Margin from '../Margin'
import { PERSON } from '@/lib/constants'

export default function NowMargin() {
  return (
    <section style={{ marginBottom: 'var(--s-9)' }}>
      <Margin label="NOW @ ORBITAL">
        <p style={{ marginBottom: 'var(--s-4)' }}>{PERSON.orbitalBlurb}</p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--t-xs)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--graphite)',
            lineHeight: 1.7,
          }}
        >
          {PERSON.education.degree} · {PERSON.education.schoolShort} ·{' '}
          {PERSON.education.years.split('–')[1]}
          <br />
          {PERSON.stack.join(' · ')}
        </p>
      </Margin>
    </section>
  )
}
