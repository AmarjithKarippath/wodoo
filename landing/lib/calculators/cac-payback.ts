export type CacPaybackInput = {
  cac: number
  averageOrderValue: number
  grossMarginPercent: number
  purchaseFrequencyPerYear: number
}

export type CacPaybackResult = {
  contributionPerOrder: number
  annualContribution: number
  paybackMonths: number
  ltv12Month: number
  ltvToCac: number
}

export function calculateCacPayback(
  input: CacPaybackInput,
): CacPaybackResult | null {
  const {
    cac,
    averageOrderValue,
    grossMarginPercent,
    purchaseFrequencyPerYear,
  } = input

  if (!(cac > 0) || !(averageOrderValue > 0)) return null
  if (!(grossMarginPercent > 0) || !(grossMarginPercent < 100)) return null
  if (!(purchaseFrequencyPerYear > 0)) return null

  const contributionPerOrder = round(
    averageOrderValue * (grossMarginPercent / 100),
  )
  const annualContribution = round(
    contributionPerOrder * purchaseFrequencyPerYear,
  )
  const monthlyContribution = annualContribution / 12
  if (monthlyContribution <= 0) return null

  const paybackMonths = round(cac / monthlyContribution)
  const ltv12Month = annualContribution
  const ltvToCac = round(ltv12Month / cac)

  return {
    contributionPerOrder,
    annualContribution,
    paybackMonths,
    ltv12Month,
    ltvToCac,
  }
}

function round(n: number) {
  return Math.round(n * 100) / 100
}
