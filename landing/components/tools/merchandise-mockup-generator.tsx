"use client"

import { useMemo, useRef, useState } from "react"
import { Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, selectClassName } from "@/components/tools/calc-ui"

type ProductType = "tshirt" | "hoodie" | "mug" | "tote"

const PRODUCTS: { id: ProductType; label: string }[] = [
  { id: "tshirt", label: "T-shirt" },
  { id: "hoodie", label: "Hoodie" },
  { id: "mug", label: "Mug" },
  { id: "tote", label: "Tote bag" },
]

export function MerchandiseMockupGenerator() {
  const [product, setProduct] = useState<ProductType>("tshirt")
  const [brandName, setBrandName] = useState("Woodo")
  const [tagline, setTagline] = useState("Wear the brand")
  const [garmentColor, setGarmentColor] = useState("#1a1a1a")
  const [printColor, setPrintColor] = useState("#f5f5f0")
  const svgRef = useRef<SVGSVGElement>(null)

  const initials = useMemo(() => {
    const parts = brandName.trim().split(/\s+/).filter(Boolean)
    if (parts.length === 0) return "W"
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }, [brandName])

  const downloadSvg = () => {
    const svg = svgRef.current
    if (!svg) return
    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${brandName.trim().toLowerCase().replace(/\s+/g, "-") || "merch"}-mockup.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="mm-product" label="Product type">
          <select
            id="mm-product"
            className={selectClassName}
            value={product}
            onChange={(e) => setProduct(e.target.value as ProductType)}
          >
            {PRODUCTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="mm-brand" label="Brand / design text">
          <Input id="mm-brand" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
        </Field>
        <Field id="mm-tagline" label="Tagline" className="sm:col-span-2">
          <Input id="mm-tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} />
        </Field>
        <Field id="mm-garment" label="Product color">
          <Input id="mm-garment" type="color" value={garmentColor} onChange={(e) => setGarmentColor(e.target.value)} className="h-10 cursor-pointer p-1" />
        </Field>
        <Field id="mm-print" label="Print color">
          <Input id="mm-print" type="color" value={printColor} onChange={(e) => setPrintColor(e.target.value)} className="h-10 cursor-pointer p-1" />
        </Field>
      </form>

      <div className="overflow-hidden rounded-2xl border border-border bg-secondary/30 p-6 sm:p-8">
        <div className="mx-auto flex max-w-md justify-center">
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 360"
            width="100%"
            className="max-w-[320px]"
            role="img"
            aria-label={`${brandName} ${product} mockup`}
          >
            <rect width="320" height="360" fill="#ecece8" />
            {product === "tshirt" || product === "hoodie" ? (
              <>
                <path
                  d={
                    product === "hoodie"
                      ? "M70 90 L110 70 L140 95 L180 95 L210 70 L250 90 L270 150 L240 160 L235 300 L85 300 L80 160 L50 150 Z"
                      : "M70 85 L115 70 L140 100 L180 100 L205 70 L250 85 L270 145 L235 155 L230 300 L90 300 L85 155 L50 145 Z"
                  }
                  fill={garmentColor}
                />
                {product === "hoodie" ? (
                  <path d="M140 95 Q160 125 180 95" fill="none" stroke={printColor} strokeWidth="3" opacity="0.5" />
                ) : null}
                <text
                  x="160"
                  y="175"
                  textAnchor="middle"
                  fill={printColor}
                  fontFamily="Georgia, serif"
                  fontSize="28"
                  fontWeight="700"
                >
                  {brandName.slice(0, 18) || "Brand"}
                </text>
                <text
                  x="160"
                  y="205"
                  textAnchor="middle"
                  fill={printColor}
                  fontFamily="system-ui, sans-serif"
                  fontSize="12"
                  opacity="0.85"
                >
                  {tagline.slice(0, 32)}
                </text>
              </>
            ) : null}
            {product === "mug" ? (
              <>
                <rect x="90" y="90" width="120" height="160" rx="16" fill={garmentColor} />
                <path d="M210 130 Q250 150 250 180 Q250 210 210 230" fill="none" stroke={garmentColor} strokeWidth="16" />
                <text
                  x="150"
                  y="165"
                  textAnchor="middle"
                  fill={printColor}
                  fontFamily="Georgia, serif"
                  fontSize="22"
                  fontWeight="700"
                >
                  {initials}
                </text>
                <text
                  x="150"
                  y="195"
                  textAnchor="middle"
                  fill={printColor}
                  fontFamily="system-ui, sans-serif"
                  fontSize="11"
                >
                  {brandName.slice(0, 14)}
                </text>
              </>
            ) : null}
            {product === "tote" ? (
              <>
                <path d="M95 120 L225 120 L240 300 L80 300 Z" fill={garmentColor} />
                <path d="M120 120 Q120 70 160 70 Q200 70 200 120" fill="none" stroke={garmentColor} strokeWidth="10" />
                <text
                  x="160"
                  y="200"
                  textAnchor="middle"
                  fill={printColor}
                  fontFamily="Georgia, serif"
                  fontSize="24"
                  fontWeight="700"
                >
                  {brandName.slice(0, 14) || "Brand"}
                </text>
                <text
                  x="160"
                  y="228"
                  textAnchor="middle"
                  fill={printColor}
                  fontFamily="system-ui, sans-serif"
                  fontSize="11"
                  opacity="0.9"
                >
                  {tagline.slice(0, 28)}
                </text>
              </>
            ) : null}
          </svg>
        </div>
        <div className="mt-6 flex justify-center">
          <Button type="button" onClick={downloadSvg} className="rounded-full bg-ink text-ink-foreground hover:bg-ink/90">
            <Download className="size-4" />
            Download SVG mockup
          </Button>
        </div>
      </div>
    </div>
  )
}
