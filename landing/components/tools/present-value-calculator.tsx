"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import {
  calculatePresentValue,
  type PresentValueMode,
} from "@/lib/calculators/present-value"
import { formatMoney } from "@/lib/calculators/format"

export function PresentValueCalculator() {
  const [mode, setMode] = useState<PresentValueMode>("pv")
  const [rate, setRate] = useState("8")
  const [periods, setPeriods] = useState("10")
  const [amount, setAmount] = useState("100000")
  const [payment, setPayment] = useState("0")
  const [npvFlows, setNpvFlows] = useState("-50000, 15000, 20000, 25000")

  const result = useMemo(() => {
    if (mode === "npv") {
      const cashFlows = npvFlows
        .split(/[\s,]+/)
        .map((s) => s.trim())
        .filter(Boolean)
        .map(Number)
      return calculatePresentValue({
        mode,
        ratePercent: Number(rate),
        periods: cashFlows.length,
        amount: 0,
        cashFlows,
      })
    }
    return calculatePresentValue({
      mode,
      ratePercent: Number(rate),
      periods: Number(periods),
      amount: Number(amount),
      payment: Number(payment),
    })
  }, [mode, rate, periods, amount, payment, npvFlows])

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="pv-mode" label="Mode" className="sm:col-span-2 space-y-2">
          <select id="pv-mode" className={selectClassName} value={mode} onChange={(e) => setMode(e.target.value as PresentValueMode)}>
            <option value="pv">Present value (of future amount)</option>
            <option value="fv">Future value (of present amount)</option>
            <option value="npv">NPV of cash flows</option>
          </select>
        </Field>
        <Field id="pv-r" label="Discount / growth rate (% per period)">
          <Input id="pv-r" type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        {mode !== "npv" ? (
          <>
            <Field id="pv-n" label="Periods">
              <Input id="pv-n" type="number" min="1" step="1" value={periods} onChange={(e) => setPeriods(e.target.value)} />
            </Field>
            <Field id="pv-a" label={mode === "pv" ? "Future amount" : "Present amount"}>
              <Input id="pv-a" type="number" step="1000" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </Field>
            <Field id="pv-pmt" label="Payment per period (optional)">
              <Input id="pv-pmt" type="number" step="100" value={payment} onChange={(e) => setPayment(e.target.value)} />
            </Field>
          </>
        ) : (
          <Field id="pv-cf" label="Cash flows" className="sm:col-span-2 space-y-2" hint="Comma-separated, period 0 first.">
            <Input id="pv-cf" value={npvFlows} onChange={(e) => setNpvFlows(e.target.value)} />
          </Field>
        )}
      </form>
      {result ? (
        <ResultPanel
          title={mode === "fv" ? "Future value" : "Present value / NPV"}
          value={formatMoney(mode === "fv" ? result.futureValue : result.presentValue, "INR")}
        >
          <StatGrid
            items={[
              { label: "Present value", value: formatMoney(result.presentValue, "INR") },
              { label: "Future value", value: formatMoney(result.futureValue, "INR") },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
