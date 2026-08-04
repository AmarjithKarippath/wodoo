"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateNetWorth } from "@/lib/calculators/net-worth"
import { formatMoney } from "@/lib/calculators/format"

export function NetWorthCalculator() {
  const [cash, setCash] = useState("200000")
  const [investments, setInvestments] = useState("1500000")
  const [property, setProperty] = useState("5000000")
  const [otherAssets, setOtherAssets] = useState("100000")
  const [loans, setLoans] = useState("2000000")
  const [creditCards, setCreditCards] = useState("50000")
  const [otherLiabilities, setOtherLiabilities] = useState("0")

  const result = useMemo(
    () =>
      calculateNetWorth({
        cash: Number(cash),
        investments: Number(investments),
        property: Number(property),
        otherAssets: Number(otherAssets),
        loans: Number(loans),
        creditCards: Number(creditCards),
        otherLiabilities: Number(otherLiabilities),
      }),
    [cash, investments, property, otherAssets, loans, creditCards, otherLiabilities],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="nw-cash" label="Cash & bank">
          <Input id="nw-cash" type="number" min="0" step="1000" value={cash} onChange={(e) => setCash(e.target.value)} />
        </Field>
        <Field id="nw-inv" label="Investments">
          <Input id="nw-inv" type="number" min="0" step="1000" value={investments} onChange={(e) => setInvestments(e.target.value)} />
        </Field>
        <Field id="nw-prop" label="Property / real estate">
          <Input id="nw-prop" type="number" min="0" step="10000" value={property} onChange={(e) => setProperty(e.target.value)} />
        </Field>
        <Field id="nw-oa" label="Other assets">
          <Input id="nw-oa" type="number" min="0" step="1000" value={otherAssets} onChange={(e) => setOtherAssets(e.target.value)} />
        </Field>
        <Field id="nw-loans" label="Loans">
          <Input id="nw-loans" type="number" min="0" step="1000" value={loans} onChange={(e) => setLoans(e.target.value)} />
        </Field>
        <Field id="nw-cc" label="Credit cards">
          <Input id="nw-cc" type="number" min="0" step="500" value={creditCards} onChange={(e) => setCreditCards(e.target.value)} />
        </Field>
        <Field id="nw-ol" label="Other liabilities" className="sm:col-span-2 space-y-2">
          <Input id="nw-ol" type="number" min="0" step="1000" value={otherLiabilities} onChange={(e) => setOtherLiabilities(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel title="Net worth" value={formatMoney(result.netWorth, "INR")}>
          <StatGrid
            items={[
              { label: "Total assets", value: formatMoney(result.totalAssets, "INR") },
              { label: "Total liabilities", value: formatMoney(result.totalLiabilities, "INR") },
              { label: "Net worth", value: formatMoney(result.netWorth, "INR") },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
