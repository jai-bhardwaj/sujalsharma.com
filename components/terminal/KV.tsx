import type { ReactNode } from 'react'

type Props = {
  label: string
  children: ReactNode
  accent?: boolean
}

export default function KV({ label, children, accent }: Props) {
  return (
    <div className="grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr] gap-4 py-2 rule-b items-baseline">
      <dt className="label">{label}</dt>
      <dd
        className="text-[15px]"
        style={{
          color: accent ? 'var(--accent)' : 'var(--fg)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {children}
      </dd>
    </div>
  )
}
