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
      intro="Check whether a brand name is free across popular web domains. A practical first step before you commit to a store name."
      description="Type a brand name or full domain, then check availability across common ecommerce TLDs."
    >
      <DomainAvailabilityChecker />
    </ToolShell>
  )
}
