import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { MerchandiseMockupGenerator } from "@/components/tools/merchandise-mockup-generator"

export const metadata: Metadata = {
  title: "Merchandise mockup generator",
  description:
    "Free merchandise mockup generator — create t-shirt, hoodie, mug, and tote bag mockups with your brand text and download SVG previews.",
  alternates: { canonical: "/tools/merchandise-mockup-generator" },
}

export default function Page() {
  return (
    <ToolShell
      title="Merchandise mockup generator"
      description="Preview brand text on t-shirts, hoodies, mugs, and totes — then download a clean SVG mockup for listings or ads."
    >
      <MerchandiseMockupGenerator />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Need a free merchandise mockup generator? This t-shirt mockup maker, hoodie mockup tool, and product mockup
        generator helps POD sellers and brands create listing visuals fast. Use it as a merch design preview tool,
        tote bag mockup generator, mug mockup creator, or ecommerce product mockup tool before you upload designs to
        your store.
      </p>
    </ToolShell>
  )
}
