"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import { calculateDateDays, type DateDaysMode } from "@/lib/calculators/date-days"
import { formatNumber } from "@/lib/calculators/format"

export function DateDaysCalculator() {
  const [mode, setMode] = useState<DateDaysMode>("difference")
  const [startDate, setStartDate] = useState("2026-01-01")
  const [endDate, setEndDate] = useState("2026-08-04")
  const [daysToAdd, setDaysToAdd] = useState("90")

  const result = useMemo(
    () =>
      calculateDateDays({
        mode,
        startDate,
        endDate,
        daysToAdd: Number(daysToAdd),
      }),
    [mode, startDate, endDate, daysToAdd],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="dd-mode" label="Mode" className="sm:col-span-2 space-y-2">
          <select id="dd-mode" className={selectClassName} value={mode} onChange={(e) => setMode(e.target.value as DateDaysMode)}>
            <option value="difference">Days between two dates</option>
            <option value="add">Add / subtract days from a date</option>
          </select>
        </Field>
        <Field id="dd-start" label={mode === "difference" ? "Start date" : "From date"}>
          <Input id="dd-start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </Field>
        {mode === "difference" ? (
          <Field id="dd-end" label="End date">
            <Input id="dd-end" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </Field>
        ) : (
          <Field id="dd-add" label="Days to add (use negative to subtract)">
            <Input id="dd-add" type="number" step="1" value={daysToAdd} onChange={(e) => setDaysToAdd(e.target.value)} />
          </Field>
        )}
      </form>
      {result ? (
        <ResultPanel
          title={mode === "difference" ? "Days difference" : "Result date"}
          value={mode === "difference" ? `${formatNumber(result.days, 0)} days` : result.resultDate || "—"}
        >
          <StatGrid
            items={[
              { label: "Days", value: formatNumber(result.days, 0) },
              { label: "Weeks", value: formatNumber(result.weeks, 2) },
              { label: "Months (approx.)", value: formatNumber(result.monthsApprox, 2) },
              ...(result.resultDate
                ? [{ label: "Result date", value: result.resultDate }]
                : []),
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
