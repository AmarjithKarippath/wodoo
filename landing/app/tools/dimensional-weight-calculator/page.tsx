import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { DimWeightCalculator } from "@/components/tools/dim-weight-calculator"

export const metadata: Metadata = {
  title: "Dimensional weight & volume calculator",
  description:
    "Free DIM weight calculator — compute volumetric weight, package volume, and billable shipping weight for USPS, UPS, and FedEx-style divisors.",
  alternates: { canonical: "/tools/dimensional-weight-calculator" },
  openGraph: {
    title: "Dimensional weight & volume calculator — Woodo Store",
    images: [
      {
        url: "/tools/dimensional-weight-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Online dimensional weight calculator for package volume and billable shipping weight",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="dimensional-weight-calculator"
      title="Dimensional weight & volume calculator"
      intro="Convert package size into dimensional weight and billable weight. Helps you avoid surprises when carriers charge for bulky boxes."
      description="Calculate package volume, dimensional (DIM) weight, and billable weight using common carrier divisors — so oversized boxes don’t surprise you at checkout."
    >
      <DimWeightCalculator />
    </ToolShell>
  )
}
