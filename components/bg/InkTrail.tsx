'use client'

import { useEffect, useRef, useState } from 'react'

type InkPoint = { x: number; y: number; t: number; size: number }

/**
 * Cursor drops vermilion ink dots that fade over ~1.6s. Faster pointer
 * motion = thicker stroke. Canvas2D so it works even where WebGL is off.
 *
 * Skip conditions (returns null, no canvas in DOM):
 *   - `prefers-reduced-motion: reduce` — respect the OS preference
 *   - `hover: none` — touch-only devices. Without hover, the trail can
 *     only render during scroll/touch, which on phones looks like
 *     "the page bleeds when you drag" rather than playful ink.
 */
export default function InkTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState(false)

  // Decide whether to mount at all
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasHover = window.matchMedia('(hover: hover)').matches
    if (reduced || !hasHover) return
    setActive(true)
  }, [])

  // Once active, set up the canvas + pointer listener + raf loop
  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const points: InkPoint[] = []
    const last = { x: 0, y: 0, t: 0 }
    let dpr = Math.min(window.devicePixelRatio, 2)
    let raf = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: PointerEvent) => {
      // Ignore touch / pen — only mouse leaves ink. Belt + suspenders
      // on top of the (hover: hover) gate above.
      if (e.pointerType !== 'mouse') return
      const now = performance.now()
      const dt = Math.max(now - (last.t || now), 1)
      const dx = e.clientX - last.x
      const dy = e.clientY - last.y
      const speed = Math.sqrt(dx * dx + dy * dy) / dt
      const size = Math.min(11, 2.4 + speed * 4.5)
      points.push({ x: e.clientX, y: e.clientY, t: now, size })
      if (points.length > 600) points.shift()
      last.x = e.clientX
      last.y = e.clientY
      last.t = now
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const LIFE = 1600
    const render = () => {
      const now = performance.now()
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i]
        const age = now - p.t
        if (age > LIFE) {
          points.splice(i, 1)
          continue
        }
        const t = age / LIFE
        const alpha = (1 - t) * 0.78
        const radius = p.size * (1 - t * 0.45)
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 1.8)
        grad.addColorStop(0, `rgba(220, 70, 40, ${alpha})`)
        grad.addColorStop(0.5, `rgba(180, 50, 30, ${alpha * 0.55})`)
        grad.addColorStop(1, `rgba(180, 50, 30, 0)`)
        ctx.fillStyle = grad
        ctx.fill()
      }
      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [active])

  if (!active) return null
  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}
    />
  )
}
