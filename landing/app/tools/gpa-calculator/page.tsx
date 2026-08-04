import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { GpaCalculator } from "@/components/tools/gpa-calculator"

export const metadata: Metadata = {
  title: "GPA calculator",
  description: "Free GPA calculator — compute grade point average from course credits and grade points on a 10-point scale.",
  alternates: { canonical: "/tools/gpa-calculator" },
  openGraph: {
    title: "GPA calculator — Woodo Store",
    images: [
      {
        url: "/tools/gpa-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online GPA calculator for college grade point average",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="gpa-calculator"
      title="GPA calculator"
      intro="Calculate GPA from your courses — credits × grade points, weighted across the semester."
      description="Add each course’s credits and grade points (0–10). We’ll compute GPA, total credits, and quality points."
    >
      <GpaCalculator />
    </ToolShell>
  )
}
