"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateFba } from "@/lib/calculators/fba-fee"
import { formatMoney, formatPercent } from "@/lib/calculators/format"

export function FbaFeeCalculator() {
  const [sellingPrice, setSellingPrice] = useState("29.99")
  const [productCost, setProductCost] = useState("8.50")
  const [referralFeePercent, setReferralFeePercent] = useState("15")
  const [fulfillmentFee, setFulfillmentFee] = useState("5.40")
  const [monthlyStorageFee, setMonthlyStorageFee] = useState("0.75")
  const [otherFees, setOtherFees] = useState("0")

  const result = useMemo(
    () =>
      calculateFba({
        sellingPrice: Number(sellingPrice),
        productCost: Number(productCost),
        referralFeePercent: Number(referralFeePercent),
        fulfillmentFee: Number(fulfillmentFee),
        monthlyStorageFee: Number(monthlyStorageFee),
        otherFees: Number(otherFees),
      }),
    [
      sellingPrice,
      productCost,
      referralFeePercent,
      fulfillmentFee,
      monthlyStorageFee,
      otherFees,
    ],
  )

  return (
    <div className="space-y-8">
      <form
        className="grid gap-5 sm:grid-cols-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <Field id="fba-price" label="Selling price">
          <Input id="fba-price" type="number" min="0" step="0.01" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
        </Field>
        <Field id="fba-cogs" label="Product cost (COGS)">
          <Input id="fba-cogs" type="number" min="0" step="0.01" value={productCost} onChange={(e) => setProductCost(e.target.value)} />
        </Field>
        <Field id="fba-referral" label="Referral fee %" hint="Often ~8–15% by category on Amazon.">
          <Input id="fba-referral" type="number" min="0" max="100" step="0.1" value={referralFeePercent} onChange={(e) => setReferralFeePercent(e.target.value)} />
        </Field>
        <Field id="fba-fulfillment" label="Fulfillment fee">
          <Input id="fba-fulfillment" type="number" min="0" step="0.01" value={fulfillmentFee} onChange={(e) => setFulfillmentFee(e.target.value)} />
        </Field>
        <Field id="fba-storage" label="Monthly storage fee">
          <Input id="fba-storage" type="number" min="0" step="0.01" value={monthlyStorageFee} onChange={(e) => setMonthlyStorageFee(e.target.value)} />
        </Field>
        <Field id="fba-other" label="Other fees">
          <Input id="fba-other" type="number" min="0" step="0.01" value={otherFees} onChange={(e) => setOtherFees(e.target.value)} />
        </Field>
      </form>

      {result ? (
        <ResultPanel
          title="Estimated net profit per unit"
          value={formatMoney(result.grossProfit)}
          subtitle={`Margin ${formatPercent(result.marginPercent)} after Amazon-style FBA fees.`}
        >
          <StatGrid
            items={[
              { label: "Referral fee", value: formatMoney(result.referralFee) },
              { label: "Total fees", value: formatMoney(result.totalFees) },
              { label: "Net revenue", value: formatMoney(result.netRevenue) },
              { label: "Fees % of price", value: formatPercent(result.feePercentOfPrice) },
            ]}
          />
        </ResultPanel>
      ) : (
        <p className="text-sm text-muted-foreground">Enter a selling price above product cost inputs to calculate.</p>
      )}
    </div>
  )
}
