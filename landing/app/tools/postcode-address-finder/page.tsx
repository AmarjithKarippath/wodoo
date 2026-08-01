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
      description="Enter a country and ZIP or postcode to find the matching city, region, and map coordinates — handy for shipping zones, tax regions, and delivery checks."
    >
      <PostcodeAddressFinder />

      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Need a fast and accurate address lookup by post code? Our free tool works as
        a complete postcode address finder and postcode lookup that instantly returns
        the full address from postcode. Whether you’re searching for a UK postcode
        lookup, free postcode address finder, or simply need to convert postcode to
        address, this address finder by postcode makes it easy to find address by
        postcode in seconds. Just enter the code into our powerful postcode search
        and get precise results — it also supports zip code address lookup and postal
        code address finder for international use, helping you verify delivery
        addresses quickly and reduce shipping errors.
      </p>
    </ToolShell>
  )
}
