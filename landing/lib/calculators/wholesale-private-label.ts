export type WholesalePrivateLabelInput = {
  wholesaleUnitCost: number
  wholesaleMoq: number
  wholesaleInboundShipping: number
  privateLabelUnitCost: number
  privateLabelMoq: number
  privateLabelSetupFee: number
  privateLabelInboundShipping: number
  sellingPrice: number
  expectedMonthlyUnits: number
}

export type ChannelPlan = {
  landedUnitCost: number
  unitProfit: number
  marginPercent: number
  startupInventoryCost: number
  monthlyProfit: number
  monthsToRecoverStartup: number | null
}

export type WholesalePrivateLabelResult = {
  wholesale: ChannelPlan
  privateLabel: ChannelPlan
  betterForMargin: "wholesale" | "private-label" | "tie"
  betterForMonthlyProfit: "wholesale" | "private-label" | "tie"
}

export function calculateWholesalePrivateLabel(
  input: WholesalePrivateLabelInput,
): WholesalePrivateLabelResult | null {
  const {
    wholesaleUnitCost,
    wholesaleMoq,
    wholesaleInboundShipping,
    privateLabelUnitCost,
    privateLabelMoq,
    privateLabelSetupFee,
    privateLabelInboundShipping,
    sellingPrice,
    expectedMonthlyUnits,
  } = input

  if (!(sellingPrice > 0) || !(expectedMonthlyUnits > 0)) return null
  if (
    wholesaleUnitCost < 0 ||
    wholesaleMoq <= 0 ||
    privateLabelUnitCost < 0 ||
    privateLabelMoq <= 0 ||
    privateLabelSetupFee < 0
  ) {
    return null
  }

  const wholesale = buildChannel({
    unitCost: wholesaleUnitCost,
    moq: wholesaleMoq,
    inboundShipping: wholesaleInboundShipping,
    setupFee: 0,
    sellingPrice,
    expectedMonthlyUnits,
  })

  const privateLabel = buildChannel({
    unitCost: privateLabelUnitCost,
    moq: privateLabelMoq,
    inboundShipping: privateLabelInboundShipping,
    setupFee: privateLabelSetupFee,
    sellingPrice,
    expectedMonthlyUnits,
  })

  if (!wholesale || !privateLabel) return null

  return {
    wholesale,
    privateLabel,
    betterForMargin: pickBetter(
      wholesale.marginPercent,
      privateLabel.marginPercent,
    ),
    betterForMonthlyProfit: pickBetter(
      wholesale.monthlyProfit,
      privateLabel.monthlyProfit,
    ),
  }
}

function buildChannel(args: {
  unitCost: number
  moq: number
  inboundShipping: number
  setupFee: number
  sellingPrice: number
  expectedMonthlyUnits: number
}): ChannelPlan | null {
  const {
    unitCost,
    moq,
    inboundShipping,
    setupFee,
    sellingPrice,
    expectedMonthlyUnits,
  } = args

  const shippingPerUnit = inboundShipping / moq
  const setupPerUnit = setupFee / moq
  const landedUnitCost = round(unitCost + shippingPerUnit + setupPerUnit)
  const unitProfit = round(sellingPrice - landedUnitCost)
  const marginPercent = round((unitProfit / sellingPrice) * 100)
  const startupInventoryCost = round(unitCost * moq + inboundShipping + setupFee)
  const monthlyProfit = round(unitProfit * expectedMonthlyUnits)
  const monthsToRecoverStartup =
    monthlyProfit > 0
      ? round(startupInventoryCost / monthlyProfit)
      : null

  return {
    landedUnitCost,
    unitProfit,
    marginPercent,
    startupInventoryCost,
    monthlyProfit,
    monthsToRecoverStartup,
  }
}

function pickBetter(
  wholesaleValue: number,
  privateLabelValue: number,
): "wholesale" | "private-label" | "tie" {
  const diff = privateLabelValue - wholesaleValue
  if (diff > 0.01) return "private-label"
  if (diff < -0.01) return "wholesale"
  return "tie"
}

function round(n: number) {
  return Math.round(n * 100) / 100
}
