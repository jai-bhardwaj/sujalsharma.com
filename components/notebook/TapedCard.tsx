import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  rotation?: number
  className?: string
}

/**
 * A polaroid-style card with masking-tape corners. Used for the taped-in
 * race thumbnail. Don't overuse — at most one per page, like a real
 * notebook keepsake.
 */
export default function TapedCard({ children, rotation = -1.2, className = '' }: Props) {
  return (
    <div
      className={`taped-card relative inline-block ${className}`}
      style={
        {
          '--rotate': `${rotation}deg`,
          background: 'var(--paper)',
          padding: 'var(--s-3)',
        } as React.CSSProperties
      }
    >
      {/* Top-left masking tape */}
      <span
        aria-hidden
        className="absolute"
        style={{
          top: -10,
          left: '12%',
          width: 64,
          height: 18,
          background:
            'linear-gradient(180deg, oklch(0.74 0.06 85 / 0.85), oklch(0.62 0.08 70 / 0.85))',
          transform: 'rotate(-4deg)',
          opacity: 0.85,
        }}
      />
      {/* Bottom-right masking tape */}
      <span
        aria-hidden
        className="absolute"
        style={{
          bottom: -8,
          right: '14%',
          width: 56,
          height: 16,
          background:
            'linear-gradient(180deg, oklch(0.74 0.06 85 / 0.85), oklch(0.62 0.08 70 / 0.85))',
          transform: 'rotate(6deg)',
          opacity: 0.85,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
