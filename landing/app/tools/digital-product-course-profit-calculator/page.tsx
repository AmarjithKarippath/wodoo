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
      description="Calculate net margin per sale for courses, ebooks, and downloads after platform fees, refunds, creation cost, and marketing."
    >
      <DigitalProductMarginCalculator />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Looking for a free digital product profit calculator? This online course margin calculator and ebook profit
        tool helps creators price info products after Gumroad/Teachable-style fees, payment processing, refunds, and
        ads. Use it as a course business calculator, digital download pricing tool, or creator product break-even
        calculator before you launch.
      </p>
    </ToolShell>
  )
}
