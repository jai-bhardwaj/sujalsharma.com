'use client'

import { motion } from 'framer-motion'
import { PERSON } from '@/lib/constants'

const FACTS = [
  { label: 'role', value: 'software engineer' },
  { label: 'years', value: `${PERSON.years} yrs` },
  { label: 'where', value: `${PERSON.location.split(',')[0]} · ${PERSON.workMode}` },
  {
    label: 'stack',
    value: PERSON.stack.slice(0, 5).join(' · '),
  },
  {
    label: 'edu',
    value: `${PERSON.education.degree}, ${PERSON.education.school.replace('Dr. A.P.J. ', '')} · ${PERSON.education.years.split('–')[1]}`,
  },
]

export default function Now() {
  return (
    <section
      id="now"
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[0.4em] uppercase text-[var(--text-secondary)] mb-6 flex items-center gap-3"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span className="w-8 h-px bg-[#00E5FF]" />
          chapter 01 · now
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-bold tracking-tight leading-[0.95] mb-10 md:mb-12"
          style={{
            fontSize: 'clamp(2.25rem, 7vw, 5.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
          }}
        >
          I build software
          <br />
          at <a
            href={PERSON.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00E5FF] hover:text-[var(--text-primary)] transition"
          >Orbital</a>.
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5 text-base md:text-lg text-[var(--text-secondary)] leading-[1.65] max-w-2xl"
          >
            <p>
              Orbital is an{' '}
              <span className="text-[var(--text-primary)]">
                AI sales-intelligence platform for SMBs
              </span>{' '}
              — the piece that&apos;s been missing from the enterprise tooling
              stack (think ZoomInfo, but for local businesses: HVAC,
              restaurants, dental practices, gyms).
            </p>
            <p>
              I ship things that prospect, enrich, and verify data at scale.
              The problems are a mix of backend throughput, messy real-world
              data, and turning it into something a sales rep can actually use.
            </p>
            <p className="text-[var(--text-secondary)] opacity-70 text-sm md:text-base italic">
              [ Sujal: swap this paragraph for specifics — what you actually
              shipped this quarter, team size, tech you touch day-to-day. ]
            </p>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="border-l border-[rgba(255,255,255,0.08)] pl-6 space-y-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {FACTS.map((f) => (
              <div key={f.label}>
                <dt className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)] opacity-70 mb-1">
                  {f.label}
                </dt>
                <dd className="text-sm md:text-base text-[var(--text-primary)] leading-snug">
                  {f.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  )
}
