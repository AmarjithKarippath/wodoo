"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateFacebookAdsBudget } from "@/lib/calculators/facebook-ads-budget"
import { formatMoney, formatNumber } from "@/lib/calculators/format"

export function FacebookAdsBudgetCalculator() {
  const [dailyBudget, setDailyBudget] = useState("50")
  const [days, setDays] = useState("30")
  const [cpc, setCpc] = useState("0.85")
  const [conversionRatePercent, setConversionRatePercent] = useState("2.5")
  const [averageOrderValue, setAverageOrderValue] = useState("65")

  const result = useMemo(
    () =>
      calculateFacebookAdsBudget({
        dailyBudget: Number(dailyBudget),
        days: Number(days),
        cpc: Number(cpc),
        conversionRatePercent: Number(conversionRatePercent),
        averageOrderValue: Number(averageOrderValue),
      }),
    [dailyBudget, days, cpc, conversionRatePercent, averageOrderValue],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="fb-budget" label="Daily budget">
          <Input id="fb-budget" type="number" min="0.01" step="0.01" value={dailyBudget} onChange={(e) => setDailyBudget(e.target.value)} />
        </Field>
        <Field id="fb-days" label="Campaign days">
          <Input id="fb-days" type="number" min="1" step="1" value={days} onChange={(e) => setDays(e.target.value)} />
        </Field>
        <Field id="fb-cpc" label="Average CPC">
          <Input id="fb-cpc" type="number" min="0.01" step="0.01" value={cpc} onChange={(e) => setCpc(e.target.value)} />
        </Field>
        <Field id="fb-cr" label="Conversion rate %">
          <Input id="fb-cr" type="number" min="0.01" max="100" step="0.1" value={conversionRatePercent} onChange={(e) => setConversionRatePercent(e.target.value)} />
        </Field>
        <Field id="fb-aov" label="Average order value">
          <Input id="fb-aov" type="number" min="0.01" step="0.01" value={averageOrderValue} onChange={(e) => setAverageOrderValue(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title="Projected revenue"
          value={formatMoney(result.revenue)}
          subtitle={`Spend ${formatMoney(result.totalSpend)} · ROAS ${formatNumber(result.roas, 2)}× · CPA ${formatMoney(result.cpa)}`}
        >
          <StatGrid
            items={[
              { label: "Clicks", value: formatNumber(result.clicks, 0) },
              { label: "Orders", value: formatNumber(result.orders, 1) },
              { label: "CPA", value: formatMoney(result.cpa) },
              { label: "ROAS", value: `${formatNumber(result.roas, 2)}×` },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
