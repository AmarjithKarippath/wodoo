import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { YoutubeToMp3Converter } from "@/components/tools/youtube-to-mp3-converter"

export const metadata: Metadata = {
  title: "YouTube audio player",
  description: "Free YouTube audio player — paste a YouTube URL to listen via the official embed. No MP3 downloading.",
  alternates: { canonical: "/tools/youtube-to-mp3-converter" },
  openGraph: {
    title: "YouTube audio player — Wodoo Store",
    description: "Free YouTube audio player — paste a YouTube URL to listen via the official embed. No MP3 downloading.",
    url: "/tools/youtube-to-mp3-converter",
    images: [
      {
        url: "/tools/youtube-to-mp3-converter.webp",
        width: 1200,
        height: 630,
        alt: "Free online YouTube audio player with official embed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube audio player — Wodoo Store",
    description: "Free YouTube audio player — paste a YouTube URL to listen via the official embed. No MP3 downloading.",
    images: ["/tools/youtube-to-mp3-converter.webp"],
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
      toolSlug="youtube-to-mp3-converter"
      title="YouTube audio player"
      intro="Paste a YouTube link to listen in an official player. We don’t download or rip MP3 files."
      description="Uses YouTube’s embed and Music links only. File downloads aren’t offered — that would violate YouTube’s terms and copyright."
    >
      <YoutubeToMp3Converter />
    </ToolShell>
  )
}
