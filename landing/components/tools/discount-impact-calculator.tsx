"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateDiscountImpact } from "@/lib/calculators/discount-impact"
import { formatMoney, formatNumber, formatPercent } from "@/lib/calculators/format"

export function DiscountImpactCalculator() {
  const [price, setPrice] = useState("80")
  const [cost, setCost] = useState("28")
  const [discountPercent, setDiscountPercent] = useState("20")

  const result = useMemo(
    () =>
      calculateDiscountImpact({
        price: Number(price),
        cost: Number(cost),
        discountPercent: Number(discountPercent),
      }),
    [price, cost, discountPercent],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="di-price" label="Regular price">
          <Input id="di-price" type="number" min="0.01" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Field>
        <Field id="di-cost" label="Unit cost">
          <Input id="di-cost" type="number" min="0" step="0.01" value={cost} onChange={(e) => setCost(e.target.value)} />
        </Field>
        <Field id="di-disc" label="Discount %">
          <Input id="di-disc" type="number" min="0" max="99" step="0.1" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title="Discounted profit / unit"
          value={formatMoney(result.discountedProfit)}
          subtitle={
            Number.isFinite(result.unitsNeededForSameProfit)
              ? `Sell ~${formatNumber(result.unitsNeededForSameProfit, 2)}× units (${formatPercent(result.extraUnitsPercent)} more) to match original profit.`
              : "Discount wipes out profit — raise price or cut cost."
          }
        >
          <StatGrid
            items={[
              { label: "Sale price", value: formatMoney(result.discountedPrice) },
              { label: "Original profit", value: formatMoney(result.originalProfit) },
              { label: "Original margin", value: formatPercent(result.originalMarginPercent) },
              { label: "Sale margin", value: formatPercent(result.discountedMarginPercent) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
