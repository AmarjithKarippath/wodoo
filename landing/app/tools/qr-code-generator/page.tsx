import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { QrCodeGenerator } from "@/components/tools/qr-code-generator"

export const metadata: Metadata = {
  title: "QR code generator",
  description:
    "Free QR code generator — create downloadable QR codes for product links, store URLs, menus, packaging, and marketing campaigns.",
  alternates: { canonical: "/tools/qr-code-generator" },
  openGraph: {
    title: "QR code generator — Wodoo Store",
    images: [
      {
        url: "/tools/qr-code-generator.webp",
        width: 1200,
        height: 630,
        alt: "Free online QR code generator for product links, store URLs, and packaging",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="qr-code-generator"
      title="QR code generator"
      intro="Create a scannable code for a link or short text, then download it as a PNG. Handy for packaging, print, and in-store signage."
      description="Generate a scannable QR code for any URL or text, customize colors and size, then download a PNG for print or packaging."
    >
      <QrCodeGenerator />
    </ToolShell>
  )
}
