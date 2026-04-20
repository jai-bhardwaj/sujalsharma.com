'use client'

import { motion } from 'framer-motion'
import { PERSON } from '@/lib/constants'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24 pb-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[0.4em] uppercase text-[var(--text-secondary)] mb-10 md:mb-14 flex items-center gap-3"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span className="w-8 h-px bg-[#00E5FF]" />
          portfolio · {PERSON.handle} · sujalsharma.com
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="font-bold tracking-tight leading-[0.88] mb-10 md:mb-14"
          style={{
            fontSize: 'clamp(3rem, 11vw, 9.5rem)',
            fontFamily: 'var(--font-inter)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
          }}
        >
          <span className="block text-[var(--text-primary)]">I like</span>
          <span className="block text-[var(--text-primary)]">fast software.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
          className="max-w-2xl text-lg md:text-xl lg:text-2xl text-[var(--text-secondary)] leading-[1.5]"
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
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 md:mt-16 flex flex-wrap gap-x-8 gap-y-4 items-center"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <a
            href="#race"
            className="group inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-[#00E5FF] border-b border-[#00E5FF]/30 pb-1 hover:border-[#00E5FF] transition"
          >
            race my engine
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-[var(--text-secondary)] border-b border-transparent pb-1 hover:text-[var(--text-primary)] transition"
          >
            get in touch
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </div>

      {/* Corner meta — status indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-8 md:bottom-10 left-0 right-0 max-w-6xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
          {PERSON.availability}
        </span>
        <span className="hidden md:block opacity-60">
          scroll ↓
        </span>
      </motion.div>
    </section>
  )
}
