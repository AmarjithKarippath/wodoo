"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import {
  calculateMetabolicRate,
  type MetabolicActivity,
} from "@/lib/calculators/metabolic-rate"
import { formatNumber } from "@/lib/calculators/format"

export function MetabolicRateCalculator() {
  const [sex, setSex] = useState<"male" | "female">("male")
  const [age, setAge] = useState("30")
  const [weightKg, setWeightKg] = useState("70")
  const [heightCm, setHeightCm] = useState("175")
  const [bodyFat, setBodyFat] = useState("18")
  const [activity, setActivity] = useState<MetabolicActivity>("moderate")

  const result = useMemo(
    () =>
      calculateMetabolicRate({
        sex,
        age: Number(age),
        weightKg: Number(weightKg),
        heightCm: Number(heightCm),
        bodyFatPercent: bodyFat === "" ? undefined : Number(bodyFat),
        activity,
      }),
    [sex, age, weightKg, heightCm, bodyFat, activity],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="mr-sex" label="Sex">
          <select id="mr-sex" className={selectClassName} value={sex} onChange={(e) => setSex(e.target.value as "male" | "female")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Field>
        <Field id="mr-age" label="Age (years)">
          <Input id="mr-age" type="number" min="10" max="120" value={age} onChange={(e) => setAge(e.target.value)} />
        </Field>
        <Field id="mr-w" label="Weight (kg)">
          <Input id="mr-w" type="number" min="20" step="0.1" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} />
        </Field>
        <Field id="mr-h" label="Height (cm)">
          <Input id="mr-h" type="number" min="100" step="0.1" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} />
        </Field>
        <Field id="mr-bf" label="Body fat % (optional)" hint="Enables Katch–McArdle.">
          <Input id="mr-bf" type="number" min="1" max="60" step="0.1" value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} />
        </Field>
        <Field id="mr-act" label="Activity">
          <select id="mr-act" className={selectClassName} value={activity} onChange={(e) => setActivity(e.target.value as MetabolicActivity)}>
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
            <option value="very-active">Very active</option>
          </select>
        </Field>
      </form>
      {result ? (
        <ResultPanel title="Average BMR" value={`${formatNumber(result.averageBmr, 0)} kcal`} subtitle="Mifflin–St Jeor, Harris–Benedict, and Katch–McArdle when body fat is set.">
          <StatGrid
            items={[
              { label: "Mifflin BMR", value: `${formatNumber(result.mifflin, 0)} kcal` },
              { label: "Harris–Benedict BMR", value: `${formatNumber(result.harrisBenedict, 0)} kcal` },
              {
                label: "Katch–McArdle BMR",
                value: result.katchMcArdle != null ? `${formatNumber(result.katchMcArdle, 0)} kcal` : "—",
              },
              { label: "TDEE (Mifflin)", value: `${formatNumber(result.tdeeMifflin, 0)} kcal` },
              { label: "TDEE (Harris)", value: `${formatNumber(result.tdeeHarris, 0)} kcal` },
              {
                label: "TDEE (Katch)",
                value: result.tdeeKatch != null ? `${formatNumber(result.tdeeKatch, 0)} kcal` : "—",
              },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
