import { SOCIAL_LINKS, PERSON } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="rule-t mt-20 md:mt-28">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-10 md:py-14 flex flex-col md:flex-row gap-6 md:items-end justify-between">
        <div>
          <div
            className="label mb-2"
            style={{ color: 'var(--ink-muted)' }}
          >
            © {new Date().getFullYear()} {PERSON.full}
          </div>
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="display block text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
          >
            {SOCIAL_LINKS.email} <span className="text-[var(--ink-muted)]">→</span>
          </a>
        </div>

        <div
          className="flex flex-wrap items-end gap-6 text-[13px]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-ink"
          >
            LinkedIn
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-ink"
          >
            GitHub
          </a>
          <span className="text-[var(--ink-muted)] tracking-[0.12em] uppercase text-[11px]">
            Hyderabad, IN
          </span>
        </div>
      </div>
    </footer>
  )
}
