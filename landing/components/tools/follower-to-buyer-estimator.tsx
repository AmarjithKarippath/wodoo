"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateFollowerToBuyer } from "@/lib/calculators/follower-to-buyer"
import { formatMoney, formatNumber, formatPercent } from "@/lib/calculators/format"

export function FollowerToBuyerEstimator() {
  const [followers, setFollowers] = useState("40000")
  const [profileVisitRatePercent, setProfileVisitRatePercent] = useState("12")
  const [linkClickRatePercent, setLinkClickRatePercent] = useState("25")
  const [purchaseConversionPercent, setPurchaseConversionPercent] = useState("3.5")
  const [averageOrderValue, setAverageOrderValue] = useState("58")

  const result = useMemo(
    () =>
      calculateFollowerToBuyer({
        followers: Number(followers),
        profileVisitRatePercent: Number(profileVisitRatePercent),
        linkClickRatePercent: Number(linkClickRatePercent),
        purchaseConversionPercent: Number(purchaseConversionPercent),
        averageOrderValue: Number(averageOrderValue),
      }),
    [
      followers,
      profileVisitRatePercent,
      linkClickRatePercent,
      purchaseConversionPercent,
      averageOrderValue,
    ],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="ftb-followers" label="Followers">
          <Input id="ftb-followers" type="number" min="1" step="1" value={followers} onChange={(e) => setFollowers(e.target.value)} />
        </Field>
        <Field id="ftb-aov" label="Average order value">
          <Input id="ftb-aov" type="number" min="0.01" step="0.01" value={averageOrderValue} onChange={(e) => setAverageOrderValue(e.target.value)} />
        </Field>
        <Field id="ftb-visit" label="Profile visit rate %" hint="% of followers who visit your profile">
          <Input id="ftb-visit" type="number" min="0" max="100" step="0.1" value={profileVisitRatePercent} onChange={(e) => setProfileVisitRatePercent(e.target.value)} />
        </Field>
        <Field id="ftb-click" label="Link click rate %" hint="% of profile visitors who tap your link">
          <Input id="ftb-click" type="number" min="0" max="100" step="0.1" value={linkClickRatePercent} onChange={(e) => setLinkClickRatePercent(e.target.value)} />
        </Field>
        <Field id="ftb-conv" label="Purchase conversion %" className="sm:col-span-2">
          <Input id="ftb-conv" type="number" min="0" max="100" step="0.1" value={purchaseConversionPercent} onChange={(e) => setPurchaseConversionPercent(e.target.value)} />
        </Field>
      </form>

      {result ? (
        <ResultPanel
          title="Estimated buyers"
          value={formatNumber(result.estimatedBuyers, 0)}
          subtitle={`${formatMoney(result.estimatedRevenue)} revenue · ${formatPercent(result.followerToBuyerRate, 2)} follower→buyer rate`}
        >
          <StatGrid
            items={[
              { label: "Profile visits", value: formatNumber(result.profileVisits, 0) },
              { label: "Link clicks", value: formatNumber(result.linkClicks, 0) },
              { label: "Est. revenue", value: formatMoney(result.estimatedRevenue) },
              {
                label: "Revenue / 1k followers",
                value: formatMoney(result.revenuePerThousandFollowers),
              },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
