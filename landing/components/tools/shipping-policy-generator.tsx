"use client"

import { useMemo, useState } from "react"
import { Check, Copy } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { generateShippingPolicy } from "@/lib/shipping-policy"

function Field({
  id,
  label,
  hint,
  className,
  children,
}: {
  id: string
  label: string
  hint?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className ?? "space-y-2"}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

export function ShippingPolicyGenerator() {
  const [storeName, setStoreName] = useState("")
  const [shipFromCountry, setShipFromCountry] = useState("United States")
  const [shipsTo, setShipsTo] = useState("United States and select international destinations")
  const [processingDays, setProcessingDays] = useState("1–3 business days")
  const [domesticDelivery, setDomesticDelivery] = useState("3–7 business days")
  const [internationalDelivery, setInternationalDelivery] = useState("7–21 business days")
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("$50")
  const [shippingRates, setShippingRates] = useState(
    "Standard shipping rates are shown at checkout. Expedited options may be available for an additional fee.",
  )
  const [carriers, setCarriers] = useState("USPS, UPS, and/or FedEx")
  const [contactEmail, setContactEmail] = useState("")
  const [restrictions, setRestrictions] = useState(
    "We cannot ship to P.O. boxes for certain products. Some items may be restricted in specific regions due to local regulations.",
  )
  const [offerInternational, setOfferInternational] = useState(true)
  const [offerFreeShipping, setOfferFreeShipping] = useState(true)
  const [copied, setCopied] = useState(false)

  const policy = useMemo(
    () =>
      generateShippingPolicy({
        storeName,
        shipFromCountry,
        shipsTo,
        processingDays,
        domesticDelivery,
        internationalDelivery,
        freeShippingThreshold,
        shippingRates,
        carriers,
        contactEmail,
        restrictions,
        offerInternational,
        offerFreeShipping,
      }),
    [
      storeName,
      shipFromCountry,
      shipsTo,
      processingDays,
      domesticDelivery,
      internationalDelivery,
      freeShippingThreshold,
      shippingRates,
      carriers,
      contactEmail,
      restrictions,
      offerInternational,
      offerFreeShipping,
    ],
  )

  async function copyPolicy() {
    try {
      await navigator.clipboard.writeText(policy)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="space-y-8">
      <form
        className="grid gap-5 sm:grid-cols-2"
        onSubmit={(event) => event.preventDefault()}
      >
        <Field id="storeName" label="Store name">
          <Input
            id="storeName"
            placeholder="Wildgood Co."
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </Field>

        <Field id="contactEmail" label="Support email">
          <Input
            id="contactEmail"
            type="email"
            placeholder="support@yourstore.com"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </Field>

        <Field id="shipFromCountry" label="Ships from">
          <Input
            id="shipFromCountry"
            value={shipFromCountry}
            onChange={(e) => setShipFromCountry(e.target.value)}
          />
        </Field>

        <Field id="shipsTo" label="Ships to">
          <Input
            id="shipsTo"
            value={shipsTo}
            onChange={(e) => setShipsTo(e.target.value)}
          />
        </Field>

        <Field id="processingDays" label="Processing time">
          <Input
            id="processingDays"
            value={processingDays}
            onChange={(e) => setProcessingDays(e.target.value)}
          />
        </Field>

        <Field id="domesticDelivery" label="Domestic delivery estimate">
          <Input
            id="domesticDelivery"
            value={domesticDelivery}
            onChange={(e) => setDomesticDelivery(e.target.value)}
          />
        </Field>

        <Field id="carriers" label="Carriers">
          <Input
            id="carriers"
            value={carriers}
            onChange={(e) => setCarriers(e.target.value)}
          />
        </Field>

        <Field
          id="freeShippingThreshold"
          label="Free shipping threshold"
          hint="Leave blank if you don’t offer free shipping."
        >
          <Input
            id="freeShippingThreshold"
            value={freeShippingThreshold}
            onChange={(e) => setFreeShippingThreshold(e.target.value)}
            disabled={!offerFreeShipping}
          />
        </Field>

        <div className="flex flex-wrap gap-6 sm:col-span-2">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={offerFreeShipping}
              onChange={(e) => setOfferFreeShipping(e.target.checked)}
              className="size-4 rounded border-border"
            />
            Offer free shipping
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={offerInternational}
              onChange={(e) => setOfferInternational(e.target.checked)}
              className="size-4 rounded border-border"
            />
            Offer international shipping
          </label>
        </div>

        {offerInternational ? (
          <Field
            id="internationalDelivery"
            label="International delivery estimate"
            className="space-y-2 sm:col-span-2"
          >
            <Input
              id="internationalDelivery"
              value={internationalDelivery}
              onChange={(e) => setInternationalDelivery(e.target.value)}
            />
          </Field>
        ) : null}

        <Field
          id="shippingRates"
          label="Shipping rates details"
          className="space-y-2 sm:col-span-2"
          hint="Describe flat rates, methods, or how costs are calculated."
        >
          <Textarea
            id="shippingRates"
            rows={3}
            value={shippingRates}
            onChange={(e) => setShippingRates(e.target.value)}
          />
        </Field>

        <Field
          id="restrictions"
          label="Restrictions (optional)"
          className="space-y-2 sm:col-span-2"
        >
          <Textarea
            id="restrictions"
            rows={3}
            value={restrictions}
            onChange={(e) => setRestrictions(e.target.value)}
          />
        </Field>
      </form>

      <div className="space-y-4 rounded-2xl border border-border bg-secondary/30 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Generated shipping policy
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Copy into your store’s Shipping Policy page, then adjust for your
              legal needs.
            </p>
          </div>
          <Button
            type="button"
            onClick={copyPolicy}
            className="rounded-full"
          >
            {copied ? (
              <>
                <Check />
                Copied
              </>
            ) : (
              <>
                <Copy />
                Copy policy
              </>
            )}
          </Button>
        </div>

        <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-xl border border-border bg-background p-4 text-sm leading-relaxed text-foreground">
          {policy}
        </pre>
      </div>
    </div>
  )
}
