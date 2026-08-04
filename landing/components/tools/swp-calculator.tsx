"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateSwp } from "@/lib/calculators/swp"
import { formatMoney, formatNumber } from "@/lib/calculators/format"

export function SwpCalculator() {
  const [corpus, setCorpus] = useState("5000000")
  const [withdrawal, setWithdrawal] = useState("25000")
  const [rate, setRate] = useState("8")
  const [years, setYears] = useState("20")

  const result = useMemo(
    () =>
      calculateSwp({
        corpus: Number(corpus),
        monthlyWithdrawal: Number(withdrawal),
        annualReturnPercent: Number(rate),
        years: Number(years),
      }),
    [corpus, withdrawal, rate, years],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="swp-c" label="Starting corpus">
          <Input id="swp-c" type="number" min="1" step="10000" value={corpus} onChange={(e) => setCorpus(e.target.value)} />
        </Field>
        <Field id="swp-w" label="Monthly withdrawal">
          <Input id="swp-w" type="number" min="1" step="500" value={withdrawal} onChange={(e) => setWithdrawal(e.target.value)} />
        </Field>
        <Field id="swp-r" label="Expected return (% p.a.)">
          <Input id="swp-r" type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field id="swp-y" label="Years">
          <Input id="swp-y" type="number" min="1" step="1" value={years} onChange={(e) => setYears(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title="Ending corpus"
          value={formatMoney(result.endingCorpus, "INR")}
          subtitle={
            result.depleted
              ? `Corpus depletes after ${formatNumber(result.monthsLasted, 0)} months`
              : "Corpus lasts through the selected period"
          }
        >
          <StatGrid
            items={[
              { label: "Total withdrawn", value: formatMoney(result.totalWithdrawn, "INR") },
              { label: "Ending corpus", value: formatMoney(result.endingCorpus, "INR") },
              { label: "Months lasted", value: formatNumber(result.monthsLasted, 0) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
