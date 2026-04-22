'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PERSON } from '@/lib/constants'

const MORPH = ['fast', 'lean', 'precise', 'real', 'fast']

export default function Hero() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setI((n) => (n + 1) % MORPH.length)
    }, 2400)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section
      id="home"
      className="relative px-6 md:px-10 pt-32 md:pt-44 pb-28 md:pb-40 min-h-[92vh] flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-[1040px] mx-auto w-full relative">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="display text-[var(--ink)]"
          style={{
            fontSize: 'clamp(3.5rem, 16vw, 14rem)',
            lineHeight: 0.88,
            letterSpacing: '-0.05em',
          }}
        >
          Sujal
          <br />
          Sharma<span className="text-[var(--ink-muted)]">.</span>
        </motion.h1>

        {/* Morphing tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 md:mt-14 text-[22px] md:text-[30px] leading-[1.2] text-[var(--ink-muted)] max-w-[26ch]"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
        >
          software that has to be{' '}
          <span className="inline-block relative align-baseline">
            <AnimatePresence mode="wait">
              <motion.span
                key={MORPH[i]}
                initial={{ opacity: 0, y: '0.3em' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '-0.3em' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block italic text-[var(--ink)]"
                style={{ fontWeight: 500 }}
              >
                {MORPH[i]}
              </motion.span>
            </AnimatePresence>
            <span className="invisible italic" style={{ fontWeight: 500 }}>
              precise
            </span>
          </span>
          .
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="mt-14 md:mt-20 flex flex-col gap-3 text-[15px]"
        >
          <Link
            href="/race"
            className="link-ink text-[var(--ink)] w-fit"
          >
            → Race my engine
          </Link>
          <a
            href="#work"
            className="link-ink text-[var(--ink-muted)] w-fit"
          >
            → See work
          </a>
          <a
            href="#contact"
            className="link-ink text-[var(--ink-muted)] w-fit"
          >
            → Get in touch
          </a>
        </motion.div>

        {/* Context line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 md:mt-24 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] tracking-[0.12em] uppercase text-[var(--ink-muted)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span>Software engineer</span>
          <span className="opacity-40">/</span>
          <a
            href={PERSON.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--ink)] transition-colors"
          >
            Orbital · {PERSON.years}y
          </a>
          <span className="opacity-40">/</span>
          <span>{PERSON.location}</span>
          <span className="opacity-40">/</span>
          <span className="text-[var(--ink)]">open to opportunities</span>
        </motion.div>
      </div>
    </section>
  )
}
