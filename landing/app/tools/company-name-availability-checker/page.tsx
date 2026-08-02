import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { CompanyNameAvailabilityChecker } from "@/components/tools/company-name-availability-checker"

export const metadata: Metadata = {
  title: "Company name availability checker",
  description:
    "Free company name availability checker — open Companies House and US Secretary of State entity searches to verify if your LLC or corporation name is taken.",
  alternates: { canonical: "/tools/company-name-availability-checker" },
  openGraph: {
    title: "Company name availability checker — Woodo Store",
    images: [
      {
        url: "/tools/company-name-availability-checker.webp",
        width: 1200,
        height: 630,
        alt: "Free online company name availability checker for LLC and business entity search",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="company-name-availability-checker"
      title="Company name availability checker"
      intro="Prepare a proposed company name, then open official registry searches to check it. Availability is only confirmed on the government portals themselves."
      description="Enter your proposed name for checklist tips, then open Companies House or a U.S. Secretary of State search to confirm availability."
    >
      <CompanyNameAvailabilityChecker />
    </ToolShell>
  )
}
