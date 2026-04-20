'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PERSON } from '@/lib/constants'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-16 md:pt-28 pb-24 md:pb-32 px-5 md:px-10"
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="label mb-8 flex items-center gap-3"
        >
          <span className="inline-block h-px w-10 bg-[var(--ink)]" />
          <span>
            Software Engineer · Based in {PERSON.location.split(',')[0]} ·{' '}
            {PERSON.years}Y at {PERSON.company}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="display max-w-[18ch] text-[var(--ink)]"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
        >
          I build software that has to be{' '}
          <span className="italic" style={{ fontWeight: 500 }}>
            fast
          </span>
          .
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-20 items-end mt-12 md:mt-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-[42ch] text-[17px] md:text-[19px] leading-[1.55] text-[var(--ink-muted)]"
          >
            <span className="text-[var(--ink)]">I&apos;m {PERSON.full}</span>,
            a software engineer at{' '}
            <a
              href={PERSON.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink text-[var(--ink)]"
            >
              Orbital
            </a>
            , two years in. I care about systems that measure themselves in
            microseconds, code that doesn&apos;t need explaining, and shipping
            the thing instead of talking about it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap gap-3 md:gap-4"
          >
            <Link
              href="/race"
              className="group inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[var(--ink)] text-[var(--bg)] font-medium text-[14px] hover:bg-[var(--accent)] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current pulse" />
              Race my engine
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--ink)] text-[var(--ink)] font-medium text-[14px] hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors"
            >
              Hire me →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
