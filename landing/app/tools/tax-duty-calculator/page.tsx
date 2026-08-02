import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { TaxDutyCalculator } from "@/components/tools/tax-duty-calculator"

export const metadata: Metadata = {
  title: "Tax & duty calculator",
  description:
    "Estimate import duty, VAT/GST, and total landed cost for international ecommerce shipments by destination and product category.",
  alternates: { canonical: "/tools/tax-duty-calculator" },
  openGraph: {
    images: [{ url: "/tools/tax-duty-calculator.webp", width: 1200, height: 630, alt: "Free online import tax and duty calculator for cross-border ecommerce landed cost" }],
    title: "Tax & duty calculator — Woodo Store",
    description:
      "Calculate customs duty, tax, and landed cost for cross-border orders in minutes.",
  },
}

export default function TaxDutyCalculatorPage() {
  return (
    <ToolShell
      toolSlug="tax-duty-calculator"
      title="Tax & duty calculator"
      intro="Estimate duty, VAT or GST, and total landed cost for an international order. Useful when you need a quick sense of what a buyer may pay at the border."
      description="Estimate import duty, VAT/GST, and total landed cost for a shipment. Pick a destination and product category, then see the charges your buyer — or your store — may need to cover."
    >
      <TaxDutyCalculator />
    </ToolShell>
  )
}
