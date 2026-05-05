type Props = {
  text: string
  rotation?: number
  className?: string
}

/**
 * A rotated vermilion approval stamp. Wrapper structure:
 *   outer  — sets the base rotation via --rotate, drifts subtly (idle)
 *   middle — runs the entrance keyframe (rotate-in + scale + fade)
 *   inner  — the actual bordered ink mark
 *
 * Splitting the transforms across wrappers lets the entrance animation
 * AND the idle drift animation coexist without overriding each other.
 */
export default function Stamp({ text, rotation = -2, className = '' }: Props) {
  return (
    <div
      className={`relative inline-block ${className}`}
      style={
        {
          '--rotate': `${rotation}deg`,
          color: 'var(--stamp)',
          fontFamily: 'var(--font-mono)',
          // Outer holds the static base rotation; inner wrappers add motion.
          transform: `rotate(${rotation}deg)`,
        } as React.CSSProperties
      }
    >
      <span className="stamp-idle">
        <span className="stamp-in" style={{ display: 'inline-block' }}>
          <span
            className="px-3 py-1.5 border-[1.5px] uppercase tracking-[0.18em] tab"
            style={{
              borderColor: 'var(--stamp)',
              fontSize: 'var(--t-sm)',
              fontWeight: 600,
              boxShadow: '0 0 0 1px var(--stamp) inset',
              opacity: 0.92,
              display: 'inline-block',
            }}
          >
            {text}
          </span>
        </span>
      </span>
    </div>
  )
}
