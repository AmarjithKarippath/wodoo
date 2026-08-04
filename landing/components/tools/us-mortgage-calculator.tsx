"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateUsMortgage } from "@/lib/calculators/us-mortgage"
import { formatMoney, formatNumber } from "@/lib/calculators/format"

export function UsMortgageCalculator() {
  const [homePrice, setHomePrice] = useState("400000")
  const [downPayment, setDownPayment] = useState("80000")
  const [rate, setRate] = useState("6.5")
  const [years, setYears] = useState("30")
  const [tax, setTax] = useState("4800")
  const [insurance, setInsurance] = useState("1400")
  const [hoa, setHoa] = useState("0")
  const [pmi, setPmi] = useState("0")

  const result = useMemo(
    () =>
      calculateUsMortgage({
        homePrice: Number(homePrice),
        downPayment: Number(downPayment),
        annualRatePercent: Number(rate),
        termYears: Number(years),
        propertyTaxAnnual: Number(tax),
        insuranceAnnual: Number(insurance),
        hoaMonthly: Number(hoa),
        pmiMonthly: Number(pmi),
      }),
    [homePrice, downPayment, rate, years, tax, insurance, hoa, pmi],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="usm-price" label="Home price ($)">
          <Input id="usm-price" type="number" min="1" step="1000" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} />
        </Field>
        <Field id="usm-dp" label="Down payment ($)">
          <Input id="usm-dp" type="number" min="0" step="1000" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
        </Field>
        <Field id="usm-r" label="Interest rate (% p.a.)">
          <Input id="usm-r" type="number" min="0" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field id="usm-y" label="Loan term (years)">
          <Input id="usm-y" type="number" min="1" max="40" step="1" value={years} onChange={(e) => setYears(e.target.value)} />
        </Field>
        <Field id="usm-tax" label="Property tax ($ / year)">
          <Input id="usm-tax" type="number" min="0" step="100" value={tax} onChange={(e) => setTax(e.target.value)} />
        </Field>
        <Field id="usm-ins" label="Home insurance ($ / year)">
          <Input id="usm-ins" type="number" min="0" step="50" value={insurance} onChange={(e) => setInsurance(e.target.value)} />
        </Field>
        <Field id="usm-hoa" label="HOA ($ / month)">
          <Input id="usm-hoa" type="number" min="0" step="10" value={hoa} onChange={(e) => setHoa(e.target.value)} />
        </Field>
        <Field id="usm-pmi" label="PMI ($ / month)" hint="Often required when down payment is under 20%.">
          <Input id="usm-pmi" type="number" min="0" step="10" value={pmi} onChange={(e) => setPmi(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel title="Total monthly payment" value={formatMoney(result.totalMonthly, "USD")}>
          <StatGrid
            items={[
              { label: "Loan amount", value: formatMoney(result.loanAmount, "USD") },
              { label: "Principal & interest", value: formatMoney(result.principalAndInterest, "USD") },
              { label: "Property tax (mo)", value: formatMoney(result.monthlyPropertyTax, "USD") },
              { label: "Insurance (mo)", value: formatMoney(result.monthlyInsurance, "USD") },
              { label: "Total interest", value: formatMoney(result.totalInterest, "USD") },
              { label: "Term", value: `${formatNumber(result.termMonths, 0)} months` },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
