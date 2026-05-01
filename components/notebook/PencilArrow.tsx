type Props = {
  direction?: 'right' | 'down-right' | 'left'
  size?: number
  className?: string
}

/**
 * Hand-drawn-feel pencil arrow. SVG path with a slight wobble, used
 * inline next to race-link CTAs and for the "back to portfolio" link.
 */
export default function PencilArrow({
  direction = 'right',
  size = 28,
  className = '',
}: Props) {
  const paths: Record<NonNullable<Props['direction']>, string> = {
    right: 'M2 12 C 12 10, 30 14, 54 12 M44 4 L56 12 L44 20',
    'down-right': 'M2 4 C 14 6, 36 26, 56 30 M44 18 L58 30 L46 38',
    left: 'M58 12 C 48 10, 30 14, 6 12 M16 4 L4 12 L16 20',
  }
  const viewBox = direction === 'down-right' ? '0 0 60 40' : '0 0 60 24'
  return (
    <svg
      width={size}
      height={direction === 'down-right' ? size * 0.66 : size * 0.4}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={paths[direction]} />
    </svg>
  )
}
