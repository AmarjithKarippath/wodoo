import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { ImagesToPdfConverter } from "@/components/tools/images-to-pdf-converter"

export const metadata: Metadata = {
  title: "Images to PDF converter",
  description: "Free images to PDF converter — combine JPG and PNG files into one PDF with fit, A4, or Letter pages.",
  alternates: { canonical: "/tools/images-to-pdf-converter" },
  openGraph: {
    title: "Images to PDF converter — Wodoo Store",
    description: "Free images to PDF converter — combine JPG and PNG files into one PDF with fit, A4, or Letter pages.",
    url: "/tools/images-to-pdf-converter",
    images: [
      {
        url: "/tools/images-to-pdf-converter.webp",
        width: 1200,
        height: 630,
        alt: "Free online images to PDF converter for JPG and PNG",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Images to PDF converter — Wodoo Store",
    description: "Free images to PDF converter — combine JPG and PNG files into one PDF with fit, A4, or Letter pages.",
    images: ["/tools/images-to-pdf-converter.webp"],
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
      toolSlug="images-to-pdf-converter"
      title="Images to PDF converter"
      intro="Combine JPG or PNG images into a single PDF, with optional A4 or Letter page sizes."
      description="Select images in order, pick a page size, and download the PDF. Conversion runs in your browser."
    >
      <ImagesToPdfConverter />
    </ToolShell>
  )
}
