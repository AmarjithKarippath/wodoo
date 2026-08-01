export type DimInput = {
  length: number
  width: number
  height: number
  actualWeight: number
  divisor: number
  units: "imperial" | "metric"
}

export type DimResult = {
  volume: number
  volumeUnit: string
  dimensionalWeight: number
  billableWeight: number
  weightUnit: string
  usesDim: boolean
}

export function calculateDimWeight(input: DimInput): DimResult | null {
  const { length, width, height, actualWeight, divisor, units } = input
  if (
    !(length > 0) ||
    !(width > 0) ||
    !(height > 0) ||
    !(actualWeight > 0) ||
    !(divisor > 0)
  ) {
    return null
  }

  const volume = length * width * height
  const dimensionalWeight = round(volume / divisor)
  const billableWeight = Math.max(actualWeight, dimensionalWeight)

  return {
    volume: round(volume),
    volumeUnit: units === "imperial" ? "in³" : "cm³",
    dimensionalWeight,
    billableWeight: round(billableWeight),
    weightUnit: units === "imperial" ? "lb" : "kg",
    usesDim: dimensionalWeight > actualWeight,
  }
}

function round(n: number) {
  return Math.round(n * 1000) / 1000
}
