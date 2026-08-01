"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateInfluencerEngagement } from "@/lib/calculators/influencer-engagement"
import { formatNumber, formatPercent } from "@/lib/calculators/format"

export function InfluencerEngagementCalculator() {
  const [followers, setFollowers] = useState("50000")
  const [avgLikes, setAvgLikes] = useState("2100")
  const [avgComments, setAvgComments] = useState("180")
  const [avgShares, setAvgShares] = useState("90")
  const [avgReach, setAvgReach] = useState("18000")

  const result = useMemo(
    () =>
      calculateInfluencerEngagement({
        followers: Number(followers),
        avgLikes: Number(avgLikes),
        avgComments: Number(avgComments),
        avgShares: Number(avgShares),
        avgReach: avgReach ? Number(avgReach) : undefined,
      }),
    [followers, avgLikes, avgComments, avgShares, avgReach],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="er-followers" label="Followers">
          <Input id="er-followers" type="number" min="1" step="1" value={followers} onChange={(e) => setFollowers(e.target.value)} />
        </Field>
        <Field id="er-likes" label="Avg likes / post">
          <Input id="er-likes" type="number" min="0" step="1" value={avgLikes} onChange={(e) => setAvgLikes(e.target.value)} />
        </Field>
        <Field id="er-comments" label="Avg comments / post">
          <Input id="er-comments" type="number" min="0" step="1" value={avgComments} onChange={(e) => setAvgComments(e.target.value)} />
        </Field>
        <Field id="er-shares" label="Avg shares / saves">
          <Input id="er-shares" type="number" min="0" step="1" value={avgShares} onChange={(e) => setAvgShares(e.target.value)} />
        </Field>
        <Field id="er-reach" label="Avg reach (optional)" hint="Use for reach-based engagement rate" className="sm:col-span-2">
          <Input id="er-reach" type="number" min="0" step="1" value={avgReach} onChange={(e) => setAvgReach(e.target.value)} />
        </Field>
      </form>

      {result ? (
        <ResultPanel
          title="Engagement rate"
          value={formatPercent(result.engagementRate)}
          subtitle={`Rated ${result.rating} vs typical influencer benchmarks (1–3% average, 3%+ good).`}
        >
          <StatGrid
            items={[
              { label: "Total interactions", value: formatNumber(result.totalInteractions, 0) },
              { label: "Per follower", value: formatNumber(result.interactionsPerFollower, 3) },
              {
                label: "Reach engagement",
                value:
                  result.reachEngagementRate != null
                    ? formatPercent(result.reachEngagementRate)
                    : "—",
              },
              { label: "Rating", value: result.rating },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
