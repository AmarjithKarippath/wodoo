"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateSukanyaSamriddhi } from "@/lib/calculators/sukanya-samriddhi"
import { formatMoney } from "@/lib/calculators/format"

export function SukanyaSamriddhiCalculator() {
  const [yearly, setYearly] = useState("150000")
  const [depositYears, setDepositYears] = useState("15")
  const [rate, setRate] = useState("8.2")
  const [maturityYears, setMaturityYears] = useState("21")

  const result = useMemo(
    () =>
      calculateSukanyaSamriddhi({
        yearlyDeposit: Number(yearly),
        depositYears: Number(depositYears),
        annualRatePercent: Number(rate),
        maturityYears: Number(maturityYears),
      }),
    [yearly, depositYears, rate, maturityYears],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="ssy-d" label="Yearly deposit" hint="Max ₹1.5 lakh/year under the scheme (illustrative).">
          <Input id="ssy-d" type="number" min="250" step="1000" value={yearly} onChange={(e) => setYearly(e.target.value)} />
        </Field>
        <Field id="ssy-dy" label="Deposit years" hint="Typically up to 15 years from account opening.">
          <Input id="ssy-dy" type="number" min="1" max="15" step="1" value={depositYears} onChange={(e) => setDepositYears(e.target.value)} />
        </Field>
        <Field id="ssy-r" label="Interest rate (% p.a.)" hint="Scheme rate is revised by the government — enter the current rate.">
          <Input id="ssy-r" type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field id="ssy-m" label="Maturity years" hint="Usually 21 years from account opening.">
          <Input id="ssy-m" type="number" min="1" max="25" step="1" value={maturityYears} onChange={(e) => setMaturityYears(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel title="Maturity amount" value={formatMoney(result.maturityAmount, "INR")} subtitle="Illustrative estimate — confirm with bank/post office.">
          <StatGrid
            items={[
              { label: "Total deposited", value: formatMoney(result.totalDeposited, "INR") },
              { label: "Interest earned", value: formatMoney(result.interestEarned, "INR") },
              { label: "Maturity value", value: formatMoney(result.maturityAmount, "INR") },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
