import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { CourierCarrierFinder } from "@/components/tools/courier-carrier-finder"

export const metadata: Metadata = {
  title: "Cheapest & fastest courier carrier finder",
  description:
    "Compare USPS, UPS, FedEx, and DHL estimates to find the cheapest and fastest courier for your package size, weight, and distance.",
  alternates: { canonical: "/tools/courier-carrier-finder" },
  openGraph: {
    images: [{ url: "/tools/courier-carrier-finder.png", width: 1200, height: 630, alt: "Cheapest & fastest courier finder — free ecommerce tool" }],
    title: "Cheapest & fastest courier carrier finder — Woodo Store",
    description:
      "Find the cheapest and fastest shipping carrier for your parcel with a quick multi-carrier comparison.",
  },
}

export default function CourierCarrierFinderPage() {
  return (
    <ToolShell
      title="Cheapest & fastest courier finder"
      intro="Compare estimated rates and transit times across major carriers for the same package. Spot the cheapest, fastest, or best-value option before you ship."
      description="Enter your package weight, dimensions, and distance zone. We’ll estimate USPS, UPS, FedEx, and DHL options — then highlight the cheapest, fastest, and best-value carrier."
    >
      <CourierCarrierFinder />
    </ToolShell>
  )
}
