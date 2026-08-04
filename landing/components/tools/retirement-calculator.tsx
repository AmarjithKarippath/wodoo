"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateRetirement } from "@/lib/calculators/retirement"
import { formatMoney, formatNumber } from "@/lib/calculators/format"

export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState("30")
  const [retireAge, setRetireAge] = useState("60")
  const [expense, setExpense] = useState("50000")
  const [inflation, setInflation] = useState("6")
  const [returns, setReturns] = useState("10")
  const [savings, setSavings] = useState("500000")
  const [monthly, setMonthly] = useState("20000")

  const result = useMemo(
    () =>
      calculateRetirement({
        currentAge: Number(currentAge),
        retireAge: Number(retireAge),
        monthlyExpenseToday: Number(expense),
        inflationPercent: Number(inflation),
        expectedReturnPercent: Number(returns),
        currentSavings: Number(savings),
        monthlyContribution: Number(monthly),
      }),
    [currentAge, retireAge, expense, inflation, returns, savings, monthly],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="ret-ca" label="Current age">
          <Input id="ret-ca" type="number" min="18" max="80" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} />
        </Field>
        <Field id="ret-ra" label="Retirement age">
          <Input id="ret-ra" type="number" min="30" max="90" value={retireAge} onChange={(e) => setRetireAge(e.target.value)} />
        </Field>
        <Field id="ret-ex" label="Monthly expense today">
          <Input id="ret-ex" type="number" min="1" step="1000" value={expense} onChange={(e) => setExpense(e.target.value)} />
        </Field>
        <Field id="ret-inf" label="Inflation (% p.a.)">
          <Input id="ret-inf" type="number" min="0" step="0.1" value={inflation} onChange={(e) => setInflation(e.target.value)} />
        </Field>
        <Field id="ret-r" label="Expected return (% p.a.)">
          <Input id="ret-r" type="number" min="0" step="0.1" value={returns} onChange={(e) => setReturns(e.target.value)} />
        </Field>
        <Field id="ret-s" label="Current savings">
          <Input id="ret-s" type="number" min="0" step="10000" value={savings} onChange={(e) => setSavings(e.target.value)} />
        </Field>
        <Field id="ret-m" label="Monthly contribution" className="sm:col-span-2 space-y-2">
          <Input id="ret-m" type="number" min="0" step="500" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title="Corpus needed"
          value={formatMoney(result.corpusNeeded, "INR")}
          subtitle={`25× annual expense at retirement · ${formatNumber(result.yearsToRetire, 0)} years to go`}
        >
          <StatGrid
            items={[
              { label: "Expense at retirement", value: formatMoney(result.monthlyExpenseAtRetirement, "INR") + "/mo" },
              { label: "Projected corpus", value: formatMoney(result.projectedCorpus, "INR") },
              {
                label: result.shortfall > 0 ? "Shortfall" : "Surplus",
                value: formatMoney(Math.abs(result.shortfall), "INR"),
              },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
