import { PERSON, SOCIAL_LINKS } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-[var(--border-color)]">
      <div
        className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)]">
          © {new Date().getFullYear()} {PERSON.full} · built for speed
        </p>
        <div className="flex items-center gap-5 text-[11px] tracking-[0.2em] uppercase">
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
            className="text-[var(--text-secondary)] hover:text-[#00E5FF] transition-colors"
          >
            email
          </a>
          <span className="text-[var(--text-secondary)]">
            p50 <span className="text-[#00FF94]">800ns</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
