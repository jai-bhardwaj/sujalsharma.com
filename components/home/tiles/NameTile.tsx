'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Tile from './Tile'
import { PERSON } from '@/lib/constants'

const MORPH = ['fast', 'lean', 'precise', 'real']

export default function NameTile() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % MORPH.length), 2400)
    return () => window.clearInterval(id)
  }, [])

  return (
    <Tile
      label="SS · 01"
      className="md:col-span-8 md:row-span-2 min-h-[56vh] md:min-h-[520px]"
    >
      <div className="absolute inset-0 flex flex-col justify-center p-7 md:p-12 lg:p-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="display text-[var(--ink)]"
          style={{
            fontSize: 'clamp(3rem, 11vw, 11rem)',
            lineHeight: 0.88,
            letterSpacing: '-0.05em',
          }}
        >
          {PERSON.firstName}
          <br />
          {PERSON.lastName}
          <span className="text-[var(--ink-muted)]">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-8 md:mt-10 text-[17px] md:text-[22px] max-w-[32ch]"
          style={{
            color: 'var(--ink-muted)',
            fontFamily: 'var(--font-display)',
          }}
        >
          software that has to be{' '}
          <span className="inline-block relative align-baseline">
            <AnimatePresence mode="wait">
              <motion.span
                key={MORPH[i]}
                initial={{ opacity: 0, y: '0.3em' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '-0.3em' }}
                transition={{ duration: 0.4 }}
                className="inline-block italic"
                style={{ color: 'var(--ink)', fontWeight: 500 }}
              >
                {MORPH[i]}
              </motion.span>
            </AnimatePresence>
            <span
              aria-hidden
              className="invisible italic"
              style={{ fontWeight: 500 }}
            >
              precise
            </span>
          </span>
          .
        </motion.p>
      </div>
    </Tile>
  )
}
