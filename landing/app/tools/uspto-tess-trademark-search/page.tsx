import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { UsptoTessSearch } from "@/components/tools/uspto-tess-search"

export const metadata: Metadata = {
  title: "USPTO TESS trademark search",
  description:
    "Free USPTO TESS trademark search helper — score your company name and open the Trademark Electronic Search System before you register a business brand.",
  alternates: { canonical: "/tools/uspto-tess-trademark-search" },
  openGraph: {
    title: "USPTO TESS trademark search — Woodo Store",
    images: [
      {
        url: "/tools/uspto-tess-trademark-search.png",
        width: 1200,
        height: 630,
        alt: "USPTO TESS trademark search — free ecommerce tool",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      title="USPTO TESS trademark search"
      intro="Score a name for distinctiveness, then jump into USPTO trademark search. Do this before you invest heavily in branding or formation paperwork."
      description="Enter the brand or company name you want to check, review the snapshot, then open USPTO TESS for the official search."
    >
      <UsptoTessSearch />
    </ToolShell>
  )
}
