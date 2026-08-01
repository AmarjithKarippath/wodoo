import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { BreakEvenCalculator } from "@/components/tools/break-even-calculator"

export const metadata: Metadata = {
  title: "Break-even units calculator",
  description:
    "Free break-even calculator for ecommerce — find how many units you must sell to cover fixed costs based on price and variable cost.",
  alternates: { canonical: "/tools/break-even-units-calculator" },
}

export default function Page() {
  return (
    <ToolShell
      title="Break-even units calculator"
      description="Find how many units you need to sell to cover fixed costs, using price per unit and variable cost per unit."
    >
      <BreakEvenCalculator />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Looking for a free break-even units calculator? This break-even point calculator and ecommerce break-even
        analysis tool shows how many units you must sell to cover fixed costs. Use it as a break-even sales
        calculator, contribution margin calculator, or units-to-break-even calculator before launching a product,
        running ads, or committing to inventory — so you know the volume required to get profitable.
      </p>
    </ToolShell>
  )
}
