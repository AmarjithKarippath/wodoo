export type CalorieDeficitInput = {
  maintenanceKcal: number
  intakeKcal: number
  currentWeightKg: number
  targetWeightKg: number
}

export type CalorieDeficitResult = {
  dailyDeficit: number
  weeklyDeficit: number
  kgPerWeek: number
  weeksToGoal: number
  estimatedEndDateDays: number
}

const KCAL_PER_KG = 7700

export function calculateCalorieDeficit(
  input: CalorieDeficitInput,
): CalorieDeficitResult | null {
  const {
    maintenanceKcal,
    intakeKcal,
    currentWeightKg,
    targetWeightKg,
  } = input
  if (
    ![
      maintenanceKcal,
      intakeKcal,
      currentWeightKg,
      targetWeightKg,
    ].every((n) => Number.isFinite(n) && n > 0)
  ) {
    return null
  }

  const dailyDeficit = maintenanceKcal - intakeKcal
  if (dailyDeficit === 0) return null

  const kgDelta = currentWeightKg - targetWeightKg
  // Losing weight needs positive deficit; gaining needs surplus (negative deficit)
  if (kgDelta > 0 && dailyDeficit <= 0) return null
  if (kgDelta < 0 && dailyDeficit >= 0) return null
  if (kgDelta === 0) return null

  const weeklyDeficit = dailyDeficit * 7
  const kgPerWeek = weeklyDeficit / KCAL_PER_KG
  const weeksToGoal = Math.abs(kgDelta / kgPerWeek)

  return {
    dailyDeficit,
    weeklyDeficit,
    kgPerWeek,
    weeksToGoal,
    estimatedEndDateDays: Math.round(weeksToGoal * 7),
  }
}
