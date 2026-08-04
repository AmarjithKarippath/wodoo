import Link from "next/link"
import type { Metadata } from "next"
import { TopBar } from "@/components/wodoo/top-bar"
import { ToolThumbnail } from "@/components/tools/tool-thumbnail"
import { toolImageObject } from "@/lib/image-metadata"
import { TOOLS } from "@/lib/tools"

export const metadata: Metadata = {
  title: "Free online tools & calculators",
  description:
    "Free ecommerce, finance, health, and maths tools — shipping calculators, EMI, GST, BMI, GPA, and more from Wodoo Store.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free online tools & calculators — Wodoo Store",
    description:
      "Free ecommerce, finance, health, and maths tools — shipping calculators, EMI, GST, BMI, GPA, and more from Wodoo Store.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Wodoo Store free online tools and calculators",
      },
    ],
  },
}

export default function ToolsIndexPage() {
  const imageListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Wodoo Store free online tool thumbnails",
    itemListElement: TOOLS.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: toolImageObject(tool),
    })),
  }

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageListSchema) }}
      />
      <TopBar />
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-32">
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to home
        </Link>

        <div className="mx-auto mt-8 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Free tools
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Free online tools &amp; calculators
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            Ecommerce, finance, health, and maths calculators — free to use,
            no signup required.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool, index) => {
            const card = (
              <>
                <div className="relative aspect-[1200/630] overflow-hidden bg-secondary/40">
                  <ToolThumbnail
                    tool={tool}
                    priority={index < 3}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary">
                      {tool.title}
                    </h2>
                    {tool.status === "live" ? (
                      <span className="shrink-0 text-sm font-semibold text-primary">
                        Try →
                      </span>
                    ) : (
                      <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                    {tool.description}
                  </p>
                </div>
              </>
            )

            return (
              <li key={tool.slug}>
                {tool.status === "live" ? (
                  <Link
                    href={tool.href}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
                  >
                    {card}
                  </Link>
                ) : (
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card opacity-70">
                    {card}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
