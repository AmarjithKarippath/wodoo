"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateCpaAdCost } from "@/lib/calculators/cpa-ad-cost"
import { formatMoney } from "@/lib/calculators/format"

export function CpaAdCostCalculator() {
  const [adSpend, setAdSpend] = useState("1200")
  const [conversions, setConversions] = useState("40")
  const [averageOrderValue, setAverageOrderValue] = useState("70")
  const [grossMarginPercent, setGrossMarginPercent] = useState("50")

  const result = useMemo(
    () =>
      calculateCpaAdCost({
        adSpend: Number(adSpend),
        conversions: Number(conversions),
        averageOrderValue: Number(averageOrderValue),
        grossMarginPercent: Number(grossMarginPercent),
      }),
    [adSpend, conversions, averageOrderValue, grossMarginPercent],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="cpa-spend" label="Ad spend">
          <Input id="cpa-spend" type="number" min="0" step="0.01" value={adSpend} onChange={(e) => setAdSpend(e.target.value)} />
        </Field>
        <Field id="cpa-conv" label="Conversions / orders">
          <Input id="cpa-conv" type="number" min="1" step="1" value={conversions} onChange={(e) => setConversions(e.target.value)} />
        </Field>
        <Field id="cpa-aov" label="Average order value">
          <Input id="cpa-aov" type="number" min="0.01" step="0.01" value={averageOrderValue} onChange={(e) => setAverageOrderValue(e.target.value)} />
        </Field>
        <Field id="cpa-margin" label="Gross margin %">
          <Input id="cpa-margin" type="number" min="1" max="99" step="0.1" value={grossMarginPercent} onChange={(e) => setGrossMarginPercent(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title="Cost per acquisition"
          value={formatMoney(result.cpa)}
          subtitle={
            result.isProfitable
              ? `Under max CPA by ${formatMoney(result.headroom)}.`
              : `Over max CPA by ${formatMoney(Math.abs(result.headroom))} — tighten targeting or raise margin.`
          }
        >
          <StatGrid
            items={[
              { label: "Max profitable CPA", value: formatMoney(result.maxProfitableCpa) },
              { label: "Contribution / order", value: formatMoney(result.contributionPerOrder) },
              { label: "Headroom", value: formatMoney(result.headroom) },
              { label: "Status", value: result.isProfitable ? "Healthy" : "Too high" },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
