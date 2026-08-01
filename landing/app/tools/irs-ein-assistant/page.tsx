import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { IrsEinAssistant } from "@/components/tools/irs-ein-assistant"

export const metadata: Metadata = {
  title: "IRS EIN online assistant checklist",
  description:
    "Free IRS EIN application checklist — prepare your LLC or corporation details and open the official IRS Employer Identification Number online assistant.",
  alternates: { canonical: "/tools/irs-ein-assistant" },
}

export default function Page() {
  return (
    <ToolShell
      title="IRS EIN online assistant"
      description="Get your documents ready, then apply for a free Employer Identification Number through the official IRS EIN Online Assistant."
    >
      <IrsEinAssistant />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Need the IRS EIN Online Assistant? This free EIN application checklist helps new business owners prepare legal
        name, responsible party, and entity details before requesting an Employer Identification Number for banking,
        payroll, and taxes. Use it as an EIN application guide, federal tax ID helper, or business EIN launcher to the
        official IRS portal.
      </p>
    </ToolShell>
  )
}
