export type SocialMediaEarningInput = {
  followers: number
  engagementRatePercent: number
  sponsoredPostsPerMonth: number
  baseCpm: number
  nicheMultiplier: number
}

export type SocialMediaEarningResult = {
  estimatedReach: number
  ratePerPost: number
  monthlyEarnings: number
  annualEarnings: number
  earningsPerThousandFollowers: number
}

export function calculateSocialMediaEarning(
  input: SocialMediaEarningInput,
): SocialMediaEarningResult | null {
  const {
    followers,
    engagementRatePercent,
    sponsoredPostsPerMonth,
    baseCpm,
    nicheMultiplier,
  } = input

  if (!(followers > 0) || !(baseCpm > 0) || !(nicheMultiplier > 0)) return null
  if (!(engagementRatePercent >= 0) || !(sponsoredPostsPerMonth >= 0)) return null

  // Reach proxy: followers × engagement share of audience (capped)
  const engagementFactor = Math.min(engagementRatePercent / 100, 0.2)
  const estimatedReach = Math.round(followers * (0.15 + engagementFactor))
  const ratePerPost = round(
    (estimatedReach / 1000) * baseCpm * nicheMultiplier,
  )
  const monthlyEarnings = round(ratePerPost * sponsoredPostsPerMonth)
  const annualEarnings = round(monthlyEarnings * 12)
  const earningsPerThousandFollowers = round(
    (ratePerPost / followers) * 1000,
  )

  return {
    estimatedReach,
    ratePerPost,
    monthlyEarnings,
    annualEarnings,
    earningsPerThousandFollowers,
  }
}

function round(n: number) {
  return Math.round(n * 100) / 100
}
