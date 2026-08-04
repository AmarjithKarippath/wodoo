"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateLumpsum } from "@/lib/calculators/lumpsum"
import { formatMoney } from "@/lib/calculators/format"

export function LumpsumCalculator() {
  const [principal, setPrincipal] = useState("200000")
  const [rate, setRate] = useState("12")
  const [years, setYears] = useState("10")

  const result = useMemo(
    () =>
      calculateLumpsum({
        principal: Number(principal),
        annualReturnPercent: Number(rate),
        years: Number(years),
      }),
    [principal, rate, years],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="ls-p" label="Lumpsum investment">
          <Input id="ls-p" type="number" min="1" step="1000" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </Field>
        <Field id="ls-r" label="Expected return (% p.a.)">
          <Input id="ls-r" type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field id="ls-y" label="Years">
          <Input id="ls-y" type="number" min="0.5" step="0.5" value={years} onChange={(e) => setYears(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel title="Future value" value={formatMoney(result.futureValue, "INR")}>
          <StatGrid
            items={[
              { label: "Invested", value: formatMoney(result.totalInvested, "INR") },
              { label: "Wealth gained", value: formatMoney(result.wealthGained, "INR") },
              { label: "Maturity value", value: formatMoney(result.futureValue, "INR") },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
