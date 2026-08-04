import Link from "next/link"
import { TopBar } from "@/components/wodoo/top-bar"
import { StartStoreButton } from "@/components/wodoo/start-store-button"
import { toolImageObject } from "@/lib/image-metadata"
import { getTool } from "@/lib/tools"

export function ToolShell({
  children,
  eyebrow = "Tools",
  title,
  intro,
  description,
  toolSlug,
}: {
  children: React.ReactNode
  eyebrow?: string
  title: string
  /** Short readable intro shown directly under the title */
  intro: string
  /** How-to / instruction paragraph shown after the intro */
  description: string
  /** Registry slug — enables ImageObject structured data */
  toolSlug?: string
}) {
  const tool = toolSlug ? getTool(toolSlug) : undefined
  const imageObject = tool
    ? {
        "@context": "https://schema.org",
        ...toolImageObject(tool, { representativeOfPage: true }),
      }
    : null

  return (
    <main className="min-h-screen bg-background">
      {imageObject ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObject) }}
        />
      ) : null}
      <TopBar />
      <div className="mx-auto max-w-3xl px-6 pb-20 pt-32">
        <Link
          href="/tools"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ← All tools
        </Link>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-foreground text-balance sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/85 text-pretty">
          {intro}
        </p>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
        <div className="mt-10">{children}</div>

        <div className="mt-14 rounded-2xl border border-border bg-secondary/30 px-6 py-8 text-center sm:px-8">
          <p className="font-display text-xl font-bold tracking-tight text-foreground text-balance sm:text-2xl">
            Ready to sell? Open your Wodoo Store.
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground text-pretty">
            Launch a live storefront in minutes — no code, no hassle.
          </p>
          <div className="mt-6 flex justify-center">
            <StartStoreButton className="rounded-full bg-foreground px-7 py-3.5 text-base font-semibold text-background shadow-lg transition-colors hover:bg-primary">
              Start your store
            </StartStoreButton>
          </div>
        </div>
      </div>
    </main>
  )
}
