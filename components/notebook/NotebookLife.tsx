/**
 * Subtle ambient motion that fits the notebook metaphor — drifting
 * graphite specks (paper dust) + occasional ink-blooms in the margin.
 * Pure CSS, deterministic positions (no SSR/CSR mismatch), gated by
 * the global prefers-reduced-motion rule in globals.css.
 *
 * Sits in the layer between DotGrid (-z-10) and content (z-0).
 */

const SPECKS: Array<{
  top: number
  left: number
  dur: number
  delay: number
  dx: number
  dy: number
  size?: number
}> = [
  { top:  6, left: 14, dur: 44, delay:  -2, dx:  6, dy: -3 },
  { top: 11, left: 78, dur: 52, delay:  -8, dx:  5, dy:  4 },
  { top: 17, left: 38, dur: 60, delay: -18, dx: -4, dy:  7 },
  { top: 24, left:  9, dur: 64, delay: -28, dx:  8, dy: -2 },
  { top: 28, left: 92, dur: 38, delay: -19, dx: -7, dy:  6 },
  { top: 34, left: 56, dur: 42, delay:  -5, dx: -7, dy:  3, size: 3 },
  { top: 42, left: 22, dur: 56, delay: -12, dx:  4, dy:  5 },
  { top: 48, left: 86, dur: 52, delay: -22, dx: -6, dy: -4 },
  { top: 53, left:  4, dur: 66, delay:  -3, dx:  9, dy: -2 },
  { top: 60, left: 67, dur: 44, delay: -32, dx:  7, dy: -3 },
  { top: 65, left: 32, dur: 58, delay: -16, dx: -5, dy:  6 },
  { top: 72, left: 80, dur: 46, delay: -40, dx:  6, dy:  2 },
  { top: 78, left: 18, dur: 50, delay: -10, dx: -4, dy:  4, size: 3 },
  { top: 83, left: 49, dur: 54, delay: -25, dx:  5, dy: -3 },
  { top: 88, left: 70, dur: 60, delay: -14, dx: -6, dy:  4 },
  { top: 94, left: 12, dur: 62, delay:  -7, dx:  8, dy: -4 },
  { top: 96, left: 96, dur: 48, delay: -36, dx: -5, dy:  3 },
]

const BLOOMS: Array<{
  top: number
  left?: number
  right?: number
  delay: number
  dur: number
}> = [
  { top: 16, left: 3,    delay:  0, dur: 18 },
  { top: 36, right: 4,   delay:  6, dur: 22 },
  { top: 58, left: 5,    delay: 12, dur: 19 },
  { top: 76, right: 3,   delay:  4, dur: 24 },
  { top: 91, left: 4,    delay: 17, dur: 20 },
]

export default function NotebookLife() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-[5] pointer-events-none overflow-hidden"
    >
      {SPECKS.map((s, i) => (
        <span
          key={`d-${i}`}
          className="dust-speck"
          style={
            {
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size ? `${s.size}px` : undefined,
              height: s.size ? `${s.size}px` : undefined,
              '--dx': `${s.dx}vw`,
              '--dy': `${s.dy}vw`,
              '--dur': `${s.dur}s`,
              '--delay': `${s.delay}s`,
              '--dust-opacity': i % 4 === 0 ? '0.55' : '0.32',
            } as React.CSSProperties
          }
        />
      ))}

      {BLOOMS.map((b, i) => (
        <span
          key={`b-${i}`}
          className="ink-bloom"
          style={
            {
              top: `${b.top}%`,
              left: b.left != null ? `${b.left}%` : undefined,
              right: b.right != null ? `${b.right}%` : undefined,
              '--delay': `${b.delay}s`,
              '--dur': `${b.dur}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
