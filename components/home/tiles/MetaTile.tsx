'use client'

import { useEffect, useState } from 'react'
import Tile from './Tile'
import { PERSON } from '@/lib/constants'

function time(d: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

export default function MetaTile() {
  const [t, setT] = useState('')
  useEffect(() => {
    const tick = () => setT(time(new Date()))
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <Tile
      label="SS · 02"
      className="md:col-span-4 md:row-span-2 min-h-[280px] md:min-h-0"
      delay={0.05}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-9">
        <div />

        <div className="space-y-7">
          <Row label="Now" value={`${PERSON.role}`} sub={`${PERSON.company} · ${PERSON.years}y`} />
          <Row label="Where" value={PERSON.location} sub={PERSON.workMode} />
          <Row
            label="Local time"
            value={t || '—'}
            sub="IST · Asia/Kolkata"
            mono
          />
          <Row
            label="Status"
            value="● open to opportunities"
            sub="talk to me"
            accent
          />
        </div>
      </div>
    </Tile>
  )
}

function Row({
  label,
  value,
  sub,
  mono,
  accent,
}: {
  label: string
  value: string
  sub?: string
  mono?: boolean
  accent?: boolean
}) {
  return (
    <div>
      <div className="label mb-1.5">{label}</div>
      <div
        className={`text-[17px] md:text-[19px] leading-[1.25] ${accent ? 'text-[var(--ink)]' : 'text-[var(--ink)]'}`}
        style={{
          fontFamily: mono ? 'var(--font-mono)' : 'var(--font-display)',
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          className="text-[11px] mt-1 tracking-[0.08em] uppercase text-[var(--ink-muted)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {sub}
        </div>
      )}
    </div>
  )
}
