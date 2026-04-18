'use client'

import { motion } from 'framer-motion'
import { PROJECTS, type Project, type ProjectBar } from '@/lib/constants'
import { useUptime } from '@/hooks/useUptime'
import Ticker from './Ticker'

const TONE: Record<NonNullable<ProjectBar['tone']>, string> = {
  cyan: '#00E5FF',
  green: '#00FF94',
  orange: '#FF6B35',
  magenta: '#FF2E92',
}

function Prompt({ command, delay = 0 }: { command: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      className="flex items-center gap-2 text-[13px]"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <span className="text-[#00FF94] opacity-80">sujal@mach-zero</span>
      <span className="text-[var(--text-secondary)]">:</span>
      <span className="text-[#FF2E92] opacity-80">~</span>
      <span className="text-[var(--text-secondary)] pr-1">$</span>
      <span className="text-[var(--text-primary)]">{command}</span>
    </motion.div>
  )
}

function Bar({ bar, delay = 0 }: { bar: ProjectBar; delay?: number }) {
  const color = TONE[bar.tone ?? 'cyan']
  return (
    <div
      className="grid grid-cols-[140px_1fr_auto] items-center gap-4 text-xs"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <span className="text-[var(--text-secondary)]">{bar.label}</span>
      <div className="relative h-[6px] rounded-sm bg-[rgba(255,255,255,0.05)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${bar.fill}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay }}
          className="absolute inset-y-0 left-0"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 12px ${color}55`,
          }}
        />
      </div>
      <span className="font-semibold tabular-nums" style={{ color }}>
        {bar.value}
      </span>
    </div>
  )
}

function TerminalPanel({ project, index }: { project: Project; index: number }) {
  const uptime = useUptime(project.startedAt)

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-md border border-[rgba(0,229,255,0.15)] bg-[rgba(10,14,19,0.72)] backdrop-blur-sm overflow-hidden"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      {/* Header bar */}
      <header className="flex flex-wrap items-center justify-between gap-3 px-5 md:px-7 py-3 border-b border-[rgba(0,229,255,0.1)] bg-[rgba(0,229,255,0.025)]">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-[var(--text-secondary)]">
          <span>
            <span className="text-[var(--text-secondary)] opacity-60">proc:</span>{' '}
            <span className="text-[#00E5FF]">{project.proc}</span>
          </span>
          <span>
            <span className="opacity-60">pid:</span>{' '}
            <span className="text-[var(--text-primary)] tabular-nums">{project.pid}</span>
          </span>
          <span>
            <span className="opacity-60">uptime:</span>{' '}
            <span className="text-[var(--text-primary)] tabular-nums">
              {uptime ?? '—'}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[#00FF94]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
          running
        </div>
      </header>

      {/* Body */}
      <div className="p-5 md:p-7 space-y-8">
        {/* Title block */}
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#00E5FF] mb-3">
            {project.kicker}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <div>
          <Prompt command="cat ./README.md" />
          <p className="mt-3 pl-2 text-sm md:text-base leading-relaxed text-[var(--text-secondary)]">
            {project.longDescription}
          </p>
        </div>

        {/* Bars */}
        {project.bars && project.bars.length > 0 && (
          <div>
            <Prompt command="stats --live" />
            <div className="mt-4 pl-2 space-y-3">
              {project.bars.map((b, i) => (
                <Bar key={b.label} bar={b} delay={0.1 + i * 0.08} />
              ))}
            </div>
          </div>
        )}

        {/* Info table */}
        {project.info && (
          <div>
            <Prompt command="cat ./stack.txt" />
            <div className="mt-3 pl-2 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1.5 text-xs">
              {Object.entries(project.info).map(([k, v]) => (
                <div key={k} className="flex items-baseline gap-2">
                  <span className="text-[var(--text-secondary)] opacity-60">{k}:</span>
                  <span className="text-[var(--text-primary)]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech tags */}
        <div>
          <Prompt command="ls --tags" />
          <div className="mt-3 pl-2 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[10px] px-2 py-1 rounded border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] text-[var(--text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-5 pt-1 text-[11px] tracking-[0.25em] uppercase">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00E5FF] hover:text-[var(--text-primary)] transition-colors"
            >
              [ source → ]
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6B35] hover:text-[var(--text-primary)] transition-colors"
            >
              [ live → ]
            </a>
          )}
        </div>
      </div>
    </motion.section>
  )
}

export default function Projects() {
  return (
    <>
      <Ticker />
      <section
        id="projects"
        className="relative py-28 md:py-40 px-6 md:px-12 lg:px-16"
        style={{ contentVisibility: 'auto', containIntrinsicSize: '1600px' }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 md:mb-16 max-w-3xl"
          >
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-[#00E5FF] mb-4 block"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              // deployed strategies
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight leading-[1.1]">
              The engine you just raced is real.
            </h2>
            <p className="mt-4 text-sm md:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl">
              Running in production. Measured in nanoseconds. Below is the <code className="text-[#00E5FF]" style={{ fontFamily: 'var(--font-mono)' }}>ps</code> output.
            </p>
          </motion.div>

          {/* Terminal output */}
          <div className="space-y-8 md:space-y-10">
            <Prompt command="ps -ef | grep --color -E 'running'" />

            {PROJECTS.map((project, i) => (
              <div key={project.id} className="space-y-4 md:space-y-5">
                {i > 0 && (
                  <Prompt
                    command={`systemctl status ${project.proc}`}
                    delay={0.1}
                  />
                )}
                <TerminalPanel project={project} index={i} />
              </div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center gap-2 text-[13px]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span className="text-[#00FF94] opacity-80">sujal@mach-zero</span>
              <span className="text-[var(--text-secondary)]">:</span>
              <span className="text-[#FF2E92] opacity-80">~</span>
              <span className="text-[var(--text-secondary)] pr-1">$</span>
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.1, repeat: Infinity }}
                className="inline-block w-2 h-[15px] bg-[var(--text-primary)]"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
