/**
 * Full-viewport, fixed dot grid that sits behind every page surface.
 * 1px dots at 24px spacing, tinted with the --rule token. Pure CSS,
 * GPU-cheap, prints if needed.
 */
export default function DotGrid() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        backgroundImage:
          'radial-gradient(circle, oklch(0.82 0.010 85) 0.9px, transparent 1px)',
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0',
        opacity: 0.55,
        maskImage:
          'radial-gradient(ellipse at center, #000 60%, transparent 100%)',
        WebkitMaskImage:
          'radial-gradient(ellipse at center, #000 60%, transparent 100%)',
      }}
    />
  )
}
