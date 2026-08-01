import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { DimWeightCalculator } from "@/components/tools/dim-weight-calculator"

export const metadata: Metadata = {
  title: "Dimensional weight & volume calculator",
  description:
    "Free DIM weight calculator — compute volumetric weight, package volume, and billable shipping weight for USPS, UPS, and FedEx-style divisors.",
  alternates: { canonical: "/tools/dimensional-weight-calculator" },
}

export default function Page() {
  return (
    <ToolShell
      title="Dimensional weight & volume calculator"
      description="Calculate package volume, dimensional (DIM) weight, and billable weight using common carrier divisors — so oversized boxes don’t surprise you at checkout."
    >
      <DimWeightCalculator />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Need a free dimensional weight calculator? This DIM weight calculator and volumetric weight calculator helps
        you convert length × width × height into billable shipping weight. Use it as a shipping volume calculator,
        package dimensional weight calculator, or courier DIM calculator to compare actual weight vs dimensional
        weight and avoid unexpected freight charges on bulky parcels.
      </p>
    </ToolShell>
  )
}
