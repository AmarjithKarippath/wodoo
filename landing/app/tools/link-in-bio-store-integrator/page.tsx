import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { LinkInBioIntegrator } from "@/components/tools/link-in-bio-integrator"

export const metadata: Metadata = {
  title: "Link in bio store integrator",
  description:
    "Free link-in-bio store tool — build an Instagram and TikTok bio page that links to your ecommerce store, products, and offers.",
  alternates: { canonical: "/tools/link-in-bio-store-integrator" },
}

export default function Page() {
  return (
    <ToolShell
      title="Link-in-bio store integrator"
      description="Generate a clean link-in-bio HTML page that connects Instagram or TikTok to your store, bestsellers, and offers."
    >
      <LinkInBioIntegrator />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Looking for a free link in bio store integrator? This Instagram link in bio generator and TikTok bio link
        builder helps creators and brands send followers to an ecommerce store, product pages, and waitlists. Use it
        as a social commerce landing page maker, bio link HTML generator, or storefront link hub tool without another
        subscription.
      </p>
    </ToolShell>
  )
}
