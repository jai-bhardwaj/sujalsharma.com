'use client'

import { useEffect, useState } from 'react'
import Panel from '@/components/terminal/Panel'
import KV from '@/components/terminal/KV'
import { PERSON, PROJECTS } from '@/lib/constants'

function useTenure(startISO: string) {
  const [display, setDisplay] = useState<string>('—')
  useEffect(() => {
    const update = () => {
      const now = Date.now()
      const start = new Date(startISO).getTime()
      const diff = Math.max(0, now - start)
      const totalDays = Math.floor(diff / (24 * 3600 * 1000))
      const years = Math.floor(totalDays / 365)
      const remAfterYears = totalDays - years * 365
      const months = Math.floor(remAfterYears / 30)
      const days = remAfterYears - months * 30
      setDisplay(
        `${years}Y ${String(months).padStart(2, '0')}M ${String(days).padStart(2, '0')}D`,
      )
    }
    update()
    const id = window.setInterval(update, 60_000)
    return () => window.clearInterval(id)
  }, [startISO])
  return display
}

const QUICK_FACTS: { value: string; label: string }[] = [
  { value: `${PERSON.years}Y`, label: 'at orbital' },
  { value: String(PROJECTS.length), label: 'oss builds' },
  { value: '~18k', label: 'loc c++' },
  { value: '<1μs', label: 'mach-0 p50' },
]

export default function NowPanel() {
  const tenure = useTenure(PERSON.orbitalStartDate)

  return (
    <Panel
      symbol={PERSON.level}
      title="NOW"
      meta={
        <span className="label flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--up)] pulse" />
          {PERSON.availability}
        </span>
      }
    >
      <div className="max-w-4xl space-y-10">
        {/* Hero line — name + role */}
        <div>
          <h1
            className="font-semibold tracking-tight"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
            }}
          >
            {PERSON.full}
          </h1>
          <p
            className="mt-3 text-[var(--dim)]"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}
          >
            {PERSON.role} · {PERSON.company} · {PERSON.location.split(',')[0]}{' '}
            · {PERSON.workMode}
          </p>
        </div>

        {/* Detail table */}
        <dl>
          <KV label="employer">
            <a
              href={PERSON.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] transition-colors underline decoration-[var(--rule)] underline-offset-4"
            >
              {PERSON.company}
            </a>{' '}
            <span className="text-[var(--dim)]">· {PERSON.companyBlurb}</span>
          </KV>
          <KV label="role">software engineer</KV>
          <KV label="tenure" accent>
            <span className="tab" style={{ fontFamily: 'var(--font-mono)' }}>
              {tenure}
            </span>
          </KV>
          <KV label="location">
            {PERSON.location} · {PERSON.workMode}
          </KV>
          <KV label="stack">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              {PERSON.stack.join(' · ')}
            </span>
          </KV>
          <KV label="education">
            {PERSON.education.degree} ·{' '}
            <span className="text-[var(--dim)]">
              {PERSON.education.schoolShort} ·{' '}
              {PERSON.education.years.split('–')[1]}
            </span>
          </KV>
          <KV label="hire status">
            <span className="text-[var(--up)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--up)] pulse" />
              {PERSON.availability}
            </span>
          </KV>
        </dl>

        {/* Quick facts */}
        <div>
          <h2 className="label mb-3">quick facts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[var(--rule)]">
            {QUICK_FACTS.map((f, i) => (
              <div
                key={f.label}
                className={`p-4 ${
                  i > 0 ? 'md:border-l border-[var(--rule)]' : ''
                } ${i % 2 === 1 ? 'border-l md:border-l border-[var(--rule)]' : ''} ${
                  i < 2 ? 'border-b md:border-b-0 border-[var(--rule)]' : ''
                }`}
              >
                <div
                  className="text-[var(--fg)] tab"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 500,
                  }}
                >
                  {f.value}
                </div>
                <div className="label mt-1">{f.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Orbital blurb */}
        <div>
          <h2 className="label mb-3">what i ship at orbital</h2>
          <p
            className="text-[15px] leading-[1.65] max-w-2xl"
            style={{ color: 'var(--fg)' }}
          >
            {PERSON.orbitalBlurb}
          </p>
        </div>
      </div>
    </Panel>
  )
}
