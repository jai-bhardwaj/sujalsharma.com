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
      className={`relative inline-block ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        background: 'var(--paper)',
        boxShadow:
          '0 1px 0 oklch(0.78 0.012 85), 0 14px 28px -12px oklch(0.30 0.012 85 / 0.18)',
        padding: 'var(--s-3)',
      }}
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
            'linear-gradient(180deg, oklch(0.92 0.05 85 / 0.85), oklch(0.86 0.07 85 / 0.85))',
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
            'linear-gradient(180deg, oklch(0.92 0.05 85 / 0.85), oklch(0.86 0.07 85 / 0.85))',
          transform: 'rotate(6deg)',
          opacity: 0.85,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
