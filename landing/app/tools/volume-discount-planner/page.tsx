import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { VolumeDiscountPlanner } from "@/components/tools/volume-discount-planner"

export const metadata: Metadata = {
  title: "Volume discount vs unit margin planner",
  description:
    "Free volume discount calculator — compare discount tiers against unit margin, revenue, and total profit to plan bulk pricing.",
  alternates: { canonical: "/tools/volume-discount-planner" },
  openGraph: {
    title: "Volume discount vs unit margin planner — Wodoo Store",
    images: [
      {
        url: "/tools/volume-discount-planner.webp",
        width: 1200,
        height: 630,
        alt: "Online volume discount planner to balance unit margin and total ecommerce profit",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="volume-discount-planner"
      title="Volume discount vs unit margin planner"
      intro="Compare discount tiers against expected volume and total profit. Find offers that move more units without wiping out margin."
      description="Compare discount tiers against expected volume to see which bulk-pricing offer maximizes total profit without destroying unit margin."
    >
      <VolumeDiscountPlanner />
    </ToolShell>
  )
}
