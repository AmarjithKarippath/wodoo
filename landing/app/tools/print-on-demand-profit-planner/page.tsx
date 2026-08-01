import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { PodProfitPlanner } from "@/components/tools/pod-profit-planner"

export const metadata: Metadata = {
  title: "Print on demand profit planner",
  description:
    "Free print-on-demand profit calculator — plan POD margins for shirts, hoodies, and merch with base cost, print fees, shipping, ads, and fees.",
  alternates: { canonical: "/tools/print-on-demand-profit-planner" },
}

export default function Page() {
  return (
    <ToolShell
      title="Print-on-demand (POD) profit planner"
      description="Model POD profit per order and monthly earnings after blank cost, print fees, shipping, payment fees, and ads."
    >
      <PodProfitPlanner />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Looking for a free print on demand profit calculator? This POD margin calculator and merch profit planner
        helps Shopify and Etsy sellers estimate shirt profit, hoodie margin, and break-even ad spend. Use it as a
        Printful / Printify profit calculator, t-shirt business calculator, or ecommerce merch pricing tool before
        you launch a new design.
      </p>
    </ToolShell>
  )
}
