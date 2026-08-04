"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import {
  calculateStampDuty,
  STAMP_DUTY_STATES,
  type StampDutyState,
} from "@/lib/calculators/stamp-duty"
import { formatMoney, formatPercent } from "@/lib/calculators/format"

export function StampDutyCalculator() {
  const [value, setValue] = useState("5000000")
  const [state, setState] = useState<StampDutyState>("maharashtra")
  const [woman, setWoman] = useState(false)
  const [customStamp, setCustomStamp] = useState("5")
  const [customReg, setCustomReg] = useState("1")

  const result = useMemo(
    () =>
      calculateStampDuty({
        propertyValue: Number(value),
        state,
        womanBuyer: woman,
        customStampPercent: state === "other" ? Number(customStamp) : undefined,
        customRegistrationPercent: state === "other" ? Number(customReg) : undefined,
      }),
    [value, state, woman, customStamp, customReg],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="sd-v" label="Property value">
          <Input id="sd-v" type="number" min="1" step="10000" value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <Field id="sd-s" label="State">
          <select id="sd-s" className={selectClassName} value={state} onChange={(e) => setState(e.target.value as StampDutyState)}>
            {STAMP_DUTY_STATES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="sd-w" label="Woman buyer (illustrative −1% stamp)">
          <select
            id="sd-w"
            className={selectClassName}
            value={woman ? "yes" : "no"}
            onChange={(e) => setWoman(e.target.value === "yes")}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </Field>
        {state === "other" ? (
          <>
            <Field id="sd-cs" label="Custom stamp duty (%)">
              <Input id="sd-cs" type="number" min="0" step="0.1" value={customStamp} onChange={(e) => setCustomStamp(e.target.value)} />
            </Field>
            <Field id="sd-cr" label="Custom registration (%)">
              <Input id="sd-cr" type="number" min="0" step="0.1" value={customReg} onChange={(e) => setCustomReg(e.target.value)} />
            </Field>
          </>
        ) : null}
      </form>
      <p className="text-xs text-muted-foreground">
        Rates are illustrative defaults and vary by locality, property type, and concessions. Confirm with the local registrar.
      </p>
      {result ? (
        <ResultPanel title="Stamp + registration" value={formatMoney(result.totalCharges, "INR")} subtitle={result.stateLabel}>
          <StatGrid
            items={[
              { label: "Stamp duty", value: `${formatMoney(result.stampDuty, "INR")} (${formatPercent(result.stampPercent, 1)})` },
              { label: "Registration", value: `${formatMoney(result.registrationFee, "INR")} (${formatPercent(result.registrationPercent, 1)})` },
              { label: "Total charges", value: formatMoney(result.totalCharges, "INR") },
              { label: "Property + charges", value: formatMoney(result.totalWithProperty, "INR") },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
