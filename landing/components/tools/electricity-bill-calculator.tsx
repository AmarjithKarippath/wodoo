"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import {
  calculateElectricityBill,
  DEFAULT_DOMESTIC_SLABS,
} from "@/lib/calculators/electricity-bill"
import { formatMoney, formatNumber } from "@/lib/calculators/format"

export function ElectricityBillCalculator() {
  const [units, setUnits] = useState("250")
  const [fixed, setFixed] = useState("100")
  const [r1, setR1] = useState("3.5")
  const [r2, setR2] = useState("5.5")
  const [r3, setR3] = useState("7")
  const [r4, setR4] = useState("8.5")

  const result = useMemo(
    () =>
      calculateElectricityBill({
        units: Number(units),
        fixedCharge: Number(fixed),
        slabs: [
          { upToUnits: 100, ratePerUnit: Number(r1) },
          { upToUnits: 200, ratePerUnit: Number(r2) },
          { upToUnits: 400, ratePerUnit: Number(r3) },
          { upToUnits: null, ratePerUnit: Number(r4) },
        ],
      }),
    [units, fixed, r1, r2, r3, r4],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="eb-u" label="Units consumed (kWh)">
          <Input id="eb-u" type="number" min="0" step="1" value={units} onChange={(e) => setUnits(e.target.value)} />
        </Field>
        <Field id="eb-f" label="Fixed charge">
          <Input id="eb-f" type="number" min="0" step="10" value={fixed} onChange={(e) => setFixed(e.target.value)} />
        </Field>
        <Field id="eb-r1" label="0–100 units (₹/unit)" hint={`Default ${DEFAULT_DOMESTIC_SLABS[0].ratePerUnit}`}>
          <Input id="eb-r1" type="number" min="0" step="0.1" value={r1} onChange={(e) => setR1(e.target.value)} />
        </Field>
        <Field id="eb-r2" label="101–200 units (₹/unit)">
          <Input id="eb-r2" type="number" min="0" step="0.1" value={r2} onChange={(e) => setR2(e.target.value)} />
        </Field>
        <Field id="eb-r3" label="201–400 units (₹/unit)">
          <Input id="eb-r3" type="number" min="0" step="0.1" value={r3} onChange={(e) => setR3(e.target.value)} />
        </Field>
        <Field id="eb-r4" label="Above 400 (₹/unit)">
          <Input id="eb-r4" type="number" min="0" step="0.1" value={r4} onChange={(e) => setR4(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel title="Total bill" value={formatMoney(result.totalBill, "INR")}>
          <StatGrid
            items={[
              { label: "Energy charge", value: formatMoney(result.energyCharge, "INR") },
              { label: "Fixed charge", value: formatMoney(result.fixedCharge, "INR") },
              { label: "Effective rate", value: `₹${formatNumber(result.effectiveRate, 2)}/unit` },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
