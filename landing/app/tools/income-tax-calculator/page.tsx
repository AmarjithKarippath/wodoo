import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { IncomeTaxCalculator } from "@/components/tools/income-tax-calculator"

export const metadata: Metadata = {
  title: "Income tax calculator",
  description: "Free income tax calculator India — estimate tax under new or old regime with standard deduction, cess, and take-home pay.",
  alternates: { canonical: "/tools/income-tax-calculator" },
  openGraph: {
    title: "Income tax calculator — Woodo Store",
    images: [
      {
        url: "/tools/income-tax-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online income tax calculator India for new and old regime",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="income-tax-calculator"
      title="Income tax calculator"
      intro="Estimate India income tax under the new or old regime — taxable income, tax, cess, and take-home."
      description="Enter gross annual income and regime. Old regime also accepts deductions. Results are illustrative estimates."
    >
      <IncomeTaxCalculator />
    </ToolShell>
  )
}
