export type WinningProductScoreInput = {
  demand: number
  competition: number
  marginPercent: number
  trend: number
  shippingEase: number
}

export type WinningProductScoreResult = {
  score: number
  grade: string
  summary: string
  breakdown: { label: string; points: number; max: number }[]
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export function calculateWinningProductScore(
  input: WinningProductScoreInput,
): WinningProductScoreResult | null {
  const { demand, competition, marginPercent, trend, shippingEase } = input
  if (
    ![demand, competition, marginPercent, trend, shippingEase].every((n) =>
      Number.isFinite(n),
    )
  ) {
    return null
  }

  const demandPts = (clamp(demand, 1, 10) / 10) * 25
  const competitionPts = ((11 - clamp(competition, 1, 10)) / 10) * 20
  const marginPts = (clamp(marginPercent, 0, 80) / 80) * 25
  const trendPts = (clamp(trend, 1, 10) / 10) * 15
  const shippingPts = (clamp(shippingEase, 1, 10) / 10) * 15
  const score = Math.round(demandPts + competitionPts + marginPts + trendPts + shippingPts)

  let grade = "C"
  let summary = "Borderline — improve margin or find less competition."
  if (score >= 80) {
    grade = "A"
    summary = "Strong winner candidate — validate with a small ad test."
  } else if (score >= 65) {
    grade = "B"
    summary = "Promising — refine offer and creative before scaling."
  } else if (score >= 45) {
    grade = "C"
    summary = "Average — only pursue if you have a clear angle."
  } else {
    grade = "D"
    summary = "Weak signals — look for a better product opportunity."
  }

  return {
    score,
    grade,
    summary,
    breakdown: [
      { label: "Demand", points: Math.round(demandPts), max: 25 },
      { label: "Competition", points: Math.round(competitionPts), max: 20 },
      { label: "Margin", points: Math.round(marginPts), max: 25 },
      { label: "Trend", points: Math.round(trendPts), max: 15 },
      { label: "Shipping ease", points: Math.round(shippingPts), max: 15 },
    ],
  }
}
