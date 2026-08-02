"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateWinningProductScore } from "@/lib/calculators/winning-product-score"
import { formatNumber } from "@/lib/calculators/format"

export function WinningProductScoreCalculator() {
  const [demand, setDemand] = useState("7")
  const [competition, setCompetition] = useState("5")
  const [marginPercent, setMarginPercent] = useState("45")
  const [trend, setTrend] = useState("6")
  const [shippingEase, setShippingEase] = useState("7")

  const result = useMemo(
    () =>
      calculateWinningProductScore({
        demand: Number(demand),
        competition: Number(competition),
        marginPercent: Number(marginPercent),
        trend: Number(trend),
        shippingEase: Number(shippingEase),
      }),
    [demand, competition, marginPercent, trend, shippingEase],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="wp-demand" label="Demand (1–10)" hint="Search interest / market size">
          <Input id="wp-demand" type="number" min="1" max="10" step="1" value={demand} onChange={(e) => setDemand(e.target.value)} />
        </Field>
        <Field id="wp-comp" label="Competition (1–10)" hint="Higher = more saturated">
          <Input id="wp-comp" type="number" min="1" max="10" step="1" value={competition} onChange={(e) => setCompetition(e.target.value)} />
        </Field>
        <Field id="wp-margin" label="Expected margin %">
          <Input id="wp-margin" type="number" min="0" max="90" step="1" value={marginPercent} onChange={(e) => setMarginPercent(e.target.value)} />
        </Field>
        <Field id="wp-trend" label="Trend strength (1–10)">
          <Input id="wp-trend" type="number" min="1" max="10" step="1" value={trend} onChange={(e) => setTrend(e.target.value)} />
        </Field>
        <Field id="wp-ship" label="Shipping ease (1–10)" hint="Light, durable, simple to fulfill">
          <Input id="wp-ship" type="number" min="1" max="10" step="1" value={shippingEase} onChange={(e) => setShippingEase(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title={`Grade ${result.grade}`}
          value={`${formatNumber(result.score, 0)} / 100`}
          subtitle={result.summary}
        >
          <StatGrid
            items={result.breakdown.map((b) => ({
              label: b.label,
              value: `${b.points}/${b.max}`,
            }))}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
