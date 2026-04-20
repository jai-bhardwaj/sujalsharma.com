'use client'

import { motion } from 'framer-motion'
import { PROJECTS, type Project } from '@/lib/constants'

const CARD_PALETTE = [
  { bg: 'var(--purple)', fg: 'var(--cream)', accent: 'var(--lime)' },
  { bg: 'var(--orange)', fg: 'var(--ink)', accent: 'var(--blue)' },
  { bg: 'var(--cyan)', fg: 'var(--ink)', accent: 'var(--pink)' },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const theme = CARD_PALETTE[index % CARD_PALETTE.length]
  const num = String(index + 1).padStart(2, '0')
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="relative rounded-3xl overflow-hidden p-7 md:p-10 lg:p-12"
      style={{
        background: theme.bg,
        color: theme.fg,
        minHeight: 'clamp(360px, 45vh, 520px)',
      }}
    >
      {/* Shape decoration */}
      <div
        className="absolute -top-16 -right-16 rounded-full"
        style={{
          width: 'clamp(140px, 18vw, 240px)',
          height: 'clamp(140px, 18vw, 240px)',
          background: theme.accent,
          opacity: 0.8,
        }}
        aria-hidden
      />

      <div className="relative flex flex-col h-full">
        <div
          className="flex items-baseline justify-between mb-6 text-[11px] tracking-[0.35em] uppercase"
          style={{ fontFamily: 'var(--font-mono)', opacity: 0.7 }}
        >
          <span>/{num}</span>
          {project.featured && (
            <a
              href="#race"
              className="px-3 py-1 rounded-full border"
              style={{ borderColor: 'currentColor', opacity: 0.85 }}
            >
              ↑ race it
            </a>
          )}
        </div>

        <h3
          className="font-bold tracking-tight leading-[0.95] mb-5"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            letterSpacing: '-0.03em',
          }}
        >
          {project.title}
        </h3>

        <p
          className="text-base md:text-lg leading-[1.55] max-w-2xl mb-8 font-medium"
          style={{ opacity: 0.88 }}
        >
          {project.longDescription}
        </p>

        <div
          className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-4 border-t border-current/20"
        >
          <div
            className="text-[11px] tracking-[0.2em] uppercase opacity-70 max-w-[70%]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {project.technologies.slice(0, 5).join(' · ')}
          </div>
          <div className="flex gap-5 text-[11px] tracking-[0.25em] uppercase font-semibold">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:translate-x-0.5 transition-transform"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                source →
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:translate-x-0.5 transition-transform"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                live →
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden py-28 md:py-40 px-6 md:px-12 lg:px-20"
      style={{ background: 'var(--pink)', color: 'var(--ink)' }}
    >
      {/* Decorations */}
      <div
        className="absolute -left-16 top-[10%] rounded-full"
        style={{
          width: 'clamp(160px, 18vw, 280px)',
          height: 'clamp(160px, 18vw, 280px)',
          background: 'var(--lime)',
          opacity: 0.9,
        }}
        aria-hidden
      />
      <div
        className="absolute right-[-8%] bottom-[6%] rounded-full"
        style={{
          width: 'clamp(140px, 16vw, 240px)',
          height: 'clamp(140px, 16vw, 240px)',
          background: 'var(--blue)',
          filter: 'blur(60px)',
          opacity: 0.7,
        }}
        aria-hidden
      />
      <div className="noise-overlay" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[0.4em] uppercase mb-6 flex items-center gap-3"
          style={{ fontFamily: 'var(--font-mono)', color: 'rgba(10,10,10,0.7)' }}
        >
          <span className="w-10 h-px bg-[var(--ink)] opacity-40" />
          chapter 03 · builds
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-bold tracking-tight leading-[0.9] mb-8 md:mb-10"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 9vw, 7.5rem)',
            letterSpacing: '-0.03em',
          }}
        >
          Things I&apos;ve shipped
          <br />
          <span style={{ color: 'var(--cream)' }}>on my own time.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl leading-[1.55] max-w-2xl mb-14 md:mb-20 font-medium"
          style={{ color: 'rgba(10,10,10,0.82)' }}
        >
          Side projects I built to learn the problems I wanted to understand.
          All open source.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
