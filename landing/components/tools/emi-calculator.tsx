"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateEmi } from "@/lib/calculators/emi"
import { formatMoney, formatNumber } from "@/lib/calculators/format"

export function EmiCalculator() {
  const [principal, setPrincipal] = useState("500000")
  const [rate, setRate] = useState("10.5")
  const [months, setMonths] = useState("60")

  const result = useMemo(
    () =>
      calculateEmi({
        principal: Number(principal),
        annualRatePercent: Number(rate),
        tenureMonths: Number(months),
      }),
    [principal, rate, months],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="emi-p" label="Loan amount">
          <Input id="emi-p" type="number" min="1" step="1000" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </Field>
        <Field id="emi-r" label="Interest rate (% p.a.)">
          <Input id="emi-r" type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field id="emi-t" label="Tenure (months)">
          <Input id="emi-t" type="number" min="1" step="1" value={months} onChange={(e) => setMonths(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel title="Monthly EMI" value={formatMoney(result.emi, "INR")}>
          <StatGrid
            items={[
              { label: "Monthly EMI", value: formatMoney(result.emi, "INR") },
              { label: "Total payment", value: formatMoney(result.totalPayment, "INR") },
              { label: "Total interest", value: formatMoney(result.totalInterest, "INR") },
              { label: "Tenure", value: `${formatNumber(Number(months), 0)} months` },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
