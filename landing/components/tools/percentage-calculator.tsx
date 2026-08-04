"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import { calculatePercentage, type PercentageMode } from "@/lib/calculators/percentage"
import { formatNumber, formatPercent } from "@/lib/calculators/format"

export function PercentageCalculator() {
  const [mode, setMode] = useState<PercentageMode>("of")
  const [a, setA] = useState("20")
  const [b, setB] = useState("150")

  const result = useMemo(
    () => calculatePercentage({ mode, a: Number(a), b: Number(b) }),
    [mode, a, b],
  )

  const labels =
    mode === "of"
      ? { a: "Percentage (%)", b: "Of value" }
      : mode === "is-what"
        ? { a: "Part value", b: "Whole value" }
        : { a: "New value", b: "Old value" }

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="pct-mode" label="Calculate" className="sm:col-span-2 space-y-2">
          <select
            id="pct-mode"
            className={selectClassName}
            value={mode}
            onChange={(e) => setMode(e.target.value as PercentageMode)}
          >
            <option value="of">What is X% of Y?</option>
            <option value="is-what">X is what % of Y?</option>
            <option value="change">Percentage change (old → new)</option>
          </select>
        </Field>
        <Field id="pct-a" label={labels.a}>
          <Input id="pct-a" type="number" step="any" value={a} onChange={(e) => setA(e.target.value)} />
        </Field>
        <Field id="pct-b" label={labels.b}>
          <Input id="pct-b" type="number" step="any" value={b} onChange={(e) => setB(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title="Result"
          value={mode === "of" ? formatNumber(result.value, 2) : formatPercent(result.value, 2)}
          subtitle={result.label}
        >
          <StatGrid
            items={[
              {
                label: "Answer",
                value: mode === "of" ? formatNumber(result.value, 4) : formatPercent(result.value, 2),
              },
              { label: "Mode", value: result.label },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
