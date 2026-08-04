export type RetirementInput = {
  currentAge: number
  retireAge: number
  monthlyExpenseToday: number
  inflationPercent: number
  expectedReturnPercent: number
  currentSavings: number
  monthlyContribution: number
}

export type RetirementResult = {
  yearsToRetire: number
  corpusNeeded: number
  projectedCorpus: number
  shortfall: number
  monthlyExpenseAtRetirement: number
}

export function calculateRetirement(
  input: RetirementInput,
): RetirementResult | null {
  const {
    currentAge,
    retireAge,
    monthlyExpenseToday,
    inflationPercent,
    expectedReturnPercent,
    currentSavings,
    monthlyContribution,
  } = input
  const years = retireAge - currentAge
  if (
    ![
      currentAge,
      retireAge,
      monthlyExpenseToday,
      inflationPercent,
      expectedReturnPercent,
      currentSavings,
      monthlyContribution,
    ].every(Number.isFinite) ||
    years < 1 ||
    monthlyExpenseToday <= 0 ||
    currentSavings < 0 ||
    monthlyContribution < 0
  ) {
    return null
  }

  const infl = inflationPercent / 100
  const r = expectedReturnPercent / 100
  const monthlyExpenseAtRetirement =
    monthlyExpenseToday * Math.pow(1 + infl, years)
  // 25× annual expense rule of thumb (4% withdrawal)
  const corpusNeeded = monthlyExpenseAtRetirement * 12 * 25

  const months = years * 12
  const monthlyRate = r / 12
  let projected = currentSavings
  for (let m = 0; m < months; m++) {
    projected = projected * (1 + monthlyRate) + monthlyContribution
  }

  return {
    yearsToRetire: years,
    corpusNeeded,
    projectedCorpus: projected,
    shortfall: corpusNeeded - projected,
    monthlyExpenseAtRetirement,
  }
}
