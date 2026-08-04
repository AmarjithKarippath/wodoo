import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { LinkInBioIntegrator } from "@/components/tools/link-in-bio-integrator"

export const metadata: Metadata = {
  title: "Link in bio store integrator",
  description:
    "Free link-in-bio store tool — build an Instagram and TikTok bio page that links to your ecommerce store, products, and offers.",
  alternates: { canonical: "/tools/link-in-bio-store-integrator" },
  openGraph: {
    title: "Link-in-bio store integrator — Wodoo Store",
    images: [
      {
        url: "/tools/link-in-bio-store-integrator.webp",
        width: 1200,
        height: 630,
        alt: "Online link-in-bio store integrator to connect Instagram or TikTok to your shop",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="link-in-bio-store-integrator"
      title="Link-in-bio store integrator"
      intro="Build a simple bio page that points followers to your store and key offers. Copy the HTML and host it wherever you like."
      description="Generate a clean link-in-bio HTML page that connects Instagram or TikTok to your store, bestsellers, and offers."
    >
      <LinkInBioIntegrator />
    </ToolShell>
  )
}
