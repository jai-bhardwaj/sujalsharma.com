import { PERSON, SOCIAL_LINKS } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="relative py-14 px-6 md:px-12 lg:px-20 border-t border-[rgba(255,255,255,0.06)]">
      <div
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-[11px] tracking-[0.25em] uppercase"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <p className="text-[var(--text-secondary)]">
          © {new Date().getFullYear()} {PERSON.full}
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] hover:text-[#00E5FF] transition-colors"
          >
            linkedin
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] hover:text-[#00E5FF] transition-colors"
          >
            github
          </a>
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="text-[var(--text-secondary)] hover:text-[#00E5FF] transition-colors normal-case tracking-normal"
          >
            {SOCIAL_LINKS.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
