"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import { calculateCompoundInterest } from "@/lib/calculators/compound-interest"
import { formatMoney, formatNumber } from "@/lib/calculators/format"

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("100000")
  const [rate, setRate] = useState("8")
  const [years, setYears] = useState("10")
  const [compounds, setCompounds] = useState("4")
  const [monthly, setMonthly] = useState("0")

  const result = useMemo(
    () =>
      calculateCompoundInterest({
        principal: Number(principal),
        annualRatePercent: Number(rate),
        years: Number(years),
        compoundsPerYear: Number(compounds),
        monthlyContribution: Number(monthly),
      }),
    [principal, rate, years, compounds, monthly],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="ci-p" label="Principal">
          <Input id="ci-p" type="number" min="0" step="1000" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </Field>
        <Field id="ci-r" label="Annual rate (%)">
          <Input id="ci-r" type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field id="ci-y" label="Years">
          <Input id="ci-y" type="number" min="0.1" step="0.5" value={years} onChange={(e) => setYears(e.target.value)} />
        </Field>
        <Field id="ci-n" label="Compounding">
          <select id="ci-n" className={selectClassName} value={compounds} onChange={(e) => setCompounds(e.target.value)}>
            <option value="1">Annually</option>
            <option value="2">Semi-annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
          </select>
        </Field>
        <Field id="ci-m" label="Monthly contribution (optional)">
          <Input id="ci-m" type="number" min="0" step="100" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel title="Future value" value={formatMoney(result.futureValue, "INR")}>
          <StatGrid
            items={[
              { label: "Future value", value: formatMoney(result.futureValue, "INR") },
              { label: "Total contributed", value: formatMoney(result.totalContributed, "INR") },
              { label: "Interest earned", value: formatMoney(result.interestEarned, "INR") },
              { label: "Years", value: formatNumber(Number(years), 1) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
