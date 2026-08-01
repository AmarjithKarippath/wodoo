import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { PostcodeAddressFinder } from "@/components/tools/postcode-address-finder"

export const metadata: Metadata = {
  title: "Address by ZIP / postcode finder",
  description:
    "Free ZIP code and postcode lookup — find city, region, and map location from a postal code for shipping and delivery planning.",
  alternates: { canonical: "/tools/postcode-address-finder" },
  openGraph: {
    title: "Address by ZIP / postcode finder — Woodo Store",
    description:
      "Look up city and region from a ZIP or postcode for ecommerce shipping zones.",
  },
}

export default function PostcodeAddressFinderPage() {
  return (
    <ToolShell
      title="Address by ZIP / postcode finder"
      intro="Look up city and region details from a ZIP or postcode. Handy when you are setting shipping zones or checking a delivery area."
      description="Enter a country and ZIP or postcode to find the matching city, region, and map coordinates — handy for shipping zones, tax regions, and delivery checks."
    >
      <PostcodeAddressFinder />
    </ToolShell>
  )
}
