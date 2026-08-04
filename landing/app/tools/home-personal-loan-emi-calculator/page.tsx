import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { HomePersonalLoanEmiCalculator } from "@/components/tools/home-personal-loan-emi-calculator"

export const metadata: Metadata = {
  title: "Home & personal loan EMI calculator",
  description: "Free home loan and personal loan EMI calculator — compare monthly EMI, total interest, and repayment for loan tenure in years.",
  alternates: { canonical: "/tools/home-personal-loan-emi-calculator" },
  openGraph: {
    title: "Home & personal loan EMI calculator — Woodo Store",
    images: [
      {
        url: "/tools/home-personal-loan-emi-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online home loan and personal loan EMI calculator",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="home-personal-loan-emi-calculator"
      title="Home & personal loan EMI calculator"
      intro="Compare home loan vs personal loan EMI — monthly payment, total interest, and full repayment."
      description="Choose loan type, then enter amount, rate, and tenure in years to estimate EMI and interest cost."
    >
      <HomePersonalLoanEmiCalculator />
    </ToolShell>
  )
}
