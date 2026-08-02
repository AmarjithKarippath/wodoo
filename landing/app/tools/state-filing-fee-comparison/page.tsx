import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { StateFilingFeeComparison } from "@/components/tools/state-filing-fee-comparison"

export const metadata: Metadata = {
  title: "State filing fee comparison tool",
  description:
    "Free state filing fee comparison — compare LLC and corporation formation costs and annual report fees across Wyoming, Delaware, Nevada, and more.",
  alternates: { canonical: "/tools/state-filing-fee-comparison" },
  openGraph: {
    title: "State filing fee comparison — Woodo Store",
    images: [
      {
        url: "/tools/state-filing-fee-comparison.webp",
        width: 1200,
        height: 630,
        alt: "Online US state filing fee comparison for LLC and corporation formation costs",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="state-filing-fee-comparison"
      title="State filing fee comparison"
      intro="Compare approximate formation and annual fees across popular U.S. states. Verify current amounts on each Secretary of State site before you file."
      description="Compare approximate Secretary of State formation fees and annual report costs across popular U.S. formation states."
    >
      <StateFilingFeeComparison />
    </ToolShell>
  )
}
