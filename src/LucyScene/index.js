import { Lines } from './Lines'
import { Lucy } from './Lucy'

export function LucyScene() {
  const count = 5
  const dash = 0
  const radius = 3
  const thickness = 5

  const lucyLineWidth = 1
  const lucyScale = 3
  return (
    <>
      <Lines dash={dash} count={count} radius={radius} thickness={thickness} colors={[[10, 0.5, 2], [1, 2, 10], '#f1808e', '#EE786E']} />
      <Lucy dash={dash} lineWidth={lucyLineWidth} scale={lucyScale} />
    </>
  )
}
