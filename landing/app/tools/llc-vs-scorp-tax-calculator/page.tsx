import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { LlcVsScorpCalculator } from "@/components/tools/llc-vs-scorp-calculator"

export const metadata: Metadata = {
  title: "LLC vs S-Corp tax calculator",
  description:
    "Free LLC vs S-Corp tax calculator — compare self-employment tax vs reasonable salary payroll tax using projected profit and salary.",
  alternates: { canonical: "/tools/llc-vs-scorp-tax-calculator" },
  openGraph: {
    title: "LLC vs. S-Corp tax calculator — Woodo Store",
    images: [
      {
        url: "/tools/llc-vs-scorp-tax-calculator.png",
        width: 1200,
        height: 630,
        alt: "LLC vs. S-Corp tax calculator — free ecommerce tool",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      title="LLC vs. S-Corp tax calculator"
      intro="Compare a simplified LLC tax picture with an S-Corp salary-and-distribution model. Use it for planning conversations, then confirm with a CPA."
      description="Estimate how self-employment tax on LLC profits compares with S-Corp payroll taxes on a reasonable salary plus distributions."
    >
      <LlcVsScorpCalculator />
    </ToolShell>
  )
}
