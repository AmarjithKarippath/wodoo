import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { WordToPdfConverter } from "@/components/tools/word-to-pdf-converter"

export const metadata: Metadata = {
  title: "Word to PDF converter",
  description: "Free Word to PDF converter — convert .docx documents to PDF in your browser (text-focused).",
  alternates: { canonical: "/tools/word-to-pdf-converter" },
  openGraph: {
    title: "Word to PDF converter — Wodoo Store",
    description: "Free Word to PDF converter — convert .docx documents to PDF in your browser (text-focused).",
    url: "/tools/word-to-pdf-converter",
    images: [
      {
        url: "/tools/word-to-pdf-converter.webp",
        width: 1200,
        height: 630,
        alt: "Free online Word DOCX to PDF converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Word to PDF converter — Wodoo Store",
    description: "Free Word to PDF converter — convert .docx documents to PDF in your browser (text-focused).",
    images: ["/tools/word-to-pdf-converter.webp"],
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
      toolSlug="word-to-pdf-converter"
      title="Word to PDF converter"
      intro="Convert a .docx Word document to PDF without uploading it to a server."
      description="Upload a .docx file. Text is extracted and written into a simple multi-page PDF you can download."
    >
      <WordToPdfConverter />
    </ToolShell>
  )
}
