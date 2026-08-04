"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import { calculateLoanEmi, type LoanType } from "@/lib/calculators/loan-emi"
import { formatMoney, formatNumber } from "@/lib/calculators/format"

export function HomePersonalLoanEmiCalculator() {
  const [loanType, setLoanType] = useState<LoanType>("home")
  const [principal, setPrincipal] = useState("2500000")
  const [rate, setRate] = useState("8.5")
  const [years, setYears] = useState("20")

  const result = useMemo(
    () =>
      calculateLoanEmi({
        loanType,
        principal: Number(principal),
        annualRatePercent: Number(rate),
        tenureYears: Number(years),
      }),
    [loanType, principal, rate, years],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="loan-type" label="Loan type">
          <select id="loan-type" className={selectClassName} value={loanType} onChange={(e) => setLoanType(e.target.value as LoanType)}>
            <option value="home">Home loan</option>
            <option value="personal">Personal loan</option>
          </select>
        </Field>
        <Field id="loan-p" label="Loan amount">
          <Input id="loan-p" type="number" min="1" step="10000" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </Field>
        <Field id="loan-r" label="Interest rate (% p.a.)">
          <Input id="loan-r" type="number" min="0" step="0.05" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field id="loan-y" label="Tenure (years)">
          <Input id="loan-y" type="number" min="1" step="1" value={years} onChange={(e) => setYears(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title={`${loanType === "home" ? "Home" : "Personal"} loan EMI`}
          value={formatMoney(result.emi, "INR")}
        >
          <StatGrid
            items={[
              { label: "Monthly EMI", value: formatMoney(result.emi, "INR") },
              { label: "Total payment", value: formatMoney(result.totalPayment, "INR") },
              { label: "Total interest", value: formatMoney(result.totalInterest, "INR") },
              { label: "Tenure", value: `${formatNumber(Number(years), 0)} years` },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
