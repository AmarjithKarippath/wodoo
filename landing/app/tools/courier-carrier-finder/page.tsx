import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { CourierCarrierFinder } from "@/components/tools/courier-carrier-finder"

export const metadata: Metadata = {
  title: "Cheapest & fastest courier carrier finder",
  description:
    "Compare USPS, UPS, FedEx, and DHL estimates to find the cheapest and fastest courier for your package size, weight, and distance.",
  alternates: { canonical: "/tools/courier-carrier-finder" },
  openGraph: {
    title: "Cheapest & fastest courier carrier finder — Woodo Store",
    description:
      "Find the cheapest and fastest shipping carrier for your parcel with a quick multi-carrier comparison.",
  },
}

export default function CourierCarrierFinderPage() {
  return (
    <ToolShell
      title="Cheapest & fastest courier finder"
      description="Enter your package weight, dimensions, and distance zone. We’ll estimate USPS, UPS, FedEx, and DHL options — then highlight the cheapest, fastest, and best-value carrier."
    >
      <CourierCarrierFinder />

      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Looking for the cheapest &amp; fastest courier service finder? Our free tool
        acts as a powerful courier comparison tool and multi-carrier courier finder
        that lets you instantly compare courier rates and discover the cheapest
        courier service alongside the fastest courier service. Whether you need to
        find cheapest courier options, run a full courier rate comparison, or
        identify the cheapest and fastest courier for your packages, this cheapest
        shipping comparison platform shows the best cheapest and fastest delivery
        choices side-by-side. Simply enter your package details and get accurate
        results from multiple carriers so you can choose the perfect balance of
        speed and cost every time.
      </p>
    </ToolShell>
  )
}
