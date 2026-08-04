export type TdeeActivity =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very-active"
  | "extra-active"

export type TdeeInput = {
  sex: "male" | "female"
  age: number
  weightKg: number
  heightCm: number
  activity: TdeeActivity
}

export type TdeeResult = {
  bmr: number
  tdee: number
  multiplier: number
}

const MULTIPLIER: Record<TdeeActivity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  "very-active": 1.9,
  "extra-active": 2.0,
}

/** Mifflin–St Jeor BMR × activity → TDEE. */
export function calculateTdee(input: TdeeInput): TdeeResult | null {
  const { sex, age, weightKg, heightCm, activity } = input
  if (
    ![age, weightKg, heightCm].every((n) => Number.isFinite(n) && n > 0) ||
    age < 10 ||
    age > 120
  ) {
    return null
  }

  const bmr =
    sex === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161
  const multiplier = MULTIPLIER[activity]
  return { bmr, tdee: bmr * multiplier, multiplier }
}
