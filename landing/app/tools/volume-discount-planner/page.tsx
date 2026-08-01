import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { VolumeDiscountPlanner } from "@/components/tools/volume-discount-planner"

export const metadata: Metadata = {
  title: "Volume discount vs unit margin planner",
  description:
    "Free volume discount calculator — compare discount tiers against unit margin, revenue, and total profit to plan bulk pricing.",
  alternates: { canonical: "/tools/volume-discount-planner" },
}

export default function Page() {
  return (
    <ToolShell
      title="Volume discount vs unit margin planner"
      description="Compare discount tiers against expected volume to see which bulk-pricing offer maximizes total profit without destroying unit margin."
    >
      <VolumeDiscountPlanner />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Looking for a free volume discount calculator? This bulk pricing calculator and unit margin planner helps you
        compare discount tiers against expected sales volume, revenue, and total profit. Use it as a wholesale
        discount calculator, quantity break pricing tool, or volume pricing margin calculator to design offers that
        grow order size without giving away your margin.
      </p>
    </ToolShell>
  )
}
