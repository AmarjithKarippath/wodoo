import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { PdfToPdfConverter } from "@/components/tools/pdf-to-pdf-converter"

export const metadata: Metadata = {
  title: "PDF to PDF converter",
  description: "Free PDF to PDF tool — merge multiple PDFs or rotate pages in your browser without uploading files.",
  alternates: { canonical: "/tools/pdf-to-pdf-converter" },
  openGraph: {
    title: "PDF to PDF converter — Wodoo Store",
    description: "Free PDF to PDF tool — merge multiple PDFs or rotate pages in your browser without uploading files.",
    url: "/tools/pdf-to-pdf-converter",
    images: [
      {
        url: "/tools/pdf-to-pdf-converter.webp",
        width: 1200,
        height: 630,
        alt: "Free online PDF merge and rotate converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to PDF converter — Wodoo Store",
    description: "Free PDF to PDF tool — merge multiple PDFs or rotate pages in your browser without uploading files.",
    images: ["/tools/pdf-to-pdf-converter.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="pdf-to-pdf-converter"
      title="PDF to PDF converter"
      intro="Merge several PDFs into one file, or rotate every page — processed locally in your browser."
      description="Select PDFs, choose merge or rotate, and download the result. Files never leave your device."
    >
      <PdfToPdfConverter />
    </ToolShell>
  )
}
