"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculatePodProfit } from "@/lib/calculators/pod-profit"
import { formatMoney, formatPercent } from "@/lib/calculators/format"

export function PodProfitPlanner() {
  const [sellingPrice, setSellingPrice] = useState("29.99")
  const [baseProductCost, setBaseProductCost] = useState("8.50")
  const [printCost, setPrintCost] = useState("4.25")
  const [shippingCharged, setShippingCharged] = useState("4.99")
  const [shippingCost, setShippingCost] = useState("5.40")
  const [paymentFeePercent, setPaymentFeePercent] = useState("2.9")
  const [adCostPerOrder, setAdCostPerOrder] = useState("6")
  const [monthlyUnits, setMonthlyUnits] = useState("120")

  const result = useMemo(
    () =>
      calculatePodProfit({
        sellingPrice: Number(sellingPrice),
        baseProductCost: Number(baseProductCost),
        printCost: Number(printCost),
        shippingCharged: Number(shippingCharged),
        shippingCost: Number(shippingCost),
        paymentFeePercent: Number(paymentFeePercent),
        adCostPerOrder: Number(adCostPerOrder),
        monthlyUnits: Number(monthlyUnits),
      }),
    [
      sellingPrice,
      baseProductCost,
      printCost,
      shippingCharged,
      shippingCost,
      paymentFeePercent,
      adCostPerOrder,
      monthlyUnits,
    ],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="pod-price" label="Selling price">
          <Input id="pod-price" type="number" min="0.01" step="0.01" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
        </Field>
        <Field id="pod-base" label="Blank / base product cost">
          <Input id="pod-base" type="number" min="0" step="0.01" value={baseProductCost} onChange={(e) => setBaseProductCost(e.target.value)} />
        </Field>
        <Field id="pod-print" label="Print / fulfillment fee">
          <Input id="pod-print" type="number" min="0" step="0.01" value={printCost} onChange={(e) => setPrintCost(e.target.value)} />
        </Field>
        <Field id="pod-ship-charge" label="Shipping charged to customer">
          <Input id="pod-ship-charge" type="number" min="0" step="0.01" value={shippingCharged} onChange={(e) => setShippingCharged(e.target.value)} />
        </Field>
        <Field id="pod-ship-cost" label="Actual shipping cost">
          <Input id="pod-ship-cost" type="number" min="0" step="0.01" value={shippingCost} onChange={(e) => setShippingCost(e.target.value)} />
        </Field>
        <Field id="pod-fee" label="Payment fee %">
          <Input id="pod-fee" type="number" min="0" max="30" step="0.1" value={paymentFeePercent} onChange={(e) => setPaymentFeePercent(e.target.value)} />
        </Field>
        <Field id="pod-ads" label="Ad cost / order">
          <Input id="pod-ads" type="number" min="0" step="0.01" value={adCostPerOrder} onChange={(e) => setAdCostPerOrder(e.target.value)} />
        </Field>
        <Field id="pod-units" label="Expected monthly units">
          <Input id="pod-units" type="number" min="0" step="1" value={monthlyUnits} onChange={(e) => setMonthlyUnits(e.target.value)} />
        </Field>
      </form>

      {result ? (
        <ResultPanel
          title="Profit per order"
          value={formatMoney(result.profitPerOrder)}
          subtitle={`${formatPercent(result.marginPercent)} margin · break-even ad spend ${formatMoney(result.breakEvenAdCost)}`}
        >
          <StatGrid
            items={[
              { label: "Revenue / order", value: formatMoney(result.revenuePerOrder) },
              { label: "Cost / order", value: formatMoney(result.totalCostPerOrder) },
              { label: "Monthly profit", value: formatMoney(result.monthlyProfit) },
              { label: "Monthly revenue", value: formatMoney(result.monthlyRevenue) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
