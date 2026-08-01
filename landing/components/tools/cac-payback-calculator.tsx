"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateCacPayback } from "@/lib/calculators/cac-payback"
import { formatMoney, formatNumber } from "@/lib/calculators/format"

export function CacPaybackCalculator() {
  const [cac, setCac] = useState("45")
  const [averageOrderValue, setAverageOrderValue] = useState("68")
  const [grossMarginPercent, setGrossMarginPercent] = useState("55")
  const [purchaseFrequencyPerYear, setPurchaseFrequencyPerYear] = useState("3")

  const result = useMemo(
    () =>
      calculateCacPayback({
        cac: Number(cac),
        averageOrderValue: Number(averageOrderValue),
        grossMarginPercent: Number(grossMarginPercent),
        purchaseFrequencyPerYear: Number(purchaseFrequencyPerYear),
      }),
    [cac, averageOrderValue, grossMarginPercent, purchaseFrequencyPerYear],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="cac" label="Customer acquisition cost (CAC)">
          <Input id="cac" type="number" min="0.01" step="0.01" value={cac} onChange={(e) => setCac(e.target.value)} />
        </Field>
        <Field id="cac-aov" label="Average order value">
          <Input id="cac-aov" type="number" min="0.01" step="0.01" value={averageOrderValue} onChange={(e) => setAverageOrderValue(e.target.value)} />
        </Field>
        <Field id="cac-margin" label="Gross margin %">
          <Input id="cac-margin" type="number" min="1" max="99" step="0.1" value={grossMarginPercent} onChange={(e) => setGrossMarginPercent(e.target.value)} />
        </Field>
        <Field id="cac-freq" label="Purchases per customer / year">
          <Input id="cac-freq" type="number" min="0.1" step="0.1" value={purchaseFrequencyPerYear} onChange={(e) => setPurchaseFrequencyPerYear(e.target.value)} />
        </Field>
      </form>

      {result ? (
        <ResultPanel
          title="CAC payback period"
          value={`${formatNumber(result.paybackMonths, 1)} mo`}
          subtitle={`LTV:CAC about ${formatNumber(result.ltvToCac, 2)}× using first-year contribution.`}
        >
          <StatGrid
            items={[
              { label: "Contribution / order", value: formatMoney(result.contributionPerOrder) },
              { label: "Annual contribution", value: formatMoney(result.annualContribution) },
              { label: "12-month LTV", value: formatMoney(result.ltv12Month) },
              { label: "LTV:CAC", value: `${formatNumber(result.ltvToCac, 2)}×` },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
