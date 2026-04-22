'use client'

import Tile from './Tile'
import type { Project } from '@/lib/constants'

type Props = {
  project: Project
  label: string
  className?: string
  delay?: number
}

export default function ProjectTile({ project, label, className, delay }: Props) {
  const href = project.links.github ?? '#'
  return (
    <Tile label={label} href={href} className={className} delay={delay}>
      <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-9">
        <div />

        <div>
          <h3
            className="display text-[var(--ink)] mb-3"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              letterSpacing: '-0.025em',
            }}
          >
            {project.title}
          </h3>
          <p className="text-[14px] md:text-[15px] leading-[1.55] text-[var(--ink-muted)] max-w-[38ch] mb-6">
            {project.description}
          </p>
          <div className="flex items-center justify-between">
            <div
              className="text-[11px] tracking-[0.12em] uppercase text-[var(--ink-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {project.lang} · {project.status} · {project.lastCommit}
            </div>
            <span className="text-[15px] text-[var(--ink)] group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </div>
    </Tile>
  )
}
