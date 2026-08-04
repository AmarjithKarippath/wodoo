import Link from "next/link"
import { liveTools } from "@/lib/tools"

export function SiteFooter() {
  const tools = liveTools()

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:gap-12">
          <div>
            <Link
              href="/"
              className="font-display text-xl font-extrabold tracking-tight text-foreground"
            >
              Wodoo Store
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Launch your store and use free ecommerce tools — shipping,
              margins, SEO, and more.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
              <Link
                href="/tools"
                className="text-foreground/80 transition-colors hover:text-primary"
              >
                All tools
              </Link>
              <Link
                href="/blog"
                className="text-foreground/80 transition-colors hover:text-primary"
              >
                Blog
              </Link>
              <Link
                href="/#start"
                className="text-foreground/80 transition-colors hover:text-primary"
              >
                Start free
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Free tools
            </h2>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={tool.href}
                    className="text-sm font-medium text-foreground/85 transition-colors hover:text-primary"
                  >
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
          <p>© {new Date().getFullYear()} Wodoo Store. All rights reserved.</p>
          <p>
            <Link href="/tools" className="hover:text-foreground">
              Free ecommerce tools
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
