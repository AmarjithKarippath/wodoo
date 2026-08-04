export type InterestMode = "simple" | "compound"

export type InterestInput = {
  mode: InterestMode
  principal: number
  annualRatePercent: number
  years: number
  compoundsPerYear?: number
}

export type InterestResult = {
  mode: InterestMode
  interest: number
  totalAmount: number
}

export function calculateInterest(input: InterestInput): InterestResult | null {
  const {
    mode,
    principal,
    annualRatePercent,
    years,
    compoundsPerYear = 1,
  } = input
  if (
    ![principal, annualRatePercent, years].every(Number.isFinite) ||
    principal < 0 ||
    annualRatePercent < 0 ||
    years <= 0
  ) {
    return null
  }

  if (mode === "simple") {
    const interest = (principal * annualRatePercent * years) / 100
    return { mode, interest, totalAmount: principal + interest }
  }

  const n = Math.max(1, Math.round(compoundsPerYear))
  const totalAmount =
    principal * Math.pow(1 + annualRatePercent / 100 / n, n * years)
  return {
    mode,
    interest: totalAmount - principal,
    totalAmount,
  }
}
