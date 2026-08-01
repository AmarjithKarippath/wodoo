import Link from "next/link"
import type { Metadata } from "next"
import { TopBar } from "@/components/wodoo/top-bar"
import { TOOLS } from "@/lib/tools"

export const metadata: Metadata = {
  title: "Free ecommerce tools",
  description:
    "Discover a suite of free, powerful ecommerce tools designed to streamline your workflow, cut costs, and boost your productivity.",
  alternates: { canonical: "/tools" },
}

export default function ToolsIndexPage() {
  return (
    <main className="min-h-screen bg-background">
      <TopBar />
      <div className="mx-auto max-w-3xl px-6 pb-20 pt-32">
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to home
        </Link>
        <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Tools
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
          Discover a suite of free, powerful ecommerce tools designed to
          streamline your workflow, cut costs, and boost your productivity.
        </p>

        <ul className="mt-12 divide-y divide-border border-y border-border">
          {TOOLS.map((tool) => (
            <li key={tool.slug} className="py-8">
              {tool.status === "live" ? (
                <Link href={tool.href} className="group block">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary">
                      {tool.title}
                    </h2>
                    <span className="text-sm font-semibold text-primary">
                      Open →
                    </span>
                  </div>
                  <p className="mt-2 text-muted-foreground text-pretty">
                    {tool.description}
                  </p>
                </Link>
              ) : (
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground/70">
                      {tool.title}
                    </h2>
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Soon
                    </span>
                  </div>
                  <p className="mt-2 text-muted-foreground text-pretty">
                    {tool.description}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
