import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { PdfConverter } from "@/components/tools/pdf-converter"

export const metadata: Metadata = {
  title: "PDF converter",
  description: "Free PDF converter — turn text or images into PDF in your browser. Links to Word, images, and PDF merge tools.",
  alternates: { canonical: "/tools/pdf-converter" },
  openGraph: {
    title: "PDF converter — Wodoo Store",
    description: "Free PDF converter — turn text or images into PDF in your browser. Links to Word, images, and PDF merge tools.",
    url: "/tools/pdf-converter",
    images: [
      {
        url: "/tools/pdf-converter.webp",
        width: 1200,
        height: 630,
        alt: "Free online PDF converter for text and images",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF converter — Wodoo Store",
    description: "Free PDF converter — turn text or images into PDF in your browser. Links to Word, images, and PDF merge tools.",
    images: ["/tools/pdf-converter.webp"],
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
      toolSlug="pdf-converter"
      title="PDF converter"
      intro="Convert text or images to PDF instantly in your browser — no upload to a server."
      description="Choose text or images, then download a PDF. Use the linked tools for Word documents or merging PDFs."
    >
      <PdfConverter />
    </ToolShell>
  )
}
