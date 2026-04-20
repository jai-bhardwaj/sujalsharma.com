'use client'

import type { ReactNode } from 'react'

export type Column<T> = {
  key: string
  label: string
  width?: string
  align?: 'left' | 'right'
  render: (row: T) => ReactNode
}

type Props<T> = {
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T) => string
  activeKey?: string
  onRowClick?: (row: T) => void
}

export default function DataTable<T>({
  columns,
  rows,
  rowKey,
  activeKey,
  onRowClick,
}: Props<T>) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className="w-full border-collapse text-[13px]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className="text-left label py-2 px-3 rule-b whitespace-nowrap"
                style={{
                  width: c.width,
                  textAlign: c.align ?? 'left',
                }}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const k = rowKey(row)
            const isActive = k === activeKey
            return (
              <tr
                key={k}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={`transition-colors ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
                style={{
                  background: isActive
                    ? 'rgba(245, 165, 36, 0.08)'
                    : 'transparent',
                }}
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className="py-3 px-3 rule-b tab"
                    style={{
                      textAlign: c.align ?? 'left',
                      color: 'var(--fg)',
                    }}
                  >
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
