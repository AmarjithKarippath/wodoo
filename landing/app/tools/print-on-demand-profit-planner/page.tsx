import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { PodProfitPlanner } from "@/components/tools/pod-profit-planner"

export const metadata: Metadata = {
  title: "Print on demand profit planner",
  description:
    "Free print-on-demand profit calculator — plan POD margins for shirts, hoodies, and merch with base cost, print fees, shipping, ads, and fees.",
  alternates: { canonical: "/tools/print-on-demand-profit-planner" },
  openGraph: {
    title: "Print-on-demand (POD) profit planner — Woodo Store",
    images: [
      {
        url: "/tools/print-on-demand-profit-planner.webp",
        width: 1200,
        height: 630,
        alt: "Free online print-on-demand profit planner for per-order and monthly POD earnings",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="print-on-demand-profit-planner"
      title="Print-on-demand (POD) profit planner"
      intro="Model profit after blank cost, print fees, shipping, and ads. Check whether a design can make money before you launch it."
      description="Model POD profit per order and monthly earnings after blank cost, print fees, shipping, payment fees, and ads."
    >
      <PodProfitPlanner />
    </ToolShell>
  )
}
