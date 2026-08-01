"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel } from "@/components/tools/calc-ui"
import { compareVolumeScenarios } from "@/lib/calculators/volume-discount"
import { formatMoney, formatPercent } from "@/lib/calculators/format"

export function VolumeDiscountPlanner() {
  const [listPrice, setListPrice] = useState("40")
  const [unitCost, setUnitCost] = useState("14")
  const [d1, setD1] = useState("0")
  const [u1, setU1] = useState("50")
  const [d2, setD2] = useState("10")
  const [u2, setU2] = useState("120")
  const [d3, setD3] = useState("20")
  const [u3, setU3] = useState("220")

  const rows = useMemo(
    () =>
      compareVolumeScenarios(Number(listPrice), Number(unitCost), [
        { discountPercent: Number(d1), expectedUnits: Number(u1) },
        { discountPercent: Number(d2), expectedUnits: Number(u2) },
        { discountPercent: Number(d3), expectedUnits: Number(u3) },
      ]),
    [listPrice, unitCost, d1, u1, d2, u2, d3, u3],
  )

  const best = rows.reduce<(typeof rows)[number] | null>((acc, row) => {
    if (!acc || row.totalProfit > acc.totalProfit) return row
    return acc
  }, null)

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="vd-price" label="List price / unit">
          <Input id="vd-price" type="number" min="0" step="0.01" value={listPrice} onChange={(e) => setListPrice(e.target.value)} />
        </Field>
        <Field id="vd-cost" label="Unit cost">
          <Input id="vd-cost" type="number" min="0" step="0.01" value={unitCost} onChange={(e) => setUnitCost(e.target.value)} />
        </Field>

        <Field id="vd-d1" label="Tier 1 discount %">
          <Input id="vd-d1" type="number" min="0" max="99" step="1" value={d1} onChange={(e) => setD1(e.target.value)} />
        </Field>
        <Field id="vd-u1" label="Tier 1 expected units">
          <Input id="vd-u1" type="number" min="1" step="1" value={u1} onChange={(e) => setU1(e.target.value)} />
        </Field>
        <Field id="vd-d2" label="Tier 2 discount %">
          <Input id="vd-d2" type="number" min="0" max="99" step="1" value={d2} onChange={(e) => setD2(e.target.value)} />
        </Field>
        <Field id="vd-u2" label="Tier 2 expected units">
          <Input id="vd-u2" type="number" min="1" step="1" value={u2} onChange={(e) => setU2(e.target.value)} />
        </Field>
        <Field id="vd-d3" label="Tier 3 discount %">
          <Input id="vd-d3" type="number" min="0" max="99" step="1" value={d3} onChange={(e) => setD3(e.target.value)} />
        </Field>
        <Field id="vd-u3" label="Tier 3 expected units">
          <Input id="vd-u3" type="number" min="1" step="1" value={u3} onChange={(e) => setU3(e.target.value)} />
        </Field>
      </form>

      {best ? (
        <ResultPanel
          title="Best profit scenario"
          value={formatMoney(best.totalProfit)}
          subtitle={`${best.discountPercent}% off · ${best.expectedUnits} units · ${formatPercent(best.unitMarginPercent)} unit margin`}
        />
      ) : null}

      {rows.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="border-b border-border bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Discount</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Unit margin</th>
                <th className="px-4 py-3">Units</th>
                <th className="px-4 py-3">Revenue</th>
                <th className="px-4 py-3">Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row) => (
                <tr key={`${row.discountPercent}-${row.expectedUnits}`} className="bg-background">
                  <td className="px-4 py-3 font-semibold">{row.discountPercent}%</td>
                  <td className="px-4 py-3">{formatMoney(row.discountedPrice)}</td>
                  <td className="px-4 py-3">
                    {formatMoney(row.unitMargin)} ({formatPercent(row.unitMarginPercent)})
                  </td>
                  <td className="px-4 py-3">{row.expectedUnits}</td>
                  <td className="px-4 py-3">{formatMoney(row.totalRevenue)}</td>
                  <td className="px-4 py-3 font-semibold">{formatMoney(row.totalProfit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  )
}
