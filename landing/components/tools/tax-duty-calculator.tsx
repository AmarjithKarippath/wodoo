"use client"

import { useMemo, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  PRODUCT_CATEGORIES,
  calculateTaxDuty,
  formatMoney,
  formatPercent,
  listDestinations,
  type DestinationId,
  type ProductCategoryId,
} from "@/lib/tax-duty"

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

const selectClassName =
  "border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"

export function TaxDutyCalculator() {
  const destinations = listDestinations()
  const [productValue, setProductValue] = useState("80")
  const [shippingCost, setShippingCost] = useState("12")
  const [insuranceCost, setInsuranceCost] = useState("0")
  const [destination, setDestination] = useState<DestinationId>("gb")
  const [category, setCategory] = useState<ProductCategoryId>("apparel")
  const [includeFreight, setIncludeFreight] = useState(true)
  const [currency, setCurrency] = useState("USD")

  const result = useMemo(
    () =>
      calculateTaxDuty({
        productValue: Number(productValue),
        shippingCost: Number(shippingCost),
        insuranceCost: Number(insuranceCost),
        destination,
        category,
        includeFreightInCustoms: includeFreight,
      }),
    [
      productValue,
      shippingCost,
      insuranceCost,
      destination,
      category,
      includeFreight,
    ],
  )

  const money = (value: number) => formatMoney(value, currency)

  return (
    <div className="space-y-8">
      <form
        className="grid gap-5 sm:grid-cols-2"
        onSubmit={(event) => event.preventDefault()}
      >
        <Field
          id="productValue"
          label="Product value"
          hint="Declared customs / retail value of the goods."
        >
          <Input
            id="productValue"
            type="number"
            inputMode="decimal"
            min="0.01"
            step="0.01"
            value={productValue}
            onChange={(e) => setProductValue(e.target.value)}
          />
        </Field>

        <Field id="currency" label="Currency display">
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className={selectClassName}
          >
            {["USD", "EUR", "GBP", "CAD", "AUD", "INR", "AED", "SGD", "JPY", "MXN"].map(
              (code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ),
            )}
          </select>
        </Field>

        <Field id="shippingCost" label="Shipping cost">
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
          id="insuranceCost"
          label="Insurance (optional)"
          hint="Leave 0 if you don’t insure the parcel."
        >
          <Input
            id="insuranceCost"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={insuranceCost}
            onChange={(e) => setInsuranceCost(e.target.value)}
          />
        </Field>

        <Field id="destination" label="Destination">
          <select
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value as DestinationId)}
            className={selectClassName}
          >
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="category" label="Product category">
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategoryId)}
            className={selectClassName}
          >
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>

        <label className="flex items-start gap-2 text-sm text-foreground sm:col-span-2">
          <input
            type="checkbox"
            checked={includeFreight}
            onChange={(e) => setIncludeFreight(e.target.checked)}
            className="mt-1 size-4 rounded border-border"
          />
          <span>
            Include shipping &amp; insurance in customs value (CIF-style). Many
            destinations assess duty/tax on goods + freight.
          </span>
        </label>
      </form>

      {result ? (
        <div className="space-y-6 rounded-2xl border border-border bg-secondary/30 p-6 sm:p-8">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Estimated landed cost to {result.destinationLabel}
            </p>
            <p className="mt-2 font-display text-5xl font-extrabold tracking-tight text-foreground">
              {money(result.landedCost)}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Import charges add about{" "}
              <span className="font-semibold text-foreground">
                {result.effectiveRate.toFixed(1)}%
              </span>{" "}
              on top of the product value for{" "}
              <span className="font-medium text-foreground">
                {result.categoryLabel.toLowerCase()}
              </span>
              .
            </p>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Customs value
              </dt>
              <dd className="mt-1 text-xl font-bold text-foreground">
                {money(result.customsValue)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Duty ({formatPercent(result.dutyRate)})
              </dt>
              <dd className="mt-1 text-xl font-bold text-foreground">
                {money(result.dutyAmount)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {result.taxLabel} ({formatPercent(result.taxRate)})
              </dt>
              <dd className="mt-1 text-xl font-bold text-foreground">
                {money(result.taxAmount)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Total import charges
              </dt>
              <dd className="mt-1 text-xl font-bold text-foreground">
                {money(result.totalImportCharges)}
              </dd>
            </div>
          </dl>

          <ul className="space-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
            <li>
              Landed cost = product + shipping + insurance + duty +{" "}
              {result.taxLabel.toLowerCase()}.
            </li>
            <li>
              Rates are simplified estimates by destination and category — not
              official HS-code assessments.
            </li>
            {result.deMinimisNote ? <li>{result.deMinimisNote}</li> : null}
          </ul>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border px-6 py-10 text-center text-sm text-muted-foreground">
          Enter a product value to estimate tax, duty, and landed cost.
        </div>
      )}
    </div>
  )
}
