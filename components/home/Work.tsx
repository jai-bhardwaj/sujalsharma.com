'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PROJECTS, type Project } from '@/lib/constants'

function ProjectLine({ project, index }: { project: Project; index: number }) {
  return (
    <motion.a
      href={project.links.github ?? '#'}
      target={project.links.github ? '_blank' : undefined}
      rel={project.links.github ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group grid grid-cols-[1fr_auto] gap-6 py-6 md:py-8 border-t border-[var(--rule)]"
    >
      <div>
        <h3
          className="display text-[var(--ink)] mb-1"
          style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2rem)' }}
        >
          {project.title}
        </h3>
        <p className="text-[15px] text-[var(--ink-muted)] max-w-[55ch]">
          {project.description}
        </p>
      </div>
      <div
        className="text-[12px] tracking-[0.1em] uppercase text-[var(--ink-muted)] text-right whitespace-nowrap group-hover:text-[var(--ink)] transition-colors"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {project.lang}
        <br />
        <span className="text-[var(--ink-dim)]">{project.lastCommit}</span>
      </div>
    </motion.a>
  )
}

export default function Work() {
  return (
    <section id="work" className="px-6 md:px-10 py-20 md:py-32">
      <div className="max-w-[960px] mx-auto">
        <h2
          className="text-[12px] tracking-[0.12em] uppercase text-[var(--ink-muted)] mb-2"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Work
        </h2>

        <div>
          {PROJECTS.map((project, i) => (
            <ProjectLine key={project.id} project={project} index={i} />
          ))}
          <div className="border-b border-[var(--rule)]" />
        </div>

        <div className="mt-6 text-[13px]">
          <Link href="/race" className="link-ink text-[var(--ink-muted)]">
            → Race Mach-Zero live
          </Link>
        </div>
      </div>
    </section>
  )
}
