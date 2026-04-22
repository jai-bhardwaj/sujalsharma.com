'use client'

import Tile from './Tile'
import { PERSON } from '@/lib/constants'

export default function AboutTile({ className, delay }: { className?: string; delay?: number }) {
  return (
    <Tile label="SS · 05" className={className} delay={delay}>
      <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-9">
        <p className="text-[15px] md:text-[17px] leading-[1.55] text-[var(--ink-muted)] max-w-[46ch]">
          <span className="text-[var(--ink)]">I like code that hits tight budgets</span>{' '}
          — latency, memory, cost. At{' '}
          <a
            href={PERSON.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-ink text-[var(--ink)]"
            onClick={(e) => e.stopPropagation()}
          >
            Orbital
          </a>{' '}
          I ship the sales-intelligence layer the SMB world never got. Alongside
          that I&apos;m building Mach-Zero, a C++ match engine, alone — because
          the only way I know how to learn low-latency systems is by building
          them myself.
        </p>
        <div
          className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] tracking-[0.1em] uppercase text-[var(--ink-muted)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span>{PERSON.education.degree}</span>
          <span className="opacity-40">/</span>
          <span>{PERSON.education.schoolShort} · {PERSON.education.years.split('–')[1]}</span>
          <span className="opacity-40">/</span>
          <span>{PERSON.stack.slice(0, 4).join(' · ')}</span>
        </div>
      </div>
    </Tile>
  )
}
