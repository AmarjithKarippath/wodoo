"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import {
  calculateIncomeTax,
  type IncomeTaxRegime,
} from "@/lib/calculators/income-tax"
import { formatMoney, formatPercent } from "@/lib/calculators/format"

export function IncomeTaxCalculator() {
  const [income, setIncome] = useState("1200000")
  const [regime, setRegime] = useState<IncomeTaxRegime>("new")
  const [deductions, setDeductions] = useState("150000")

  const result = useMemo(
    () =>
      calculateIncomeTax({
        annualIncome: Number(income),
        regime,
        deductions: Number(deductions),
      }),
    [income, regime, deductions],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="it-income" label="Gross annual income">
          <Input id="it-income" type="number" min="1" step="10000" value={income} onChange={(e) => setIncome(e.target.value)} />
        </Field>
        <Field id="it-regime" label="Tax regime">
          <select id="it-regime" className={selectClassName} value={regime} onChange={(e) => setRegime(e.target.value as IncomeTaxRegime)}>
            <option value="new">New regime</option>
            <option value="old">Old regime</option>
          </select>
        </Field>
        {regime === "old" ? (
          <Field id="it-ded" label="Deductions (80C etc.)" className="sm:col-span-2 space-y-2">
            <Input id="it-ded" type="number" min="0" step="1000" value={deductions} onChange={(e) => setDeductions(e.target.value)} />
          </Field>
        ) : null}
      </form>
      <p className="text-xs text-muted-foreground">
        Illustrative India individual tax estimate with standard deduction and 4% cess. Not official advice — verify with a CA or the Income Tax Department.
      </p>
      {result ? (
        <ResultPanel title="Total tax (incl. cess)" value={formatMoney(result.totalTax, "INR")}>
          <StatGrid
            items={[
              { label: "Taxable income", value: formatMoney(result.taxableIncome, "INR") },
              { label: "Income tax", value: formatMoney(result.tax, "INR") },
              { label: "Health & education cess", value: formatMoney(result.cess, "INR") },
              { label: "Total tax", value: formatMoney(result.totalTax, "INR") },
              { label: "Effective rate", value: formatPercent(result.effectiveRatePercent, 2) },
              { label: "Take-home (approx.)", value: formatMoney(result.takeHome, "INR") },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
