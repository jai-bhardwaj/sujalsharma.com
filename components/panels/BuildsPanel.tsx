'use client'

import { useState } from 'react'
import Panel from '@/components/terminal/Panel'
import DataTable, { type Column } from '@/components/terminal/DataTable'
import { PROJECTS, type Project } from '@/lib/constants'

const COLUMNS: Column<Project>[] = [
  {
    key: 'ticker',
    label: 'ticker',
    width: '90px',
    render: (p) => <span className="text-[var(--accent)]">{p.ticker}</span>,
  },
  {
    key: 'title',
    label: 'name',
    render: (p) => <span className="text-[var(--fg)]">{p.title}</span>,
  },
  {
    key: 'lang',
    label: 'lang',
    width: '80px',
    render: (p) => <span className="text-[var(--dim)]">{p.lang}</span>,
  },
  {
    key: 'status',
    label: 'status',
    width: '80px',
    render: (p) => <span className="text-[var(--up)]">{p.status}</span>,
  },
  {
    key: 'lastCommit',
    label: 'last commit',
    width: '100px',
    render: (p) => <span className="text-[var(--dim)]">{p.lastCommit}</span>,
  },
  {
    key: 'links',
    label: 'links',
    width: '110px',
    align: 'right',
    render: (p) => (
      <span className="flex gap-2 justify-end">
        {p.links.github && (
          <a
            href={p.links.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[var(--accent)] hover:underline"
          >
            [GH]
          </a>
        )}
        {p.links.demo && (
          <a
            href={p.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[var(--accent)] hover:underline"
          >
            [DEMO]
          </a>
        )}
      </span>
    ),
  },
]

export default function BuildsPanel() {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0]?.id ?? '')
  const active = PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0]

  return (
    <Panel
      symbol={`${PROJECTS.length} BUILDS`}
      title="BUILDS"
      meta={
        <span className="label">oss · side projects</span>
      }
    >
      <div className="space-y-10">
        <DataTable<Project>
          columns={COLUMNS}
          rows={PROJECTS}
          rowKey={(p) => p.id}
          activeKey={active?.id}
          onRowClick={(p) => setActiveId(p.id)}
        />

        {active && (
          <div className="max-w-3xl">
            <div className="flex items-baseline gap-4 mb-3">
              <span
                className="text-[var(--accent)]"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}
              >
                {active.ticker}
              </span>
              <h3
                className="font-semibold tracking-tight"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                {active.title}
              </h3>
            </div>

            <p className="text-[15px] leading-[1.65] text-[var(--fg)] mb-8">
              {active.longDescription}
            </p>

            {active.metrics && active.metrics.length > 0 && (
              <div className="mb-8">
                <h4 className="label mb-2">performance targets</h4>
                <table
                  className="w-full border-collapse text-[13px]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <tbody>
                    {active.metrics.map((m) => (
                      <tr key={m.label} className="rule-b">
                        <td className="py-2 text-[var(--dim)] pr-6 whitespace-nowrap">
                          {m.label}
                        </td>
                        <td className="py-2 tab text-[var(--fg)]">{m.target}</td>
                        <td className="py-2 pl-4 text-[var(--dim)] text-right">
                          {m.note ?? ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div>
              <h4 className="label mb-2">stack</h4>
              <p
                className="text-[13px] text-[var(--dim)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {active.technologies.join(', ')}
              </p>
            </div>
          </div>
        )}
      </div>
    </Panel>
  )
}
