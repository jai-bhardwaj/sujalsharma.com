'use client'

import { motion } from 'framer-motion'
import { SOCIAL_LINKS, PERSON } from '@/lib/constants'

export default function Contact() {
  return (
    <section id="contact" className="px-6 md:px-10 py-20 md:py-32">
      <div className="max-w-[960px] mx-auto">
        <h2
          className="text-[12px] tracking-[0.12em] uppercase text-[var(--ink-muted)] mb-10"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Contact
        </h2>

        <motion.a
          href={`mailto:${SOCIAL_LINKS.email}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="display block text-[var(--ink)] break-all hover:text-[var(--ink-muted)] transition-colors"
          style={{ fontSize: 'clamp(1.75rem, 6vw, 4.5rem)', letterSpacing: '-0.035em' }}
        >
          {SOCIAL_LINKS.email}
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[14px]"
        >
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-ink text-[var(--ink)]"
          >
            LinkedIn →
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-ink text-[var(--ink)]"
          >
            GitHub →
          </a>
          <span
            className="text-[11px] tracking-[0.12em] uppercase text-[var(--ink-muted)] ml-auto"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {PERSON.location} · {PERSON.availability}
          </span>
        </motion.div>
      </div>
    </section>
  )
}
