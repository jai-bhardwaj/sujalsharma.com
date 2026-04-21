import { SOCIAL_LINKS, PERSON } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--rule)]">
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-8 flex flex-col sm:flex-row gap-3 sm:gap-6 justify-between text-[12px] text-[var(--ink-muted)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <div>
          © {new Date().getFullYear()} {PERSON.full}
        </div>
        <div className="flex gap-5">
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="hover:text-[var(--ink)] transition-colors"
          >
            {SOCIAL_LINKS.email}
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--ink)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--ink)] transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
