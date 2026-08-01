import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { UsptoTessSearch } from "@/components/tools/uspto-tess-search"

export const metadata: Metadata = {
  title: "USPTO TESS trademark search",
  description:
    "Free USPTO TESS trademark search helper — score your company name and open the Trademark Electronic Search System before you register a business brand.",
  alternates: { canonical: "/tools/uspto-tess-trademark-search" },
}

export default function Page() {
  return (
    <ToolShell
      title="USPTO TESS trademark search"
      description="Cross-reference your desired company or brand name against U.S. trademarks with a distinctiveness snapshot and direct TESS search links."
    >
      <UsptoTessSearch />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Need a free Trademark Electronic Search System helper? This USPTO TESS search tool helps founders check company
        names against active trademarks before registration and avoid cease-and-desist risk. Use it as a business
        trademark clearance starter, brand name trademark checker, or TESS search launcher alongside your SOS entity
        name search.
      </p>
    </ToolShell>
  )
}
