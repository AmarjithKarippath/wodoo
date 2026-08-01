"use client"

import { useMemo, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  calculateFreeShipping,
  formatMoney,
} from "@/lib/free-shipping"

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "CAD", "AUD"] as const

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

export function FreeShippingCalculator() {
  const [shippingCost, setShippingCost] = useState("8")
  const [grossMargin, setGrossMargin] = useState("45")
  const [aov, setAov] = useState("52")
  const [buffer, setBuffer] = useState("10")
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD")

  const result = useMemo(
    () =>
      calculateFreeShipping({
        shippingCost: Number(shippingCost),
        grossMarginPercent: Number(grossMargin),
        averageOrderValue: Number(aov),
        marginBufferPercent: Number(buffer),
      }),
    [shippingCost, grossMargin, aov, buffer],
  )

  const money = (value: number) => formatMoney(value, currency)

  return (
    <div className="space-y-8">
      <form
        className="grid gap-5 sm:grid-cols-2"
        onSubmit={(event) => event.preventDefault()}
      >
        <Field
          id="shippingCost"
          label="Average shipping cost"
          hint="Carrier + packaging + pick/pack, per order."
        >
          <Input
            id="shippingCost"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={shippingCost}
            onChange={(e) => setShippingCost(e.target.value)}
          />
        </Field>

        <Field
          id="grossMargin"
          label="Gross margin %"
          hint="(Revenue − COGS) ÷ Revenue × 100."
        >
          <Input
            id="grossMargin"
            type="number"
            inputMode="decimal"
            min="1"
            max="99"
            step="0.1"
            value={grossMargin}
            onChange={(e) => setGrossMargin(e.target.value)}
          />
        </Field>

        <Field
          id="aov"
          label="Current average order value"
          hint="Use the last 60–90 days if you can."
        >
          <Input
            id="aov"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={aov}
            onChange={(e) => setAov(e.target.value)}
          />
        </Field>

        <Field
          id="buffer"
          label="Margin buffer %"
          hint="Extra cushion above break-even. 5–15% is common."
        >
          <Input
            id="buffer"
            type="number"
            inputMode="decimal"
            min="0"
            max="100"
            step="1"
            value={buffer}
            onChange={(e) => setBuffer(e.target.value)}
          />
        </Field>

        <Field id="currency" label="Currency">
          <select
            id="currency"
            value={currency}
            onChange={(e) =>
              setCurrency(e.target.value as (typeof CURRENCIES)[number])
            }
            className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            {CURRENCIES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </Field>
      </form>

      {result ? (
        <div className="space-y-6 rounded-2xl border border-border bg-secondary/30 p-6 sm:p-8">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Recommended free-shipping threshold
            </p>
            <p className="mt-2 font-display text-5xl font-extrabold tracking-tight text-foreground">
              {money(result.roundedThreshold)}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Set free shipping at about{" "}
              <span className="font-semibold text-foreground">
                {money(result.roundedThreshold)}
              </span>
              . That sits above your break-even floor and about 25% over your
              current AOV so shoppers stretch their cart.
            </p>
          </div>

          <dl className="grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Break-even floor
              </dt>
              <dd className="mt-1 text-xl font-bold text-foreground">
                {money(result.breakEvenThreshold)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                With buffer
              </dt>
              <dd className="mt-1 text-xl font-bold text-foreground">
                {money(result.bufferedThreshold)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                AOV + 25%
              </dt>
              <dd className="mt-1 text-xl font-bold text-foreground">
                {money(result.aovTargetThreshold)}
              </dd>
            </div>
          </dl>

          <ul className="space-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
            <li>
              Gross contribution at the recommended threshold:{" "}
              <span className="font-medium text-foreground">
                {money(result.contributionAtRecommended)}
              </span>
            </li>
            <li>
              Shipping as a share of that order:{" "}
              <span className="font-medium text-foreground">
                {result.shippingAsPercentOfRecommended.toFixed(1)}%
              </span>
            </li>
            <li>
              Formula: break-even = shipping cost ÷ gross margin. Recommended =
              max(break-even × buffer, AOV × 1.25), rounded for merchandising.
            </li>
          </ul>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border px-6 py-10 text-center text-sm text-muted-foreground">
          Enter a shipping cost, margin between 1–99%, and a positive AOV to see
          your threshold.
        </div>
      )}
    </div>
  )
}
