"use client"

import { useState } from "react"
import { PDFDocument, degrees } from "pdf-lib"
import { Button } from "@/components/ui/button"
import { Field, selectClassName } from "@/components/tools/calc-ui"
import { downloadBytes } from "@/lib/pdf/download"

type Mode = "merge" | "rotate"

export function PdfToPdfConverter() {
  const [files, setFiles] = useState<File[]>([])
  const [mode, setMode] = useState<Mode>("merge")
  const [rotation, setRotation] = useState("90")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function convert() {
    if (!files.length) {
      setError("Choose at least one PDF.")
      return
    }
    setBusy(true)
    setError(null)
    try {
      const out = await PDFDocument.create()
      for (const file of files) {
        const bytes = new Uint8Array(await file.arrayBuffer())
        const src = await PDFDocument.load(bytes, { ignoreEncryption: true })
        const pages = await out.copyPages(src, src.getPageIndices())
        for (const page of pages) {
          if (mode === "rotate") {
            const current = page.getRotation().angle
            page.setRotation(degrees(current + Number(rotation)))
          }
          out.addPage(page)
        }
      }
      const saved = await out.save()
      downloadBytes(
        saved,
        mode === "merge" ? "merged.pdf" : "rotated.pdf",
        "application/pdf",
      )
    } catch {
      setError("Could not process that PDF. Try an unlocked PDF file.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Merge multiple PDFs into one, or rotate every page. Processing stays in your browser — files are not uploaded.
      </p>
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="pdf2-mode" label="Action">
          <select id="pdf2-mode" className={selectClassName} value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <option value="merge">Merge PDFs</option>
            <option value="rotate">Rotate pages</option>
          </select>
        </Field>
        {mode === "rotate" ? (
          <Field id="pdf2-rot" label="Rotation">
            <select id="pdf2-rot" className={selectClassName} value={rotation} onChange={(e) => setRotation(e.target.value)}>
              <option value="90">90° clockwise</option>
              <option value="180">180°</option>
              <option value="270">270° clockwise</option>
            </select>
          </Field>
        ) : (
          <div />
        )}
        <Field id="pdf2-files" label="PDF files" className="sm:col-span-2 space-y-2" hint="Select order matters for merge.">
          <input
            id="pdf2-files"
            type="file"
            accept="application/pdf,.pdf"
            multiple
            className="block w-full text-sm text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-semibold"
            onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          />
        </Field>
      </form>
      {files.length ? (
        <p className="text-sm text-muted-foreground">{files.length} PDF{files.length === 1 ? "" : "s"} selected</p>
      ) : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="button" disabled={busy || !files.length} onClick={() => void convert()}>
        {busy ? "Processing…" : mode === "merge" ? "Merge to PDF" : "Rotate & download PDF"}
      </Button>
    </div>
  )
}
