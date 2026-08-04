import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { UsMortgageCalculator } from "@/components/tools/us-mortgage-calculator"

export const metadata: Metadata = {
  title: "US mortgage calculator",
  description: "Free US mortgage calculator — monthly PITI payment from home price, down payment, rate, taxes, insurance, HOA, and PMI.",
  alternates: { canonical: "/tools/us-mortgage-calculator" },
  openGraph: {
    title: "US mortgage calculator — Wodoo Store",
    description: "Free US mortgage calculator — monthly PITI payment from home price, down payment, rate, taxes, insurance, HOA, and PMI.",
    url: "/tools/us-mortgage-calculator",
    images: [
      {
        url: "/tools/us-mortgage-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online US mortgage calculator for monthly home loan payments",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "US mortgage calculator — Wodoo Store",
    description: "Free US mortgage calculator — monthly PITI payment from home price, down payment, rate, taxes, insurance, HOA, and PMI.",
    images: ["/tools/us-mortgage-calculator.webp"],
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
      toolSlug="us-mortgage-calculator"
      title="US mortgage calculator"
      intro="Estimate your US mortgage payment including principal, interest, taxes, insurance, HOA, and PMI."
      description="Enter home price, down payment, rate, and term. Optional tax, insurance, HOA, and PMI refine the total monthly payment."
    >
      <UsMortgageCalculator />
    </ToolShell>
  )
}
