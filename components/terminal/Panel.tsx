import type { ReactNode } from 'react'

type Props = {
  symbol?: string
  title: string
  meta?: ReactNode
  children: ReactNode
}

export default function Panel({ symbol, title, meta, children }: Props) {
  return (
    <section className="min-h-full">
      <header className="panel-header">
        <div className="flex items-center gap-3">
          {symbol && (
            <span className="text-[var(--accent)]">{symbol}</span>
          )}
          <span className="text-[var(--fg)]">{title}</span>
        </div>
        {meta && <div className="text-right">{meta}</div>}
      </header>
      <div className="panel-body">{children}</div>
    </section>
  )
}
