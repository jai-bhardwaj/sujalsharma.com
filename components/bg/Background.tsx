'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const ShaderBg = dynamic(() => import('./ShaderBg'), { ssr: false })
const InkTrail = dynamic(() => import('./InkTrail'), { ssr: false })

/**
 * Probe for WebGL once. If it's blocked (sandboxed renderer, hardware
 * acceleration off, ad-blocker, restrictive enterprise policy…) we
 * silently skip the shader and let the body's solid brown show
 * through. InkTrail keeps working since it's Canvas2D.
 */
function detectWebGL(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function Background() {
  const [glAvailable, setGlAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    setGlAvailable(detectWebGL())
  }, [])

  return (
    <>
      {glAvailable && <ShaderBg />}
      <InkTrail />
    </>
  )
}
