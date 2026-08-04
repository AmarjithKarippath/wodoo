export type FdInput = {
  principal: number
  annualRatePercent: number
  tenureMonths: number
  compoundsPerYear: number
}

export type FdResult = {
  maturityAmount: number
  interestEarned: number
}

/** Fixed deposit maturity with periodic compounding. */
export function calculateFd(input: FdInput): FdResult | null {
  const { principal, annualRatePercent, tenureMonths, compoundsPerYear } = input
  if (
    ![principal, annualRatePercent, tenureMonths, compoundsPerYear].every(
      Number.isFinite,
    ) ||
    principal <= 0 ||
    annualRatePercent < 0 ||
    tenureMonths < 1 ||
    compoundsPerYear < 1
  ) {
    return null
  }

  const years = tenureMonths / 12
  const maturityAmount =
    principal *
    Math.pow(1 + annualRatePercent / 100 / compoundsPerYear, compoundsPerYear * years)

  return {
    maturityAmount,
    interestEarned: maturityAmount - principal,
  }
}
