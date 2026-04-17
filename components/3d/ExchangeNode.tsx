'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

type Props = {
  position: [number, number, number]
  label: string
  price: string
  color: string
  seed: number
}

export default function ExchangeNode({ position, label, price, color, seed }: Props) {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (group.current) {
      group.current.position.y = position[1] + Math.sin(t * 0.6 + seed) * 0.12
    }
    if (core.current) {
      core.current.rotation.y = t * 0.35 + seed
      core.current.rotation.x = Math.sin(t * 0.4 + seed) * 0.2
      const s = 1 + Math.sin(t * 2.5 + seed) * 0.04
      core.current.scale.setScalar(s)
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.25 - seed
    }
  })

  return (
    <group ref={group} position={position}>
      {/* Core crystal */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.6}
          roughness={0.25}
          metalness={0.75}
          flatShading
        />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>

      {/* Orbital ring */}
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[0.95, 0.012, 8, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>

      {/* Label */}
      <Text
        position={[0, 1.35, 0]}
        fontSize={0.22}
        color={color}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
      >
        {label}
      </Text>

      {/* Price ticker */}
      <Text
        position={[0, -1.15, 0]}
        fontSize={0.16}
        color="#F5F7FA"
        anchorX="center"
        anchorY="middle"
      >
        {price}
      </Text>
    </group>
  )
}
