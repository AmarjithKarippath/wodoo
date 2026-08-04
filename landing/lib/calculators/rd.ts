export type RdInput = {
  monthlyDeposit: number
  annualRatePercent: number
  tenureMonths: number
}

export type RdResult = {
  maturityAmount: number
  totalDeposited: number
  interestEarned: number
}

/** Recurring deposit maturity (quarterly compounding approximation). */
export function calculateRd(input: RdInput): RdResult | null {
  const { monthlyDeposit, annualRatePercent, tenureMonths } = input
  if (
    ![monthlyDeposit, annualRatePercent, tenureMonths].every(Number.isFinite) ||
    monthlyDeposit <= 0 ||
    annualRatePercent < 0 ||
    tenureMonths < 1
  ) {
    return null
  }

  const r = annualRatePercent / 100 / 4
  const n = tenureMonths
  // Standard RD formula used by many Indian banks (quarterly compounding)
  const maturityAmount =
    monthlyDeposit *
    ((Math.pow(1 + r, n / 3) - 1) / (1 - Math.pow(1 + r, -1 / 3)))

  const totalDeposited = monthlyDeposit * n
  return {
    maturityAmount,
    totalDeposited,
    interestEarned: maturityAmount - totalDeposited,
  }
}
