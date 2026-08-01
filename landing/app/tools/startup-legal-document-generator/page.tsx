import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { StartupLegalDocumentGenerator } from "@/components/tools/startup-legal-document-generator"

export const metadata: Metadata = {
  title: "Startup legal document generator",
  description:
    "Free startup legal document generator — draft LLC operating agreements, articles of organization outlines, and corporate bylaws for early-stage filings.",
  alternates: { canonical: "/tools/startup-legal-document-generator" },
}

export default function Page() {
  return (
    <ToolShell
      title="Startup legal document generator"
      intro="Draft starter operating agreements, articles outlines, and bylaws for early setup. These are educational templates — have a lawyer review before you rely on them."
      description="Generate editable starter Operating Agreements, Articles of Organization outlines, and Bylaws for early-stage company setup."
    >
      <StartupLegalDocumentGenerator />
    </ToolShell>
  )
}
