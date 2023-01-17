import * as THREE from 'three'
import { useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { easing } from 'maath'
import { useControls } from 'leva'
import { LucyScene } from './LucyScene/index.js'

export default function App() {
  const { dash, count, radius, thickness } = useControls('Lines', {
    dash: { value: 0.0, min: 0, max: 0.99, step: 0.01 },
    count: { value: 20, min: 0, max: 200, step: 1 },
    radius: { value: 10, min: 1, max: 100, step: 1 },
    thickness: { value: 1, min: 0.5, max: 20, step: 0.25 }
  })
  const { lucyLineWidth, lucyScale } = useControls('Lucy', {
    lucyLineWidth: { value: 0.9, min: 0, max: 2, step: 0.1 },
    lucyScale: { value: 0.07, min: 0.001, max: 0.1, step: 0.001 }
  })
  //      <Lines dash={dash} count={count} radius={radius} thickness={thickness} colors={[[10, 0.5, 2], [1, 2, 10], '#f1808e', '#EE786E']} />
  //   <Lucy dash={dash} lineWidth={lucyLineWidth} scale={lucyScale} />

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 90 }}>
      <color attach="background" args={['#101020']} />
      <LucyScene />
      <Rig />
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={1} radius={0.6} />
      </EffectComposer>
    </Canvas>
  )
}

function Rig({ radius = 20 }) {
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, [Math.sin(state.pointer.x) * radius, Math.atan(state.pointer.y) * radius, Math.cos(state.pointer.x) * radius], 0.25, dt)
    state.camera.lookAt(0, 0, 0)
  })
}
