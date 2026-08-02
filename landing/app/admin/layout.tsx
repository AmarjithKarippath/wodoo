import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link
              href="/admin/registrations"
              className="font-display text-lg font-extrabold tracking-tight"
            >
              Woodo Admin
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium">
              <Link
                href="/admin/registrations"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Registrations
              </Link>
            </nav>
          </div>
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Site
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  )
}
