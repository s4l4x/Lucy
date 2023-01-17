import * as THREE from 'three'
import { useMemo } from 'react'
import { SVGLoader } from 'three-stdlib'
import { useLoader } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { Fatline } from './Fatline.js'

export function Lucy({ dash, lineWidth, scale, precision = 30 }) {
  const src = './Lucy_03.svg'
  const svg = useLoader(SVGLoader, !src.startsWith('<svg') ? src : `data:image/svg+xml;utf8,${src}`)
  const lineTexture = useTexture('./gradientTexture.png')

  const points = useMemo(() => {
    const path = svg.paths[0].subPaths[0]
    const points = path.getPoints(precision).map((p) => new THREE.Vector3(p.x, p.y, 0))

    const bbox = new THREE.Box3().setFromPoints(points)
    let center = new THREE.Vector3()
    bbox.getCenter(center)

    points.map((p) => p.sub(center).multiply(new THREE.Vector3(scale, -scale, 1)))

    return points
  }, [svg, precision, scale])

  return <Fatline color={[10, 10, 10]} width={lineWidth} curve={points} speed={0.1} dash={dash} texture={lineTexture} />
}
