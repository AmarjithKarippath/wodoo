"use client"

import { useState } from "react"
import Link from "next/link"
import { jsPDF } from "jspdf"
import { PDFDocument } from "pdf-lib"
import { Button } from "@/components/ui/button"
import { Field, selectClassName } from "@/components/tools/calc-ui"
import { downloadBlob, downloadBytes } from "@/lib/pdf/download"

type Mode = "text" | "images"

export function PdfConverter() {
  const [mode, setMode] = useState<Mode>("text")
  const [text, setText] = useState("Wodoo Store\n\nYour converted PDF content goes here.")
  const [files, setFiles] = useState<File[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function convert() {
    setBusy(true)
    setError(null)
    try {
      if (mode === "text") {
        const body = text.trim()
        if (!body) {
          setError("Enter some text to convert.")
          return
        }
        const doc = new jsPDF({ unit: "pt", format: "a4" })
        const margin = 48
        const maxWidth = doc.internal.pageSize.getWidth() - margin * 2
        const lines = doc.splitTextToSize(body, maxWidth) as string[]
        let y = margin
        const lineHeight = 14
        const pageHeight = doc.internal.pageSize.getHeight()
        doc.setFontSize(11)
        for (const line of lines) {
          if (y > pageHeight - margin) {
            doc.addPage()
            y = margin
          }
          doc.text(line, margin, y)
          y += lineHeight
        }
        downloadBlob(doc.output("blob"), "document.pdf")
        return
      }

      if (!files.length) {
        setError("Choose one or more images.")
        return
      }
      const pdf = await PDFDocument.create()
      for (const file of files) {
        const bytes = new Uint8Array(await file.arrayBuffer())
        const isPng = file.type === "image/png" || file.name.toLowerCase().endsWith(".png")
        const image = isPng ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes)
        const page = pdf.addPage([image.width, image.height])
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height })
      }
      downloadBytes(await pdf.save(), "converted.pdf", "application/pdf")
    } catch {
      setError("Conversion failed. Check your input and try again.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Quick PDF converter in your browser. For Word files or merge/rotate, use the specialized tools below.
      </p>
      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <Field id="pdfc-mode" label="Convert from">
          <select id="pdfc-mode" className={selectClassName} value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <option value="text">Text → PDF</option>
            <option value="images">Images → PDF</option>
          </select>
        </Field>
        {mode === "text" ? (
          <Field id="pdfc-text" label="Text">
            <textarea
              id="pdfc-text"
              className="border-input min-h-40 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Field>
        ) : (
          <Field id="pdfc-files" label="Images (JPG / PNG)">
            <input
              id="pdfc-files"
              type="file"
              accept="image/jpeg,image/png,.jpg,.jpeg,.png"
              multiple
              className="block w-full text-sm text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-semibold"
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            />
          </Field>
        )}
      </form>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="button" disabled={busy} onClick={() => void convert()}>
        {busy ? "Converting…" : "Convert to PDF"}
      </Button>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>
          <Link href="/tools/word-to-pdf-converter" className="font-medium text-foreground underline-offset-4 hover:underline">
            Word to PDF converter
          </Link>
          {" — "}convert .docx documents
        </li>
        <li>
          <Link href="/tools/images-to-pdf-converter" className="font-medium text-foreground underline-offset-4 hover:underline">
            Images to PDF converter
          </Link>
          {" — "}with A4 / Letter page sizes
        </li>
        <li>
          <Link href="/tools/pdf-to-pdf-converter" className="font-medium text-foreground underline-offset-4 hover:underline">
            PDF to PDF converter
          </Link>
          {" — "}merge or rotate PDFs
        </li>
      </ul>
    </div>
  )
}
