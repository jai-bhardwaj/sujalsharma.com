type Props = {
  text: string
  rotation?: number
  className?: string
}

/**
 * A rotated vermilion approval stamp. Used at most twice on the page —
 * the cover SHIPPING stamp + maybe one more. Animation handled by the
 * `stamp-in` class in globals.css.
 */
export default function Stamp({ text, rotation = -2, className = '' }: Props) {
  return (
    <div
      className={`relative inline-block stamp-in ${className}`}
      style={
        {
          '--rotate': `${rotation}deg`,
          color: 'var(--stamp)',
          fontFamily: 'var(--font-mono)',
        } as React.CSSProperties
      }
    >
      <div
        className="px-3 py-1.5 border-[1.5px] uppercase tracking-[0.18em] tab"
        style={{
          borderColor: 'var(--stamp)',
          fontSize: 'var(--t-sm)',
          fontWeight: 600,
          // Slight ink roughness via shadow blur
          boxShadow: '0 0 0 1px var(--stamp) inset',
          opacity: 0.92,
        }}
      >
        {text}
      </div>
    </div>
  )
}
