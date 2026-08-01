import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { LlcVsScorpCalculator } from "@/components/tools/llc-vs-scorp-calculator"

export const metadata: Metadata = {
  title: "LLC vs S-Corp tax calculator",
  description:
    "Free LLC vs S-Corp tax calculator — compare self-employment tax vs reasonable salary payroll tax using projected profit and salary.",
  alternates: { canonical: "/tools/llc-vs-scorp-tax-calculator" },
}

export default function Page() {
  return (
    <ToolShell
      title="LLC vs. S-Corp tax calculator"
      description="Estimate how self-employment tax on LLC profits compares with S-Corp payroll taxes on a reasonable salary plus distributions."
    >
      <LlcVsScorpCalculator />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Need a free LLC vs S-Corp tax calculator? This S corporation tax comparison tool helps founders model
        self-employment tax liabilities versus reasonable salary payroll taxes before electing S-Corp status. Use it as
        an LLC tax savings calculator, pass-through entity comparison tool, or formation tax planner — then confirm with
        a CPA.
      </p>
    </ToolShell>
  )
}
