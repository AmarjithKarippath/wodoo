"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import { calculateOffsiteAdsMargin } from "@/lib/calculators/offsite-ads-margin"
import { formatMoney, formatPercent } from "@/lib/calculators/format"

const PENALTY_PRESETS = [
  { label: "12% marketplace referral penalty", value: "12" },
  { label: "13% marketplace referral penalty", value: "13" },
  { label: "14% marketplace referral penalty", value: "14" },
  { label: "15% marketplace referral penalty", value: "15" },
  { label: "Custom", value: "custom" },
]

export function OffsiteAdsMarginChecker() {
  const [sellingPrice, setSellingPrice] = useState("48")
  const [productCost, setProductCost] = useState("14")
  const [shippingCost, setShippingCost] = useState("4.50")
  const [adSpendPerOrder, setAdSpendPerOrder] = useState("9")
  const [paymentFeePercent, setPaymentFeePercent] = useState("2.9")
  const [preset, setPreset] = useState("15")
  const [customPenalty, setCustomPenalty] = useState("15")

  const referralPenaltyPercent =
    preset === "custom" ? Number(customPenalty) : Number(preset)

  const result = useMemo(
    () =>
      calculateOffsiteAdsMargin({
        sellingPrice: Number(sellingPrice),
        productCost: Number(productCost),
        shippingCost: Number(shippingCost),
        adSpendPerOrder: Number(adSpendPerOrder),
        referralPenaltyPercent,
        paymentFeePercent: Number(paymentFeePercent),
      }),
    [
      sellingPrice,
      productCost,
      shippingCost,
      adSpendPerOrder,
      referralPenaltyPercent,
      paymentFeePercent,
    ],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="oam-price" label="Selling price">
          <Input id="oam-price" type="number" min="0.01" step="0.01" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
        </Field>
        <Field id="oam-cogs" label="Product cost">
          <Input id="oam-cogs" type="number" min="0" step="0.01" value={productCost} onChange={(e) => setProductCost(e.target.value)} />
        </Field>
        <Field id="oam-ship" label="Shipping cost">
          <Input id="oam-ship" type="number" min="0" step="0.01" value={shippingCost} onChange={(e) => setShippingCost(e.target.value)} />
        </Field>
        <Field id="oam-ads" label="Offsite ad spend / order">
          <Input id="oam-ads" type="number" min="0" step="0.01" value={adSpendPerOrder} onChange={(e) => setAdSpendPerOrder(e.target.value)} />
        </Field>
        <Field id="oam-pay" label="Payment fee %">
          <Input id="oam-pay" type="number" min="0" max="20" step="0.1" value={paymentFeePercent} onChange={(e) => setPaymentFeePercent(e.target.value)} />
        </Field>
        <Field id="oam-penalty" label="Marketplace referral penalty">
          <select
            id="oam-penalty"
            className={selectClassName}
            value={preset}
            onChange={(e) => setPreset(e.target.value)}
          >
            {PENALTY_PRESETS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </Field>
        {preset === "custom" ? (
          <Field id="oam-custom" label="Custom penalty %" className="sm:col-span-2">
            <Input
              id="oam-custom"
              type="number"
              min="0"
              max="40"
              step="0.1"
              value={customPenalty}
              onChange={(e) => setCustomPenalty(e.target.value)}
            />
          </Field>
        ) : null}
      </form>

      {result ? (
        <ResultPanel
          title="Net margin after referral penalty"
          value={formatMoney(result.netMargin)}
          subtitle={`${formatPercent(result.netMarginPercent)} net · penalty removes ${formatMoney(result.penaltyImpact)} vs no-referral margin`}
        >
          <StatGrid
            items={[
              {
                label: "Margin without penalty",
                value: `${formatMoney(result.marginWithoutPenalty)} (${formatPercent(result.marginWithoutPenaltyPercent)})`,
              },
              { label: "Referral penalty", value: formatMoney(result.referralPenalty) },
              { label: "Payment fee", value: formatMoney(result.paymentFee) },
              { label: "Gross before ads/fees", value: formatMoney(result.grossBeforePenalty) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
