"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import { calculateGst, type GstMode } from "@/lib/calculators/gst"
import { formatMoney, formatPercent } from "@/lib/calculators/format"

export function GstCalculator() {
  const [amount, setAmount] = useState("10000")
  const [rate, setRate] = useState("18")
  const [mode, setMode] = useState<GstMode>("exclusive")

  const result = useMemo(
    () =>
      calculateGst({
        amount: Number(amount),
        gstRatePercent: Number(rate),
        mode,
      }),
    [amount, rate, mode],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="gst-mode" label="Amount type">
          <select id="gst-mode" className={selectClassName} value={mode} onChange={(e) => setMode(e.target.value as GstMode)}>
            <option value="exclusive">Add GST (exclusive)</option>
            <option value="inclusive">Remove GST (inclusive)</option>
          </select>
        </Field>
        <Field id="gst-rate" label="GST rate (%)">
          <select id="gst-rate" className={selectClassName} value={rate} onChange={(e) => setRate(e.target.value)}>
            <option value="5">5%</option>
            <option value="12">12%</option>
            <option value="18">18%</option>
            <option value="28">28%</option>
          </select>
        </Field>
        <Field id="gst-amt" label="Amount" className="sm:col-span-2 space-y-2">
          <Input id="gst-amt" type="number" min="0.01" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel title="Total amount" value={formatMoney(result.totalAmount, "INR")}>
          <StatGrid
            items={[
              { label: "Taxable value", value: formatMoney(result.baseAmount, "INR") },
              { label: "GST amount", value: formatMoney(result.gstAmount, "INR") },
              { label: "CGST", value: formatMoney(result.cgst, "INR") },
              { label: "SGST", value: formatMoney(result.sgst, "INR") },
              { label: "GST rate", value: formatPercent(Number(rate), 0) },
              { label: "Invoice total", value: formatMoney(result.totalAmount, "INR") },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
