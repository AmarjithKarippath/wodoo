import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { WholesalePrivateLabelTool } from "@/components/tools/wholesale-private-label-tool"

export const metadata: Metadata = {
  title: "Wholesale sourcing & private label catalog tool",
  description:
    "Free wholesale vs private label calculator — compare MOQ, landed cost, setup fees, margins, and monthly profit for sourcing decisions.",
  alternates: { canonical: "/tools/wholesale-private-label-catalog" },
}

export default function Page() {
  return (
    <ToolShell
      title="Wholesale sourcing & private label catalog tool"
      description="Compare wholesale and private-label sourcing on landed unit cost, startup inventory, margin, and payback months."
    >
      <WholesalePrivateLabelTool />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Need a free wholesale sourcing calculator or private label profit tool? This MOQ cost calculator and white
        label vs private label planner helps ecommerce brands compare supplier landed cost, branding setup fees, and
        monthly profit. Use it as a product sourcing catalog tool, Alibaba margin estimator, or private label
        business calculator before placing your first PO.
      </p>
    </ToolShell>
  )
}
