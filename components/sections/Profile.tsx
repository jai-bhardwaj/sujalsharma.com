'use client'

import { motion } from 'framer-motion'
import { PERSON, SOCIAL_LINKS } from '@/lib/constants'

const ROWS: { label: string; node: React.ReactNode }[] = [
  {
    label: 'now',
    node: (
      <>
        software engineer @{' '}
        <a
          href={PERSON.companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00E5FF] hover:text-[var(--text-primary)] transition-colors"
        >
          {PERSON.company}
        </a>{' '}
        · {PERSON.years} yrs
      </>
    ),
  },
  {
    label: 'location',
    node: `${PERSON.location} · ${PERSON.workMode}`,
  },
  {
    label: 'focus',
    node: PERSON.focus,
  },
  {
    label: 'stack',
    node: PERSON.stack.join(' · '),
  },
  {
    label: 'education',
    node: `${PERSON.education.degree} · ${PERSON.education.school} (${PERSON.education.years})`,
  },
]

export default function Profile() {
  return (
    <section
      id="profile"
      className="relative py-16 md:py-24 px-6 md:px-12 lg:px-16"
    >
      <div
        className="max-w-5xl mx-auto"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {/* Shell prompt */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-[13px] mb-5"
        >
          <span className="text-[#00FF94] opacity-80">sujal@mach-zero</span>
          <span className="text-[var(--text-secondary)]">:</span>
          <span className="text-[#FF2E92] opacity-80">~</span>
          <span className="text-[var(--text-secondary)] pr-1">$</span>
          <span className="text-[var(--text-primary)]">whoami --long</span>
        </motion.div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-md border border-[rgba(0,229,255,0.18)] bg-[rgba(10,14,19,0.72)] backdrop-blur-sm overflow-hidden"
        >
          {/* Header */}
          <header className="flex flex-wrap items-center justify-between gap-3 px-5 md:px-7 py-3 border-b border-[rgba(0,229,255,0.1)] bg-[rgba(0,229,255,0.025)]">
            <div className="text-[11px] text-[var(--text-secondary)]">
              <span className="opacity-60">handle:</span>{' '}
              <span className="text-[#00E5FF]">~/{PERSON.handle}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[#00FF94]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
              {PERSON.availability}
            </div>
          </header>

          {/* Body */}
          <div className="p-6 md:p-9 space-y-7">
            {/* Name + role — sans serif, loud */}
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-1.5"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {PERSON.full}
              </h2>
              <div className="text-sm md:text-base text-[var(--text-secondary)]">
                {PERSON.role} · {PERSON.years} yrs · based in {PERSON.location.split(',')[0]}
              </div>
            </div>

            {/* Info rows */}
            <div className="space-y-2.5 text-sm">
              {ROWS.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] items-baseline gap-4"
                >
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)] opacity-70">
                    {row.label}
                  </span>
                  <span className="text-[var(--text-primary)] leading-relaxed">
                    {row.node}
                  </span>
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-5 pt-3 border-t border-[rgba(255,255,255,0.06)] text-[11px] tracking-[0.25em] uppercase">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00E5FF] hover:text-[var(--text-primary)] transition-colors"
              >
                [ linkedin → ]
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00E5FF] hover:text-[var(--text-primary)] transition-colors"
              >
                [ github → ]
              </a>
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="text-[#00E5FF] hover:text-[var(--text-primary)] transition-colors normal-case tracking-normal"
              >
                [ {SOCIAL_LINKS.email} ]
              </a>
              <a
                href="#contact"
                className="text-[#FF6B35] hover:text-[var(--text-primary)] transition-colors"
              >
                [ hire me → ]
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
