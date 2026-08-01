export type BreakEvenInput = {
  fixedCosts: number
  pricePerUnit: number
  variableCostPerUnit: number
}

export type BreakEvenResult = {
  contributionMargin: number
  contributionMarginPercent: number
  breakEvenUnits: number
  breakEvenRevenue: number
}

export function calculateBreakEven(
  input: BreakEvenInput,
): BreakEvenResult | null {
  const { fixedCosts, pricePerUnit, variableCostPerUnit } = input
  if (!(fixedCosts >= 0) || !(pricePerUnit > 0) || variableCostPerUnit < 0) {
    return null
  }
  if (pricePerUnit <= variableCostPerUnit) return null

  const contributionMargin = round(pricePerUnit - variableCostPerUnit)
  const contributionMarginPercent = (contributionMargin / pricePerUnit) * 100
  const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin)
  const breakEvenRevenue = round(breakEvenUnits * pricePerUnit)

  return {
    contributionMargin,
    contributionMarginPercent,
    breakEvenUnits,
    breakEvenRevenue,
  }
}

function round(n: number) {
  return Math.round(n * 100) / 100
}
