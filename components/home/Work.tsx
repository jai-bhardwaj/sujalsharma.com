'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PROJECTS, type Project } from '@/lib/constants'

function ProjectCase({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="rule-t pt-10 md:pt-16 pb-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
        {/* Left meta column */}
        <div className="flex flex-col gap-3">
          <div className="label">
            © <span className="tracking-[0.2em] ml-1">{project.title.toUpperCase()}</span>
          </div>
          <div
            className="text-[12px] tracking-[0.12em] uppercase text-[var(--ink-muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {project.lang} · {project.status} · {project.lastCommit}
          </div>
          <div className="flex gap-4 mt-1">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-ink text-[13px]"
              >
                Source →
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="link-ink text-[13px]"
              >
                Live →
              </a>
            )}
            {project.featured && (
              <Link href="/race" className="link-ink text-[13px]">
                Race it →
              </Link>
            )}
          </div>
        </div>

        {/* Right content column */}
        <div>
          <h3
            className="display mb-5 text-[var(--ink)]"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)' }}
          >
            {project.title}
          </h3>
          <p className="text-[17px] md:text-[18px] leading-[1.55] text-[var(--ink-muted)] max-w-[60ch] mb-8">
            {project.longDescription}
          </p>

          {/* Project "image" — a composed editorial block that suggests the
              project without requiring a real screenshot. Different per slot. */}
          <ProjectArt project={project} />

          {project.metrics && (
            <dl className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 rule-t pt-6">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dt
                    className="text-[10px] tracking-[0.16em] uppercase text-[var(--ink-muted)] mb-1"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {m.label}
                  </dt>
                  <dd
                    className="text-[18px] md:text-[22px] text-[var(--ink)] tab"
                    style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
                  >
                    {m.target}
                  </dd>
                  {m.note && (
                    <dd
                      className="text-[10px] tracking-[0.12em] uppercase text-[var(--ink-dim)] mt-0.5"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {m.note}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          )}

          <div
            className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-[var(--ink-muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {project.technologies.map((tech, i) => (
              <span key={tech}>
                {tech}
                {i < project.technologies.length - 1 ? ' ·' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function ProjectArt({ project }: { project: Project }) {
  // Editorial visual blocks in place of screenshots. Pure CSS/SVG.
  if (project.id === 'mach-zero') {
    return (
      <div
        className="relative h-[240px] md:h-[320px] w-full rounded-sm overflow-hidden race-surface"
        style={{ background: '#0B0F14' }}
      >
        <svg
          viewBox="0 0 800 320"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Grid */}
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 50}
              y1={0}
              x2={i * 50}
              y2={320}
              stroke="rgba(230,237,243,0.05)"
              strokeWidth={1}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={i * 40}
              x2={800}
              y2={i * 40}
              stroke="rgba(230,237,243,0.05)"
              strokeWidth={1}
            />
          ))}
          {/* Fake candlesticks */}
          {Array.from({ length: 28 }).map((_, i) => {
            const x = i * 28 + 14
            const up = Math.sin(i * 0.8) > 0
            const mid = 160 + Math.sin(i * 0.4) * 60
            const high = mid - 20 - Math.random() * 30
            const low = mid + 20 + Math.random() * 30
            const openY = up ? mid + 8 : mid - 8
            const closeY = up ? mid - 8 : mid + 8
            const color = up ? '#22C55E' : '#EF4444'
            return (
              <g key={i} opacity={0.85}>
                <line
                  x1={x}
                  y1={high}
                  x2={x}
                  y2={low}
                  stroke={color}
                  strokeWidth={1}
                />
                <rect
                  x={x - 5}
                  y={Math.min(openY, closeY)}
                  width={10}
                  height={Math.abs(openY - closeY)}
                  fill={color}
                />
              </g>
            )
          })}
        </svg>
        <div
          className="absolute left-4 top-4 text-[10px] tracking-[0.18em] uppercase text-[rgba(230,237,243,0.7)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          MACH-0 · BTC/USDT · replay
        </div>
        <div
          className="absolute right-4 bottom-4 text-[10px] tracking-[0.18em] uppercase text-[rgba(230,237,243,0.55)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          p50 &lt; 1μs · target
        </div>
      </div>
    )
  }

  // TCP Engine — network node diagram
  return (
    <div
      className="relative h-[240px] md:h-[280px] w-full rounded-sm overflow-hidden race-surface"
      style={{ background: '#0B0F14' }}
    >
      <svg
        viewBox="0 0 800 280"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="node-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E6EDF3" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E6EDF3" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Connection lines */}
        {[
          [100, 80, 400, 140],
          [100, 180, 400, 140],
          [400, 140, 700, 80],
          [400, 140, 700, 180],
          [100, 80, 700, 80],
          [100, 180, 700, 180],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(230,237,243,0.18)"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        ))}
        {/* Nodes */}
        {[
          [100, 80],
          [100, 180],
          [400, 140],
          [700, 80],
          [700, 180],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={26} fill="url(#node-g)" />
            <circle
              cx={cx}
              cy={cy}
              r={7}
              fill="#E6EDF3"
            />
          </g>
        ))}
      </svg>
      <div
        className="absolute left-4 top-4 text-[10px] tracking-[0.18em] uppercase text-[rgba(230,237,243,0.7)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        TCP-1 · io_uring · zero-copy
      </div>
      <div
        className="absolute right-4 bottom-4 text-[10px] tracking-[0.18em] uppercase text-[rgba(230,237,243,0.55)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        1M+ msg/s · target
      </div>
    </div>
  )
}

export default function Work() {
  return (
    <section id="work" className="px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex items-baseline justify-between gap-6 mb-8 md:mb-12"
        >
          <h2 className="label">Selected Work — {PROJECTS.length} pieces</h2>
          <Link href="/race" className="link-ink text-[13px]">
            Race the engine →
          </Link>
        </motion.div>

        {PROJECTS.map((project, i) => (
          <ProjectCase key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
