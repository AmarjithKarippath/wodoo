import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { BreakEvenCalculator } from "@/components/tools/break-even-calculator"

export const metadata: Metadata = {
  title: "Break-even units calculator",
  description:
    "Free break-even calculator for ecommerce — find how many units you must sell to cover fixed costs based on price and variable cost.",
  alternates: { canonical: "/tools/break-even-units-calculator" },
  openGraph: {
    title: "Break-even units calculator — Woodo Store",
    images: [
      {
        url: "/tools/break-even-units-calculator.png",
        width: 1200,
        height: 630,
        alt: "Break-even units calculator — free ecommerce tool",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      title="Break-even units calculator"
      intro="Work out how many units you need to sell to cover fixed costs. Plug in price and variable cost to see the break-even point."
      description="Find how many units you need to sell to cover fixed costs, using price per unit and variable cost per unit."
    >
      <BreakEvenCalculator />
    </ToolShell>
  )
}
