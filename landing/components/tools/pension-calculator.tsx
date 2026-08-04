"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import { calculatePension, type PensionMode } from "@/lib/calculators/pension"
import { formatMoney } from "@/lib/calculators/format"

export function PensionCalculator() {
  const [mode, setMode] = useState<PensionMode>("pension-from-corpus")
  const [corpus, setCorpus] = useState("10000000")
  const [pension, setPension] = useState("50000")
  const [rate, setRate] = useState("7")
  const [years, setYears] = useState("25")

  const result = useMemo(
    () =>
      calculatePension({
        mode,
        corpus: Number(corpus),
        monthlyPension: Number(pension),
        annualReturnPercent: Number(rate),
        years: Number(years),
      }),
    [mode, corpus, pension, rate, years],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="pen-mode" label="Mode" className="sm:col-span-2 space-y-2">
          <select id="pen-mode" className={selectClassName} value={mode} onChange={(e) => setMode(e.target.value as PensionMode)}>
            <option value="pension-from-corpus">Pension from corpus</option>
            <option value="corpus-for-pension">Corpus needed for pension</option>
          </select>
        </Field>
        {mode === "pension-from-corpus" ? (
          <Field id="pen-c" label="Corpus">
            <Input id="pen-c" type="number" min="1" step="10000" value={corpus} onChange={(e) => setCorpus(e.target.value)} />
          </Field>
        ) : null}
        <Field id="pen-p" label="Monthly pension">
          <Input id="pen-p" type="number" min="0" step="500" value={pension} onChange={(e) => setPension(e.target.value)} />
        </Field>
        <Field id="pen-r" label="Return during drawdown (% p.a.)">
          <Input id="pen-r" type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field id="pen-y" label="Years of pension">
          <Input id="pen-y" type="number" min="1" step="1" value={years} onChange={(e) => setYears(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title={mode === "corpus-for-pension" ? "Corpus needed" : "Ending corpus"}
          value={formatMoney(
            mode === "corpus-for-pension" ? result.corpusNeeded : result.endingCorpus,
            "INR",
          )}
        >
          <StatGrid
            items={[
              { label: "Monthly pension", value: formatMoney(result.monthlyPension, "INR") },
              { label: "Corpus needed", value: formatMoney(result.corpusNeeded, "INR") },
              { label: "Total withdrawn", value: formatMoney(result.totalWithdrawn, "INR") },
              { label: "Ending corpus", value: formatMoney(result.endingCorpus, "INR") },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
