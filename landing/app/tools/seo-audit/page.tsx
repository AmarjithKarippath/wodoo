import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { SeoAuditTool } from "@/components/tools/seo-audit-tool"

export const metadata: Metadata = {
  title: "Free SEO audit tool",
  description:
    "Run a free on-page SEO audit — check title tags, meta descriptions, headings, Open Graph, HTTPS, image alt text, and more.",
  alternates: { canonical: "/tools/seo-audit" },
  openGraph: {
    images: [{ url: "/tools/seo-audit.webp", width: 1200, height: 630, alt: "Free online SEO audit tool to check on-page titles, metas, and technical signals" }],
    title: "Free SEO audit tool — Wodoo Store",
    description:
      "Analyze any public webpage for common SEO issues and get a clear pass/warn/fail report.",
  },
}

export default function SeoAuditPage() {
  return (
    <ToolShell
      toolSlug="seo-audit"
      title="SEO audit tool"
      intro="Run a quick on-page check for titles, meta tags, headings, and other basics. Fix the obvious gaps before you publish or redesign a page."
      description="Paste a public page URL to check title tags, meta description, H1s, canonicals, Open Graph, HTTPS, image alt text, content length, and more — then fix what’s holding you back."
    >
      <SeoAuditTool />
    </ToolShell>
  )
}
