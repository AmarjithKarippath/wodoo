"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateDigitalProductMargin } from "@/lib/calculators/digital-product-margin"
import { formatMoney, formatNumber, formatPercent } from "@/lib/calculators/format"

export function DigitalProductMarginCalculator() {
  const [price, setPrice] = useState("97")
  const [platformFeePercent, setPlatformFeePercent] = useState("5")
  const [paymentFeePercent, setPaymentFeePercent] = useState("2.9")
  const [refundRatePercent, setRefundRatePercent] = useState("4")
  const [creationCost, setCreationCost] = useState("2500")
  const [expectedLifetimeSales, setExpectedLifetimeSales] = useState("400")
  const [marketingCostPerSale, setMarketingCostPerSale] = useState("18")

  const result = useMemo(
    () =>
      calculateDigitalProductMargin({
        price: Number(price),
        platformFeePercent: Number(platformFeePercent),
        paymentFeePercent: Number(paymentFeePercent),
        refundRatePercent: Number(refundRatePercent),
        creationCost: Number(creationCost),
        expectedLifetimeSales: Number(expectedLifetimeSales),
        marketingCostPerSale: Number(marketingCostPerSale),
      }),
    [
      price,
      platformFeePercent,
      paymentFeePercent,
      refundRatePercent,
      creationCost,
      expectedLifetimeSales,
      marketingCostPerSale,
    ],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="dp-price" label="Product / course price">
          <Input id="dp-price" type="number" min="0.01" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Field>
        <Field id="dp-creation" label="Creation / production cost">
          <Input id="dp-creation" type="number" min="0" step="1" value={creationCost} onChange={(e) => setCreationCost(e.target.value)} />
        </Field>
        <Field id="dp-platform" label="Platform fee %">
          <Input id="dp-platform" type="number" min="0" max="50" step="0.1" value={platformFeePercent} onChange={(e) => setPlatformFeePercent(e.target.value)} />
        </Field>
        <Field id="dp-pay" label="Payment fee %">
          <Input id="dp-pay" type="number" min="0" max="20" step="0.1" value={paymentFeePercent} onChange={(e) => setPaymentFeePercent(e.target.value)} />
        </Field>
        <Field id="dp-refund" label="Refund rate %">
          <Input id="dp-refund" type="number" min="0" max="50" step="0.1" value={refundRatePercent} onChange={(e) => setRefundRatePercent(e.target.value)} />
        </Field>
        <Field id="dp-mkt" label="Marketing cost / sale">
          <Input id="dp-mkt" type="number" min="0" step="0.01" value={marketingCostPerSale} onChange={(e) => setMarketingCostPerSale(e.target.value)} />
        </Field>
        <Field id="dp-sales" label="Expected lifetime sales" className="sm:col-span-2">
          <Input id="dp-sales" type="number" min="1" step="1" value={expectedLifetimeSales} onChange={(e) => setExpectedLifetimeSales(e.target.value)} />
        </Field>
      </form>

      {result ? (
        <ResultPanel
          title="Net profit / sale"
          value={formatMoney(result.netPerSale)}
          subtitle={`${formatPercent(result.marginPercent)} margin · break-even ~${formatNumber(result.breakEvenSales, 0)} sales`}
        >
          <StatGrid
            items={[
              { label: "Platform fee", value: formatMoney(result.platformFee) },
              { label: "Payment fee", value: formatMoney(result.paymentFee) },
              { label: "Refund reserve", value: formatMoney(result.refundReserve) },
              { label: "Amortized creation", value: formatMoney(result.amortizedCreationCost) },
              { label: "Lifetime profit", value: formatMoney(result.lifetimeProfit) },
              { label: "Break-even sales", value: formatNumber(result.breakEvenSales, 0) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
