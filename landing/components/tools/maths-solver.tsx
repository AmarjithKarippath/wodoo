"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { solveMathExpression } from "@/lib/calculators/maths-solver"
import { formatNumber } from "@/lib/calculators/format"

export function MathsSolver() {
  const [expression, setExpression] = useState("(12 + 8) * 3 / 2")

  const result = useMemo(() => solveMathExpression(expression), [expression])

  return (
    <div className="space-y-8">
      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <Field
          id="math-expr"
          label="Expression"
          hint="Supports + − × ÷ % ^ and parentheses. Example: 2^3 + (10-4)/3"
        >
          <Input
            id="math-expr"
            type="text"
            inputMode="decimal"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="font-mono"
          />
        </Field>
      </form>
      {result ? (
        <ResultPanel title="Result" value={formatNumber(result.result, 6)}>
          <StatGrid
            items={[
              { label: "Expression", value: result.expression },
              { label: "Answer", value: formatNumber(result.result, 8) },
            ]}
          />
        </ResultPanel>
      ) : (
        <p className="text-sm text-muted-foreground">Enter a valid arithmetic expression to solve.</p>
      )}
    </div>
  )
}
