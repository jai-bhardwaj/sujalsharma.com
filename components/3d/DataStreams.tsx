'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/** Flowing particles along curves from exchanges into the match engine. */
export default function DataStreams() {
  const pointsRef = useRef<THREE.Points>(null)

  const { geometry, material, count, progress, lane } = useMemo(() => {
    const count = 240
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const progress = new Float32Array(count)
    const lane = new Int8Array(count) // 0 = left→center, 1 = right→center

    const cLeft = new THREE.Color('#FF6B35')
    const cRight = new THREE.Color('#00E5FF')

    for (let i = 0; i < count; i++) {
      progress[i] = Math.random()
      lane[i] = i % 2 === 0 ? 0 : 1
      const c = lane[i] === 0 ? cLeft : cRight
      colors[i * 3 + 0] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    return { geometry, material, count, progress, lane }
  }, [])

  // Quadratic bezier curves: exchange → arch → match engine center
  const leftCurve = useMemo(
    () =>
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-3.8, 0, 0),
        new THREE.Vector3(-1.9, 1.4, 0.5),
        new THREE.Vector3(0, 0, 0),
      ),
    [],
  )
  const rightCurve = useMemo(
    () =>
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(3.8, 0, 0),
        new THREE.Vector3(1.9, 1.4, -0.5),
        new THREE.Vector3(0, 0, 0),
      ),
    [],
  )

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = pos.array as Float32Array
    for (let i = 0; i < count; i++) {
      progress[i] += delta * (0.35 + (i % 5) * 0.04)
      if (progress[i] > 1) progress[i] = 0
      const curve = lane[i] === 0 ? leftCurve : rightCurve
      const p = curve.getPoint(progress[i])
      const jitter = (i % 7) * 0.01
      arr[i * 3 + 0] = p.x
      arr[i * 3 + 1] = p.y + Math.sin(progress[i] * 10 + i) * jitter
      arr[i * 3 + 2] = p.z
    }
    pos.needsUpdate = true
  })

  return <points ref={pointsRef} geometry={geometry} material={material} />
}
