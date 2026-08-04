import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { StoreNameGenerator } from "@/components/tools/store-name-generator"

export const metadata: Metadata = {
  title: "Store name generator",
  description: "Free ecommerce store name generator — get brandable online store name ideas from a niche or keyword.",
  alternates: { canonical: "/tools/store-name-generator" },
  openGraph: {
    title: "Store name generator — Wodoo Store",
    images: [
      {
        url: "/tools/store-name-generator.webp",
        width: 1200,
        height: 630,
        alt: "Free online store name generator for ecommerce brand and shop name ideas",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="store-name-generator"
      title="Store name generator"
      intro="Stuck on a brand name? Generate clean, brandable store name ideas from a niche keyword in seconds."
      description="Type a niche or product keyword. We’ll generate store name ideas you can check for domains and trademarks next."
    >
      <StoreNameGenerator />
    </ToolShell>
  )
}
