'use client'

import { Suspense, useState, useEffect, Component, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import ExchangeNode from './ExchangeNode'
import MatchEngine from './MatchEngine'
import DataStreams from './DataStreams'
import ArbitrageOrb from './ArbitrageOrb'
import StarField from './StarField'
import type { GameState } from '@/hooks/useArenaGame'

function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    return gl !== null
  } catch {
    return false
  }
}

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { err: boolean }> {
  state = { err: false }
  static getDerivedStateFromError() {
    return { err: true }
  }
  render() {
    return this.state.err ? this.props.fallback : this.props.children
  }
}

function Fallback2D() {
  return (
    <div className="absolute inset-0 bg-[#0A0E13]">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,229,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.4) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
        }}
      />
    </div>
  )
}

function ParallaxRig() {
  const { camera, pointer } = useThree()
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.9, 0.04)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.2 + pointer.y * 0.5, 0.04)
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Grid() {
  return (
    <gridHelper
      args={[60, 60, '#0E2A3A', '#0A1A24']}
      position={[0, -2.4, 0]}
    />
  )
}

type Props = {
  state: GameState
  onFire: () => void
  onOrbClick: () => void
}

function Scene({ state, onFire, onOrbClick }: Props) {
  const orbVisible = state.kind === 'live'
  const armed = state.kind === 'armed' || state.kind === 'live'

  return (
    <>
      <color attach="background" args={['#0A0E13']} />
      <fog attach="fog" args={['#0A0E13', 9, 28]} />

      <ambientLight intensity={0.35} />
      <pointLight position={[-6, 2, 2]} intensity={2.5} color="#FF6B35" distance={14} />
      <pointLight position={[6, 2, 2]} intensity={2.5} color="#00E5FF" distance={14} />
      <pointLight position={[0, 4, 3]} intensity={1.2} color="#FF2E92" distance={10} />

      <StarField />
      <Grid />

      {/* Whole-scene click-to-fire plane (behind everything) */}
      <mesh
        position={[0, 0, -1.5]}
        onPointerDown={(e) => {
          e.stopPropagation()
          onFire()
        }}
      >
        <planeGeometry args={[40, 20]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <ExchangeNode
        position={[-3.8, 0, 0]}
        label="BINANCE"
        price="BTC/USDT  $67,482.11"
        color="#FF6B35"
        seed={0.3}
      />
      <ExchangeNode
        position={[3.8, 0, 0]}
        label="NSE"
        price="RELIANCE  ₹2,948.20"
        color="#00E5FF"
        seed={1.7}
      />

      <MatchEngine armed={armed} />
      <DataStreams />
      <ArbitrageOrb visible={orbVisible} onClick={onOrbClick} />

      <ParallaxRig />

      <EffectComposer>
        <Bloom intensity={1.1} luminanceThreshold={0.35} luminanceSmoothing={0.85} mipmapBlur />
      </EffectComposer>

      <Preload all />
    </>
  )
}

export default function ArenaScene(props: Props) {
  const [ok, setOk] = useState<boolean | null>(null)
  useEffect(() => setOk(hasWebGL()), [])
  if (ok === null || !ok) return <Fallback2D />

  return (
    <div className="absolute inset-0 z-0">
      <Boundary fallback={<Fallback2D />}>
        <Canvas
          camera={{ position: [0, 0.3, 7.5], fov: 55, near: 0.1, far: 60 }}
          dpr={[1, 1.75]}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpace,
            failIfMajorPerformanceCaveat: false,
          }}
          onCreated={({ gl }) => gl.setClearColor('#0A0E13')}
        >
          <Suspense fallback={null}>
            <Scene {...props} />
          </Suspense>
        </Canvas>
      </Boundary>
    </div>
  )
}
