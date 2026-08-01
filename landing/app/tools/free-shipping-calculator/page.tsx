import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { FreeShippingCalculator } from "@/components/tools/free-shipping-calculator"

export const metadata: Metadata = {
  title: "Free shipping rate calculator",
  description:
    "Calculate a free-shipping threshold that covers shipping cost, protects gross margin, and lifts average order value.",
  alternates: { canonical: "/tools/free-shipping-calculator" },
  openGraph: {
    images: [{ url: "/tools/free-shipping-calculator.png", width: 1200, height: 630, alt: "Free shipping rate calculator — free ecommerce tool" }],
    title: "Free shipping rate calculator — Woodo Store",
    description:
      "Find a free-shipping threshold that covers your shipping cost and protects margin.",
  },
}

export default function FreeShippingCalculatorPage() {
  return (
    <ToolShell
      title="Free shipping rate calculator"
      intro="Find a free-shipping threshold that still covers your delivery costs. Use it to protect margin while encouraging larger orders."
      description="Enter your real shipping cost, margin, and average order value. We’ll suggest a free-shipping threshold that doesn’t give margin away — and still nudges carts higher."
    >
      <FreeShippingCalculator />
    </ToolShell>
  )
}
