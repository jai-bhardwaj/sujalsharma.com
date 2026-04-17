'use client'

import { useMemo } from 'react'
import * as THREE from 'three'

export default function StarField() {
  const { geometry, material } = useMemo(() => {
    const count = 600
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const base = new THREE.Color('#F5F7FA')
    const cyan = new THREE.Color('#00E5FF')
    for (let i = 0; i < count; i++) {
      const r = 18 + Math.random() * 12
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      const c = Math.random() < 0.15 ? cyan : base
      const k = 0.4 + Math.random() * 0.6
      colors[i * 3 + 0] = c.r * k
      colors[i * 3 + 1] = c.g * k
      colors[i * 3 + 2] = c.b * k
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const material = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    })
    return { geometry, material }
  }, [])

  return <points geometry={geometry} material={material} />
}
