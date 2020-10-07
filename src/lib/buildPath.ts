type Point = {
  x: number
  y: number
}

type BuildPathParams = {
  points: Point[]
  waveWidth: number
  waveHeight: number
}

const cubic = (pointA: Point, pointB: Point) =>
  ` C ${pointA.x} ${pointA.y} ${pointA.x} ${pointA.y} ${pointB.x} ${pointB.y}`

export function buildPath({
  points,
  waveWidth,
  waveHeight,
}: BuildPathParams): string {
  const pointA = points[0]
  const pointB = points[1]

  let svg = `M ${pointA.x} ${pointA.y}`

  const initialPoint = {
    x: (pointB.x - pointA.x) / 2,
    y: pointB.y - pointA.y + pointA.y + (pointB.y - pointA.y),
  }

  svg += cubic(initialPoint, pointB)

  let point = initialPoint

  for (let i = 1; i < points.length - 1; i += 1) {
    point = {
      x: points[i].x - point.x + points[i].x,
      y: points[i].y - point.y + points[i].y,
    }
    svg += cubic(point, points[i + 1])
  }

  svg += ` L ${waveWidth} ${waveHeight}`
  svg += ` L 0 ${waveHeight} Z`

  return svg
}

export default buildPath
