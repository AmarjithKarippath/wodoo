"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import { calculateTdee, type TdeeActivity } from "@/lib/calculators/tdee"
import { formatNumber } from "@/lib/calculators/format"

export function TdeeCalculator() {
  const [sex, setSex] = useState<"male" | "female">("male")
  const [age, setAge] = useState("30")
  const [weightKg, setWeightKg] = useState("70")
  const [heightCm, setHeightCm] = useState("175")
  const [activity, setActivity] = useState<TdeeActivity>("moderate")

  const result = useMemo(
    () =>
      calculateTdee({
        sex,
        age: Number(age),
        weightKg: Number(weightKg),
        heightCm: Number(heightCm),
        activity,
      }),
    [sex, age, weightKg, heightCm, activity],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="tdee-sex" label="Sex">
          <select id="tdee-sex" className={selectClassName} value={sex} onChange={(e) => setSex(e.target.value as "male" | "female")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Field>
        <Field id="tdee-age" label="Age (years)">
          <Input id="tdee-age" type="number" min="10" max="120" value={age} onChange={(e) => setAge(e.target.value)} />
        </Field>
        <Field id="tdee-w" label="Weight (kg)">
          <Input id="tdee-w" type="number" min="20" step="0.1" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} />
        </Field>
        <Field id="tdee-h" label="Height (cm)">
          <Input id="tdee-h" type="number" min="100" step="0.1" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} />
        </Field>
        <Field id="tdee-act" label="Activity level" className="sm:col-span-2 space-y-2">
          <select id="tdee-act" className={selectClassName} value={activity} onChange={(e) => setActivity(e.target.value as TdeeActivity)}>
            <option value="sedentary">Sedentary (×1.2)</option>
            <option value="light">Light (×1.375)</option>
            <option value="moderate">Moderate (×1.55)</option>
            <option value="active">Active (×1.725)</option>
            <option value="very-active">Very active (×1.9)</option>
            <option value="extra-active">Extra active (×2.0)</option>
          </select>
        </Field>
      </form>
      {result ? (
        <ResultPanel title="TDEE" value={`${formatNumber(result.tdee, 0)} kcal/day`} subtitle={`BMR ${formatNumber(result.bmr, 0)} × ${result.multiplier}`}>
          <StatGrid
            items={[
              { label: "BMR", value: `${formatNumber(result.bmr, 0)} kcal` },
              { label: "TDEE (maintain)", value: `${formatNumber(result.tdee, 0)} kcal` },
              { label: "Cut (−500)", value: `${formatNumber(result.tdee - 500, 0)} kcal` },
              { label: "Bulk (+300)", value: `${formatNumber(result.tdee + 300, 0)} kcal` },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
