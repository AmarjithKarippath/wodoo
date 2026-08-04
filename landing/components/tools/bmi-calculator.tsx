"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateBmi } from "@/lib/calculators/bmi"
import { formatNumber } from "@/lib/calculators/format"

export function BmiCalculator() {
  const [weightKg, setWeightKg] = useState("70")
  const [heightCm, setHeightCm] = useState("170")

  const result = useMemo(
    () => calculateBmi({ weightKg: Number(weightKg), heightCm: Number(heightCm) }),
    [weightKg, heightCm],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="bmi-weight" label="Weight (kg)">
          <Input id="bmi-weight" type="number" min="10" step="0.1" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} />
        </Field>
        <Field id="bmi-height" label="Height (cm)">
          <Input id="bmi-height" type="number" min="50" step="0.1" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel title="Your BMI" value={formatNumber(result.bmi, 1)} subtitle={result.category}>
          <StatGrid
            items={[
              { label: "Category", value: result.category },
              { label: "Healthy weight min", value: `${formatNumber(result.healthyMinKg, 1)} kg` },
              { label: "Healthy weight max", value: `${formatNumber(result.healthyMaxKg, 1)} kg` },
              { label: "BMI", value: formatNumber(result.bmi, 1) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
