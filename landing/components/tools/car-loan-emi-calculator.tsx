"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateCarLoanEmi } from "@/lib/calculators/car-loan-emi"
import { formatMoney, formatNumber } from "@/lib/calculators/format"

export function CarLoanEmiCalculator() {
  const [carPrice, setCarPrice] = useState("1000000")
  const [downPayment, setDownPayment] = useState("200000")
  const [rate, setRate] = useState("9.5")
  const [years, setYears] = useState("5")

  const result = useMemo(
    () =>
      calculateCarLoanEmi({
        carPrice: Number(carPrice),
        downPayment: Number(downPayment),
        annualRatePercent: Number(rate),
        tenureYears: Number(years),
      }),
    [carPrice, downPayment, rate, years],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="cl-price" label="On-road / car price">
          <Input id="cl-price" type="number" min="1" step="1000" value={carPrice} onChange={(e) => setCarPrice(e.target.value)} />
        </Field>
        <Field id="cl-dp" label="Down payment">
          <Input id="cl-dp" type="number" min="0" step="1000" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
        </Field>
        <Field id="cl-r" label="Interest rate (% p.a.)">
          <Input id="cl-r" type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field id="cl-y" label="Tenure (years)">
          <Input id="cl-y" type="number" min="1" step="1" value={years} onChange={(e) => setYears(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel title="Monthly car EMI" value={formatMoney(result.emi, "INR")}>
          <StatGrid
            items={[
              { label: "Loan amount", value: formatMoney(result.principal, "INR") },
              { label: "Monthly EMI", value: formatMoney(result.emi, "INR") },
              { label: "Total payment", value: formatMoney(result.totalPayment, "INR") },
              { label: "Total interest", value: formatMoney(result.totalInterest, "INR") },
              { label: "Tenure", value: `${formatNumber(result.tenureMonths, 0)} months` },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
