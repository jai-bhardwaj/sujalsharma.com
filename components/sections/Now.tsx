'use client'

import { motion } from 'framer-motion'
import { PERSON } from '@/lib/constants'

const FACTS = [
  { label: 'role', value: 'software engineer' },
  { label: 'tenure', value: `${PERSON.years} yrs` },
  { label: 'where', value: `${PERSON.location} · ${PERSON.workMode}` },
  { label: 'stack', value: PERSON.stack.slice(0, 5).join(' · ') },
  {
    label: 'edu',
    value: `${PERSON.education.degree} · ${PERSON.education.school.replace(
      'Dr. A.P.J. ',
      '',
    )} (${PERSON.education.years.split('–')[1]})`,
  },
]

export default function Now() {
  return (
    <section
      id="now"
      className="relative overflow-hidden py-28 md:py-40 px-6 md:px-12 lg:px-20"
      style={{ background: 'var(--blue)', color: 'var(--cream)' }}
    >
      {/* Big decoration */}
      <div
        className="absolute -right-24 -top-24 rounded-full opacity-90"
        style={{
          width: 'clamp(280px, 38vw, 560px)',
          height: 'clamp(280px, 38vw, 560px)',
          background: 'var(--lime)',
        }}
        aria-hidden
      />
      <div
        className="absolute -left-24 bottom-[8%] opacity-90"
        style={{
          width: 'clamp(120px, 16vw, 240px)',
          height: 'clamp(120px, 16vw, 240px)',
          background: 'var(--pink)',
          borderRadius: '50%',
        }}
        aria-hidden
      />
      <div className="noise-overlay" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[0.4em] uppercase mb-6 flex items-center gap-3"
          style={{ fontFamily: 'var(--font-mono)', color: 'rgba(250,246,236,0.7)' }}
        >
          <span className="w-10 h-px bg-[var(--cream)] opacity-50" />
          chapter 01 · now
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-bold tracking-tight leading-[0.9] mb-12 md:mb-16"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 9vw, 7.5rem)',
            letterSpacing: '-0.03em',
          }}
        >
          Currently at{' '}
          <a
            href={PERSON.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block"
            style={{ color: 'var(--lime)' }}
          >
            Orbital.
            <span
              className="absolute left-0 right-0"
              style={{
                bottom: '0.04em',
                height: '0.07em',
                background: 'var(--cream)',
                opacity: 0.9,
              }}
              aria-hidden
            />
          </a>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 md:gap-14 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 text-lg md:text-2xl leading-[1.45] max-w-2xl font-medium"
            style={{ color: 'rgba(250,246,236,0.92)' }}
          >
            <p>
              Orbital is an AI sales-intelligence platform for SMBs — the piece
              that&apos;s been missing from the enterprise tooling stack (think
              ZoomInfo, but for HVAC, restaurants, dental practices, gyms).
            </p>
            <p>
              I ship things that prospect, enrich, and verify data at scale.
              The problems are a mix of backend throughput, messy real-world
              data, and turning it into something a sales rep can actually use.
            </p>
            <p
              className="text-base md:text-lg opacity-70 italic"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              [ Sujal: swap this paragraph for specifics — what you shipped
              this quarter, team size, tech you touch day-to-day. ]
            </p>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="space-y-5"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {FACTS.map((f) => (
              <div
                key={f.label}
                className="pl-5 border-l-2"
                style={{ borderColor: 'var(--lime)' }}
              >
                <dt
                  className="text-[10px] tracking-[0.3em] uppercase mb-1"
                  style={{ color: 'rgba(250,246,236,0.6)' }}
                >
                  {f.label}
                </dt>
                <dd className="text-sm md:text-base leading-snug font-medium">
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
