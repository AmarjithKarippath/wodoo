"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import { calculateBodyFatIdealWeight } from "@/lib/calculators/body-fat-ideal-weight"
import { formatNumber, formatPercent } from "@/lib/calculators/format"

export function BodyFatIdealWeightCalculator() {
  const [sex, setSex] = useState<"male" | "female">("male")
  const [age, setAge] = useState("30")
  const [heightCm, setHeightCm] = useState("175")
  const [weightKg, setWeightKg] = useState("75")
  const [waistCm, setWaistCm] = useState("84")
  const [neckCm, setNeckCm] = useState("38")
  const [hipCm, setHipCm] = useState("95")

  const result = useMemo(
    () =>
      calculateBodyFatIdealWeight({
        sex,
        age: Number(age),
        heightCm: Number(heightCm),
        weightKg: Number(weightKg),
        waistCm: Number(waistCm),
        neckCm: Number(neckCm),
        hipCm: Number(hipCm),
      }),
    [sex, age, heightCm, weightKg, waistCm, neckCm, hipCm],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="bf-sex" label="Sex">
          <select id="bf-sex" className={selectClassName} value={sex} onChange={(e) => setSex(e.target.value as "male" | "female")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Field>
        <Field id="bf-age" label="Age">
          <Input id="bf-age" type="number" min="10" value={age} onChange={(e) => setAge(e.target.value)} />
        </Field>
        <Field id="bf-h" label="Height (cm)">
          <Input id="bf-h" type="number" min="100" step="0.1" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} />
        </Field>
        <Field id="bf-w" label="Weight (kg)">
          <Input id="bf-w" type="number" min="20" step="0.1" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} />
        </Field>
        <Field id="bf-waist" label="Waist (cm)">
          <Input id="bf-waist" type="number" min="40" step="0.1" value={waistCm} onChange={(e) => setWaistCm(e.target.value)} />
        </Field>
        <Field id="bf-neck" label="Neck (cm)">
          <Input id="bf-neck" type="number" min="20" step="0.1" value={neckCm} onChange={(e) => setNeckCm(e.target.value)} />
        </Field>
        {sex === "female" ? (
          <Field id="bf-hip" label="Hip (cm)" className="sm:col-span-2 space-y-2">
            <Input id="bf-hip" type="number" min="40" step="0.1" value={hipCm} onChange={(e) => setHipCm(e.target.value)} />
          </Field>
        ) : null}
      </form>
      {result ? (
        <ResultPanel
          title="Body fat"
          value={formatPercent(result.bodyFatPercent, 1)}
          subtitle={result.category}
        >
          <StatGrid
            items={[
              { label: "Body fat %", value: formatPercent(result.bodyFatPercent, 1) },
              { label: "Category", value: result.category },
              { label: "Ideal weight (Devine)", value: `${formatNumber(result.idealWeightDevineKg, 1)} kg` },
              { label: "BMI", value: formatNumber(result.bmi, 1) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
