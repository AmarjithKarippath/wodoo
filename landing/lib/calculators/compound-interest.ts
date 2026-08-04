export type CompoundInterestInput = {
  principal: number
  annualRatePercent: number
  years: number
  compoundsPerYear: number
  monthlyContribution?: number
}

export type CompoundInterestResult = {
  futureValue: number
  totalContributed: number
  interestEarned: number
}

export function calculateCompoundInterest(
  input: CompoundInterestInput,
): CompoundInterestResult | null {
  const {
    principal,
    annualRatePercent,
    years,
    compoundsPerYear,
    monthlyContribution = 0,
  } = input

  if (
    ![principal, annualRatePercent, years, compoundsPerYear, monthlyContribution].every(
      Number.isFinite,
    ) ||
    principal < 0 ||
    annualRatePercent < 0 ||
    years <= 0 ||
    compoundsPerYear < 1 ||
    monthlyContribution < 0
  ) {
    return null
  }

  const r = annualRatePercent / 100
  const n = compoundsPerYear
  const t = years
  let futureValue = principal * Math.pow(1 + r / n, n * t)

  if (monthlyContribution > 0) {
    const monthlyRate = r / 12
    const months = Math.round(t * 12)
    if (monthlyRate === 0) {
      futureValue += monthlyContribution * months
    } else {
      futureValue +=
        monthlyContribution *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
    }
  }

  const totalContributed = principal + monthlyContribution * Math.round(t * 12)
  return {
    futureValue,
    totalContributed,
    interestEarned: futureValue - totalContributed,
  }
}
