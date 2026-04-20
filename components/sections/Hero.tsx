'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { PERSON } from '@/lib/constants'
import Marquee from './Marquee'

const HERO_WORDS = [
  'software engineer',
  'C++ · TypeScript · React',
  'obsessed with latency',
  'Hyderabad · India',
  'building Mach-Zero',
  'open to opportunities',
]

export default function Hero() {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const blobX = useSpring(useTransform(mx, [0, 1], ['10%', '30%']), { stiffness: 60, damping: 20 })
  const blobY = useSpring(useTransform(my, [0, 1], ['20%', '40%']), { stiffness: 60, damping: 20 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth)
      my.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [mx, my])

  return (
    <section
      id="home"
      className="relative min-h-[100vh] flex flex-col justify-between overflow-hidden pt-24 pb-0"
      style={{ background: 'var(--cream)' }}
    >
      {/* Decorative shapes */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: blobY,
          left: blobX,
          width: 'clamp(280px, 34vw, 520px)',
          height: 'clamp(280px, 34vw, 520px)',
          background: 'var(--pink)',
          filter: 'blur(60px)',
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      />
      <div
        className="absolute right-[-120px] top-[15%] rounded-full"
        style={{
          width: 'clamp(200px, 26vw, 380px)',
          height: 'clamp(200px, 26vw, 380px)',
          background: 'var(--lime)',
          filter: 'blur(40px)',
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      />
      <div className="noise-overlay" />

      {/* Spinning asterisk sticker */}
      <div
        className="absolute top-28 right-8 md:top-32 md:right-16"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(80px, 10vw, 140px)',
          color: 'var(--blue)',
          animation: 'spin-slow 18s linear infinite',
          transformOrigin: 'center',
          lineHeight: 1,
        }}
        aria-hidden
      >
        ✳
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-12 md:pt-16">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-8 md:mb-10 px-3 py-1.5 rounded-full border border-[rgba(10,10,10,0.15)] bg-white/60 backdrop-blur-sm text-[11px] tracking-[0.25em] uppercase"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--blue)] animate-pulse" />
            {PERSON.availability}
          </motion.div>

          <h1
            className="relative font-bold leading-[0.82] tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 15vw, 14rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: 'var(--ink)',
            }}
          >
            <Word delay={0.1}>I like</Word>
            <br />
            <span className="relative inline-block">
              <Word delay={0.22} color="var(--blue)">
                fast
              </Word>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.85, ease: [0.2, 0.8, 0.2, 1] }}
                className="absolute left-0 right-0 origin-left"
                style={{
                  bottom: '0.05em',
                  height: '0.065em',
                  background: 'var(--pink)',
                }}
              />
            </span>{' '}
            <Word delay={0.32}>software.</Word>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-8 md:mt-12 max-w-2xl text-lg md:text-xl lg:text-[1.375rem] leading-[1.55]"
            style={{ color: 'rgba(10,10,10,0.7)' }}
          >
            I&apos;m{' '}
            <span className="font-semibold" style={{ color: 'var(--ink)' }}>
              {PERSON.full}
            </span>
            . Software engineer at{' '}
            <a
              href={PERSON.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline decoration-[var(--pink)] decoration-[3px] underline-offset-[6px] hover:decoration-[var(--blue)] transition"
              style={{ color: 'var(--ink)' }}
            >
              Orbital
            </a>
            . Two years in, based in {PERSON.location.split(',')[0]}. Building a C++ HFT
            engine for fun because things measured in nanoseconds make me happy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 md:mt-12 flex flex-wrap gap-3 md:gap-4"
          >
            <a
              href="#race"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-base hover:scale-[1.03] transition-transform"
              style={{
                background: 'var(--ink)',
                color: 'var(--cream)',
                fontFamily: 'var(--font-display)',
              }}
            >
              Race my engine
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-base border-2 hover:scale-[1.03] transition-transform"
              style={{
                borderColor: 'var(--ink)',
                color: 'var(--ink)',
                fontFamily: 'var(--font-display)',
              }}
            >
              Hire me
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="relative pt-8 pb-6 border-t border-[rgba(10,10,10,0.08)]">
        <Marquee items={HERO_WORDS} tone="ink" speed={60} />
      </div>
    </section>
  )
}

function Word({
  children,
  delay,
  color,
}: {
  children: React.ReactNode
  delay: number
  color?: string
}) {
  return (
    <span className="inline-block overflow-hidden py-[0.05em]">
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.75, delay, ease: [0.2, 0.8, 0.2, 1] }}
        className="inline-block"
        style={color ? { color } : undefined}
      >
        {children}
      </motion.span>
    </span>
  )
}
