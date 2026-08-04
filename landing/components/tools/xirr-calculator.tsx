"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateXirr } from "@/lib/calculators/xirr"
import { formatMoney, formatPercent } from "@/lib/calculators/format"

type Row = { amount: string; date: string }

const DEFAULT_ROWS: Row[] = [
  { amount: "-100000", date: "2023-01-01" },
  { amount: "-50000", date: "2023-07-01" },
  { amount: "180000", date: "2025-01-01" },
]

export function XirrCalculator() {
  const [rows, setRows] = useState<Row[]>(DEFAULT_ROWS)

  const result = useMemo(
    () =>
      calculateXirr(
        rows.map((r) => ({ amount: Number(r.amount), date: r.date })),
      ),
    [rows],
  )

  function update(i: number, key: keyof Row, value: string) {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, [key]: value } : r)))
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Use negative amounts for investments and positive amounts for redemptions or final value.
      </p>
      <div className="space-y-4">
        {rows.map((row, i) => (
          <div key={i} className="grid gap-4 sm:grid-cols-2">
            <Field id={`xirr-a-${i}`} label={`Cash flow ${i + 1}`}>
              <Input id={`xirr-a-${i}`} type="number" step="1000" value={row.amount} onChange={(e) => update(i, "amount", e.target.value)} />
            </Field>
            <Field id={`xirr-d-${i}`} label="Date">
              <Input id={`xirr-d-${i}`} type="date" value={row.date} onChange={(e) => update(i, "date", e.target.value)} />
            </Field>
          </div>
        ))}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
            onClick={() => setRows((r) => [...r, { amount: "0", date: new Date().toISOString().slice(0, 10) }])}
          >
            Add cash flow
          </button>
          {rows.length > 2 ? (
            <button
              type="button"
              className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
              onClick={() => setRows((r) => r.slice(0, -1))}
            >
              Remove last
            </button>
          ) : null}
        </div>
      </div>
      {result ? (
        <ResultPanel title="XIRR" value={formatPercent(result.xirrPercent, 2)}>
          <StatGrid
            items={[
              { label: "XIRR", value: formatPercent(result.xirrPercent, 2) },
              { label: "Total invested", value: formatMoney(result.totalInvested, "INR") },
              { label: "Total returned", value: formatMoney(result.totalReturned, "INR") },
              { label: "Net profit", value: formatMoney(result.netProfit, "INR") },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
