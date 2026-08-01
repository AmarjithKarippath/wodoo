"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateLandedProductCost } from "@/lib/calculators/landed-product-cost"
import { formatMoney, formatPercent } from "@/lib/calculators/format"

export function LandedProductCostCalculator() {
  const [productCost, setProductCost] = useState("2400")
  const [inboundShipping, setInboundShipping] = useState("380")
  const [duties, setDuties] = useState("120")
  const [taxes, setTaxes] = useState("90")
  const [insurance, setInsurance] = useState("40")
  const [handlingFees, setHandlingFees] = useState("55")
  const [units, setUnits] = useState("500")

  const result = useMemo(
    () =>
      calculateLandedProductCost({
        productCost: Number(productCost),
        inboundShipping: Number(inboundShipping),
        duties: Number(duties),
        taxes: Number(taxes),
        insurance: Number(insurance),
        handlingFees: Number(handlingFees),
        units: Number(units),
      }),
    [productCost, inboundShipping, duties, taxes, insurance, handlingFees, units],
  )

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="lc-product" label="Product / factory cost (total)">
          <Input id="lc-product" type="number" min="0" step="0.01" value={productCost} onChange={(e) => setProductCost(e.target.value)} />
        </Field>
        <Field id="lc-units" label="Units in shipment">
          <Input id="lc-units" type="number" min="1" step="1" value={units} onChange={(e) => setUnits(e.target.value)} />
        </Field>
        <Field id="lc-ship" label="Inbound shipping">
          <Input id="lc-ship" type="number" min="0" step="0.01" value={inboundShipping} onChange={(e) => setInboundShipping(e.target.value)} />
        </Field>
        <Field id="lc-duties" label="Duties">
          <Input id="lc-duties" type="number" min="0" step="0.01" value={duties} onChange={(e) => setDuties(e.target.value)} />
        </Field>
        <Field id="lc-taxes" label="Taxes">
          <Input id="lc-taxes" type="number" min="0" step="0.01" value={taxes} onChange={(e) => setTaxes(e.target.value)} />
        </Field>
        <Field id="lc-insurance" label="Insurance">
          <Input id="lc-insurance" type="number" min="0" step="0.01" value={insurance} onChange={(e) => setInsurance(e.target.value)} />
        </Field>
        <Field id="lc-handling" label="Handling / brokerage fees" className="space-y-2 sm:col-span-2">
          <Input id="lc-handling" type="number" min="0" step="0.01" value={handlingFees} onChange={(e) => setHandlingFees(e.target.value)} />
        </Field>
      </form>

      {result ? (
        <ResultPanel
          title="Landed cost per unit"
          value={formatMoney(result.costPerUnit)}
          subtitle={`Total landed cost ${formatMoney(result.totalLandedCost)} for the shipment.`}
        >
          <StatGrid
            items={[
              { label: "Total landed cost", value: formatMoney(result.totalLandedCost) },
              { label: "Duty + tax share", value: formatPercent(result.dutyTaxSharePercent) },
              { label: "Logistics share", value: formatPercent(result.logisticsSharePercent) },
              { label: "Units", value: String(units) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
