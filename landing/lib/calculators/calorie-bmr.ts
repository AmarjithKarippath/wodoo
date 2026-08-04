export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very-active"

export type CalorieBmrInput = {
  sex: "male" | "female"
  age: number
  weightKg: number
  heightCm: number
  activity: ActivityLevel
}

export type CalorieBmrResult = {
  bmr: number
  tdee: number
  mildLoss: number
  loss: number
  mildGain: number
  gain: number
}

const ACTIVITY_MULTIPLIER: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  "very-active": 1.9,
}

/** Mifflin–St Jeor BMR + TDEE. */
export function calculateCalorieBmr(
  input: CalorieBmrInput,
): CalorieBmrResult | null {
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

  const tdee = bmr * ACTIVITY_MULTIPLIER[activity]
  return {
    bmr,
    tdee,
    mildLoss: tdee - 250,
    loss: tdee - 500,
    mildGain: tdee + 250,
    gain: tdee + 500,
  }
}
