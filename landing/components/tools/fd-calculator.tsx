"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import { calculateFd } from "@/lib/calculators/fd"
import { formatMoney, formatNumber } from "@/lib/calculators/format"

export function FdCalculator() {
  const [principal, setPrincipal] = useState("100000")
  const [rate, setRate] = useState("7.1")
  const [months, setMonths] = useState("24")
  const [compounds, setCompounds] = useState("4")

  const result = useMemo(
    () =>
      calculateFd({
        principal: Number(principal),
        annualRatePercent: Number(rate),
        tenureMonths: Number(months),
        compoundsPerYear: Number(compounds),
      }),
    [principal, rate, months, compounds],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="fd-p" label="Deposit amount">
          <Input id="fd-p" type="number" min="1" step="1000" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </Field>
        <Field id="fd-r" label="Interest rate (% p.a.)">
          <Input id="fd-r" type="number" min="0" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field id="fd-t" label="Tenure (months)">
          <Input id="fd-t" type="number" min="1" step="1" value={months} onChange={(e) => setMonths(e.target.value)} />
        </Field>
        <Field id="fd-c" label="Compounding">
          <select id="fd-c" className={selectClassName} value={compounds} onChange={(e) => setCompounds(e.target.value)}>
            <option value="1">Annually</option>
            <option value="2">Semi-annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
          </select>
        </Field>
      </form>
      {result ? (
        <ResultPanel title="Maturity amount" value={formatMoney(result.maturityAmount, "INR")}>
          <StatGrid
            items={[
              { label: "Maturity amount", value: formatMoney(result.maturityAmount, "INR") },
              { label: "Interest earned", value: formatMoney(result.interestEarned, "INR") },
              { label: "Principal", value: formatMoney(Number(principal), "INR") },
              { label: "Tenure", value: `${formatNumber(Number(months), 0)} months` },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
