"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateProfitMargin } from "@/lib/calculators/profit-margin"
import { formatMoney, formatPercent } from "@/lib/calculators/format"

export function ProfitMarginCalculator() {
  const [sellingPrice, setSellingPrice] = useState("48")
  const [cogs, setCogs] = useState("16")
  const [shippingCost, setShippingCost] = useState("6")
  const [paymentFees, setPaymentFees] = useState("1.50")
  const [adSpend, setAdSpend] = useState("200")
  const [otherCosts, setOtherCosts] = useState("1")
  const [unitsSold, setUnitsSold] = useState("100")

  const result = useMemo(
    () =>
      calculateProfitMargin({
        sellingPrice: Number(sellingPrice),
        cogs: Number(cogs),
        shippingCost: Number(shippingCost),
        paymentFees: Number(paymentFees),
        adSpend: Number(adSpend),
        otherCosts: Number(otherCosts),
        unitsSold: Number(unitsSold),
      }),
    [sellingPrice, cogs, shippingCost, paymentFees, adSpend, otherCosts, unitsSold],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="pm-price" label="Selling price / unit">
          <Input id="pm-price" type="number" min="0" step="0.01" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
        </Field>
        <Field id="pm-units" label="Units sold">
          <Input id="pm-units" type="number" min="1" step="1" value={unitsSold} onChange={(e) => setUnitsSold(e.target.value)} />
        </Field>
        <Field id="pm-cogs" label="COGS / unit">
          <Input id="pm-cogs" type="number" min="0" step="0.01" value={cogs} onChange={(e) => setCogs(e.target.value)} />
        </Field>
        <Field id="pm-ship" label="Shipping cost / unit">
          <Input id="pm-ship" type="number" min="0" step="0.01" value={shippingCost} onChange={(e) => setShippingCost(e.target.value)} />
        </Field>
        <Field id="pm-pay" label="Payment fees / unit">
          <Input id="pm-pay" type="number" min="0" step="0.01" value={paymentFees} onChange={(e) => setPaymentFees(e.target.value)} />
        </Field>
        <Field id="pm-other" label="Other costs / unit">
          <Input id="pm-other" type="number" min="0" step="0.01" value={otherCosts} onChange={(e) => setOtherCosts(e.target.value)} />
        </Field>
        <Field id="pm-ads" label="Ad spend (total)" className="space-y-2 sm:col-span-2">
          <Input id="pm-ads" type="number" min="0" step="0.01" value={adSpend} onChange={(e) => setAdSpend(e.target.value)} />
        </Field>
      </form>

      {result ? (
        <ResultPanel
          title="Net profit margin"
          value={formatPercent(result.netMarginPercent)}
          subtitle={`Net profit ${formatMoney(result.netProfit)} · ${formatMoney(result.profitPerUnit)} per unit`}
        >
          <StatGrid
            items={[
              { label: "Revenue", value: formatMoney(result.revenue) },
              { label: "Total costs", value: formatMoney(result.totalCosts) },
              { label: "Gross profit", value: formatMoney(result.grossProfit) },
              { label: "Gross margin", value: formatPercent(result.grossMarginPercent) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
