'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  href?: string
  label?: string
  delay?: number
}

export default function Tile({
  children,
  className = '',
  href,
  label,
  delay = 0,
}: Props) {
  const common = `group relative rounded-3xl border border-[var(--rule)] bg-[var(--bg)] overflow-hidden transition-colors hover:border-[var(--ink)] ${className}`

  const inner = (
    <>
      {label && (
        <div
          className="label absolute top-5 left-5 md:top-6 md:left-6 z-10"
          style={{ color: 'var(--ink-muted)' }}
        >
          {label}
        </div>
      )}
      {children}
    </>
  )

  if (href) {
    return (
      <motion.a
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        href={href}
        className={common}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={common}
    >
      {inner}
    </motion.div>
  )
}
