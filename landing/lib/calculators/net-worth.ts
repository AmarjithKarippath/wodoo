export type NetWorthInput = {
  cash: number
  investments: number
  property: number
  otherAssets: number
  loans: number
  creditCards: number
  otherLiabilities: number
}

export type NetWorthResult = {
  totalAssets: number
  totalLiabilities: number
  netWorth: number
}

export function calculateNetWorth(input: NetWorthInput): NetWorthResult | null {
  const values = Object.values(input)
  if (!values.every((n) => Number.isFinite(n) && n >= 0)) return null

  const totalAssets =
    input.cash + input.investments + input.property + input.otherAssets
  const totalLiabilities =
    input.loans + input.creditCards + input.otherLiabilities
  return {
    totalAssets,
    totalLiabilities,
    netWorth: totalAssets - totalLiabilities,
  }
}
