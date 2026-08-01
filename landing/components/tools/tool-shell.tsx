import Link from "next/link"
import { TopBar } from "@/components/wodoo/top-bar"

export function ToolShell({
  children,
  eyebrow = "Tools",
  title,
  intro,
  description,
}: {
  children: React.ReactNode
  eyebrow?: string
  title: string
  /** Short readable intro shown directly under the title */
  intro: string
  /** How-to / instruction paragraph shown after the intro */
  description: string
}) {
  return (
    <main className="min-h-screen bg-background">
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
      </div>
    </main>
  )
}
