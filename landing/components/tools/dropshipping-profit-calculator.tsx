"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateDropshippingProfit } from "@/lib/calculators/dropshipping-profit"
import { formatMoney, formatPercent } from "@/lib/calculators/format"

export function DropshippingProfitCalculator() {
  const [sellingPrice, setSellingPrice] = useState("39.99")
  const [productCost, setProductCost] = useState("12")
  const [shippingCost, setShippingCost] = useState("4.5")
  const [adCostPerOrder, setAdCostPerOrder] = useState("8")
  const [platformFeePercent, setPlatformFeePercent] = useState("2.9")

  const result = useMemo(
    () =>
      calculateDropshippingProfit({
        sellingPrice: Number(sellingPrice),
        productCost: Number(productCost),
        shippingCost: Number(shippingCost),
        adCostPerOrder: Number(adCostPerOrder),
        platformFeePercent: Number(platformFeePercent),
      }),
    [sellingPrice, productCost, shippingCost, adCostPerOrder, platformFeePercent],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="ds-price" label="Selling price">
          <Input id="ds-price" type="number" min="0.01" step="0.01" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
        </Field>
        <Field id="ds-cost" label="Product / supplier cost">
          <Input id="ds-cost" type="number" min="0" step="0.01" value={productCost} onChange={(e) => setProductCost(e.target.value)} />
        </Field>
        <Field id="ds-ship" label="Shipping cost / order">
          <Input id="ds-ship" type="number" min="0" step="0.01" value={shippingCost} onChange={(e) => setShippingCost(e.target.value)} />
        </Field>
        <Field id="ds-ads" label="Ad cost / order">
          <Input id="ds-ads" type="number" min="0" step="0.01" value={adCostPerOrder} onChange={(e) => setAdCostPerOrder(e.target.value)} />
        </Field>
        <Field id="ds-fee" label="Platform fee %">
          <Input id="ds-fee" type="number" min="0" max="30" step="0.1" value={platformFeePercent} onChange={(e) => setPlatformFeePercent(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title="Profit per order"
          value={formatMoney(result.profit)}
          subtitle={`Margin ${formatPercent(result.marginPercent)} · break-even around ${formatMoney(result.breakEvenPrice)}`}
        >
          <StatGrid
            items={[
              { label: "Total cost", value: formatMoney(result.totalCost) },
              { label: "Platform fee", value: formatMoney(result.platformFee) },
              { label: "Margin", value: formatPercent(result.marginPercent) },
              { label: "Break-even price", value: formatMoney(result.breakEvenPrice) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
