"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import { calculateInterest, type InterestMode } from "@/lib/calculators/interest"
import { formatMoney } from "@/lib/calculators/format"

export function InterestCalculator() {
  const [mode, setMode] = useState<InterestMode>("simple")
  const [principal, setPrincipal] = useState("100000")
  const [rate, setRate] = useState("8")
  const [years, setYears] = useState("5")
  const [compounds, setCompounds] = useState("4")

  const result = useMemo(
    () =>
      calculateInterest({
        mode,
        principal: Number(principal),
        annualRatePercent: Number(rate),
        years: Number(years),
        compoundsPerYear: Number(compounds),
      }),
    [mode, principal, rate, years, compounds],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="int-mode" label="Interest type">
          <select id="int-mode" className={selectClassName} value={mode} onChange={(e) => setMode(e.target.value as InterestMode)}>
            <option value="simple">Simple interest</option>
            <option value="compound">Compound interest</option>
          </select>
        </Field>
        <Field id="int-p" label="Principal">
          <Input id="int-p" type="number" min="0" step="1000" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </Field>
        <Field id="int-r" label="Annual rate (%)">
          <Input id="int-r" type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field id="int-y" label="Years">
          <Input id="int-y" type="number" min="0.1" step="0.5" value={years} onChange={(e) => setYears(e.target.value)} />
        </Field>
        {mode === "compound" ? (
          <Field id="int-n" label="Compounding">
            <select id="int-n" className={selectClassName} value={compounds} onChange={(e) => setCompounds(e.target.value)}>
              <option value="1">Annually</option>
              <option value="2">Semi-annually</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
            </select>
          </Field>
        ) : null}
      </form>
      {result ? (
        <ResultPanel title="Total amount" value={formatMoney(result.totalAmount, "INR")}>
          <StatGrid
            items={[
              { label: "Interest earned", value: formatMoney(result.interest, "INR") },
              { label: "Total amount", value: formatMoney(result.totalAmount, "INR") },
              { label: "Type", value: result.mode === "simple" ? "Simple" : "Compound" },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
