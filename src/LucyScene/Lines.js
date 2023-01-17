import * as THREE from 'three'
import { useMemo } from 'react'
import { Fatline } from './Fatline.js'

export function Lines({ dash, count, colors, radius = 50, thickness, rand = THREE.MathUtils.randFloatSpread }) {
  // Lines Array of { color, width, speed, curve aka points }
  const lines = useMemo(() => {
    return Array.from({ length: count }, () => {
      const pos = new THREE.Vector3(rand(radius), rand(radius), rand(radius))
      const points = Array.from({ length: 10 }, () => pos.add(new THREE.Vector3(rand(radius), rand(radius), rand(radius))).clone())
      const curve = new THREE.CatmullRomCurve3(points).getPoints(200)
      return {
        color: colors[parseInt(colors.length * Math.random(), 10)],
        width: Math.max(radius / 100, (radius / 50) * Math.random() * thickness),
        speed: Math.max(0.1, 1 * Math.random()),
        curve: curve.flatMap((point) => point.toArray())
      }
    })
  }, [colors, count, radius, thickness, rand])
  return lines.map((props, index) => <Fatline key={index} dash={dash} {...props} />)
}
