"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import { calculateDimWeight } from "@/lib/calculators/dim-weight"
import { formatNumber } from "@/lib/calculators/format"

export function DimWeightCalculator() {
  const [units, setUnits] = useState<"imperial" | "metric">("imperial")
  const [length, setLength] = useState("16")
  const [width, setWidth] = useState("12")
  const [height, setHeight] = useState("8")
  const [actualWeight, setActualWeight] = useState("4")
  const [divisor, setDivisor] = useState("139")

  const result = useMemo(
    () =>
      calculateDimWeight({
        length: Number(length),
        width: Number(width),
        height: Number(height),
        actualWeight: Number(actualWeight),
        divisor: Number(divisor),
        units,
      }),
    [length, width, height, actualWeight, divisor, units],
  )

  const dimLabel = units === "imperial" ? "in" : "cm"
  const weightLabel = units === "imperial" ? "lb" : "kg"

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="dim-units" label="Units">
          <select
            id="dim-units"
            className={selectClassName}
            value={units}
            onChange={(e) => {
              const next = e.target.value as "imperial" | "metric"
              setUnits(next)
              setDivisor(next === "imperial" ? "139" : "5000")
            }}
          >
            <option value="imperial">Inches / pounds (divisor 139)</option>
            <option value="metric">cm / kg (divisor 5000)</option>
          </select>
        </Field>
        <Field id="dim-divisor" label="DIM divisor" hint="Carriers differ — 139 (US parcels) or 5000 (metric) are common.">
          <Input id="dim-divisor" type="number" min="1" step="1" value={divisor} onChange={(e) => setDivisor(e.target.value)} />
        </Field>
        <Field id="dim-l" label={`Length (${dimLabel})`}>
          <Input id="dim-l" type="number" min="0.1" step="0.1" value={length} onChange={(e) => setLength(e.target.value)} />
        </Field>
        <Field id="dim-w" label={`Width (${dimLabel})`}>
          <Input id="dim-w" type="number" min="0.1" step="0.1" value={width} onChange={(e) => setWidth(e.target.value)} />
        </Field>
        <Field id="dim-h" label={`Height (${dimLabel})`}>
          <Input id="dim-h" type="number" min="0.1" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} />
        </Field>
        <Field id="dim-actual" label={`Actual weight (${weightLabel})`}>
          <Input id="dim-actual" type="number" min="0.1" step="0.1" value={actualWeight} onChange={(e) => setActualWeight(e.target.value)} />
        </Field>
      </form>

      {result ? (
        <ResultPanel
          title="Billable weight"
          value={`${formatNumber(result.billableWeight, 3)} ${result.weightUnit}`}
          subtitle={
            result.usesDim
              ? "Dimensional weight is higher — carriers will likely bill on DIM weight."
              : "Actual weight is higher — you’ll likely be billed on actual weight."
          }
        >
          <StatGrid
            items={[
              { label: "Volume", value: `${formatNumber(result.volume, 1)} ${result.volumeUnit}` },
              { label: "DIM weight", value: `${formatNumber(result.dimensionalWeight, 3)} ${result.weightUnit}` },
              { label: "Actual weight", value: `${formatNumber(Number(actualWeight), 3)} ${result.weightUnit}` },
              { label: "Charged on", value: result.usesDim ? "DIM weight" : "Actual weight" },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
