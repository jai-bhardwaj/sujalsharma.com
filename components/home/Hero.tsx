'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PERSON } from '@/lib/constants'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative px-6 md:px-10 pt-32 md:pt-48 pb-32 md:pb-48 min-h-[92vh] flex flex-col justify-center"
    >
      <div className="max-w-[960px] mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="display text-[var(--ink)]"
          style={{
            fontSize: 'clamp(3.25rem, 14vw, 12rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.045em',
          }}
        >
          Sujal
          <br />
          Sharma<span className="text-[var(--ink-muted)]">,</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 md:mt-12 max-w-[40ch] text-[17px] md:text-[20px] leading-[1.55] text-[var(--ink-muted)]"
        >
          software engineer in{' '}
          <span className="text-[var(--ink)]">
            {PERSON.location.split(',')[0]}
          </span>
          . {PERSON.years} years at{' '}
          <a
            href={PERSON.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-ink text-[var(--ink)]"
          >
            Orbital
          </a>
          . Building a C++ match engine on the side because latency is the
          most interesting problem I know.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-12 md:mt-16 flex flex-col gap-3 text-[15px]"
        >
          <Link href="/race" className="link-ink text-[var(--ink)] w-fit">
            → Race my engine
          </Link>
          <a href="#work" className="link-ink text-[var(--ink-muted)] w-fit">
            → See work
          </a>
          <a
            href="#contact"
            className="link-ink text-[var(--ink-muted)] w-fit"
          >
            → Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  )
}
