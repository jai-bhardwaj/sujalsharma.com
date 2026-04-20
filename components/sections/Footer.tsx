import { PERSON, SOCIAL_LINKS } from '@/lib/constants'

export default function Footer() {
  return (
    <footer
      className="relative py-14 px-6 md:px-12 lg:px-20 border-t border-[rgba(10,10,10,0.08)]"
      style={{ background: 'var(--cream)', color: 'var(--ink)' }}
    >
      <div
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-[11px] tracking-[0.25em] uppercase"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <p style={{ color: 'rgba(10,10,10,0.6)' }}>
          © {new Date().getFullYear()} {PERSON.full} · built fast
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--blue)] transition-colors"
            style={{ color: 'rgba(10,10,10,0.6)' }}
          >
            linkedin
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--blue)] transition-colors"
            style={{ color: 'rgba(10,10,10,0.6)' }}
          >
            github
          </a>
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="hover:text-[var(--blue)] transition-colors normal-case tracking-normal"
            style={{ color: 'rgba(10,10,10,0.6)' }}
          >
            {SOCIAL_LINKS.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
