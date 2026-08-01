import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { StateFilingFeeComparison } from "@/components/tools/state-filing-fee-comparison"

export const metadata: Metadata = {
  title: "State filing fee comparison tool",
  description:
    "Free state filing fee comparison — compare LLC and corporation formation costs and annual report fees across Wyoming, Delaware, Nevada, and more.",
  alternates: { canonical: "/tools/state-filing-fee-comparison" },
}

export default function Page() {
  return (
    <ToolShell
      title="State filing fee comparison"
      description="Compare approximate Secretary of State formation fees and annual report costs across popular U.S. formation states."
    >
      <StateFilingFeeComparison />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Looking for a free state filing fee comparison tool? This LLC formation cost calculator and corporation annual
        report fee chart helps founders compare Wyoming vs Delaware registration costs and other corporate tax-haven
        states. Use it as a business formation fee comparison, SOS filing cost table, or incorporation cost planner
        before you choose a home state.
      </p>
    </ToolShell>
  )
}
