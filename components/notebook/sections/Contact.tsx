import { SOCIAL_LINKS, PERSON } from '@/lib/constants'

export default function Contact() {
  return (
    <section
      className="reveal"
      id="contact"
      style={{
        marginTop: 'var(--s-9)',
        paddingTop: 'var(--s-7)',
        borderTop: '1px solid var(--ink)',
        animationDelay: '540ms',
      }}
    >
      <div
        className="label"
        style={{
          color: 'var(--ink)',
          marginBottom: 'var(--s-5)',
          letterSpacing: '0.16em',
        }}
      >
        — Contact
      </div>

      <a
        href={`mailto:${SOCIAL_LINKS.email}`}
        className="block link-ink"
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          letterSpacing: '-0.02em',
          color: 'var(--ink)',
          textDecoration: 'none',
          marginBottom: 'var(--s-5)',
        }}
      >
        {SOCIAL_LINKS.email}{' '}
        <span style={{ color: 'var(--stamp)', fontStyle: 'normal' }}>→</span>
      </a>

      <div
        className="flex flex-wrap items-baseline gap-x-8 gap-y-3"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--t-sm)',
          color: 'var(--graphite)',
        }}
      >
        <a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="link-ink"
          style={{ color: 'var(--ink)' }}
        >
          → linkedin
        </a>
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="link-ink"
          style={{ color: 'var(--ink)' }}
        >
          → github
        </a>
        <span
          className="ml-auto label"
          style={{ color: 'var(--graphite)' }}
        >
          {PERSON.location} · {PERSON.availability}
        </span>
      </div>
    </section>
  )
}
