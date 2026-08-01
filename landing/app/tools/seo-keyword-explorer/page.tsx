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
      description="Enter a seed keyword to uncover related terms, autocomplete-style suggestions, and long-tail modifiers — grouped by search intent so you can plan content and product pages faster."
    >
      <KeywordExplorerTool />

      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Looking for a free SEO keyword explorer? This keyword research tool and
        keyword idea generator helps you expand seed terms into related keywords,
        long-tail phrases, and intent clusters for blog posts and product pages.
        Use it as a free keyword finder, SEO keyword research tool, or long-tail
        keyword generator to brainstorm content topics and ecommerce search
        opportunities before you write or optimize a page.
      </p>
    </ToolShell>
  )
}
