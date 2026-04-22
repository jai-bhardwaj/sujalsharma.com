'use client'

import Tile from './Tile'
import { SOCIAL_LINKS } from '@/lib/constants'

export default function ContactTile({
  className,
  delay,
}: {
  className?: string
  delay?: number
}) {
  return (
    <Tile label="SS · 06" className={className} delay={delay}>
      <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-10">
        <div />

        <div>
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="display block text-[var(--ink)] hover:text-[var(--ink-muted)] transition-colors break-all"
            style={{
              fontSize: 'clamp(1.75rem, 5.5vw, 4.5rem)',
              letterSpacing: '-0.035em',
            }}
          >
            {SOCIAL_LINKS.email}
          </a>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink text-[var(--ink)]"
            >
              LinkedIn →
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink text-[var(--ink)]"
            >
              GitHub →
            </a>
          </div>
        </div>
      </div>
    </Tile>
  )
}
