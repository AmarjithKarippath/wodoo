export type FollowerToBuyerInput = {
  followers: number
  profileVisitRatePercent: number
  linkClickRatePercent: number
  purchaseConversionPercent: number
  averageOrderValue: number
}

export type FollowerToBuyerResult = {
  profileVisits: number
  linkClicks: number
  estimatedBuyers: number
  estimatedRevenue: number
  followerToBuyerRate: number
  revenuePerThousandFollowers: number
}

export function calculateFollowerToBuyer(
  input: FollowerToBuyerInput,
): FollowerToBuyerResult | null {
  const {
    followers,
    profileVisitRatePercent,
    linkClickRatePercent,
    purchaseConversionPercent,
    averageOrderValue,
  } = input

  if (!(followers > 0) || !(averageOrderValue > 0)) return null
  if (
    profileVisitRatePercent < 0 ||
    linkClickRatePercent < 0 ||
    purchaseConversionPercent < 0
  ) {
    return null
  }

  const profileVisits = Math.round(
    followers * (profileVisitRatePercent / 100),
  )
  const linkClicks = Math.round(profileVisits * (linkClickRatePercent / 100))
  const estimatedBuyers = Math.round(
    linkClicks * (purchaseConversionPercent / 100),
  )
  const estimatedRevenue = round(estimatedBuyers * averageOrderValue)
  const followerToBuyerRate = round((estimatedBuyers / followers) * 100)
  const revenuePerThousandFollowers = round(
    (estimatedRevenue / followers) * 1000,
  )

  return {
    profileVisits,
    linkClicks,
    estimatedBuyers,
    estimatedRevenue,
    followerToBuyerRate,
    revenuePerThousandFollowers,
  }
}

function round(n: number) {
  return Math.round(n * 100) / 100
}
