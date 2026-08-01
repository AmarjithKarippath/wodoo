import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { CompanyNameAvailabilityChecker } from "@/components/tools/company-name-availability-checker"

export const metadata: Metadata = {
  title: "Company name availability checker",
  description:
    "Free company name availability checker — open Companies House and US Secretary of State entity searches to verify if your LLC or corporation name is taken.",
  alternates: { canonical: "/tools/company-name-availability-checker" },
}

export default function Page() {
  return (
    <ToolShell
      title="Company name availability checker"
      description="Prepare your proposed entity name and jump to official government registries like Companies House and state SOS business searches."
    >
      <CompanyNameAvailabilityChecker />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Looking for a free company name availability checker? This business entity name search hub helps founders verify
        LLC and corporation names through Companies House WebCHeck-style UK search and US Secretary of State name
        lookups before filing. Use it as a company registration name checker, SOS business search launcher, or entity
        availability tool before you incorporate.
      </p>
    </ToolShell>
  )
}
