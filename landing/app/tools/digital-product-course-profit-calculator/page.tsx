import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { DigitalProductMarginCalculator } from "@/components/tools/digital-product-margin-calculator"

export const metadata: Metadata = {
  title: "Digital product & course profit margin calculator",
  description:
    "Free digital product profit calculator — estimate course margins, ebook profit, platform fees, refunds, and break-even sales.",
  alternates: { canonical: "/tools/digital-product-course-profit-calculator" },
}

export default function Page() {
  return (
    <ToolShell
      title="Digital product & course profit margin calculator"
      intro="Estimate net profit on courses and downloads after fees, refunds, and marketing. Clarify whether your price and funnel can support the work."
      description="Calculate net margin per sale for courses, ebooks, and downloads after platform fees, refunds, creation cost, and marketing."
    >
      <DigitalProductMarginCalculator />
    </ToolShell>
  )
}
