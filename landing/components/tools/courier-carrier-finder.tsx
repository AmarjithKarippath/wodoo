"use client"

import { useMemo, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  compareCouriers,
  formatTransit,
  formatUsd,
  type ShippingZone,
  type UnitSystem,
} from "@/lib/courier-compare"

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

function HighlightCard({
  label,
  carrier,
  service,
  price,
  transit,
  tone,
}: {
  label: string
  carrier: string
  service: string
  price: string
  transit: string
  tone: "cheap" | "fast" | "value"
}) {
  const toneClass =
    tone === "cheap"
      ? "border-primary/40 bg-primary/5"
      : tone === "fast"
        ? "border-accent/50 bg-accent/10"
        : "border-border bg-secondary/40"

  return (
    <div className={`rounded-2xl border p-5 ${toneClass}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-lg font-bold text-foreground">
        {carrier}{" "}
        <span className="font-medium text-muted-foreground">· {service}</span>
      </p>
      <p className="mt-3 font-display text-3xl font-extrabold text-foreground">
        {price}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{transit}</p>
    </div>
  )
}

export function CourierCarrierFinder() {
  const [units, setUnits] = useState<UnitSystem>("imperial")
  const [weight, setWeight] = useState("2")
  const [length, setLength] = useState("12")
  const [width, setWidth] = useState("9")
  const [height, setHeight] = useState("4")
  const [zone, setZone] = useState<ShippingZone>("national")

  const result = useMemo(
    () =>
      compareCouriers({
        weight: Number(weight),
        length: Number(length),
        width: Number(width),
        height: Number(height),
        units,
        zone,
      }),
    [weight, length, width, height, units, zone],
  )

  const weightLabel = units === "imperial" ? "Weight (lb)" : "Weight (kg)"
  const dimLabel = units === "imperial" ? "in" : "cm"

  return (
    <div className="space-y-8">
      <form
        className="grid gap-5 sm:grid-cols-2"
        onSubmit={(event) => event.preventDefault()}
      >
        <Field id="units" label="Units">
          <select
            id="units"
            value={units}
            onChange={(e) => setUnits(e.target.value as UnitSystem)}
            className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            <option value="imperial">lb / inches</option>
            <option value="metric">kg / cm</option>
          </select>
        </Field>

        <Field
          id="zone"
          label="Distance / zone"
          hint="Pick the closest match for origin → destination."
        >
          <select
            id="zone"
            value={zone}
            onChange={(e) => setZone(e.target.value as ShippingZone)}
            className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            <option value="local">Local (same city / metro)</option>
            <option value="regional">Regional (nearby states / regions)</option>
            <option value="national">National (cross-country)</option>
            <option value="international">International</option>
          </select>
        </Field>

        <Field id="weight" label={weightLabel}>
          <Input
            id="weight"
            type="number"
            inputMode="decimal"
            min="0.1"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </Field>

        <Field id="length" label={`Length (${dimLabel})`}>
          <Input
            id="length"
            type="number"
            inputMode="decimal"
            min="0.1"
            step="0.1"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </Field>

        <Field id="width" label={`Width (${dimLabel})`}>
          <Input
            id="width"
            type="number"
            inputMode="decimal"
            min="0.1"
            step="0.1"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </Field>

        <Field id="height" label={`Height (${dimLabel})`}>
          <Input
            id="height"
            type="number"
            inputMode="decimal"
            min="0.1"
            step="0.1"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </Field>
      </form>

      {result ? (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <HighlightCard
              label="Cheapest"
              carrier={result.cheapest.carrier}
              service={result.cheapest.service}
              price={formatUsd(result.cheapest.estimatedPrice)}
              transit={formatTransit(
                result.cheapest.transitDaysMin,
                result.cheapest.transitDaysMax,
              )}
              tone="cheap"
            />
            <HighlightCard
              label="Fastest"
              carrier={result.fastest.carrier}
              service={result.fastest.service}
              price={formatUsd(result.fastest.estimatedPrice)}
              transit={formatTransit(
                result.fastest.transitDaysMin,
                result.fastest.transitDaysMax,
              )}
              tone="fast"
            />
            <HighlightCard
              label="Best value"
              carrier={result.bestValue.carrier}
              service={result.bestValue.service}
              price={formatUsd(result.bestValue.estimatedPrice)}
              transit={formatTransit(
                result.bestValue.transitDaysMin,
                result.bestValue.transitDaysMax,
              )}
              tone="value"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Billable weight:{" "}
            <span className="font-medium text-foreground">
              {result.billableWeightLb} lb
            </span>{" "}
            (dimensional weight {result.dimensionalWeightLb} lb). Estimates in
            USD for planning only — live carrier quotes can differ.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="border-b border-border bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Carrier</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Est. price</th>
                  <th className="px-4 py-3 font-semibold">Transit</th>
                  <th className="px-4 py-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {result.quotes.map((quote) => {
                  const isCheapest = quote.id === result.cheapest.id
                  const isFastest = quote.id === result.fastest.id
                  return (
                    <tr key={quote.id} className="bg-background">
                      <td className="px-4 py-3 font-semibold text-foreground">
                        {quote.carrier}
                        {isCheapest || isFastest ? (
                          <span className="mt-1 block text-xs font-medium text-primary">
                            {[
                              isCheapest ? "Cheapest" : null,
                              isFastest ? "Fastest" : null,
                            ]
                              .filter(Boolean)
                              .join(" · ")}
                          </span>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 text-foreground">{quote.service}</td>
                      <td className="px-4 py-3 font-semibold text-foreground">
                        {formatUsd(quote.estimatedPrice)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatTransit(quote.transitDaysMin, quote.transitDaysMax)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {quote.notes}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border px-6 py-10 text-center text-sm text-muted-foreground">
          Enter package weight and dimensions to compare courier options.
        </div>
      )}
    </div>
  )
}
