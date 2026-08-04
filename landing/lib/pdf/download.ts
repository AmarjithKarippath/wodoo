export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function downloadBytes(bytes: Uint8Array, filename: string, type: string) {
  const copy = new Uint8Array(bytes.byteLength)
  copy.set(bytes)
  downloadBlob(new Blob([copy], { type }), filename)
}
