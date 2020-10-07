type MapRangeArgs = {
  value: number
  inMin: number
  inMax: number
  outMin?: number
  outMax?: number
  decimals?: number
}

export function mapRange({
  value = 0,
  inMin = 0,
  inMax = 1,
  outMin = 0,
  outMax = 1,
  decimals = 2,
}: MapRangeArgs): number {
  const mappedValue =
    ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
  const strippedDecimals = decimals > 10 ? 10 : decimals
  return Number(mappedValue.toFixed(strippedDecimals))
}
