import Link from "next/link"
import { TopBar } from "@/components/wodoo/top-bar"

export function ToolShell({
  children,
  eyebrow = "Tools",
  title,
  description,
}: {
  children: React.ReactNode
  eyebrow?: string
  title: string
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
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
        <div className="mt-10">{children}</div>
      </div>
    </main>
  )
}
