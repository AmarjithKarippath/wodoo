import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { WholesalePrivateLabelTool } from "@/components/tools/wholesale-private-label-tool"

export const metadata: Metadata = {
  title: "Wholesale sourcing & private label catalog tool",
  description:
    "Free wholesale vs private label calculator — compare MOQ, landed cost, setup fees, margins, and monthly profit for sourcing decisions.",
  alternates: { canonical: "/tools/wholesale-private-label-catalog" },
  openGraph: {
    title: "Wholesale sourcing & private label catalog tool — Woodo Store",
    images: [
      {
        url: "/tools/wholesale-private-label-catalog.webp",
        width: 1200,
        height: 630,
        alt: "Free online wholesale vs private label catalog tool for MOQ, cost, and margin",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="wholesale-private-label-catalog"
      title="Wholesale sourcing & private label catalog tool"
      intro="Compare wholesale versus private-label sourcing on cost, MOQ, and payback. See which path fits your cash and margin goals."
      description="Compare wholesale and private-label sourcing on landed unit cost, startup inventory, margin, and payback months."
    >
      <WholesalePrivateLabelTool />
    </ToolShell>
  )
}
