import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { ShippingPolicyGenerator } from "@/components/tools/shipping-policy-generator"

export const metadata: Metadata = {
  title: "Shipping policy generator",
  description:
    "Generate a clear shipping policy for your online store — processing times, delivery estimates, free shipping, carriers, and more.",
  alternates: { canonical: "/tools/shipping-policy-generator" },
  openGraph: {
    title: "Shipping policy generator — Woodo Store",
    description:
      "Create a ready-to-publish shipping policy for your ecommerce store in minutes.",
  },
}

export default function ShippingPolicyGeneratorPage() {
  return (
    <ToolShell
      title="Shipping policy generator"
      description="Fill in your store details and get a ready-to-copy shipping policy covering processing times, delivery windows, rates, carriers, and common edge cases."
    >
      <ShippingPolicyGenerator />

      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Need a professional shipping policy generator for your online store? Our free shipping policy
        generator and shipping policy template make it simple to create a clear, store-ready document in
        minutes. Whether you’re looking for a Shopify shipping policy generator, an ecommerce shipping policy
        generator, or a shipping policy generator free tool, this online shipping policy generator delivers a
        customized sample shipping policy template that covers processing times, carriers, and delivery
        expectations. Use our free shipping policy template or free shipping policy generator for Shopify to
        quickly generate a compliant policy with no signup required — just fill in your details and get a
        polished shipping policy template free version ready to paste into your store.
      </p>
    </ToolShell>
  )
}
