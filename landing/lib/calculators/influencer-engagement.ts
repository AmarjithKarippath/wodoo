export type InfluencerEngagementInput = {
  followers: number
  avgLikes: number
  avgComments: number
  avgShares: number
  avgReach?: number
}

export type InfluencerEngagementResult = {
  totalInteractions: number
  engagementRate: number
  reachEngagementRate: number | null
  interactionsPerFollower: number
  rating: "low" | "average" | "good" | "excellent"
}

export function calculateInfluencerEngagement(
  input: InfluencerEngagementInput,
): InfluencerEngagementResult | null {
  const { followers, avgLikes, avgComments, avgShares, avgReach } = input
  if (!(followers > 0)) return null
  if (avgLikes < 0 || avgComments < 0 || avgShares < 0) return null

  const totalInteractions = round(avgLikes + avgComments + avgShares)
  const engagementRate = round((totalInteractions / followers) * 100)
  const interactionsPerFollower = round(totalInteractions / followers)
  const reachEngagementRate =
    avgReach && avgReach > 0
      ? round((totalInteractions / avgReach) * 100)
      : null

  return {
    totalInteractions,
    engagementRate,
    reachEngagementRate,
    interactionsPerFollower,
    rating: rateEngagement(engagementRate),
  }
}

function rateEngagement(
  rate: number,
): InfluencerEngagementResult["rating"] {
  if (rate >= 6) return "excellent"
  if (rate >= 3) return "good"
  if (rate >= 1) return "average"
  return "low"
}

function round(n: number) {
  return Math.round(n * 100) / 100
}
