'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uRes;

  // Cheap simplex-ish 2D noise.
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453) * 2.0 - 1.0;
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0,0)), f - vec2(0,0)),
          dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
      mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
          dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
    float t = uTime * 0.06;

    // Two slowly-drifting noise layers for a wash effect
    float n = fbm(p * 1.6 + vec2(t, -t * 0.7));
    float n2 = fbm(p * 3.0 - vec2(t * 0.5, t));
    float wash = 0.55 + 0.45 * n - 0.1 * n2;

    // Warm dark brown base — same hue as page (oklch ~0.20 0.022 65 in sRGB)
    vec3 base = vec3(0.118, 0.094, 0.067);
    vec3 high = vec3(0.220, 0.180, 0.130);
    vec3 col  = mix(base, high, smoothstep(0.2, 0.95, wash));

    // Vermilion ink-bloom: two slow radial pulses that drift around
    vec2  c1 = vec2(0.30 + 0.10 * sin(t * 0.6), 0.40 + 0.08 * cos(t * 0.8));
    vec2  c2 = vec2(0.72 + 0.07 * sin(t * 0.9 + 2.0), 0.65 + 0.10 * cos(t * 0.5));
    float d1 = distance(uv * vec2(uRes.x / uRes.y, 1.0), c1 * vec2(uRes.x / uRes.y, 1.0));
    float d2 = distance(uv * vec2(uRes.x / uRes.y, 1.0), c2 * vec2(uRes.x / uRes.y, 1.0));
    float bloom = exp(-d1 * 9.0) * (0.6 + 0.4 * sin(t * 1.7))
                + exp(-d2 * 12.0) * (0.5 + 0.5 * sin(t * 1.1 + 1.5));
    vec3 ink = vec3(0.68, 0.20, 0.13); // vermilion
    col = mix(col, ink, clamp(bloom * 0.18, 0.0, 0.35));

    // Gentle vignette so center reads brighter
    float vign = smoothstep(0.95, 0.30, length(uv - 0.5));
    col *= 0.85 + 0.25 * vign;

    gl_FragColor = vec4(col, 1.0);
  }
`

function ShaderQuad() {
  const ref = useRef<THREE.ShaderMaterial>(null)
  const reducedRef = useRef(false)
  useEffect(() => {
    reducedRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
  }, [])
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  )
  useFrame(({ clock, size }) => {
    if (!ref.current) return
    // Reduced motion: freeze the time uniform at a value that produces
    // a pleasant noise frame. Wash + blooms render once, no animation.
    ref.current.uniforms.uTime.value = reducedRef.current
      ? 6.0
      : clock.elapsedTime
    ref.current.uniforms.uRes.value.set(size.width, size.height)
  })
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={ref}
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={frag}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function ShaderBg() {
  return (
    <Canvas
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <ShaderQuad />
    </Canvas>
  )
}
