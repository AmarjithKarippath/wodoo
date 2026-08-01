"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import { calculateSocialMediaEarning } from "@/lib/calculators/social-media-earning"
import { formatMoney, formatNumber } from "@/lib/calculators/format"

const NICHES = [
  { label: "General / lifestyle", multiplier: "1" },
  { label: "Beauty & fashion", multiplier: "1.3" },
  { label: "Fitness & wellness", multiplier: "1.25" },
  { label: "Tech & gadgets", multiplier: "1.4" },
  { label: "Finance", multiplier: "1.6" },
  { label: "Food & cooking", multiplier: "1.15" },
]

export function SocialMediaEarningCalculator() {
  const [followers, setFollowers] = useState("85000")
  const [engagementRatePercent, setEngagementRatePercent] = useState("3.2")
  const [sponsoredPostsPerMonth, setSponsoredPostsPerMonth] = useState("4")
  const [baseCpm, setBaseCpm] = useState("18")
  const [nicheMultiplier, setNicheMultiplier] = useState("1.3")

  const result = useMemo(
    () =>
      calculateSocialMediaEarning({
        followers: Number(followers),
        engagementRatePercent: Number(engagementRatePercent),
        sponsoredPostsPerMonth: Number(sponsoredPostsPerMonth),
        baseCpm: Number(baseCpm),
        nicheMultiplier: Number(nicheMultiplier),
      }),
    [followers, engagementRatePercent, sponsoredPostsPerMonth, baseCpm, nicheMultiplier],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="sme-followers" label="Followers">
          <Input id="sme-followers" type="number" min="1" step="1" value={followers} onChange={(e) => setFollowers(e.target.value)} />
        </Field>
        <Field id="sme-er" label="Engagement rate %">
          <Input id="sme-er" type="number" min="0" max="100" step="0.1" value={engagementRatePercent} onChange={(e) => setEngagementRatePercent(e.target.value)} />
        </Field>
        <Field id="sme-posts" label="Sponsored posts / month">
          <Input id="sme-posts" type="number" min="0" step="1" value={sponsoredPostsPerMonth} onChange={(e) => setSponsoredPostsPerMonth(e.target.value)} />
        </Field>
        <Field id="sme-cpm" label="Base CPM (sponsor rate)">
          <Input id="sme-cpm" type="number" min="0.01" step="0.01" value={baseCpm} onChange={(e) => setBaseCpm(e.target.value)} />
        </Field>
        <Field id="sme-niche" label="Niche" className="sm:col-span-2">
          <select
            id="sme-niche"
            className={selectClassName}
            value={nicheMultiplier}
            onChange={(e) => setNicheMultiplier(e.target.value)}
          >
            {NICHES.map((n) => (
              <option key={n.label} value={n.multiplier}>
                {n.label}
              </option>
            ))}
          </select>
        </Field>
      </form>

      {result ? (
        <ResultPanel
          title="Estimated monthly earnings"
          value={formatMoney(result.monthlyEarnings)}
          subtitle="Influencer rate card estimate from reach, CPM, and sponsored post volume."
        >
          <StatGrid
            items={[
              { label: "Est. reach / post", value: formatNumber(result.estimatedReach, 0) },
              { label: "Rate per post", value: formatMoney(result.ratePerPost) },
              { label: "Annual earnings", value: formatMoney(result.annualEarnings) },
              {
                label: "$ / 1k followers",
                value: formatMoney(result.earningsPerThousandFollowers),
              },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
