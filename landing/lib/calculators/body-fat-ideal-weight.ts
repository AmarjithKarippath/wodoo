export type BodyMetricsInput = {
  sex: "male" | "female"
  age: number
  heightCm: number
  weightKg: number
  waistCm: number
  neckCm: number
  hipCm?: number
}

export type BodyMetricsResult = {
  bodyFatPercent: number
  category: string
  idealWeightDevineKg: number
  bmi: number
}

/** US Navy body fat + Devine ideal weight. */
export function calculateBodyFatIdealWeight(
  input: BodyMetricsInput,
): BodyMetricsResult | null {
  const { sex, age, heightCm, weightKg, waistCm, neckCm, hipCm = 0 } = input
  if (
    ![age, heightCm, weightKg, waistCm, neckCm].every((n) => Number.isFinite(n) && n > 0) ||
    (sex === "female" && !(Number.isFinite(hipCm) && hipCm! > 0))
  ) {
    return null
  }

  const heightIn = heightCm / 2.54
  const waistIn = waistCm / 2.54
  const neckIn = neckCm / 2.54
  const hipIn = hipCm / 2.54

  let bodyFatPercent: number
  if (sex === "male") {
    bodyFatPercent =
      86.01 * Math.log10(waistIn - neckIn) - 70.041 * Math.log10(heightIn) + 36.76
  } else {
    bodyFatPercent =
      163.205 * Math.log10(waistIn + hipIn - neckIn) -
      97.684 * Math.log10(heightIn) -
      78.387
  }

  if (!Number.isFinite(bodyFatPercent)) return null

  let category = "Obese"
  if (sex === "male") {
    if (bodyFatPercent < 6) category = "Essential fat"
    else if (bodyFatPercent < 14) category = "Athletes"
    else if (bodyFatPercent < 18) category = "Fitness"
    else if (bodyFatPercent < 25) category = "Average"
  } else {
    if (bodyFatPercent < 14) category = "Essential fat"
    else if (bodyFatPercent < 21) category = "Athletes"
    else if (bodyFatPercent < 25) category = "Fitness"
    else if (bodyFatPercent < 32) category = "Average"
  }

  const heightInches = heightCm / 2.54
  const idealWeightDevineKg =
    sex === "male"
      ? 50 + 2.3 * Math.max(0, heightInches - 60)
      : 45.5 + 2.3 * Math.max(0, heightInches - 60)

  const heightM = heightCm / 100
  const bmi = weightKg / (heightM * heightM)

  return {
    bodyFatPercent,
    category,
    idealWeightDevineKg,
    bmi,
  }
}
