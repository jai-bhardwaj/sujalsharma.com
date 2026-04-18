export default function SiteBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* Base solid — cheap single paint */}
      <div className="absolute inset-0 bg-[#0A0E13]" />

      {/* Static radial gradients — GPU-cheap, no animation / no blur filter */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60vw 50vh at 10% 25%, rgba(0,229,255,0.14), transparent 60%),
            radial-gradient(ellipse 55vw 45vh at 90% 80%, rgba(255,46,146,0.10), transparent 60%),
            radial-gradient(ellipse 50vw 40vh at 50% 55%, rgba(255,107,53,0.06), transparent 55%)
          `,
        }}
      />

      {/* Grid — static background-image, composites once */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,229,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.55) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Vignette — static, cheap */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(10,14,19,0.75) 95%)',
        }}
      />
    </div>
  )
}
