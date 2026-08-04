"use client"

import { useState } from "react"
import { PDFDocument } from "pdf-lib"
import { Button } from "@/components/ui/button"
import { Field, selectClassName } from "@/components/tools/calc-ui"
import { downloadBytes } from "@/lib/pdf/download"

async function fileToImageBytes(file: File): Promise<{ bytes: Uint8Array; type: "png" | "jpg" }> {
  const buf = new Uint8Array(await file.arrayBuffer())
  const lower = file.name.toLowerCase()
  if (lower.endsWith(".png") || file.type === "image/png") {
    return { bytes: buf, type: "png" }
  }
  return { bytes: buf, type: "jpg" }
}

export function ImagesToPdfConverter() {
  const [files, setFiles] = useState<File[]>([])
  const [pageSize, setPageSize] = useState<"fit" | "a4" | "letter">("fit")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function convert() {
    if (!files.length) {
      setError("Choose one or more images first.")
      return
    }
    setBusy(true)
    setError(null)
    try {
      const pdf = await PDFDocument.create()
      for (const file of files) {
        const { bytes, type } = await fileToImageBytes(file)
        const image =
          type === "png" ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes)
        let width = image.width
        let height = image.height
        if (pageSize === "a4") {
          width = 595.28
          height = 841.89
        } else if (pageSize === "letter") {
          width = 612
          height = 792
        }
        const page = pdf.addPage([width, height])
        const scale = Math.min(width / image.width, height / image.height)
        const w = image.width * scale
        const h = image.height * scale
        page.drawImage(image, {
          x: (width - w) / 2,
          y: (height - h) / 2,
          width: w,
          height: h,
        })
      }
      const out = await pdf.save()
      downloadBytes(out, "images.pdf", "application/pdf")
    } catch {
      setError("Could not convert those images. Use JPG or PNG files.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-8">
      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <Field id="img-pdf-files" label="Images (JPG or PNG)" hint="Order is preserved — first image becomes page 1.">
          <input
            id="img-pdf-files"
            type="file"
            accept="image/jpeg,image/png,.jpg,.jpeg,.png"
            multiple
            className="block w-full text-sm text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-semibold"
            onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          />
        </Field>
        <Field id="img-pdf-size" label="Page size">
          <select id="img-pdf-size" className={selectClassName} value={pageSize} onChange={(e) => setPageSize(e.target.value as typeof pageSize)}>
            <option value="fit">Fit each image</option>
            <option value="a4">A4</option>
            <option value="letter">US Letter</option>
          </select>
        </Field>
      </form>
      {files.length ? (
        <p className="text-sm text-muted-foreground">{files.length} image{files.length === 1 ? "" : "s"} selected</p>
      ) : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="button" disabled={busy || !files.length} onClick={() => void convert()}>
        {busy ? "Converting…" : "Convert to PDF"}
      </Button>
    </div>
  )
}
