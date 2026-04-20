'use client'

import { NAV_PANELS, SOCIAL_LINKS, type PanelId } from '@/lib/constants'

type Props = {
  active: PanelId
  onNavigate: (id: PanelId) => void
}

export default function LeftRail({ active, onNavigate }: Props) {
  return (
    <nav
      className="h-full flex md:flex-col md:py-4 md:px-0 px-3 py-2 overflow-x-auto md:overflow-visible"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <ul className="flex md:flex-col md:w-full w-auto gap-0 md:gap-0">
        {NAV_PANELS.map((p) => {
          const isActive = active === p.id
          return (
            <li key={p.id}>
              <button
                onClick={() => onNavigate(p.id)}
                className={`relative whitespace-nowrap md:w-full text-left px-3 md:px-4 py-2 md:py-2.5 text-[11px] tracking-[0.2em] uppercase transition-colors`}
                style={{
                  color: isActive ? 'var(--fg)' : 'var(--dim)',
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <span
                    className="absolute hidden md:block left-0 top-0 bottom-0 w-[3px]"
                    style={{ background: 'var(--accent)' }}
                    aria-hidden
                  />
                )}
                {isActive && (
                  <span
                    className="absolute md:hidden left-0 right-0 bottom-0 h-[2px]"
                    style={{ background: 'var(--accent)' }}
                    aria-hidden
                  />
                )}
                <span className="text-[var(--dim)] mr-2">/</span>
                {p.label}
                <span
                  className="hidden md:inline ml-auto float-right text-[9px] opacity-60 tab"
                  aria-hidden
                >
                  [{p.kbd}]
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="hidden md:block mt-auto pt-6 px-4 space-y-2 text-[10px] tracking-[0.2em] uppercase text-[var(--dim)]">
        <Shortcut kbd="SPC" label="bench" />
        <Shortcut kbd="j·k" label="prev / next" />
        <Shortcut kbd="?" label="help" />
        <div className="h-px bg-[var(--rule)] my-3" />
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-[var(--accent)] transition-colors"
        >
          [G] github
        </a>
        <a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-[var(--accent)] transition-colors"
        >
          [L] linkedin
        </a>
        <a
          href={`mailto:${SOCIAL_LINKS.email}`}
          className="block hover:text-[var(--accent)] transition-colors"
        >
          [E] email
        </a>
      </div>
    </nav>
  )
}

function Shortcut({ kbd, label }: { kbd: string; label: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span
        className="px-1.5 py-0.5 rounded border border-[var(--rule)] text-[var(--fg)] text-[10px] tab"
      >
        {kbd}
      </span>
      <span>{label}</span>
    </div>
  )
}
