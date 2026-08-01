"use client"

import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, selectClassName } from "@/components/tools/calc-ui"

export function QrCodeGenerator() {
  const [text, setText] = useState("https://www.wodoo.store")
  const [size, setSize] = useState("280")
  const [fg, setFg] = useState("#111111")
  const [bg, setBg] = useState("#ffffff")
  const [dataUrl, setDataUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function render() {
      const value = text.trim()
      if (!value) {
        setDataUrl(null)
        setError(null)
        return
      }

      try {
        const url = await QRCode.toDataURL(value, {
          width: Number(size) || 280,
          margin: 2,
          color: { dark: fg, light: bg },
          errorCorrectionLevel: "M",
        })
        if (!cancelled) {
          setDataUrl(url)
          setError(null)
        }
      } catch {
        if (!cancelled) {
          setDataUrl(null)
          setError("Could not generate that QR code. Shorten the text and try again.")
        }
      }
    }

    void render()
    return () => {
      cancelled = true
    }
  }, [text, size, fg, bg])

  const download = () => {
    if (!dataUrl) return
    const a = document.createElement("a")
    a.href = dataUrl
    a.download = "qr-code.png"
    a.click()
  }

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="qr-text" label="URL or text" className="sm:col-span-2">
          <Input
            id="qr-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://yoursite.com/product"
          />
        </Field>
        <Field id="qr-size" label="Size (px)">
          <select
            id="qr-size"
            className={selectClassName}
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="200">200</option>
            <option value="280">280</option>
            <option value="400">400</option>
            <option value="600">600</option>
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field id="qr-fg" label="Foreground">
            <Input
              id="qr-fg"
              type="color"
              value={fg}
              onChange={(e) => setFg(e.target.value)}
              className="h-10 cursor-pointer p-1"
            />
          </Field>
          <Field id="qr-bg" label="Background">
            <Input
              id="qr-bg"
              type="color"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className="h-10 cursor-pointer p-1"
            />
          </Field>
        </div>
      </form>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      {dataUrl ? (
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-secondary/30 p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dataUrl}
            alt="Generated QR code"
            width={Number(size) || 280}
            height={Number(size) || 280}
            className="rounded-lg border border-border bg-white"
          />
          <Button
            type="button"
            onClick={download}
            className="rounded-full bg-ink text-ink-foreground hover:bg-ink/90"
          >
            <Download className="size-4" />
            Download PNG
          </Button>
        </div>
      ) : null}
    </div>
  )
}
