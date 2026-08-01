"use client"

import { useMemo, useState } from "react"
import { Field, ResultPanel, selectClassName } from "@/components/tools/calc-ui"
import { compareStateFees } from "@/lib/state-filing-fees"
import { formatMoney } from "@/lib/calculators/format"

export function StateFilingFeeComparison() {
  const [entity, setEntity] = useState<"LLC" | "Corporation">("LLC")
  const rows = useMemo(() => compareStateFees(entity), [entity])
  const cheapest = rows[0]

  return (
    <div className="space-y-8">
      <form className="max-w-sm" onSubmit={(e) => e.preventDefault()}>
        <Field id="fee-entity" label="Entity type">
          <select
            id="fee-entity"
            className={selectClassName}
            value={entity}
            onChange={(e) => setEntity(e.target.value as "LLC" | "Corporation")}
          >
            <option value="LLC">LLC</option>
            <option value="Corporation">Corporation</option>
          </select>
        </Field>
      </form>

      {cheapest ? (
        <ResultPanel
          title="Lowest year-one SOS fee (approx.)"
          value={`${cheapest.state} · ${formatMoney(cheapest.yearOneCost)}`}
          subtitle="Formation + first annual/report-style fee. Excludes registered agent, publication, and franchise-tax surprises."
        />
      ) : null}

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="border-b border-border bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">State</th>
              <th className="px-4 py-3">Formation</th>
              <th className="px-4 py-3">Annual / report</th>
              <th className="px-4 py-3">Year 1</th>
              <th className="px-4 py-3">3-year</th>
              <th className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={`${row.code}-${row.entity}`}>
                <td className="px-4 py-3 font-semibold">
                  {row.state} ({row.code})
                </td>
                <td className="px-4 py-3">{formatMoney(row.formationFee)}</td>
                <td className="px-4 py-3">{formatMoney(row.annualReportFee)}</td>
                <td className="px-4 py-3 font-semibold">{formatMoney(row.yearOneCost)}</td>
                <td className="px-4 py-3">{formatMoney(row.threeYearCost)}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">
        Fee figures are approximate comparison estimates and change often. Verify on each Secretary of State site before filing.
      </p>
    </div>
  )
}
