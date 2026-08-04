export type SwpInput = {
  corpus: number
  monthlyWithdrawal: number
  annualReturnPercent: number
  years: number
}

export type SwpResult = {
  endingCorpus: number
  totalWithdrawn: number
  monthsLasted: number
  depleted: boolean
}

export function calculateSwp(input: SwpInput): SwpResult | null {
  const { corpus, monthlyWithdrawal, annualReturnPercent, years } = input
  const months = Math.round(years * 12)
  if (
    ![corpus, monthlyWithdrawal, annualReturnPercent, years].every(
      Number.isFinite,
    ) ||
    corpus <= 0 ||
    monthlyWithdrawal <= 0 ||
    annualReturnPercent < 0 ||
    months < 1
  ) {
    return null
  }

  const monthlyRate = annualReturnPercent / 12 / 100
  let balance = corpus
  let totalWithdrawn = 0
  let monthsLasted = 0

  for (let m = 0; m < months; m++) {
    balance *= 1 + monthlyRate
    if (balance <= 0) break
    const take = Math.min(monthlyWithdrawal, balance)
    balance -= take
    totalWithdrawn += take
    monthsLasted++
    if (balance <= 0.01) {
      balance = 0
      break
    }
  }

  return {
    endingCorpus: balance,
    totalWithdrawn,
    monthsLasted,
    depleted: balance <= 0,
  }
}
