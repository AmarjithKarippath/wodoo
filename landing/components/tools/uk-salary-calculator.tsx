"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import {
  calculateUkSalary,
  type UkSalaryInput,
  type UkTaxRegion,
} from "@/lib/calculators/uk-salary"
import { formatMoney, formatPercent } from "@/lib/calculators/format"

export function UkSalaryCalculator() {
  const [gross, setGross] = useState("45000")
  const [region, setRegion] = useState<UkTaxRegion>("england")
  const [studentLoan, setStudentLoan] =
    useState<NonNullable<UkSalaryInput["studentLoan"]>>("none")
  const [pension, setPension] = useState("5")

  const result = useMemo(
    () =>
      calculateUkSalary({
        grossAnnual: Number(gross),
        region,
        studentLoan,
        pensionPercent: Number(pension),
      }),
    [gross, region, studentLoan, pension],
  )

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Illustrative 2025/26 estimates for England/Wales/NI (or approximate Scottish bands). Not tax advice — confirm with HMRC or an accountant.
      </p>
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="uks-g" label="Gross annual salary (£)">
          <Input id="uks-g" type="number" min="0" step="500" value={gross} onChange={(e) => setGross(e.target.value)} />
        </Field>
        <Field id="uks-r" label="Tax region">
          <select id="uks-r" className={selectClassName} value={region} onChange={(e) => setRegion(e.target.value as UkTaxRegion)}>
            <option value="england">England / Wales / NI</option>
            <option value="scotland">Scotland (approx.)</option>
          </select>
        </Field>
        <Field id="uks-sl" label="Student loan">
          <select
            id="uks-sl"
            className={selectClassName}
            value={studentLoan}
            onChange={(e) => setStudentLoan(e.target.value as NonNullable<UkSalaryInput["studentLoan"]>)}
          >
            <option value="none">None</option>
            <option value="plan1">Plan 1</option>
            <option value="plan2">Plan 2</option>
            <option value="plan4">Plan 4</option>
            <option value="plan5">Plan 5</option>
            <option value="postgraduate">Postgraduate</option>
          </select>
        </Field>
        <Field id="uks-p" label="Pension contribution (%)">
          <Input id="uks-p" type="number" min="0" max="100" step="0.5" value={pension} onChange={(e) => setPension(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel title="Take-home (monthly)" value={formatMoney(result.netMonthly, "GBP")}>
          <StatGrid
            items={[
              { label: "Take-home (year)", value: formatMoney(result.netAnnual, "GBP") },
              { label: "Income tax", value: formatMoney(result.incomeTax, "GBP") },
              { label: "National Insurance", value: formatMoney(result.nationalInsurance, "GBP") },
              { label: "Student loan", value: formatMoney(result.studentLoan, "GBP") },
              { label: "Pension", value: formatMoney(result.pension, "GBP") },
              { label: "Effective tax rate", value: formatPercent(result.effectiveTaxRate, 1) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
