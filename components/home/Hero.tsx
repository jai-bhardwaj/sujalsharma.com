'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PERSON } from '@/lib/constants'

export default function Hero() {
  return (
    <section
      id="home"
      className="px-6 md:px-10 pt-20 md:pt-32 pb-24 md:pb-40"
    >
      <div className="max-w-[1080px] mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="display text-[var(--ink)] max-w-[18ch]"
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.25rem)' }}
        >
          {PERSON.full} — software engineer building things
          that have to be fast.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 md:mt-14 max-w-[55ch] text-[17px] md:text-[19px] leading-[1.6] text-[var(--ink-muted)]"
        >
          Currently at{' '}
          <a
            href={PERSON.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-ink text-[var(--ink)]"
          >
            Orbital
          </a>{' '}
          in {PERSON.location.split(',')[0]}, {PERSON.years} years in. On the
          side I&apos;m building{' '}
          <Link href="/race" className="link-ink text-[var(--ink)]">
            Mach-Zero
          </Link>
          , a C++20 match engine — not because anyone asked, but because
          latency is the most interesting problem I know.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 md:mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[14px]"
        >
          <Link href="/race" className="link-ink text-[var(--ink)]">
            Race my engine →
          </Link>
          <a href="#work" className="link-ink text-[var(--ink-muted)]">
            See work
          </a>
          <a href="#contact" className="link-ink text-[var(--ink-muted)]">
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  )
}
