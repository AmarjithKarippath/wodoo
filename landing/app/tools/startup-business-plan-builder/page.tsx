import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { StartupBusinessPlanBuilder } from "@/components/tools/startup-business-plan-builder"

export const metadata: Metadata = {
  title: "Startup business plan & cash flow builder",
  description:
    "Free startup business plan cash flow builder — project monthly revenue, costs, and ending cash for bank accounts, loans, and formation planning.",
  alternates: { canonical: "/tools/startup-business-plan-builder" },
  openGraph: {
    title: "Startup business plan & cash flow builder — Woodo Store",
    images: [
      {
        url: "/tools/startup-business-plan-builder.webp",
        width: 1200,
        height: 630,
        alt: "Free online startup business plan and cash flow builder for early company planning",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="startup-business-plan-builder"
      title="Startup business plan & cash flow builder"
      intro="Build a simple cash-flow forecast from revenue, costs, and growth assumptions. Helpful when a bank or partner asks for early numbers."
      description="Build a simple month-by-month cash-flow projection founders often need for corporate bank accounts and early planning."
    >
      <StartupBusinessPlanBuilder />
    </ToolShell>
  )
}
