import { useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
extend({ MeshLineGeometry, MeshLineMaterial })

export function Fatline({ curve, width, color = '#ffffff', speed, dash, texture }) {
  const ref = useRef()
  useFrame((state, delta) => (ref.current.material.dashOffset -= (delta * speed) / 10))
  return (
    <mesh ref={ref}>
      <meshLineGeometry points={curve} />
      <meshLineMaterial
        useMap={texture ? 1 : 0}
        map={texture}
        transparent
        lineWidth={width}
        color={color}
        depthWrite={false}
        dashArray={0.25}
        dashRatio={dash}
        toneMapped={false}
      />
    </mesh>
  )
}
