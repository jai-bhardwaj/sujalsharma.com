'use client'

import { motion } from 'framer-motion'
import { PERSON } from '@/lib/constants'

const APPROACH = [
  {
    label: '01',
    title: 'Ship the thing.',
    body: 'The best version of a project is the one that\u2019s live. I\u2019d rather get something in front of people and iterate from reality than polish a plan.',
  },
  {
    label: '02',
    title: 'Numbers over vibes.',
    body: 'If it can be measured, measure it. Latency, throughput, error rates, cost per request — decisions get clearer when the budget is on the wall.',
  },
  {
    label: '03',
    title: 'Depth where it matters.',
    body: 'Fluency across the stack, but I go deep where the interesting problems live — usually somewhere between the language runtime and the operating system.',
  },
]

const FACTS = [
  {
    label: 'now',
    value: `Software engineer @ ${PERSON.company}`,
    note: `${PERSON.years}Y · onsite Hyderabad`,
  },
  {
    label: 'stack',
    value: PERSON.stack.slice(0, 4).join(' · '),
    note: PERSON.stack.slice(4).join(' · '),
  },
  {
    label: 'focus',
    value: PERSON.focus,
  },
  {
    label: 'education',
    value: PERSON.education.degree,
    note: `${PERSON.education.schoolShort} · ${PERSON.education.years.split('–')[1]}`,
  },
  {
    label: 'status',
    value: PERSON.availability,
    note: 'say hi →',
  },
]

export default function Info() {
  return (
    <section id="info" className="px-5 md:px-10 py-16 md:py-28 rule-t">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-20">
        {/* Left column — label + giant name */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="label mb-6">Info</h2>
          <p
            className="display text-[var(--ink)]"
            style={{ fontSize: 'clamp(2.25rem, 6vw, 4.25rem)' }}
          >
            A creative
            <br />
            partner for
            <br />
            fast teams.
          </p>
        </motion.div>

        {/* Right column — content */}
        <div className="space-y-14 md:space-y-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-[17px] md:text-[19px] leading-[1.6] text-[var(--ink-muted)] max-w-[58ch]"
          >
            <p>
              <span className="text-[var(--ink)]">Hi, I&apos;m {PERSON.full}.</span>{' '}
              I write code that has to hit tight budgets — latency, memory,
              cost. Most of what I build lives somewhere between a web app and
              a runtime, and the bits I like most are the ones where you can
              see the system think.
            </p>
            <p>
              Currently at{' '}
              <a
                href={PERSON.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-ink text-[var(--ink)]"
              >
                Orbital
              </a>
              , shipping the sales-intelligence layer the SMB world never got.
              On the side,{' '}
              <a
                href="#work"
                className="link-ink text-[var(--ink)]"
              >
                Mach-Zero
              </a>{' '}
              — a C++20 match engine I&apos;m building alone to learn
              low-latency systems from the ground up.
            </p>
            <p className="italic text-[var(--ink-dim)]">
              [ Sujal: replace this paragraph with something true to how you
              actually spend your week. Specifics beat polish. ]
            </p>
          </motion.div>

          {/* Approach */}
          <div>
            <h3 className="label mb-6">Approach</h3>
            <div className="space-y-8 md:space-y-10">
              {APPROACH.map((a, i) => (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="grid grid-cols-[auto_1fr] gap-6 rule-t pt-6"
                >
                  <div
                    className="text-[11px] tracking-[0.18em] text-[var(--ink-muted)]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {a.label}
                  </div>
                  <div>
                    <h4
                      className="display text-[var(--ink)] mb-2"
                      style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.75rem)' }}
                    >
                      {a.title}
                    </h4>
                    <p className="text-[16px] leading-[1.6] text-[var(--ink-muted)] max-w-[54ch]">
                      {a.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Facts */}
          <div>
            <h3 className="label mb-6">At a glance</h3>
            <dl className="divide-y divide-[var(--rule)] rule-t border-b border-[var(--rule)]">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="grid grid-cols-[90px_1fr] md:grid-cols-[140px_1fr_auto] gap-4 md:gap-8 py-4 items-baseline"
                >
                  <dt className="label text-[var(--ink-dim)]">{f.label}</dt>
                  <dd className="text-[15px] md:text-[16px] text-[var(--ink)]">
                    {f.value}
                  </dd>
                  {f.note && (
                    <dd
                      className="text-[11px] tracking-[0.12em] uppercase text-[var(--ink-muted)] text-right col-span-2 md:col-span-1"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {f.note}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
