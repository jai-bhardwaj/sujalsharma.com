'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type Props = { armed: boolean }

export default function MatchEngine({ armed }: Props) {
  const outer = useRef<THREE.Mesh>(null)
  const mid = useRef<THREE.Mesh>(null)
  const core = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (outer.current) {
      outer.current.rotation.x = t * 0.25
      outer.current.rotation.y = t * -0.35
    }
    if (mid.current) {
      mid.current.rotation.z = t * 0.6
      mid.current.rotation.y = t * 0.45
    }
    if (core.current) {
      const pulse = armed ? 3.0 + Math.sin(t * 12) * 1.5 : 1.4 + Math.sin(t * 3) * 0.4
      const mat = core.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = pulse
      core.current.scale.setScalar(1 + Math.sin(t * 4) * 0.03)
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Outer cage */}
      <mesh ref={outer}>
        <torusKnotGeometry args={[0.7, 0.03, 128, 16, 2, 3]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.55} />
      </mesh>

      {/* Mid ring */}
      <mesh ref={mid}>
        <torusGeometry args={[0.5, 0.018, 12, 80]} />
        <meshBasicMaterial color="#FF2E92" transparent opacity={0.7} />
      </mesh>

      {/* Core */}
      <mesh ref={core}>
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#00E5FF"
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.9}
          flatShading
        />
      </mesh>

      {/* Soft halo */}
      <mesh>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.08} />
      </mesh>
    </group>
  )
}
