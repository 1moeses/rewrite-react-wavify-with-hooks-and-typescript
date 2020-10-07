export function clamp(value: number, min: number, max: number): number {
  if (value < min) {
    return min
  }
  if (max !== null && value > max) {
    return max
  }
  return value
}
