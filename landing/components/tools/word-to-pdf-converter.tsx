"use client"

import { useState } from "react"
import { jsPDF } from "jspdf"
import mammoth from "mammoth"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/tools/calc-ui"
import { downloadBlob } from "@/lib/pdf/download"

export function WordToPdfConverter() {
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function convert() {
    if (!file) {
      setError("Choose a .docx Word file first.")
      return
    }
    setBusy(true)
    setError(null)
    try {
      const arrayBuffer = await file.arrayBuffer()
      const { value: text } = await mammoth.extractRawText({ arrayBuffer })
      const body = text.trim() || "(Empty document)"
      const doc = new jsPDF({ unit: "pt", format: "a4" })
      const margin = 48
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const maxWidth = pageWidth - margin * 2
      const lines = doc.splitTextToSize(body, maxWidth) as string[]
      let y = margin
      const lineHeight = 14
      doc.setFont("helvetica", "normal")
      doc.setFontSize(11)
      for (const line of lines) {
        if (y > pageHeight - margin) {
          doc.addPage()
          y = margin
        }
        doc.text(line, margin, y)
        y += lineHeight
      }
      const blob = doc.output("blob")
      const name = file.name.replace(/\.docx$/i, "") || "document"
      downloadBlob(blob, `${name}.pdf`)
    } catch {
      setError("Could not convert that file. Use a .docx Word document (not legacy .doc).")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Converts .docx text to a simple PDF in your browser. Complex layouts, images, and tables are flattened to plain text.
      </p>
      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <Field id="word-pdf-file" label="Word document (.docx)">
          <input
            id="word-pdf-file"
            type="file"
            accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="block w-full text-sm text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-semibold"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </Field>
      </form>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="button" disabled={busy || !file} onClick={() => void convert()}>
        {busy ? "Converting…" : "Convert Word to PDF"}
      </Button>
    </div>
  )
}
