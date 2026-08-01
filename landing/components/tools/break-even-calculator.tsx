"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateBreakEven } from "@/lib/calculators/break-even"
import { formatMoney, formatNumber, formatPercent } from "@/lib/calculators/format"

export function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState("5000")
  const [pricePerUnit, setPricePerUnit] = useState("40")
  const [variableCostPerUnit, setVariableCostPerUnit] = useState("18")

  const result = useMemo(
    () =>
      calculateBreakEven({
        fixedCosts: Number(fixedCosts),
        pricePerUnit: Number(pricePerUnit),
        variableCostPerUnit: Number(variableCostPerUnit),
      }),
    [fixedCosts, pricePerUnit, variableCostPerUnit],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="be-fixed" label="Fixed costs" hint="Rent, tools, salaries, setup — costs that don’t change with each unit." className="space-y-2 sm:col-span-2">
          <Input id="be-fixed" type="number" min="0" step="0.01" value={fixedCosts} onChange={(e) => setFixedCosts(e.target.value)} />
        </Field>
        <Field id="be-price" label="Price per unit">
          <Input id="be-price" type="number" min="0" step="0.01" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} />
        </Field>
        <Field id="be-variable" label="Variable cost per unit" hint="COGS + shipping + fees that scale with each sale.">
          <Input id="be-variable" type="number" min="0" step="0.01" value={variableCostPerUnit} onChange={(e) => setVariableCostPerUnit(e.target.value)} />
        </Field>
      </form>

      {result ? (
        <ResultPanel
          title="Break-even units"
          value={formatNumber(result.breakEvenUnits, 0)}
          subtitle={`Sell ${formatNumber(result.breakEvenUnits, 0)} units (~${formatMoney(result.breakEvenRevenue)}) to cover fixed costs.`}
        >
          <StatGrid
            items={[
              { label: "Contribution / unit", value: formatMoney(result.contributionMargin) },
              { label: "Contribution margin", value: formatPercent(result.contributionMarginPercent) },
              { label: "Break-even revenue", value: formatMoney(result.breakEvenRevenue) },
              { label: "Fixed costs", value: formatMoney(Number(fixedCosts)) },
            ]}
          />
        </ResultPanel>
      ) : (
        <p className="text-sm text-muted-foreground">
          Price per unit must be higher than variable cost per unit.
        </p>
      )}
    </div>
  )
}
