export type PercentageMode = "of" | "is-what" | "change"

export type PercentageInput = {
  mode: PercentageMode
  a: number
  b: number
}

export type PercentageResult = {
  value: number
  label: string
}

export function calculatePercentage(
  input: PercentageInput,
): PercentageResult | null {
  const { mode, a, b } = input
  if (![a, b].every((n) => Number.isFinite(n))) return null

  if (mode === "of") {
    return { value: (a / 100) * b, label: `${a}% of ${b}` }
  }
  if (mode === "is-what") {
    if (b === 0) return null
    return { value: (a / b) * 100, label: `${a} is what % of ${b}` }
  }
  if (b === 0) return null
  return {
    value: ((a - b) / Math.abs(b)) * 100,
    label: "Percentage change from old to new",
  }
}
