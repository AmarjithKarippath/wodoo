export type LandedCostInput = {
  productCost: number
  inboundShipping: number
  duties: number
  taxes: number
  insurance: number
  handlingFees: number
  units: number
}

export type LandedCostResult = {
  totalLandedCost: number
  costPerUnit: number
  dutyTaxSharePercent: number
  logisticsSharePercent: number
}

export function calculateLandedProductCost(
  input: LandedCostInput,
): LandedCostResult | null {
  const {
    productCost,
    inboundShipping,
    duties,
    taxes,
    insurance,
    handlingFees,
    units,
  } = input

  if (!(productCost > 0) || !(units > 0)) return null
  if (
    inboundShipping < 0 ||
    duties < 0 ||
    taxes < 0 ||
    insurance < 0 ||
    handlingFees < 0
  ) {
    return null
  }

  const totalLandedCost = round(
    productCost + inboundShipping + duties + taxes + insurance + handlingFees,
  )
  const costPerUnit = round(totalLandedCost / units)
  const dutyTaxSharePercent =
    ((duties + taxes) / totalLandedCost) * 100
  const logisticsSharePercent =
    ((inboundShipping + insurance + handlingFees) / totalLandedCost) * 100

  return {
    totalLandedCost,
    costPerUnit,
    dutyTaxSharePercent,
    logisticsSharePercent,
  }
}

function round(n: number) {
  return Math.round(n * 100) / 100
}
