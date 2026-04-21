'use client'

import { motion } from 'framer-motion'
import { PERSON } from '@/lib/constants'

export default function Info() {
  return (
    <section id="about" className="px-6 md:px-10 py-20 md:py-32">
      <div className="max-w-[960px] mx-auto">
        <h2
          className="text-[12px] tracking-[0.12em] uppercase text-[var(--ink-muted)] mb-10"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          About
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="max-w-[58ch] text-[18px] md:text-[21px] leading-[1.55] text-[var(--ink-muted)]"
        >
          I like code that hits tight budgets — latency, memory, cost. At{' '}
          <a
            href={PERSON.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-ink text-[var(--ink)]"
          >
            Orbital
          </a>{' '}
          I ship the sales-intelligence layer the SMB world never got. On my
          own time I&apos;m building Mach-Zero — a C++ match engine — because
          the only way I know how to learn low-latency systems is by building
          them myself.
        </motion.p>
      </div>
    </section>
  )
}
