import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { DomainAvailabilityChecker } from "@/components/tools/domain-availability-checker"

export const metadata: Metadata = {
  title: "Domain name availability checker",
  description:
    "Free domain name availability checker — search .com, .store, .shop, .io and more to see if your ecommerce brand domain is available.",
  alternates: { canonical: "/tools/domain-name-availability-checker" },
}

export default function Page() {
  return (
    <ToolShell
      title="Domain name availability checker"
      description="Check whether your brand name is available across popular ecommerce TLDs using live RDAP and DNS lookups."
    >
      <DomainAvailabilityChecker />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Looking for a free domain name availability checker? This domain search tool and brand domain checker helps
        ecommerce founders find available .com, .store, .shop, and .io domains before launch. Use it as a website
        domain lookup, store name domain finder, or WHOIS-style availability checker when naming your online store.
      </p>
    </ToolShell>
  )
}
