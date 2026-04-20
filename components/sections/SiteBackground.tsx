export default function SiteBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#0A0E13]" />

      {/* Single quiet accent — a soft cyan glow top-left that anchors the page */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70vw 55vh at 15% 10%, rgba(0,229,255,0.09), transparent 60%)',
        }}
      />

      {/* Hairline grid — barely there */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,229,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.7) 1px, transparent 1px)',
          backgroundSize: '96px 96px',
        }}
      />

      {/* Bottom vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, transparent 60%, rgba(10,14,19,0.6) 100%)',
        }}
      />
    </div>
  )
}
