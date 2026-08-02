"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateRoas } from "@/lib/calculators/roas"
import { formatMoney, formatNumber, formatPercent } from "@/lib/calculators/format"

export function RoasCalculator() {
  const [adSpend, setAdSpend] = useState("1000")
  const [revenue, setRevenue] = useState("3500")
  const [grossMarginPercent, setGrossMarginPercent] = useState("55")

  const result = useMemo(
    () =>
      calculateRoas({
        adSpend: Number(adSpend),
        revenue: Number(revenue),
        grossMarginPercent: Number(grossMarginPercent),
      }),
    [adSpend, revenue, grossMarginPercent],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="roas-spend" label="Ad spend">
          <Input id="roas-spend" type="number" min="0.01" step="0.01" value={adSpend} onChange={(e) => setAdSpend(e.target.value)} />
        </Field>
        <Field id="roas-rev" label="Attributed revenue">
          <Input id="roas-rev" type="number" min="0" step="0.01" value={revenue} onChange={(e) => setRevenue(e.target.value)} />
        </Field>
        <Field id="roas-margin" label="Gross margin %">
          <Input id="roas-margin" type="number" min="1" max="99" step="0.1" value={grossMarginPercent} onChange={(e) => setGrossMarginPercent(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title="ROAS"
          value={`${formatNumber(result.roas, 2)}×`}
          subtitle={
            result.isProfitable
              ? "Above break-even on contribution margin."
              : "Below break-even — ads are losing money after margin."
          }
        >
          <StatGrid
            items={[
              { label: "Contribution profit", value: formatMoney(result.profit) },
              {
                label: "Break-even ROAS",
                value: Number.isFinite(result.breakEvenRoas)
                  ? `${formatNumber(result.breakEvenRoas, 2)}×`
                  : "—",
              },
              { label: "Margin used", value: formatPercent(Number(grossMarginPercent)) },
              { label: "Status", value: result.isProfitable ? "Profitable" : "Unprofitable" },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
