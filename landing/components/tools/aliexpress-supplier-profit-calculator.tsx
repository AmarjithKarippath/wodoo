"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateAliExpressProfit } from "@/lib/calculators/aliexpress-supplier-profit"
import { formatMoney, formatPercent } from "@/lib/calculators/format"

export function AliExpressSupplierProfitCalculator() {
  const [sellingPrice, setSellingPrice] = useState("49")
  const [supplierCost, setSupplierCost] = useState("14")
  const [shippingCost, setShippingCost] = useState("6")
  const [customsDutyPercent, setCustomsDutyPercent] = useState("5")
  const [paymentFeePercent, setPaymentFeePercent] = useState("2.9")
  const [adCostPerOrder, setAdCostPerOrder] = useState("10")

  const result = useMemo(
    () =>
      calculateAliExpressProfit({
        sellingPrice: Number(sellingPrice),
        supplierCost: Number(supplierCost),
        shippingCost: Number(shippingCost),
        customsDutyPercent: Number(customsDutyPercent),
        paymentFeePercent: Number(paymentFeePercent),
        adCostPerOrder: Number(adCostPerOrder),
      }),
    [sellingPrice, supplierCost, shippingCost, customsDutyPercent, paymentFeePercent, adCostPerOrder],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="ae-price" label="Selling price">
          <Input id="ae-price" type="number" min="0.01" step="0.01" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
        </Field>
        <Field id="ae-supplier" label="Supplier / AliExpress cost">
          <Input id="ae-supplier" type="number" min="0" step="0.01" value={supplierCost} onChange={(e) => setSupplierCost(e.target.value)} />
        </Field>
        <Field id="ae-ship" label="Inbound shipping">
          <Input id="ae-ship" type="number" min="0" step="0.01" value={shippingCost} onChange={(e) => setShippingCost(e.target.value)} />
        </Field>
        <Field id="ae-duty" label="Customs duty %">
          <Input id="ae-duty" type="number" min="0" max="100" step="0.1" value={customsDutyPercent} onChange={(e) => setCustomsDutyPercent(e.target.value)} />
        </Field>
        <Field id="ae-pay" label="Payment fee %">
          <Input id="ae-pay" type="number" min="0" max="20" step="0.1" value={paymentFeePercent} onChange={(e) => setPaymentFeePercent(e.target.value)} />
        </Field>
        <Field id="ae-ads" label="Ad cost / order">
          <Input id="ae-ads" type="number" min="0" step="0.01" value={adCostPerOrder} onChange={(e) => setAdCostPerOrder(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title="Profit per unit"
          value={formatMoney(result.profit)}
          subtitle={`Landed cost ${formatMoney(result.landedCost)} · margin ${formatPercent(result.marginPercent)}`}
        >
          <StatGrid
            items={[
              { label: "Landed cost", value: formatMoney(result.landedCost) },
              { label: "Duty", value: formatMoney(result.duty) },
              { label: "Payment fee", value: formatMoney(result.paymentFee) },
              { label: "Total cost", value: formatMoney(result.totalCost) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
