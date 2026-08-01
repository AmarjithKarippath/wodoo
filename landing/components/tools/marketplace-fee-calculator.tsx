"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import {
  MARKETPLACE_DEFAULTS,
  calculateMarketplaceFees,
  type Marketplace,
} from "@/lib/calculators/marketplace-fees"
import { formatMoney, formatPercent } from "@/lib/calculators/format"

export function MarketplaceFeeCalculator() {
  const [marketplace, setMarketplace] = useState<Marketplace>("etsy")
  const [salePrice, setSalePrice] = useState("42")
  const [shippingCharged, setShippingCharged] = useState("5")
  const [feePercent, setFeePercent] = useState(String(MARKETPLACE_DEFAULTS.etsy.feePercent))
  const [fixedFee, setFixedFee] = useState(String(MARKETPLACE_DEFAULTS.etsy.fixedFee))
  const [paymentProcessingPercent, setPaymentProcessingPercent] = useState(
    String(MARKETPLACE_DEFAULTS.etsy.paymentProcessingPercent),
  )
  const [paymentProcessingFixed, setPaymentProcessingFixed] = useState(
    String(MARKETPLACE_DEFAULTS.etsy.paymentProcessingFixed),
  )
  const [productCost, setProductCost] = useState("14")

  function applyMarketplace(next: Marketplace) {
    setMarketplace(next)
    const defaults = MARKETPLACE_DEFAULTS[next]
    setFeePercent(String(defaults.feePercent))
    setFixedFee(String(defaults.fixedFee))
    setPaymentProcessingPercent(String(defaults.paymentProcessingPercent))
    setPaymentProcessingFixed(String(defaults.paymentProcessingFixed))
  }

  const result = useMemo(
    () =>
      calculateMarketplaceFees({
        marketplace,
        salePrice: Number(salePrice),
        shippingCharged: Number(shippingCharged),
        feePercent: Number(feePercent),
        fixedFee: Number(fixedFee),
        paymentProcessingPercent: Number(paymentProcessingPercent),
        paymentProcessingFixed: Number(paymentProcessingFixed),
        productCost: Number(productCost),
      }),
    [
      marketplace,
      salePrice,
      shippingCharged,
      feePercent,
      fixedFee,
      paymentProcessingPercent,
      paymentProcessingFixed,
      productCost,
    ],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="mp-market" label="Marketplace">
          <select
            id="mp-market"
            className={selectClassName}
            value={marketplace}
            onChange={(e) => applyMarketplace(e.target.value as Marketplace)}
          >
            <option value="etsy">Etsy</option>
            <option value="ebay">eBay</option>
          </select>
        </Field>
        <Field id="mp-price" label="Item sale price">
          <Input id="mp-price" type="number" min="0" step="0.01" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} />
        </Field>
        <Field id="mp-ship" label="Shipping charged to buyer">
          <Input id="mp-ship" type="number" min="0" step="0.01" value={shippingCharged} onChange={(e) => setShippingCharged(e.target.value)} />
        </Field>
        <Field id="mp-cost" label="Product cost">
          <Input id="mp-cost" type="number" min="0" step="0.01" value={productCost} onChange={(e) => setProductCost(e.target.value)} />
        </Field>
        <Field id="mp-fee-pct" label="Final value / transaction fee %">
          <Input id="mp-fee-pct" type="number" min="0" max="100" step="0.01" value={feePercent} onChange={(e) => setFeePercent(e.target.value)} />
        </Field>
        <Field id="mp-fixed" label="Fixed marketplace fee">
          <Input id="mp-fixed" type="number" min="0" step="0.01" value={fixedFee} onChange={(e) => setFixedFee(e.target.value)} />
        </Field>
        <Field id="mp-pay-pct" label="Payment processing %">
          <Input id="mp-pay-pct" type="number" min="0" max="100" step="0.01" value={paymentProcessingPercent} onChange={(e) => setPaymentProcessingPercent(e.target.value)} />
        </Field>
        <Field id="mp-pay-fixed" label="Payment processing fixed">
          <Input id="mp-pay-fixed" type="number" min="0" step="0.01" value={paymentProcessingFixed} onChange={(e) => setPaymentProcessingFixed(e.target.value)} />
        </Field>
      </form>

      {result ? (
        <ResultPanel
          title="Estimated profit after fees"
          value={formatMoney(result.profit)}
          subtitle={`${marketplace === "etsy" ? "Etsy" : "eBay"}-style fees take about ${formatPercent(result.feePercentOfSale)} of item + shipping.`}
        >
          <StatGrid
            items={[
              { label: "Marketplace fees", value: formatMoney(result.marketplaceFee) },
              { label: "Payment fees", value: formatMoney(result.paymentFee) },
              { label: "Total fees", value: formatMoney(result.totalFees) },
              { label: "Net payout", value: formatMoney(result.netPayout) },
            ]}
          />
          <p className="text-xs text-muted-foreground">
            Defaults are simplified starting points — live marketplace fee schedules change by category and country.
          </p>
        </ResultPanel>
      ) : null}
    </div>
  )
}
