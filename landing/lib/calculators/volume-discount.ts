export type VolumeTierInput = {
  listPrice: number
  unitCost: number
  discountPercent: number
  expectedUnits: number
}

export type VolumeTierResult = {
  discountedPrice: number
  unitMargin: number
  unitMarginPercent: number
  totalRevenue: number
  totalProfit: number
  marginVsListDelta: number
}

export function calculateVolumeTier(
  input: VolumeTierInput,
): VolumeTierResult | null {
  const { listPrice, unitCost, discountPercent, expectedUnits } = input
  if (!(listPrice > 0) || unitCost < 0 || !(expectedUnits > 0)) return null
  if (discountPercent < 0 || discountPercent >= 100) return null

  const discountedPrice = round(listPrice * (1 - discountPercent / 100))
  if (discountedPrice <= 0) return null

  const unitMargin = round(discountedPrice - unitCost)
  const unitMarginPercent = (unitMargin / discountedPrice) * 100
  const totalRevenue = round(discountedPrice * expectedUnits)
  const totalProfit = round(unitMargin * expectedUnits)
  const listMargin = listPrice - unitCost
  const marginVsListDelta = round(unitMargin - listMargin)

  return {
    discountedPrice,
    unitMargin,
    unitMarginPercent,
    totalRevenue,
    totalProfit,
    marginVsListDelta,
  }
}

export function compareVolumeScenarios(
  listPrice: number,
  unitCost: number,
  tiers: { discountPercent: number; expectedUnits: number }[],
): Array<VolumeTierResult & { discountPercent: number; expectedUnits: number }> {
  return tiers
    .map((tier) => {
      const result = calculateVolumeTier({
        listPrice,
        unitCost,
        discountPercent: tier.discountPercent,
        expectedUnits: tier.expectedUnits,
      })
      if (!result) return null
      return { ...result, ...tier }
    })
    .filter((row): row is NonNullable<typeof row> => Boolean(row))
}

function round(n: number) {
  return Math.round(n * 100) / 100
}
