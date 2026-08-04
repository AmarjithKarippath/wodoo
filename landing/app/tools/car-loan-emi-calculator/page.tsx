import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { CarLoanEmiCalculator } from "@/components/tools/car-loan-emi-calculator"

export const metadata: Metadata = {
  title: "Car loan EMI calculator",
  description: "Free car loan EMI calculator — estimate monthly EMI, loan amount after down payment, total interest, and repayment.",
  alternates: { canonical: "/tools/car-loan-emi-calculator" },
  openGraph: {
    title: "Car loan EMI calculator — Wodoo Store",
    description: "Free car loan EMI calculator — estimate monthly EMI, loan amount after down payment, total interest, and repayment.",
    url: "/tools/car-loan-emi-calculator",
    images: [
      {
        url: "/tools/car-loan-emi-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online car loan EMI calculator for vehicle financing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Car loan EMI calculator — Wodoo Store",
    description: "Free car loan EMI calculator — estimate monthly EMI, loan amount after down payment, total interest, and repayment.",
    images: ["/tools/car-loan-emi-calculator.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="car-loan-emi-calculator"
      title="Car loan EMI calculator"
      intro="Plan your car loan with down payment, interest rate, and tenure — see EMI and total interest instantly."
      description="Enter car price, down payment, rate, and years. We’ll calculate loan principal, monthly EMI, and interest cost."
    >
      <CarLoanEmiCalculator />
    </ToolShell>
  )
}
