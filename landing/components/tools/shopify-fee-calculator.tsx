"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateShopifyFees } from "@/lib/calculators/shopify-fee"
import { formatMoney, formatPercent } from "@/lib/calculators/format"

export function ShopifyFeeCalculator() {
  const [orderValue, setOrderValue] = useState("68")
  const [monthlyOrders, setMonthlyOrders] = useState("200")
  const [planFee, setPlanFee] = useState("39")
  const [cardRatePercent, setCardRatePercent] = useState("2.9")
  const [cardFixedFee, setCardFixedFee] = useState("0.30")

  const result = useMemo(
    () =>
      calculateShopifyFees({
        orderValue: Number(orderValue),
        monthlyOrders: Number(monthlyOrders),
        planFee: Number(planFee),
        cardRatePercent: Number(cardRatePercent),
        cardFixedFee: Number(cardFixedFee),
      }),
    [orderValue, monthlyOrders, planFee, cardRatePercent, cardFixedFee],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="sf-aov" label="Average order value">
          <Input id="sf-aov" type="number" min="0.01" step="0.01" value={orderValue} onChange={(e) => setOrderValue(e.target.value)} />
        </Field>
        <Field id="sf-orders" label="Monthly orders">
          <Input id="sf-orders" type="number" min="0" step="1" value={monthlyOrders} onChange={(e) => setMonthlyOrders(e.target.value)} />
        </Field>
        <Field id="sf-plan" label="Monthly plan fee">
          <Input id="sf-plan" type="number" min="0" step="0.01" value={planFee} onChange={(e) => setPlanFee(e.target.value)} />
        </Field>
        <Field id="sf-rate" label="Card rate %">
          <Input id="sf-rate" type="number" min="0" max="20" step="0.1" value={cardRatePercent} onChange={(e) => setCardRatePercent(e.target.value)} />
        </Field>
        <Field id="sf-fixed" label="Fixed fee / order">
          <Input id="sf-fixed" type="number" min="0" step="0.01" value={cardFixedFee} onChange={(e) => setCardFixedFee(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title="Total monthly fees"
          value={formatMoney(result.totalMonthlyFees)}
          subtitle={`About ${formatPercent(result.feePercentOfSales)} of sales · net ~${formatMoney(result.netPerOrder)} / order`}
        >
          <StatGrid
            items={[
              { label: "Payment fee / order", value: formatMoney(result.paymentFeePerOrder) },
              { label: "Monthly payment fees", value: formatMoney(result.monthlyPaymentFees) },
              { label: "Plan fee", value: formatMoney(result.monthlyPlanFee) },
              { label: "Net / order", value: formatMoney(result.netPerOrder) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
