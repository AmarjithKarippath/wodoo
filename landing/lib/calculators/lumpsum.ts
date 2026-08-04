export type LumpsumInput = {
  principal: number
  annualReturnPercent: number
  years: number
}

export type LumpsumResult = {
  futureValue: number
  totalInvested: number
  wealthGained: number
}

export function calculateLumpsum(input: LumpsumInput): LumpsumResult | null {
  const { principal, annualReturnPercent, years } = input
  if (
    ![principal, annualReturnPercent, years].every(Number.isFinite) ||
    principal <= 0 ||
    annualReturnPercent < 0 ||
    years <= 0
  ) {
    return null
  }

  const futureValue =
    principal * Math.pow(1 + annualReturnPercent / 100, years)
  return {
    futureValue,
    totalInvested: principal,
    wealthGained: futureValue - principal,
  }
}
