"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateConversionRate } from "@/lib/calculators/conversion-rate"
import { formatNumber, formatPercent } from "@/lib/calculators/format"

export function ConversionRateCalculator() {
  const [visitors, setVisitors] = useState("10000")
  const [orders, setOrders] = useState("250")
  const [salesGoal, setSalesGoal] = useState("500")

  const result = useMemo(
    () =>
      calculateConversionRate({
        visitors: Number(visitors),
        orders: Number(orders),
        salesGoal: Number(salesGoal),
      }),
    [visitors, orders, salesGoal],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="cr-visitors" label="Visitors">
          <Input id="cr-visitors" type="number" min="1" step="1" value={visitors} onChange={(e) => setVisitors(e.target.value)} />
        </Field>
        <Field id="cr-orders" label="Orders / conversions">
          <Input id="cr-orders" type="number" min="0" step="1" value={orders} onChange={(e) => setOrders(e.target.value)} />
        </Field>
        <Field id="cr-goal" label="Sales goal (orders)">
          <Input id="cr-goal" type="number" min="1" step="1" value={salesGoal} onChange={(e) => setSalesGoal(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title="Conversion rate"
          value={formatPercent(result.conversionRatePercent)}
          subtitle={
            Number.isFinite(result.visitorsNeededForGoal)
              ? `About ${formatNumber(result.visitorsNeededForGoal, 0)} visitors needed for ${formatNumber(Number(salesGoal), 0)} sales.`
              : "Add orders to estimate visitors needed for your goal."
          }
        >
          <StatGrid
            items={[
              { label: "Current orders", value: formatNumber(result.ordersFromCurrentTraffic, 0) },
              {
                label: "Visitors for goal",
                value: Number.isFinite(result.visitorsNeededForGoal)
                  ? formatNumber(result.visitorsNeededForGoal, 0)
                  : "—",
              },
              { label: "Conversion rate", value: formatPercent(result.conversionRatePercent) },
              { label: "Sales goal", value: formatNumber(Number(salesGoal), 0) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
