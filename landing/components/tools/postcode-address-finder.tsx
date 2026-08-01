"use client"

import { useState } from "react"
import { Loader2, MapPin, Search } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  POSTCODE_COUNTRIES,
  mapsUrl,
  type PostcodeLookupResult,
} from "@/lib/postcode"

const selectClassName =
  "border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"

export function PostcodeAddressFinder() {
  const [country, setCountry] = useState("us")
  const [postcode, setPostcode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PostcodeLookupResult | null>(null)

  const placeholder =
    POSTCODE_COUNTRIES.find((c) => c.code === country)?.placeholder ?? "Postcode"

  async function lookup(event?: React.FormEvent) {
    event?.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({ country, postcode })
      const response = await fetch(`/api/postcode?${params.toString()}`)
      const data = (await response.json()) as PostcodeLookupResult & {
        error?: string
      }

      if (!response.ok) {
        setResult(null)
        setError(data.error ?? "No address found.")
        return
      }

      setResult(data)
    } catch {
      setResult(null)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={lookup}
        className="grid gap-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
      >
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={selectClassName}
          >
            {POSTCODE_COUNTRIES.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="postcode">ZIP / postcode</Label>
          <Input
            id="postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder={placeholder}
            autoComplete="postal-code"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading || !postcode.trim()}
          className="rounded-full sm:mb-0.5"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Searching
            </>
          ) : (
            <>
              <Search />
              Find address
            </>
          )}
        </Button>
      </form>

      {error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 px-5 py-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="space-y-4 rounded-2xl border border-border bg-secondary/30 p-6 sm:p-8">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Results for {result.postCode}
            </p>
            <p className="mt-1 text-lg font-bold text-foreground">
              {result.country} ({result.countryAbbreviation})
            </p>
          </div>

          <ul className="space-y-3">
            {result.places.map((place, index) => (
              <li
                key={`${place.placeName}-${place.latitude}-${index}`}
                className="rounded-xl border border-border bg-background px-4 py-4"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-bold text-foreground">
                      {place.placeName}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {[place.state, place.stateAbbreviation]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    <p className="mt-2 font-mono text-xs text-muted-foreground">
                      {place.latitude}, {place.longitude}
                    </p>
                    <a
                      href={mapsUrl(place.latitude, place.longitude)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
                    >
                      View on map →
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <p className="text-xs text-muted-foreground">
            Shows city / locality for a ZIP or postcode (not a full street
            address). Useful for shipping zones, tax regions, and delivery
            planning.
          </p>
        </div>
      ) : null}
    </div>
  )
}
