'use client'

import { SOCIAL_LINKS } from '@/lib/constants'

export default function StatusBar() {
  return (
    <div
      className="h-full px-3 md:px-4 flex items-center justify-between text-[10px] tab text-[var(--dim)]"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <div className="flex items-center gap-3 md:gap-5 overflow-hidden whitespace-nowrap">
        <span>
          <span className="text-[var(--accent)]">[SPC]</span> bench
        </span>
        <span className="hidden sm:inline">
          <span className="text-[var(--accent)]">[1-4]</span> panels
        </span>
        <span className="hidden md:inline">
          <span className="text-[var(--accent)]">[?]</span> help
        </span>
      </div>
      <div className="flex items-center gap-3 md:gap-4">
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--accent)] transition-colors"
        >
          src → github
        </a>
        <span className="hidden sm:inline text-[var(--fg)]">next.js · vercel</span>
      </div>
    </div>
  )
}
