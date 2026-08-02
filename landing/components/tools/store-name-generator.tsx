"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/tools/calc-ui"
import { generateStoreNames } from "@/lib/calculators/store-name-generator"

export function StoreNameGenerator() {
  const [keyword, setKeyword] = useState("skincare")
  const names = useMemo(() => generateStoreNames(keyword, 12), [keyword])

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field
          id="sn-keyword"
          label="Niche or keyword"
          hint="e.g. skincare, hiking gear, pet toys"
          className="sm:col-span-2 space-y-2"
        >
          <Input
            id="sn-keyword"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter a niche keyword"
          />
        </Field>
      </form>
      {names.length ? (
        <div className="rounded-2xl border border-border bg-secondary/30 p-6 sm:p-8">
          <p className="text-sm font-medium text-muted-foreground">Name ideas</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {names.map((name) => (
              <li
                key={name}
                className="rounded-xl border border-border bg-card px-4 py-3 text-base font-semibold text-foreground"
              >
                {name}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Tip: check domain availability and trademarks before you brand around a name.
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Enter a keyword to generate store names.</p>
      )}
    </div>
  )
}
