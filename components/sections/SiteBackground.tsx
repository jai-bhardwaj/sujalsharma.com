export default function SiteBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      {/* Base */}
      <div className="absolute inset-0 bg-[#0A0E13]" />

      {/* Drifting gradient blobs */}
      <div
        className="absolute w-[55vw] h-[55vw] rounded-full blur-[120px] opacity-[0.18]"
        style={{
          top: '18%',
          left: '-8%',
          background: 'radial-gradient(circle, #00E5FF 0%, transparent 70%)',
          animation: 'bg-drift-a 22s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-[0.12]"
        style={{
          bottom: '8%',
          right: '-10%',
          background: 'radial-gradient(circle, #FF2E92 0%, transparent 70%)',
          animation: 'bg-drift-b 28s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-[0.08]"
        style={{
          top: '55%',
          left: '45%',
          background: 'radial-gradient(circle, #FF6B35 0%, transparent 70%)',
          animation: 'bg-drift-c 32s ease-in-out infinite 3s',
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,229,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.6) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 90%)',
        }}
      />

      {/* Scanline texture */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-screen"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(10,14,19,0.85) 100%)',
        }}
      />
    </div>
  )
}
