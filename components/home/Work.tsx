'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PROJECTS, type Project } from '@/lib/constants'

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-12 py-10 md:py-14 border-t border-[var(--rule)]"
    >
      <div>
        <div
          className="text-[12px] tracking-[0.1em] uppercase text-[var(--ink-muted)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {project.lang} · {project.status}
        </div>
        <div
          className="mt-1 text-[12px] tracking-[0.1em] uppercase text-[var(--ink-dim)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {project.lastCommit}
        </div>
      </div>

      <div className="max-w-[60ch]">
        <h3
          className="display text-[var(--ink)] mb-4"
          style={{ fontSize: 'clamp(1.75rem, 3.8vw, 2.75rem)' }}
        >
          {project.title}
        </h3>
        <p className="text-[16px] md:text-[17px] leading-[1.6] text-[var(--ink-muted)] mb-6">
          {project.longDescription}
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink text-[var(--ink)]"
            >
              Source →
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink text-[var(--ink)]"
            >
              Live →
            </a>
          )}
          {project.featured && (
            <Link href="/race" className="link-ink text-[var(--ink)]">
              Race it →
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Work() {
  return (
    <section id="work" className="px-6 md:px-10 py-16 md:py-24">
      <div className="max-w-[1080px] mx-auto">
        <h2
          className="text-[13px] tracking-[0.12em] uppercase text-[var(--ink-muted)] mb-6"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Work
        </h2>

        {PROJECTS.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
        <div className="border-b border-[var(--rule)]" />
      </div>
    </section>
  )
}
