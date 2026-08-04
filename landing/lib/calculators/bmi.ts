export type BmiInput = { weightKg: number; heightCm: number }

export type BmiResult = {
  bmi: number
  category: string
  healthyMinKg: number
  healthyMaxKg: number
}

export function calculateBmi(input: BmiInput): BmiResult | null {
  const { weightKg, heightCm } = input
  if (
    ![weightKg, heightCm].every((n) => Number.isFinite(n) && n > 0) ||
    heightCm < 50 ||
    heightCm > 300 ||
    weightKg < 10 ||
    weightKg > 500
  ) {
    return null
  }

  const heightM = heightCm / 100
  const bmi = weightKg / (heightM * heightM)
  let category = "Obesity"
  if (bmi < 18.5) category = "Underweight"
  else if (bmi < 25) category = "Normal weight"
  else if (bmi < 30) category = "Overweight"

  return {
    bmi,
    category,
    healthyMinKg: 18.5 * heightM * heightM,
    healthyMaxKg: 24.9 * heightM * heightM,
  }
}
