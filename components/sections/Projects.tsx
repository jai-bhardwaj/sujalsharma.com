'use client'

import { motion } from 'framer-motion'
import { PROJECTS, type Project } from '@/lib/constants'

function BuildEntry({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, '0')
  const isFeatured = project.featured

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="group grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-12 py-10 md:py-14 border-t border-[rgba(255,255,255,0.08)]"
    >
      {/* Number */}
      <div
        className="text-[11px] tracking-[0.4em] uppercase text-[var(--text-secondary)] pt-2"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        /{num}
      </div>

      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
          <h3
            className="font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[#00E5FF] transition-colors duration-300"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            {project.title}
          </h3>
          {isFeatured && (
            <a
              href="#race"
              className="text-[10px] tracking-[0.3em] uppercase text-[#00E5FF] border-b border-[#00E5FF]/30 pb-0.5 hover:border-[#00E5FF] transition"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              ↑ race it
            </a>
          )}
        </div>

        <p className="text-base md:text-lg text-[var(--text-secondary)] leading-[1.65] max-w-2xl mb-7">
          {project.longDescription}
        </p>

        <div
          className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] tracking-[0.25em] uppercase"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <div className="text-[var(--text-secondary)] opacity-60">
            {project.technologies.slice(0, 5).join(' · ')}
          </div>
          <div className="flex gap-6">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00E5FF] border-b border-[#00E5FF]/30 pb-0.5 hover:border-[#00E5FF] transition"
              >
                source →
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-primary)] border-b border-[rgba(255,255,255,0.2)] pb-0.5 hover:border-[var(--text-primary)] transition"
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
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1200px' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[0.4em] uppercase text-[var(--text-secondary)] mb-6 flex items-center gap-3"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span className="w-8 h-px bg-[#00E5FF]" />
          chapter 03 · builds
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-bold tracking-tight leading-[0.95] mb-6 max-w-4xl"
          style={{
            fontSize: 'clamp(2.25rem, 7vw, 5.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
          }}
        >
          Things I&apos;ve shipped
          <br />
          <span className="text-[var(--text-secondary)]">on my own time.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base md:text-lg text-[var(--text-secondary)] leading-[1.65] max-w-2xl mb-8 md:mb-10"
        >
          Side projects I built to learn the problems I wanted to understand.
          All open source.
        </motion.p>

        <div>
          {PROJECTS.map((project, i) => (
            <BuildEntry key={project.id} project={project} index={i} />
          ))}
          <div className="border-t border-[rgba(255,255,255,0.08)]" />
        </div>
      </div>
    </section>
  )
}
