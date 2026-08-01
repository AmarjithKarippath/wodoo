import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { TaxDutyCalculator } from "@/components/tools/tax-duty-calculator"

export const metadata: Metadata = {
  title: "Tax & duty calculator",
  description:
    "Estimate import duty, VAT/GST, and total landed cost for international ecommerce shipments by destination and product category.",
  alternates: { canonical: "/tools/tax-duty-calculator" },
  openGraph: {
    title: "Tax & duty calculator — Woodo Store",
    description:
      "Calculate customs duty, tax, and landed cost for cross-border orders in minutes.",
  },
}

export default function TaxDutyCalculatorPage() {
  return (
    <ToolShell
      title="Tax & duty calculator"
      description="Estimate import duty, VAT/GST, and total landed cost for a shipment. Pick a destination and product category, then see the charges your buyer — or your store — may need to cover."
    >
      <TaxDutyCalculator />

      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Need an accurate Tax &amp; Duty Calculator for international shipping? Our free
        tool works as a complete import duty calculator, customs duty calculator, and
        duties and taxes calculator to help you estimate costs instantly. Whether
        you’re searching for an import tax calculator, free import duty calculator, or
        customs tax calculator, this duty tax calculator also functions as a reliable
        landed cost calculator. Simply enter your product details and destination to
        get precise results from our free customs duty calculator and import duties
        and taxes calculator — perfect for ecommerce sellers who want to avoid
        unexpected fees and quote customers the true total cost upfront.
      </p>
    </ToolShell>
  )
}
