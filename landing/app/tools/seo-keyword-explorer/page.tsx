import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { KeywordExplorerTool } from "@/components/tools/keyword-explorer-tool"

export const metadata: Metadata = {
  title: "SEO keyword explorer",
  description:
    "Free SEO keyword explorer — expand a seed keyword into related terms, long-tail ideas, and intent clusters for content and ecommerce SEO.",
  alternates: { canonical: "/tools/seo-keyword-explorer" },
  openGraph: {
    title: "SEO keyword explorer — Woodo Store",
    description:
      "Discover related keywords, long-tail ideas, and search intent groups from any seed keyword.",
  },
}

export default function SeoKeywordExplorerPage() {
  return (
    <ToolShell
      title="SEO keyword explorer"
      intro="Expand a seed topic into related phrases and longer variations. Use the ideas to plan blog posts, product pages, or FAQ content."
      description="Enter a seed keyword to uncover related terms, autocomplete-style suggestions, and long-tail modifiers — grouped by search intent so you can plan content and product pages faster."
    >
      <KeywordExplorerTool />
    </ToolShell>
  )
}
