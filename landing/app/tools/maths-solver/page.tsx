import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { MathsSolver } from "@/components/tools/maths-solver"

export const metadata: Metadata = {
  title: "Maths solver",
  description: "Free maths solver / arithmetic calculator — solve expressions with +, −, ×, ÷, %, powers, and parentheses online.",
  alternates: { canonical: "/tools/maths-solver" },
  openGraph: {
    title: "Maths solver — Woodo Store",
    images: [
      {
        url: "/tools/maths-solver.webp",
        width: 1200,
        height: 630,
        alt: "Free online maths solver calculator for arithmetic expressions",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="maths-solver"
      title="Maths solver"
      intro="Solve arithmetic expressions instantly — parentheses, powers, and the basic operators."
      description="Type an expression like (12 + 8) * 3 / 2 or 2^8. We’ll evaluate it safely and show the answer."
    >
      <MathsSolver />
    </ToolShell>
  )
}
