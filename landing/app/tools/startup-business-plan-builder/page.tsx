import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { StartupBusinessPlanBuilder } from "@/components/tools/startup-business-plan-builder"

export const metadata: Metadata = {
  title: "Startup business plan & cash flow builder",
  description:
    "Free startup business plan cash flow builder — project monthly revenue, costs, and ending cash for bank accounts, loans, and formation planning.",
  alternates: { canonical: "/tools/startup-business-plan-builder" },
}

export default function Page() {
  return (
    <ToolShell
      title="Startup business plan & cash flow builder"
      description="Build a simple month-by-month cash-flow projection founders often need for corporate bank accounts and early planning."
    >
      <StartupBusinessPlanBuilder />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Need a free government-style business plan cash flow tool? This startup financial projection calculator helps
        founders formalise revenue, COGS, and operating expenses like Startup Loans / Prince’s Trust style worksheets.
        Use it as a business plan cash flow builder, formation banking projection tool, or small business forecast
        sheet before opening a corporate account.
      </p>
    </ToolShell>
  )
}
