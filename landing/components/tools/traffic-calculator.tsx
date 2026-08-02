"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateTraffic } from "@/lib/calculators/traffic"
import { formatMoney, formatNumber } from "@/lib/calculators/format"

export function TrafficCalculator() {
  const [monthlyProfitGoal, setMonthlyProfitGoal] = useState("5000")
  const [averageOrderValue, setAverageOrderValue] = useState("65")
  const [grossMarginPercent, setGrossMarginPercent] = useState("45")
  const [conversionRatePercent, setConversionRatePercent] = useState("2.2")

  const result = useMemo(
    () =>
      calculateTraffic({
        monthlyProfitGoal: Number(monthlyProfitGoal),
        averageOrderValue: Number(averageOrderValue),
        grossMarginPercent: Number(grossMarginPercent),
        conversionRatePercent: Number(conversionRatePercent),
      }),
    [monthlyProfitGoal, averageOrderValue, grossMarginPercent, conversionRatePercent],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="tr-goal" label="Monthly profit goal">
          <Input id="tr-goal" type="number" min="1" step="1" value={monthlyProfitGoal} onChange={(e) => setMonthlyProfitGoal(e.target.value)} />
        </Field>
        <Field id="tr-aov" label="Average order value">
          <Input id="tr-aov" type="number" min="0.01" step="0.01" value={averageOrderValue} onChange={(e) => setAverageOrderValue(e.target.value)} />
        </Field>
        <Field id="tr-margin" label="Gross margin %">
          <Input id="tr-margin" type="number" min="1" max="99" step="0.1" value={grossMarginPercent} onChange={(e) => setGrossMarginPercent(e.target.value)} />
        </Field>
        <Field id="tr-cr" label="Conversion rate %">
          <Input id="tr-cr" type="number" min="0.01" max="100" step="0.1" value={conversionRatePercent} onChange={(e) => setConversionRatePercent(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title="Monthly visitors needed"
          value={formatNumber(result.visitorsNeeded, 0)}
          subtitle={`About ${formatNumber(result.dailyVisitorsNeeded, 0)} visitors / day · ${formatNumber(result.ordersNeeded, 0)} orders`}
        >
          <StatGrid
            items={[
              { label: "Profit / order", value: formatMoney(result.profitPerOrder) },
              { label: "Orders needed", value: formatNumber(result.ordersNeeded, 0) },
              { label: "Daily visitors", value: formatNumber(result.dailyVisitorsNeeded, 0) },
              { label: "Monthly visitors", value: formatNumber(result.visitorsNeeded, 0) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
