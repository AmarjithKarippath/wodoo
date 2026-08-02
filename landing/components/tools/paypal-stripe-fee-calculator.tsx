"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import {
  calculatePaypalStripeFee,
  type PaymentProvider,
} from "@/lib/calculators/paypal-stripe-fee"
import { formatMoney, formatPercent } from "@/lib/calculators/format"

export function PaypalStripeFeeCalculator() {
  const [amount, setAmount] = useState("100")
  const [provider, setProvider] = useState<PaymentProvider>("stripe")
  const [international, setInternational] = useState("no")

  const result = useMemo(
    () =>
      calculatePaypalStripeFee({
        amount: Number(amount),
        provider,
        international: international === "yes",
      }),
    [amount, provider, international],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="ps-amount" label="Payment amount">
          <Input id="ps-amount" type="number" min="0.01" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </Field>
        <Field id="ps-provider" label="Provider">
          <select
            id="ps-provider"
            className={selectClassName}
            value={provider}
            onChange={(e) => setProvider(e.target.value as PaymentProvider)}
          >
            <option value="stripe">Stripe</option>
            <option value="paypal">PayPal</option>
          </select>
        </Field>
        <Field id="ps-intl" label="International payment?">
          <select
            id="ps-intl"
            className={selectClassName}
            value={international}
            onChange={(e) => setInternational(e.target.value)}
          >
            <option value="no">Domestic</option>
            <option value="yes">International</option>
          </select>
        </Field>
      </form>
      {result ? (
        <ResultPanel
          title={`${result.providerLabel} fee`}
          value={formatMoney(result.fee)}
          subtitle={`You receive about ${formatMoney(result.net)} after fees (${formatPercent(result.ratePercent)} + ${formatMoney(result.fixedFee)})`}
        >
          <StatGrid
            items={[
              { label: "Rate", value: formatPercent(result.ratePercent) },
              { label: "Fixed fee", value: formatMoney(result.fixedFee) },
              { label: "Total fee", value: formatMoney(result.fee) },
              { label: "Net payout", value: formatMoney(result.net) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
