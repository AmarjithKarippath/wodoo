"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { summarizeIrr } from "@/lib/calculators/irr"
import { formatMoney, formatPercent } from "@/lib/calculators/format"

export function IrrCalculator() {
  const [flowsText, setFlowsText] = useState("-100000, 30000, 40000, 50000")

  const result = useMemo(() => {
    const flows = flowsText
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map(Number)
    return summarizeIrr(flows)
  }, [flowsText])

  return (
    <div className="space-y-8">
      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <Field
          id="irr-cf"
          label="Periodic cash flows"
          hint="Comma-separated. Period 0 is usually negative (investment), then returns each period."
        >
          <Input id="irr-cf" value={flowsText} onChange={(e) => setFlowsText(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel title="IRR" value={formatPercent(result.irrPercent, 2)}>
          <StatGrid
            items={[
              { label: "IRR (per period)", value: formatPercent(result.irrPercent, 2) },
              { label: "Total invested", value: formatMoney(result.totalIn, "INR") },
              { label: "Total returned", value: formatMoney(result.totalOut, "INR") },
              { label: "Net", value: formatMoney(result.net, "INR") },
            ]}
          />
        </ResultPanel>
      ) : (
        <p className="text-sm text-muted-foreground">Enter at least one negative and one positive cash flow.</p>
      )}
    </div>
  )
}
