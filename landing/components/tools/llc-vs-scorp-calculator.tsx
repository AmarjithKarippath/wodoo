"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateLlcVsScorp } from "@/lib/calculators/llc-vs-scorp"
import { formatMoney } from "@/lib/calculators/format"

export function LlcVsScorpCalculator() {
  const [netProfit, setNetProfit] = useState("120000")
  const [reasonableSalary, setReasonableSalary] = useState("65000")
  const [selfEmploymentRatePercent, setSelfEmploymentRatePercent] = useState("15.3")
  const [payrollTaxRatePercent, setPayrollTaxRatePercent] = useState("15.3")
  const [incomeTaxRatePercent, setIncomeTaxRatePercent] = useState("24")

  const result = useMemo(
    () =>
      calculateLlcVsScorp({
        netProfit: Number(netProfit),
        reasonableSalary: Number(reasonableSalary),
        selfEmploymentRatePercent: Number(selfEmploymentRatePercent),
        payrollTaxRatePercent: Number(payrollTaxRatePercent),
        incomeTaxRatePercent: Number(incomeTaxRatePercent),
      }),
    [
      netProfit,
      reasonableSalary,
      selfEmploymentRatePercent,
      payrollTaxRatePercent,
      incomeTaxRatePercent,
    ],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="ls-profit" label="Projected net profit">
          <Input id="ls-profit" type="number" min="1" step="100" value={netProfit} onChange={(e) => setNetProfit(e.target.value)} />
        </Field>
        <Field id="ls-salary" label="Reasonable S-Corp salary">
          <Input id="ls-salary" type="number" min="0" step="100" value={reasonableSalary} onChange={(e) => setReasonableSalary(e.target.value)} />
        </Field>
        <Field id="ls-se" label="Self-employment tax rate %">
          <Input id="ls-se" type="number" min="0" max="30" step="0.1" value={selfEmploymentRatePercent} onChange={(e) => setSelfEmploymentRatePercent(e.target.value)} />
        </Field>
        <Field id="ls-payroll" label="Payroll tax rate % (S-Corp salary)">
          <Input id="ls-payroll" type="number" min="0" max="30" step="0.1" value={payrollTaxRatePercent} onChange={(e) => setPayrollTaxRatePercent(e.target.value)} />
        </Field>
        <Field id="ls-income" label="Ordinary income tax rate %" className="sm:col-span-2">
          <Input id="ls-income" type="number" min="0" max="50" step="0.1" value={incomeTaxRatePercent} onChange={(e) => setIncomeTaxRatePercent(e.target.value)} />
        </Field>
      </form>

      {result ? (
        <ResultPanel
          title={
            result.estimatedSavingsWithScorp >= 0
              ? "Estimated S-Corp tax savings"
              : "Estimated LLC advantage"
          }
          value={formatMoney(Math.abs(result.estimatedSavingsWithScorp))}
          subtitle={result.note}
        >
          <StatGrid
            items={[
              { label: "LLC total tax", value: formatMoney(result.llcTotalTax) },
              { label: "S-Corp total tax", value: formatMoney(result.scorpTotalTax) },
              { label: "LLC SE tax", value: formatMoney(result.llcSelfEmploymentTax) },
              { label: "S-Corp payroll tax", value: formatMoney(result.scorpPayrollTax) },
              { label: "S-Corp distributions", value: formatMoney(result.distributionAmount) },
              { label: "Income tax (both)", value: formatMoney(result.llcIncomeTax) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
