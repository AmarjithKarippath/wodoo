"use client"

import { Label } from "@/components/ui/label"

export function Field({
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

export function ResultPanel({
  title,
  value,
  subtitle,
  children,
}: {
  title: string
  value: string
  subtitle?: string
  children?: React.ReactNode
}) {
  return (
    <div className="space-y-6 rounded-2xl border border-border bg-secondary/30 p-6 sm:p-8">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="mt-2 font-display text-5xl font-extrabold tracking-tight text-foreground">
          {value}
        </p>
        {subtitle ? (
          <p className="mt-3 text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </div>
  )
}

export function StatGrid({
  items,
}: {
  items: { label: string; value: string }[]
}) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {item.label}
          </dt>
          <dd className="mt-1 text-xl font-bold text-foreground">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export const selectClassName =
  "border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
