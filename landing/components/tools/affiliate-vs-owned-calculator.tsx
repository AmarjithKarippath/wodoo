"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateAffiliateVsOwned } from "@/lib/calculators/affiliate-vs-owned"
import { formatMoney, formatPercent } from "@/lib/calculators/format"

export function AffiliateVsOwnedCalculator() {
  const [sellingPrice, setSellingPrice] = useState("64")
  const [productCost, setProductCost] = useState("18")
  const [affiliateCommissionPercent, setAffiliateCommissionPercent] = useState("15")
  const [ownedStoreFeePercent, setOwnedStoreFeePercent] = useState("2.9")
  const [ownedFulfillmentCost, setOwnedFulfillmentCost] = useState("5.50")
  const [affiliateOrders, setAffiliateOrders] = useState("80")
  const [ownedOrders, setOwnedOrders] = useState("80")

  const result = useMemo(
    () =>
      calculateAffiliateVsOwned({
        sellingPrice: Number(sellingPrice),
        productCost: Number(productCost),
        affiliateCommissionPercent: Number(affiliateCommissionPercent),
        ownedStoreFeePercent: Number(ownedStoreFeePercent),
        ownedFulfillmentCost: Number(ownedFulfillmentCost),
        affiliateOrders: Number(affiliateOrders),
        ownedOrders: Number(ownedOrders),
      }),
    [
      sellingPrice,
      productCost,
      affiliateCommissionPercent,
      ownedStoreFeePercent,
      ownedFulfillmentCost,
      affiliateOrders,
      ownedOrders,
    ],
  )

  const winnerLabel =
    result?.betterChannel === "owned"
      ? "Owned store wins"
      : result?.betterChannel === "affiliate"
        ? "Affiliate channel wins"
        : "Channels tied"

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="avo-price" label="Selling price">
          <Input id="avo-price" type="number" min="0.01" step="0.01" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
        </Field>
        <Field id="avo-cogs" label="Product cost (COGS)">
          <Input id="avo-cogs" type="number" min="0" step="0.01" value={productCost} onChange={(e) => setProductCost(e.target.value)} />
        </Field>
        <Field id="avo-aff-comm" label="Affiliate commission %">
          <Input id="avo-aff-comm" type="number" min="0" max="90" step="0.1" value={affiliateCommissionPercent} onChange={(e) => setAffiliateCommissionPercent(e.target.value)} />
        </Field>
        <Field id="avo-store-fee" label="Owned store fee %">
          <Input id="avo-store-fee" type="number" min="0" max="30" step="0.1" value={ownedStoreFeePercent} onChange={(e) => setOwnedStoreFeePercent(e.target.value)} />
        </Field>
        <Field id="avo-fulfill" label="Owned fulfillment / shipping cost">
          <Input id="avo-fulfill" type="number" min="0" step="0.01" value={ownedFulfillmentCost} onChange={(e) => setOwnedFulfillmentCost(e.target.value)} />
        </Field>
        <Field id="avo-aff-orders" label="Affiliate orders (period)">
          <Input id="avo-aff-orders" type="number" min="0" step="1" value={affiliateOrders} onChange={(e) => setAffiliateOrders(e.target.value)} />
        </Field>
        <Field id="avo-owned-orders" label="Owned-store orders (period)" className="sm:col-span-2">
          <Input id="avo-owned-orders" type="number" min="0" step="1" value={ownedOrders} onChange={(e) => setOwnedOrders(e.target.value)} />
        </Field>
      </form>

      {result ? (
        <ResultPanel
          title={winnerLabel}
          value={formatMoney(Math.abs(result.profitDifference))}
          subtitle="Profit difference between owned store and affiliate sales for the volumes above."
        >
          <StatGrid
            items={[
              {
                label: "Affiliate profit / order",
                value: `${formatMoney(result.affiliate.profitPerOrder)} (${formatPercent(result.affiliate.marginPercent)})`,
              },
              {
                label: "Owned profit / order",
                value: `${formatMoney(result.owned.profitPerOrder)} (${formatPercent(result.owned.marginPercent)})`,
              },
              { label: "Affiliate period profit", value: formatMoney(result.affiliate.profit) },
              { label: "Owned period profit", value: formatMoney(result.owned.profit) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
