'use client'

import { motion } from 'framer-motion'
import { PROJECTS, type Project } from '@/lib/constants'
import Ticker from './Ticker'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isFeatured = project.featured

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative ${isFeatured ? 'md:col-span-2' : ''}`}
    >
      <div
        className={`relative h-full rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(21,27,40,0.55)] backdrop-blur-sm p-7 md:p-9 transition-all duration-500 hover:border-[rgba(0,229,255,0.4)] ${
          isFeatured
            ? 'hover:shadow-[0_0_60px_rgba(0,229,255,0.12)]'
            : 'hover:shadow-[0_0_28px_rgba(0,229,255,0.08)]'
        }`}
      >
        <div
          className="flex items-center justify-between mb-5 text-[10px] tracking-[0.3em] uppercase"
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
          className={`font-bold mb-4 text-[var(--text-primary)] group-hover:text-[#00E5FF] transition-colors duration-300 tracking-tight ${
            isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}
        >
          {project.title}
        </h3>

        <p
          className={`text-[var(--text-secondary)] mb-7 leading-relaxed ${
            isFeatured ? 'text-base max-w-2xl' : 'text-sm'
          }`}
        >
          {isFeatured ? project.longDescription : project.description}
        </p>

        {project.metrics && (
          <div className="flex flex-wrap gap-2.5 mb-7">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div
                key={key}
                className="px-3.5 py-2 bg-[rgba(0,229,255,0.04)] border border-[rgba(0,229,255,0.12)] rounded-md"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span className="text-[9px] tracking-[0.25em] uppercase text-[var(--text-secondary)]">
                  {key}
                </span>
                <span className="ml-2 text-xs font-semibold text-[#00E5FF]">{value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mb-7">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-2 py-1 bg-[rgba(255,255,255,0.03)] text-[var(--text-secondary)] rounded border border-[rgba(255,255,255,0.05)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div
          className="flex gap-6 text-[11px] tracking-[0.25em] uppercase"
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

const STATS = [
  { value: '< 1μs', label: 'match latency' },
  { value: '1M+', label: 'msgs / sec' },
  { value: '2', label: 'live markets' },
  { value: '100%', label: 'C++20 core' },
]

export default function Projects() {
  return (
    <>
      <Ticker />
      <section
        id="projects"
        className="relative py-28 md:py-40 px-6 md:px-12 lg:px-16"
        style={{ contentVisibility: 'auto', containIntrinsicSize: '1200px' }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 md:mb-24 max-w-3xl"
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
              Running in production. Measured in nanoseconds. Below is the code.
            </p>
          </motion.div>

          {/* Stats strip — understated, sits as a quiet data row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 mb-20 md:mb-28 py-8 md:py-10 border-y border-[rgba(255,255,255,0.06)]"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {stat.value}
                </div>
                <div
                  className="mt-1.5 text-[10px] tracking-[0.25em] uppercase text-[var(--text-secondary)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
