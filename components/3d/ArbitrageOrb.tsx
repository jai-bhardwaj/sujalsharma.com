'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type Props = {
  visible: boolean
  onClick: () => void
}

export default function ArbitrageOrb({ visible, onClick }: Props) {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const halo = useRef<THREE.Mesh>(null)
  const spawnAt = useRef(0)

  useEffect(() => {
    if (visible) spawnAt.current = performance.now()
  }, [visible])

  useFrame((state) => {
    if (!group.current || !core.current || !halo.current) return
    const t = state.clock.elapsedTime
    const alive = (performance.now() - spawnAt.current) / 1000
    // Drift along a vertical figure-8 between exchanges to look unpredictable
    const x = Math.sin(t * 1.2) * 1.6
    const y = Math.sin(t * 1.8) * 0.6 + 0.2
    group.current.position.set(x, y, 0.3)

    const emergence = Math.min(1, alive * 4)
    const pulse = 1 + Math.sin(t * 10) * 0.12
    core.current.scale.setScalar(visible ? emergence * pulse : 0)
    halo.current.scale.setScalar(visible ? emergence * pulse * 1.8 : 0)

    const coreMat = core.current.material as THREE.MeshStandardMaterial
    coreMat.emissiveIntensity = 3.5 + Math.sin(t * 14) * 1.0
  })

  return (
    <group ref={group} visible={visible}>
      <mesh
        ref={core}
        onPointerDown={(e) => {
          e.stopPropagation()
          if (visible) onClick()
        }}
      >
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color="#FFD600"
          emissive="#FFD600"
          emissiveIntensity={3}
          roughness={0.1}
          metalness={0.4}
        />
      </mesh>
      <mesh ref={halo}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial color="#FFD600" transparent opacity={0.18} />
      </mesh>
    </group>
  )
}
