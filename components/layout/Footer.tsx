import { PERSON, SOCIAL_LINKS } from '@/lib/constants'

export default function Footer() {
  return (
    <footer
      className="rule-t"
      style={{
        marginTop: 'var(--s-9)',
        background: 'var(--bg)',
      }}
    >
      <div
        className="mx-auto flex flex-col sm:flex-row gap-3 sm:gap-6 justify-between"
        style={{
          maxWidth: '1080px',
          paddingLeft: 'clamp(24px, 5vw, 80px)',
          paddingRight: 'clamp(24px, 5vw, 80px)',
          paddingTop: 'var(--s-7)',
          paddingBottom: 'var(--s-7)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--t-xs)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--graphite)',
        }}
      >
        <span>
          © {new Date().getFullYear()} {PERSON.full} · NOTEBOOK_001 ·{' '}
          {PERSON.location.split(',')[0]}
        </span>
        <span className="flex gap-5">
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="link-ink"
            style={{ color: 'var(--ink)', textDecorationColor: 'transparent' }}
          >
            email
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-ink"
            style={{ color: 'var(--ink)', textDecorationColor: 'transparent' }}
          >
            linkedin
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-ink"
            style={{ color: 'var(--ink)', textDecorationColor: 'transparent' }}
          >
            github
          </a>
        </span>
      </div>
    </footer>
  )
}
