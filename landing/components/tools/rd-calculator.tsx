"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateRd } from "@/lib/calculators/rd"
import { formatMoney, formatNumber } from "@/lib/calculators/format"

export function RdCalculator() {
  const [monthly, setMonthly] = useState("5000")
  const [rate, setRate] = useState("6.5")
  const [months, setMonths] = useState("36")

  const result = useMemo(
    () =>
      calculateRd({
        monthlyDeposit: Number(monthly),
        annualRatePercent: Number(rate),
        tenureMonths: Number(months),
      }),
    [monthly, rate, months],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="rd-m" label="Monthly deposit">
          <Input id="rd-m" type="number" min="1" step="100" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
        </Field>
        <Field id="rd-r" label="Interest rate (% p.a.)">
          <Input id="rd-r" type="number" min="0" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field id="rd-t" label="Tenure (months)">
          <Input id="rd-t" type="number" min="1" step="1" value={months} onChange={(e) => setMonths(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel title="Maturity amount" value={formatMoney(result.maturityAmount, "INR")}>
          <StatGrid
            items={[
              { label: "Maturity amount", value: formatMoney(result.maturityAmount, "INR") },
              { label: "Total deposited", value: formatMoney(result.totalDeposited, "INR") },
              { label: "Interest earned", value: formatMoney(result.interestEarned, "INR") },
              { label: "Tenure", value: `${formatNumber(Number(months), 0)} months` },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
