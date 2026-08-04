"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateAge } from "@/lib/calculators/age"
import { formatNumber } from "@/lib/calculators/format"

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("1995-01-15")
  const [asOfDate, setAsOfDate] = useState(new Date().toISOString().slice(0, 10))

  const result = useMemo(
    () => calculateAge({ birthDate, asOfDate }),
    [birthDate, asOfDate],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="age-birth" label="Date of birth">
          <Input id="age-birth" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </Field>
        <Field id="age-asof" label="Age as of" hint="Defaults to today">
          <Input id="age-asof" type="date" value={asOfDate} onChange={(e) => setAsOfDate(e.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title="Your age"
          value={`${result.years} years`}
          subtitle={`${result.months} months, ${result.days} days`}
        >
          <StatGrid
            items={[
              { label: "Years", value: formatNumber(result.years, 0) },
              { label: "Months", value: formatNumber(result.months, 0) },
              { label: "Days", value: formatNumber(result.days, 0) },
              { label: "Total days lived", value: formatNumber(result.totalDays, 0) },
              { label: "Next birthday in", value: `${formatNumber(result.nextBirthdayInDays, 0)} days` },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
