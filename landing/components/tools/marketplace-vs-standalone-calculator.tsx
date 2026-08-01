"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid, selectClassName } from "@/components/tools/calc-ui"
import { calculateMarketplaceVsStandalone } from "@/lib/calculators/marketplace-vs-standalone"
import { formatMoney, formatNumber } from "@/lib/calculators/format"

const PRESETS = {
  "etsy-shopify": {
    label: "Etsy vs Shopify",
    marketplaceFeePercent: "6.5",
    marketplaceListingFeePerOrder: "0.20",
    standaloneMonthlyFee: "39",
    standaloneFeePercent: "0",
  },
  "ebay-standalone": {
    label: "eBay vs standalone site",
    marketplaceFeePercent: "13",
    marketplaceListingFeePerOrder: "0",
    standaloneMonthlyFee: "39",
    standaloneFeePercent: "2.9",
  },
  "amazon-standalone": {
    label: "Amazon referral vs standalone",
    marketplaceFeePercent: "15",
    marketplaceListingFeePerOrder: "0",
    standaloneMonthlyFee: "39",
    standaloneFeePercent: "2.9",
  },
} as const

type PresetKey = keyof typeof PRESETS | "custom"

export function MarketplaceVsStandaloneCalculator() {
  const [preset, setPreset] = useState<PresetKey>("etsy-shopify")
  const [marketplaceFeePercent, setMarketplaceFeePercent] = useState("6.5")
  const [marketplaceListingFeePerOrder, setMarketplaceListingFeePerOrder] = useState("0.20")
  const [standaloneMonthlyFee, setStandaloneMonthlyFee] = useState("39")
  const [standaloneFeePercent, setStandaloneFeePercent] = useState("0")
  const [averageOrderValue, setAverageOrderValue] = useState("42")

  const applyPreset = (key: PresetKey) => {
    setPreset(key)
    if (key === "custom") return
    const p = PRESETS[key]
    setMarketplaceFeePercent(p.marketplaceFeePercent)
    setMarketplaceListingFeePerOrder(p.marketplaceListingFeePerOrder)
    setStandaloneMonthlyFee(p.standaloneMonthlyFee)
    setStandaloneFeePercent(p.standaloneFeePercent)
  }

  const result = useMemo(
    () =>
      calculateMarketplaceVsStandalone({
        marketplaceFeePercent: Number(marketplaceFeePercent),
        marketplaceListingFeePerOrder: Number(marketplaceListingFeePerOrder),
        standaloneMonthlyFee: Number(standaloneMonthlyFee),
        standaloneFeePercent: Number(standaloneFeePercent),
        averageOrderValue: Number(averageOrderValue),
      }),
    [
      marketplaceFeePercent,
      marketplaceListingFeePerOrder,
      standaloneMonthlyFee,
      standaloneFeePercent,
      averageOrderValue,
    ],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="mvs-preset" label="Comparison preset" className="sm:col-span-2">
          <select
            id="mvs-preset"
            className={selectClassName}
            value={preset}
            onChange={(e) => applyPreset(e.target.value as PresetKey)}
          >
            {Object.entries(PRESETS).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
            <option value="custom">Custom fees</option>
          </select>
        </Field>
        <Field id="mvs-aov" label="Average order value">
          <Input id="mvs-aov" type="number" min="0.01" step="0.01" value={averageOrderValue} onChange={(e) => { setAverageOrderValue(e.target.value); setPreset("custom") }} />
        </Field>
        <Field id="mvs-mkt-fee" label="Marketplace fee %">
          <Input id="mvs-mkt-fee" type="number" min="0" max="40" step="0.1" value={marketplaceFeePercent} onChange={(e) => { setMarketplaceFeePercent(e.target.value); setPreset("custom") }} />
        </Field>
        <Field id="mvs-listing" label="Marketplace fee $ / order" hint="e.g. Etsy listing fee allocated per order">
          <Input id="mvs-listing" type="number" min="0" step="0.01" value={marketplaceListingFeePerOrder} onChange={(e) => { setMarketplaceListingFeePerOrder(e.target.value); setPreset("custom") }} />
        </Field>
        <Field id="mvs-monthly" label="Standalone monthly plan $">
          <Input id="mvs-monthly" type="number" min="0" step="1" value={standaloneMonthlyFee} onChange={(e) => { setStandaloneMonthlyFee(e.target.value); setPreset("custom") }} />
        </Field>
        <Field id="mvs-stand-fee" label="Standalone variable fee %" hint="Payment processing or platform % on your own site" className="sm:col-span-2">
          <Input id="mvs-stand-fee" type="number" min="0" max="20" step="0.1" value={standaloneFeePercent} onChange={(e) => { setStandaloneFeePercent(e.target.value); setPreset("custom") }} />
        </Field>
      </form>

      {result ? (
        <ResultPanel
          title="Break-even monthly orders"
          value={formatNumber(result.breakEvenOrders, 0)}
          subtitle={result.note}
        >
          <StatGrid
            items={[
              { label: "Break-even GMV", value: formatMoney(result.breakEvenGmv) },
              {
                label: "Marketplace cost / order",
                value: formatMoney(result.marketplaceCostPerOrder),
              },
              {
                label: "Standalone variable / order",
                value: formatMoney(result.standaloneVariablePerOrder),
              },
              {
                label: "Fees at break-even (mkt)",
                value: formatMoney(result.marketplaceCostAtBreakEven),
              },
              {
                label: "Fees at break-even (site)",
                value: formatMoney(result.standaloneCostAtBreakEven),
              },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
