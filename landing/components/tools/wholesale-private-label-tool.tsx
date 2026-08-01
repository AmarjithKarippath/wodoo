"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateWholesalePrivateLabel } from "@/lib/calculators/wholesale-private-label"
import { formatMoney, formatNumber, formatPercent } from "@/lib/calculators/format"

export function WholesalePrivateLabelTool() {
  const [wholesaleUnitCost, setWholesaleUnitCost] = useState("9.50")
  const [wholesaleMoq, setWholesaleMoq] = useState("100")
  const [wholesaleInboundShipping, setWholesaleInboundShipping] = useState("180")
  const [privateLabelUnitCost, setPrivateLabelUnitCost] = useState("7.25")
  const [privateLabelMoq, setPrivateLabelMoq] = useState("500")
  const [privateLabelSetupFee, setPrivateLabelSetupFee] = useState("450")
  const [privateLabelInboundShipping, setPrivateLabelInboundShipping] = useState("520")
  const [sellingPrice, setSellingPrice] = useState("32")
  const [expectedMonthlyUnits, setExpectedMonthlyUnits] = useState("150")

  const result = useMemo(
    () =>
      calculateWholesalePrivateLabel({
        wholesaleUnitCost: Number(wholesaleUnitCost),
        wholesaleMoq: Number(wholesaleMoq),
        wholesaleInboundShipping: Number(wholesaleInboundShipping),
        privateLabelUnitCost: Number(privateLabelUnitCost),
        privateLabelMoq: Number(privateLabelMoq),
        privateLabelSetupFee: Number(privateLabelSetupFee),
        privateLabelInboundShipping: Number(privateLabelInboundShipping),
        sellingPrice: Number(sellingPrice),
        expectedMonthlyUnits: Number(expectedMonthlyUnits),
      }),
    [
      wholesaleUnitCost,
      wholesaleMoq,
      wholesaleInboundShipping,
      privateLabelUnitCost,
      privateLabelMoq,
      privateLabelSetupFee,
      privateLabelInboundShipping,
      sellingPrice,
      expectedMonthlyUnits,
    ],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <p className="sm:col-span-2 text-sm font-semibold text-foreground">Wholesale option</p>
        <Field id="ws-cost" label="Wholesale unit cost">
          <Input id="ws-cost" type="number" min="0" step="0.01" value={wholesaleUnitCost} onChange={(e) => setWholesaleUnitCost(e.target.value)} />
        </Field>
        <Field id="ws-moq" label="Wholesale MOQ">
          <Input id="ws-moq" type="number" min="1" step="1" value={wholesaleMoq} onChange={(e) => setWholesaleMoq(e.target.value)} />
        </Field>
        <Field id="ws-ship" label="Inbound shipping (wholesale lot)" className="sm:col-span-2">
          <Input id="ws-ship" type="number" min="0" step="1" value={wholesaleInboundShipping} onChange={(e) => setWholesaleInboundShipping(e.target.value)} />
        </Field>

        <p className="sm:col-span-2 text-sm font-semibold text-foreground">Private label option</p>
        <Field id="pl-cost" label="Private label unit cost">
          <Input id="pl-cost" type="number" min="0" step="0.01" value={privateLabelUnitCost} onChange={(e) => setPrivateLabelUnitCost(e.target.value)} />
        </Field>
        <Field id="pl-moq" label="Private label MOQ">
          <Input id="pl-moq" type="number" min="1" step="1" value={privateLabelMoq} onChange={(e) => setPrivateLabelMoq(e.target.value)} />
        </Field>
        <Field id="pl-setup" label="Setup / branding fee">
          <Input id="pl-setup" type="number" min="0" step="1" value={privateLabelSetupFee} onChange={(e) => setPrivateLabelSetupFee(e.target.value)} />
        </Field>
        <Field id="pl-ship" label="Inbound shipping (PL lot)">
          <Input id="pl-ship" type="number" min="0" step="1" value={privateLabelInboundShipping} onChange={(e) => setPrivateLabelInboundShipping(e.target.value)} />
        </Field>

        <p className="sm:col-span-2 text-sm font-semibold text-foreground">Sell-side</p>
        <Field id="pl-price" label="Your selling price">
          <Input id="pl-price" type="number" min="0.01" step="0.01" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
        </Field>
        <Field id="pl-units" label="Expected monthly units">
          <Input id="pl-units" type="number" min="1" step="1" value={expectedMonthlyUnits} onChange={(e) => setExpectedMonthlyUnits(e.target.value)} />
        </Field>
      </form>

      {result ? (
        <>
          <ResultPanel
            title="Best monthly profit"
            value={
              result.betterForMonthlyProfit === "private-label"
                ? "Private label"
                : result.betterForMonthlyProfit === "wholesale"
                  ? "Wholesale"
                  : "Tie"
            }
            subtitle={`Margin edge: ${
              result.betterForMargin === "private-label"
                ? "private label"
                : result.betterForMargin === "wholesale"
                  ? "wholesale"
                  : "even"
            }`}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-secondary/30 p-6">
              <p className="text-sm font-semibold">Wholesale</p>
              <StatGrid
                items={[
                  { label: "Landed unit cost", value: formatMoney(result.wholesale.landedUnitCost) },
                  { label: "Unit profit", value: formatMoney(result.wholesale.unitProfit) },
                  { label: "Margin", value: formatPercent(result.wholesale.marginPercent) },
                  { label: "Startup inventory", value: formatMoney(result.wholesale.startupInventoryCost) },
                  { label: "Monthly profit", value: formatMoney(result.wholesale.monthlyProfit) },
                  {
                    label: "Months to recover",
                    value:
                      result.wholesale.monthsToRecoverStartup != null
                        ? formatNumber(result.wholesale.monthsToRecoverStartup, 1)
                        : "—",
                  },
                ]}
              />
            </div>
            <div className="rounded-2xl border border-border bg-secondary/30 p-6">
              <p className="text-sm font-semibold">Private label</p>
              <StatGrid
                items={[
                  { label: "Landed unit cost", value: formatMoney(result.privateLabel.landedUnitCost) },
                  { label: "Unit profit", value: formatMoney(result.privateLabel.unitProfit) },
                  { label: "Margin", value: formatPercent(result.privateLabel.marginPercent) },
                  { label: "Startup inventory", value: formatMoney(result.privateLabel.startupInventoryCost) },
                  { label: "Monthly profit", value: formatMoney(result.privateLabel.monthlyProfit) },
                  {
                    label: "Months to recover",
                    value:
                      result.privateLabel.monthsToRecoverStartup != null
                        ? formatNumber(result.privateLabel.monthsToRecoverStartup, 1)
                        : "—",
                  },
                ]}
              />
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
