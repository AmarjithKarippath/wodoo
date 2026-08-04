export type MetabolicActivity =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very-active"

export type MetabolicRateInput = {
  sex: "male" | "female"
  age: number
  weightKg: number
  heightCm: number
  bodyFatPercent?: number
  activity: MetabolicActivity
}

export type MetabolicRateResult = {
  mifflin: number
  harrisBenedict: number
  katchMcArdle: number | null
  averageBmr: number
  tdeeMifflin: number
  tdeeHarris: number
  tdeeKatch: number | null
}

const ACTIVITY: Record<MetabolicActivity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  "very-active": 1.9,
}

export function calculateMetabolicRate(
  input: MetabolicRateInput,
): MetabolicRateResult | null {
  const { sex, age, weightKg, heightCm, bodyFatPercent, activity } = input
  if (
    ![age, weightKg, heightCm].every((n) => Number.isFinite(n) && n > 0) ||
    age < 10 ||
    age > 120
  ) {
    return null
  }

  const mifflin =
    sex === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161

  const harrisBenedict =
    sex === "male"
      ? 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age
      : 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age

  let katchMcArdle: number | null = null
  if (
    bodyFatPercent != null &&
    Number.isFinite(bodyFatPercent) &&
    bodyFatPercent > 0 &&
    bodyFatPercent < 70
  ) {
    const lbm = weightKg * (1 - bodyFatPercent / 100)
    katchMcArdle = 370 + 21.6 * lbm
  }

  const mult = ACTIVITY[activity]
  const avgParts = [mifflin, harrisBenedict]
  if (katchMcArdle != null) avgParts.push(katchMcArdle)

  return {
    mifflin,
    harrisBenedict,
    katchMcArdle,
    averageBmr: avgParts.reduce((s, n) => s + n, 0) / avgParts.length,
    tdeeMifflin: mifflin * mult,
    tdeeHarris: harrisBenedict * mult,
    tdeeKatch: katchMcArdle != null ? katchMcArdle * mult : null,
  }
}
