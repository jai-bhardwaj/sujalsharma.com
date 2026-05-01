import type { ReactNode } from 'react'

type Props = {
  label: string
  children: ReactNode
  className?: string
}

/**
 * A margin annotation — feels like handwritten notes pulled into the
 * gutter of a notebook page. Labels are mono-uppercase ("MARGIN: NOW")
 * and content is a smaller text block at ~50ch max width.
 */
export default function Margin({ label, children, className = '' }: Props) {
  return (
    <aside
      className={`reveal ${className}`}
      style={{
        borderLeft: '2px solid var(--ink)',
        paddingLeft: 'var(--s-5)',
      }}
    >
      <div
        className="label"
        style={{
          color: 'var(--ink)',
          marginBottom: 'var(--s-3)',
          letterSpacing: '0.16em',
        }}
      >
        MARGIN — {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--t-base)',
          lineHeight: 1.6,
          color: 'var(--ink)',
          maxWidth: '52ch',
        }}
      >
        {children}
      </div>
    </aside>
  )
}
