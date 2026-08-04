"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateCalorieDeficit } from "@/lib/calculators/calorie-deficit"
import { formatNumber } from "@/lib/calculators/format"

export function CalorieDeficitCalculator() {
  const [maintenance, setMaintenance] = useState("2400")
  const [intake, setIntake] = useState("1900")
  const [current, setCurrent] = useState("80")
  const [target, setTarget] = useState("72")

  const result = useMemo(
    () =>
      calculateCalorieDeficit({
        maintenanceKcal: Number(maintenance),
        intakeKcal: Number(intake),
        currentWeightKg: Number(current),
        targetWeightKg: Number(target),
      }),
    [maintenance, intake, current, target],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="cd-m" label="Maintenance calories (TDEE)">
          <Input id="cd-m" type="number" min="800" step="10" value={maintenance} onChange={(e) => setMaintenance(e.target.value)} />
        </Field>
        <Field id="cd-i" label="Daily intake (kcal)">
          <Input id="cd-i" type="number" min="500" step="10" value={intake} onChange={(e) => setIntake(e.target.value)} />
        </Field>
        <Field id="cd-c" label="Current weight (kg)">
          <Input id="cd-c" type="number" min="30" step="0.1" value={current} onChange={(e) => setCurrent(e.target.value)} />
        </Field>
        <Field id="cd-t" label="Target weight (kg)">
          <Input id="cd-t" type="number" min="30" step="0.1" value={target} onChange={(e) => setTarget(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title="Daily deficit"
          value={`${formatNumber(result.dailyDeficit, 0)} kcal`}
          subtitle={`≈ ${formatNumber(Math.abs(result.kgPerWeek), 2)} kg/week · ~${formatNumber(result.weeksToGoal, 1)} weeks to goal`}
        >
          <StatGrid
            items={[
              { label: "Weekly deficit", value: `${formatNumber(result.weeklyDeficit, 0)} kcal` },
              { label: "Rate", value: `${formatNumber(result.kgPerWeek, 2)} kg/week` },
              { label: "Weeks to goal", value: formatNumber(result.weeksToGoal, 1) },
              { label: "Approx. days", value: formatNumber(result.estimatedEndDateDays, 0) },
            ]}
          />
        </ResultPanel>
      ) : (
        <p className="text-sm text-muted-foreground">
          For weight loss, intake should be below maintenance. For gain, intake should be above maintenance.
        </p>
      )}
    </div>
  )
}
