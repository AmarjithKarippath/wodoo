import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { QrCodeGenerator } from "@/components/tools/qr-code-generator"

export const metadata: Metadata = {
  title: "QR code generator",
  description:
    "Free QR code generator — create downloadable QR codes for product links, store URLs, menus, packaging, and marketing campaigns.",
  alternates: { canonical: "/tools/qr-code-generator" },
}

export default function Page() {
  return (
    <ToolShell
      title="QR code generator"
      description="Generate a scannable QR code for any URL or text, customize colors and size, then download a PNG for print or packaging."
    >
      <QrCodeGenerator />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Need a free QR code generator? This QR code maker creates downloadable PNG codes for ecommerce product pages,
        Instagram bio links, packaging inserts, and storefront signage. Use it as a URL QR code generator, product QR
        code tool, or marketing QR creator without watermarks or signup.
      </p>
    </ToolShell>
  )
}
