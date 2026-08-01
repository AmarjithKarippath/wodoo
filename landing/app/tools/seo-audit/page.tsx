import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { SeoAuditTool } from "@/components/tools/seo-audit-tool"

export const metadata: Metadata = {
  title: "Free SEO audit tool",
  description:
    "Run a free on-page SEO audit — check title tags, meta descriptions, headings, Open Graph, HTTPS, image alt text, and more.",
  alternates: { canonical: "/tools/seo-audit" },
  openGraph: {
    title: "Free SEO audit tool — Woodo Store",
    description:
      "Analyze any public webpage for common SEO issues and get a clear pass/warn/fail report.",
  },
}

export default function SeoAuditPage() {
  return (
    <ToolShell
      title="SEO audit tool"
      description="Paste a public page URL to check title tags, meta description, H1s, canonicals, Open Graph, HTTPS, image alt text, content length, and more — then fix what’s holding you back."
    >
      <SeoAuditTool />

      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Looking for a free SEO audit tool? This on-page SEO checker and website SEO
        analyzer helps you spot missing title tags, weak meta descriptions, heading
        issues, and social preview gaps in seconds. Use it as a free website audit
        tool, SEO score checker, or technical SEO scanner to improve crawlability,
        click-through rates, and on-page fundamentals before you publish or
        redesign.
      </p>
    </ToolShell>
  )
}
