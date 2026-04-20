'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { PERSON } from '@/lib/constants'

const LINE_1 = ['I', 'like']
const LINE_2 = ['fast', 'software.']

export default function Hero() {
  // Subtle mouse-driven tilt on the headline
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-1, 1], [3, -3]), { stiffness: 80, damping: 20 })
  const ry = useSpring(useTransform(mx, [-1, 1], [-4, 4]), { stiffness: 80, damping: 20 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      mx.set(x)
      my.set(y)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [mx, my])

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 md:px-12 lg:px-20 pt-28 pb-24 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[0.4em] uppercase text-[var(--text-secondary)] mb-10 md:mb-14 inline-flex items-center gap-3"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span className="w-8 h-px bg-[#00E5FF]" />
          sujalsharma.com
          <span className="w-8 h-px bg-[#00E5FF]" />
        </motion.div>

        {/* Kinetic headline with tilt */}
        <motion.h1
          className="font-bold tracking-tight leading-[0.88] mb-10 md:mb-14"
          style={{
            fontSize: 'clamp(3rem, 11vw, 9.5rem)',
            fontFamily: 'var(--font-inter)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            rotateX: rx,
            rotateY: ry,
            transformPerspective: 1200,
            transformStyle: 'preserve-3d',
          }}
        >
          <KineticLine words={LINE_1} baseDelay={0.15} />
          <KineticLine words={LINE_2} baseDelay={0.35} underlineWord="fast" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.7 }}
          className="mx-auto max-w-2xl text-lg md:text-xl lg:text-[1.375rem] text-[var(--text-secondary)] leading-[1.55]"
        >
          I&apos;m{' '}
          <span className="text-[var(--text-primary)] font-medium">
            {PERSON.full}
          </span>
          , a software engineer at{' '}
          <a
            href={PERSON.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-primary)] underline decoration-[#00E5FF]/40 underline-offset-4 hover:decoration-[#00E5FF] transition"
          >
            Orbital
          </a>
          . Two years in, based in {PERSON.location.split(',')[0]}. Obsessed
          with things measured in nanoseconds &mdash; which is why I built an
          HFT match engine in C++ for fun.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-12 md:mt-14 flex flex-wrap gap-x-8 gap-y-4 items-center justify-center"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <a
            href="#race"
            className="group inline-flex items-center gap-2 text-sm tracking-[0.25em] uppercase text-[#00E5FF] border-b border-[#00E5FF]/30 pb-1 hover:border-[#00E5FF] transition"
          >
            race my engine
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm tracking-[0.25em] uppercase text-[var(--text-secondary)] border-b border-transparent pb-1 hover:text-[var(--text-primary)] transition"
          >
            get in touch
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </div>

      {/* Status strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 md:bottom-10 left-0 right-0 max-w-6xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
          {PERSON.availability}
        </span>
        <span className="hidden md:block opacity-60">scroll ↓</span>
      </motion.div>
    </section>
  )
}

function KineticLine({
  words,
  baseDelay,
  underlineWord,
}: {
  words: string[]
  baseDelay: number
  underlineWord?: string
}) {
  return (
    <span className="block overflow-hidden py-[0.06em]">
      {words.map((word, i) => {
        const isUnderlined = word.replace(/\W/g, '') === underlineWord
        return (
          <motion.span
            key={i}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 0.75,
              delay: baseDelay + i * 0.08,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="inline-block"
            style={{ marginRight: i === words.length - 1 ? 0 : '0.22em' }}
          >
            {isUnderlined ? (
              <span className="relative inline-block">
                {word}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: baseDelay + 0.55,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                  className="absolute left-0 right-0 origin-left bg-[#00E5FF]"
                  style={{
                    bottom: '0.08em',
                    height: '0.055em',
                  }}
                />
              </span>
            ) : (
              word
            )}
          </motion.span>
        )
      })}
    </span>
  )
}
