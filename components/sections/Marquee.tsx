type Props = {
  items: string[]
  tone?: 'ink' | 'cream'
  speed?: number
}

export default function Marquee({ items, tone = 'ink', speed = 42 }: Props) {
  const loop = [...items, ...items, ...items]
  const colorClass = tone === 'ink' ? 'text-[var(--ink)]' : 'text-[var(--cream)]'
  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${colorClass}`}
      aria-hidden
    >
      <div
        className="inline-flex"
        style={{
          width: 'max-content',
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-8 pr-8 font-bold"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            {item}
            <span className="opacity-30">✳</span>
          </span>
        ))}
      </div>
    </div>
  )
}
