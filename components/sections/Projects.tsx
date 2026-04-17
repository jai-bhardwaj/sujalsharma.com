'use client'

import { motion } from 'framer-motion'
import { PROJECTS, type Project } from '@/lib/constants'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isFeatured = project.featured

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className={`group relative ${isFeatured ? 'md:col-span-2' : ''}`}
    >
      <div
        className={`relative h-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 md:p-8 transition-all duration-500 hover:border-[#00E5FF] ${
          isFeatured
            ? 'hover:shadow-[0_0_48px_rgba(0,229,255,0.15)]'
            : 'hover:shadow-[0_0_24px_rgba(0,229,255,0.1)]'
        }`}
      >
        {/* Kicker + status */}
        <div
          className="flex items-center justify-between mb-4 text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span className="text-[#00E5FF]">{project.kicker}</span>
          {isFeatured && (
            <span className="flex items-center gap-2 text-[#00FF94]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
              running
            </span>
          )}
        </div>

        <h3
          className={`font-bold mb-3 text-[var(--text-primary)] group-hover:text-[#00E5FF] transition-colors duration-300 ${
            isFeatured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
          }`}
        >
          {project.title}
        </h3>

        <p
          className={`text-[var(--text-secondary)] mb-6 leading-relaxed ${
            isFeatured ? 'text-base md:text-lg max-w-2xl' : 'text-sm'
          }`}
        >
          {isFeatured ? project.longDescription : project.description}
        </p>

        {project.metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div
                key={key}
                className="px-3 py-2 bg-[rgba(0,229,255,0.04)] border border-[rgba(0,229,255,0.15)] rounded"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <div className="text-[9px] tracking-[0.25em] uppercase text-[var(--text-secondary)]">
                  {key}
                </div>
                <div className="text-sm font-semibold text-[#00E5FF]">{value}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[10px] tracking-[0.1em] px-2 py-1 bg-[rgba(255,255,255,0.04)] text-[var(--text-secondary)] rounded border border-[rgba(255,255,255,0.06)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div
          className="flex gap-5 text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[#00E5FF] transition-colors"
            >
              source →
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[#FF6B35] transition-colors"
            >
              live →
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span
            className="text-[10px] tracking-[0.3em] uppercase text-[#00E5FF] mb-2 block"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            // deployed strategies
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
            The engine you just raced.
          </h2>
          <p
            className="mt-3 text-sm md:text-base text-[var(--text-secondary)] max-w-2xl"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Real systems, running in production. Built to measure in nanoseconds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
