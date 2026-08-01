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
      description="Generate editable starter Operating Agreements, Articles of Organization outlines, and Bylaws for early-stage company setup."
    >
      <StartupLegalDocumentGenerator />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Looking for free legal templates like Docracy-style startup documents? This operating agreement generator,
        articles of organization template, and corporate bylaws builder helps founders draft early registration
        paperwork without paying a lawyer for a first draft. Use it as a free LLC document generator or formation
        paperwork starter — then have counsel review before filing.
      </p>
    </ToolShell>
  )
}
