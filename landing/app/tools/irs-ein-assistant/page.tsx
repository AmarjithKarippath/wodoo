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
      intro="Gather the details you need, then continue to the official IRS EIN application. The number itself is issued on the IRS site, not here."
      description="Fill in your entity basics to build a prep checklist, then continue to the official IRS EIN Online Assistant."
    >
      <IrsEinAssistant />
    </ToolShell>
  )
}
