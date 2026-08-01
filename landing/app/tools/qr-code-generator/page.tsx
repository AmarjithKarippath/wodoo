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
      intro="Create a scannable code for a link or short text, then download it as a PNG. Handy for packaging, print, and in-store signage."
      description="Generate a scannable QR code for any URL or text, customize colors and size, then download a PNG for print or packaging."
    >
      <QrCodeGenerator />
    </ToolShell>
  )
}
