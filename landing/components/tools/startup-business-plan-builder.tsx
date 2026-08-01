"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateStartupCashflow } from "@/lib/calculators/startup-cashflow"
import { formatMoney, formatNumber } from "@/lib/calculators/format"

export function StartupBusinessPlanBuilder() {
  const [startingCash, setStartingCash] = useState("15000")
  const [monthlyRevenue, setMonthlyRevenue] = useState("4000")
  const [monthlyGrowthPercent, setMonthlyGrowthPercent] = useState("8")
  const [monthlyCogs, setMonthlyCogs] = useState("1200")
  const [monthlyOperatingExpenses, setMonthlyOperatingExpenses] = useState("2800")
  const [months, setMonths] = useState("12")

  const result = useMemo(
    () =>
      calculateStartupCashflow({
        startingCash: Number(startingCash),
        monthlyRevenue: Number(monthlyRevenue),
        monthlyGrowthPercent: Number(monthlyGrowthPercent),
        monthlyCogs: Number(monthlyCogs),
        monthlyOperatingExpenses: Number(monthlyOperatingExpenses),
        months: Number(months),
      }),
    [
      startingCash,
      monthlyRevenue,
      monthlyGrowthPercent,
      monthlyCogs,
      monthlyOperatingExpenses,
      months,
    ],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="bp-cash" label="Starting cash">
          <Input id="bp-cash" type="number" min="0" step="100" value={startingCash} onChange={(e) => setStartingCash(e.target.value)} />
        </Field>
        <Field id="bp-rev" label="Month 1 revenue">
          <Input id="bp-rev" type="number" min="0" step="100" value={monthlyRevenue} onChange={(e) => setMonthlyRevenue(e.target.value)} />
        </Field>
        <Field id="bp-growth" label="Monthly revenue growth %">
          <Input id="bp-growth" type="number" min="0" max="100" step="0.1" value={monthlyGrowthPercent} onChange={(e) => setMonthlyGrowthPercent(e.target.value)} />
        </Field>
        <Field id="bp-cogs" label="Monthly COGS">
          <Input id="bp-cogs" type="number" min="0" step="50" value={monthlyCogs} onChange={(e) => setMonthlyCogs(e.target.value)} />
        </Field>
        <Field id="bp-opex" label="Monthly operating expenses">
          <Input id="bp-opex" type="number" min="0" step="50" value={monthlyOperatingExpenses} onChange={(e) => setMonthlyOperatingExpenses(e.target.value)} />
        </Field>
        <Field id="bp-months" label="Projection months">
          <Input id="bp-months" type="number" min="1" max="36" step="1" value={months} onChange={(e) => setMonths(e.target.value)} />
        </Field>
      </form>

      {result ? (
        <>
          <ResultPanel
            title="Ending cash"
            value={formatMoney(result.endingCash)}
            subtitle={
              result.profitableMonth
                ? `First profitable month: ${result.profitableMonth}. Lowest cash point: ${formatMoney(result.lowestCash)}.`
                : `No profitable month in this window. Lowest cash point: ${formatMoney(result.lowestCash)}.`
            }
          >
            <StatGrid
              items={[
                { label: "Total revenue", value: formatMoney(result.totalRevenue) },
                { label: "Total costs", value: formatMoney(result.totalCosts) },
                { label: "Months modeled", value: formatNumber(result.months.length, 0) },
                { label: "Lowest cash", value: formatMoney(result.lowestCash) },
              ]}
            />
          </ResultPanel>

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="border-b border-border bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Month</th>
                  <th className="px-4 py-3">Revenue</th>
                  <th className="px-4 py-3">Costs</th>
                  <th className="px-4 py-3">Net</th>
                  <th className="px-4 py-3">Cash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {result.months.map((row) => (
                  <tr key={row.month}>
                    <td className="px-4 py-3 font-semibold">{row.month}</td>
                    <td className="px-4 py-3">{formatMoney(row.revenue)}</td>
                    <td className="px-4 py-3">{formatMoney(row.costs)}</td>
                    <td className="px-4 py-3">{formatMoney(row.net)}</td>
                    <td className="px-4 py-3 font-semibold">{formatMoney(row.endingCash)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </div>
  )
}
