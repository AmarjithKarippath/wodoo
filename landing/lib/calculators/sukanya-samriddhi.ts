/** Illustrative SSY math — rate is user-editable (scheme rate changes). */
export type SukanyaInput = {
  yearlyDeposit: number
  depositYears: number
  annualRatePercent: number
  maturityYears: number
}

export type SukanyaResult = {
  totalDeposited: number
  maturityAmount: number
  interestEarned: number
}

export function calculateSukanyaSamriddhi(
  input: SukanyaInput,
): SukanyaResult | null {
  const {
    yearlyDeposit,
    depositYears,
    annualRatePercent,
    maturityYears,
  } = input
  if (
    ![yearlyDeposit, depositYears, annualRatePercent, maturityYears].every(
      Number.isFinite,
    ) ||
    yearlyDeposit <= 0 ||
    depositYears < 1 ||
    depositYears > 15 ||
    annualRatePercent < 0 ||
    maturityYears < depositYears ||
    maturityYears > 25
  ) {
    return null
  }

  const r = annualRatePercent / 100
  let balance = 0
  for (let y = 1; y <= maturityYears; y++) {
    if (y <= depositYears) balance += yearlyDeposit
    balance *= 1 + r
  }

  const totalDeposited = yearlyDeposit * depositYears
  return {
    totalDeposited,
    maturityAmount: balance,
    interestEarned: balance - totalDeposited,
  }
}
