import type { ReactNode } from 'react'

type Props = {
  number: string
  title: string
  caption?: string
  children: ReactNode
  className?: string
}

/**
 * A numbered figure block — `FIG. NN — TITLE`. Used for projects,
 * which are presented like specimen sheets in an engineer's notebook.
 */
export default function Fig({
  number,
  title,
  caption,
  children,
  className = '',
}: Props) {
  return (
    <figure className={`reveal ${className}`}>
      <header
        className="flex items-baseline gap-4 flex-wrap"
        style={{ marginBottom: 'var(--s-6)' }}
      >
        <span
          className="label tab"
          style={{ color: 'var(--ink)', letterSpacing: '0.18em' }}
        >
          FIG. {number}
        </span>
        <span
          className="rule-soft-b flex-1"
          style={{ height: 1, marginBottom: 6 }}
          aria-hidden
        />
        <h2
          className="display"
          style={{
            fontSize: 'var(--t-xl)',
            color: 'var(--ink)',
            fontStyle: 'normal',
            fontWeight: 500,
          }}
        >
          {title}
        </h2>
      </header>
      {caption && (
        <p
          className="label"
          style={{ marginBottom: 'var(--s-5)', color: 'var(--graphite)' }}
        >
          {caption}
        </p>
      )}
      <div>{children}</div>
    </figure>
  )
}
