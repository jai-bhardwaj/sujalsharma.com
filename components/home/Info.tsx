'use client'

import { motion } from 'framer-motion'
import { PERSON } from '@/lib/constants'

export default function Info() {
  return (
    <section id="about" className="px-6 md:px-10 py-16 md:py-28">
      <div className="max-w-[1080px] mx-auto">
        <h2
          className="text-[13px] tracking-[0.12em] uppercase text-[var(--ink-muted)] mb-10"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          About
        </h2>

        <div className="max-w-[64ch] space-y-6 text-[17px] md:text-[19px] leading-[1.6] text-[var(--ink-muted)]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
          >
            <span className="text-[var(--ink)]">I&apos;m Sujal.</span> I write
            code that has to hit tight budgets — latency, memory, cost. Most
            of what I build sits somewhere between a web app and a runtime,
            and the parts I like most are the ones where you can watch a
            system think.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            At{' '}
            <a
              href={PERSON.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink text-[var(--ink)]"
            >
              Orbital
            </a>{' '}
            I ship the sales-intelligence layer the SMB world never got.
            Alongside that I&apos;m building Mach-Zero, a C++20 match engine,
            alone — because the only way I know how to learn low-latency
            systems is by building them myself.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="italic text-[var(--ink-dim)]"
          >
            [ Sujal: replace this paragraph with the truest version of what
            you actually do day-to-day. Specific beats general. ]
          </motion.p>
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10 max-w-[720px] text-[14px]"
        >
          <Row label="Based in" value={PERSON.location} />
          <Row label="Role" value={`Software engineer · ${PERSON.years}y`} />
          <Row label="Stack" value={PERSON.stack.slice(0, 5).join(', ')} />
          <Row
            label="Education"
            value={`${PERSON.education.degree}, ${PERSON.education.schoolShort} (${PERSON.education.years.split('–')[1]})`}
          />
          <Row label="Status" value={PERSON.availability} />
        </motion.dl>
      </div>
    </section>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt
        className="text-[11px] tracking-[0.12em] uppercase text-[var(--ink-muted)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </dt>
      <dd className="text-[15px] text-[var(--ink)]">{value}</dd>
    </div>
  )
}
