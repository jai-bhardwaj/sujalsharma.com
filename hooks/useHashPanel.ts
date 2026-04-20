'use client'

import { useCallback, useEffect, useState } from 'react'
import { NAV_PANELS, type PanelId } from '@/lib/constants'

const DEFAULT: PanelId = 'now'

function fromHash(): PanelId {
  if (typeof window === 'undefined') return DEFAULT
  const raw = window.location.hash.replace('#', '') as PanelId
  return NAV_PANELS.some((p) => p.id === raw) ? raw : DEFAULT
}

export function useHashPanel() {
  const [active, setActive] = useState<PanelId>(DEFAULT)

  useEffect(() => {
    setActive(fromHash())
    const onHash = () => setActive(fromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = useCallback((id: PanelId) => {
    if (typeof window !== 'undefined') {
      history.replaceState(null, '', `#${id}`)
    }
    setActive(id)
  }, [])

  // Keyboard: 1..N and j/k to move through panels
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const tag = target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable) return

      const numeric = parseInt(e.key, 10)
      if (numeric >= 1 && numeric <= NAV_PANELS.length) {
        e.preventDefault()
        navigate(NAV_PANELS[numeric - 1].id)
        return
      }
      if (e.key === 'j' || e.key === 'k') {
        setActive((prev) => {
          const i = NAV_PANELS.findIndex((p) => p.id === prev)
          const delta = e.key === 'j' ? 1 : -1
          const next =
            NAV_PANELS[(i + delta + NAV_PANELS.length) % NAV_PANELS.length]
          if (typeof window !== 'undefined') {
            history.replaceState(null, '', `#${next.id}`)
          }
          return next.id
        })
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  return { active, navigate }
}
