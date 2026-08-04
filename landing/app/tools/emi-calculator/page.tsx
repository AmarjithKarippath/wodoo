import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { EmiCalculator } from "@/components/tools/emi-calculator"

export const metadata: Metadata = {
  title: "EMI calculator",
  description: "Free EMI calculator — estimate monthly loan EMI, total interest, and total payment from amount, rate, and tenure.",
  alternates: { canonical: "/tools/emi-calculator" },
  openGraph: {
    title: "EMI calculator — Wodoo Store",
    images: [
      {
        url: "/tools/emi-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online EMI calculator for monthly loan installment and total interest",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="emi-calculator"
      title="EMI calculator"
      intro="Estimate your monthly EMI for any loan — see EMI, total interest, and total repayment at a glance."
      description="Enter loan amount, annual interest rate, and tenure in months to calculate EMI and interest cost."
    >
      <EmiCalculator />
    </ToolShell>
  )
}
