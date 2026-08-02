import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { MerchandiseMockupGenerator } from "@/components/tools/merchandise-mockup-generator"

export const metadata: Metadata = {
  title: "Merchandise mockup generator",
  description:
    "Free merchandise mockup generator — create t-shirt, hoodie, mug, and tote bag mockups with your brand text and download SVG previews.",
  alternates: { canonical: "/tools/merchandise-mockup-generator" },
  openGraph: {
    title: "Merchandise mockup generator — Woodo Store",
    images: [
      {
        url: "/tools/merchandise-mockup-generator.webp",
        width: 1200,
        height: 630,
        alt: "Free online merchandise mockup generator for t-shirts, hoodies, mugs, and totes",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="merchandise-mockup-generator"
      title="Merchandise mockup generator"
      intro="Preview brand text on common merch products and download a simple mockup. Fast enough for early listing or ad concepts."
      description="Preview brand text on t-shirts, hoodies, mugs, and totes — then download a clean SVG mockup for listings or ads."
    >
      <MerchandiseMockupGenerator />
    </ToolShell>
  )
}
