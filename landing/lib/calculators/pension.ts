export type PensionMode = "pension-from-corpus" | "corpus-for-pension"

export type PensionInput = {
  mode: PensionMode
  corpus: number
  monthlyPension: number
  annualReturnPercent: number
  years: number
}

export type PensionResult = {
  mode: PensionMode
  monthlyPension: number
  corpusNeeded: number
  totalWithdrawn: number
  endingCorpus: number
}

export function calculatePension(input: PensionInput): PensionResult | null {
  const { mode, corpus, monthlyPension, annualReturnPercent, years } = input
  const months = Math.round(years * 12)
  if (
    ![corpus, monthlyPension, annualReturnPercent, years].every(
      Number.isFinite,
    ) ||
    annualReturnPercent < 0 ||
    months < 1
  ) {
    return null
  }

  const r = annualReturnPercent / 12 / 100

  if (mode === "pension-from-corpus") {
    if (corpus <= 0 || monthlyPension < 0) return null
    let balance = corpus
    let withdrawn = 0
    const payout = monthlyPension
    for (let m = 0; m < months; m++) {
      balance *= 1 + r
      const take = Math.min(payout, balance)
      balance -= take
      withdrawn += take
      if (balance <= 0) {
        balance = 0
        break
      }
    }
    return {
      mode,
      monthlyPension: payout,
      corpusNeeded: corpus,
      totalWithdrawn: withdrawn,
      endingCorpus: balance,
    }
  }

  // corpus needed for desired monthly pension over N years (annuity PV)
  if (monthlyPension <= 0) return null
  let corpusNeeded: number
  if (r === 0) corpusNeeded = monthlyPension * months
  else {
    corpusNeeded =
      (monthlyPension * (1 - Math.pow(1 + r, -months))) / r
  }
  return {
    mode,
    monthlyPension,
    corpusNeeded,
    totalWithdrawn: monthlyPension * months,
    endingCorpus: 0,
  }
}
