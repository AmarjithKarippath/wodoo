"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateLtv } from "@/lib/calculators/ltv"
import { formatMoney, formatNumber } from "@/lib/calculators/format"

export function LtvCalculator() {
  const [averageOrderValue, setAverageOrderValue] = useState("68")
  const [purchaseFrequencyPerYear, setPurchaseFrequencyPerYear] = useState("3")
  const [customerLifespanYears, setCustomerLifespanYears] = useState("2")
  const [grossMarginPercent, setGrossMarginPercent] = useState("55")

  const result = useMemo(
    () =>
      calculateLtv({
        averageOrderValue: Number(averageOrderValue),
        purchaseFrequencyPerYear: Number(purchaseFrequencyPerYear),
        customerLifespanYears: Number(customerLifespanYears),
        grossMarginPercent: Number(grossMarginPercent),
      }),
    [averageOrderValue, purchaseFrequencyPerYear, customerLifespanYears, grossMarginPercent],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="ltv-aov" label="Average order value">
          <Input id="ltv-aov" type="number" min="0.01" step="0.01" value={averageOrderValue} onChange={(e) => setAverageOrderValue(e.target.value)} />
        </Field>
        <Field id="ltv-freq" label="Purchases / year">
          <Input id="ltv-freq" type="number" min="0.1" step="0.1" value={purchaseFrequencyPerYear} onChange={(e) => setPurchaseFrequencyPerYear(e.target.value)} />
        </Field>
        <Field id="ltv-life" label="Customer lifespan (years)">
          <Input id="ltv-life" type="number" min="0.1" step="0.1" value={customerLifespanYears} onChange={(e) => setCustomerLifespanYears(e.target.value)} />
        </Field>
        <Field id="ltv-margin" label="Gross margin %">
          <Input id="ltv-margin" type="number" min="1" max="99" step="0.1" value={grossMarginPercent} onChange={(e) => setGrossMarginPercent(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title="Customer LTV"
          value={formatMoney(result.ltv)}
          subtitle={`${formatNumber(result.lifetimeOrders, 1)} lifetime orders · ${formatMoney(result.annualContribution)} / year contribution`}
        >
          <StatGrid
            items={[
              { label: "Contribution / order", value: formatMoney(result.contributionPerOrder) },
              { label: "Annual contribution", value: formatMoney(result.annualContribution) },
              { label: "Lifetime orders", value: formatNumber(result.lifetimeOrders, 1) },
              { label: "LTV", value: formatMoney(result.ltv) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
