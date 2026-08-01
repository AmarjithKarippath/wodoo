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
      intro="Compare wholesale versus private-label sourcing on cost, MOQ, and payback. See which path fits your cash and margin goals."
      description="Compare wholesale and private-label sourcing on landed unit cost, startup inventory, margin, and payback months."
    >
      <WholesalePrivateLabelTool />
    </ToolShell>
  )
}
