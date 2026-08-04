"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import {
  calculateCalorieBmr,
  type ActivityLevel,
} from "@/lib/calculators/calorie-bmr"
import { formatNumber } from "@/lib/calculators/format"

export function CalorieBmrCalculator() {
  const [sex, setSex] = useState<"male" | "female">("male")
  const [age, setAge] = useState("30")
  const [weightKg, setWeightKg] = useState("70")
  const [heightCm, setHeightCm] = useState("175")
  const [activity, setActivity] = useState<ActivityLevel>("moderate")

  const result = useMemo(
    () =>
      calculateCalorieBmr({
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
        <Field id="cb-sex" label="Sex">
          <select id="cb-sex" className={selectClassName} value={sex} onChange={(e) => setSex(e.target.value as "male" | "female")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Field>
        <Field id="cb-age" label="Age (years)">
          <Input id="cb-age" type="number" min="10" max="120" value={age} onChange={(e) => setAge(e.target.value)} />
        </Field>
        <Field id="cb-w" label="Weight (kg)">
          <Input id="cb-w" type="number" min="20" step="0.1" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} />
        </Field>
        <Field id="cb-h" label="Height (cm)">
          <Input id="cb-h" type="number" min="100" step="0.1" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} />
        </Field>
        <Field id="cb-act" label="Activity level" className="sm:col-span-2 space-y-2">
          <select id="cb-act" className={selectClassName} value={activity} onChange={(e) => setActivity(e.target.value as ActivityLevel)}>
            <option value="sedentary">Sedentary (little/no exercise)</option>
            <option value="light">Light (1–3 days/week)</option>
            <option value="moderate">Moderate (3–5 days/week)</option>
            <option value="active">Active (6–7 days/week)</option>
            <option value="very-active">Very active (hard exercise)</option>
          </select>
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title="Daily calories (TDEE)"
          value={`${formatNumber(result.tdee, 0)} kcal`}
          subtitle={`BMR (Mifflin–St Jeor): ${formatNumber(result.bmr, 0)} kcal/day`}
        >
          <StatGrid
            items={[
              { label: "BMR", value: `${formatNumber(result.bmr, 0)} kcal` },
              { label: "Maintain weight", value: `${formatNumber(result.tdee, 0)} kcal` },
              { label: "Mild loss (−250)", value: `${formatNumber(result.mildLoss, 0)} kcal` },
              { label: "Weight loss (−500)", value: `${formatNumber(result.loss, 0)} kcal` },
              { label: "Mild gain (+250)", value: `${formatNumber(result.mildGain, 0)} kcal` },
              { label: "Weight gain (+500)", value: `${formatNumber(result.gain, 0)} kcal` },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
