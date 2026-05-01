import type { ReactNode } from 'react'

/**
 * The notebook spread container. A single column on mobile, opens into
 * a two-column "spread" feel on desktop via spacer columns inside each
 * section (handled per-section, not here). This component just enforces
 * max-width, gutters, and vertical rhythm.
 */
export default function Spread({ children }: { children: ReactNode }) {
  return (
    <main
      className="relative mx-auto"
      style={{
        maxWidth: '1080px',
        paddingLeft: 'clamp(24px, 5vw, 80px)',
        paddingRight: 'clamp(24px, 5vw, 80px)',
        paddingTop: 'clamp(48px, 7vw, 96px)',
        paddingBottom: 'var(--s-9)',
      }}
    >
      {children}
    </main>
  )
}
