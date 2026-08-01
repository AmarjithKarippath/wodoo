export type PostcodeCountry = {
  code: string
  label: string
  placeholder: string
}

/** Countries commonly supported by Zippopotam.us */
export const POSTCODE_COUNTRIES: PostcodeCountry[] = [
  { code: "us", label: "United States", placeholder: "90210" },
  { code: "gb", label: "United Kingdom", placeholder: "SW1A 1AA" },
  { code: "ca", label: "Canada", placeholder: "K1A 0B1" },
  { code: "au", label: "Australia", placeholder: "2000" },
  { code: "de", label: "Germany", placeholder: "10115" },
  { code: "fr", label: "France", placeholder: "75001" },
  { code: "in", label: "India", placeholder: "110001" },
  { code: "it", label: "Italy", placeholder: "00118" },
  { code: "es", label: "Spain", placeholder: "28001" },
  { code: "nl", label: "Netherlands", placeholder: "1011" },
  { code: "br", label: "Brazil", placeholder: "01001-000" },
  { code: "mx", label: "Mexico", placeholder: "01000" },
  { code: "jp", label: "Japan", placeholder: "100-0001" },
  { code: "nz", label: "New Zealand", placeholder: "6011" },
  { code: "za", label: "South Africa", placeholder: "8001" },
  { code: "sg", label: "Singapore", placeholder: "018956" },
  { code: "ie", label: "Ireland", placeholder: "D02" },
  { code: "ch", label: "Switzerland", placeholder: "8001" },
  { code: "at", label: "Austria", placeholder: "1010" },
  { code: "be", label: "Belgium", placeholder: "1000" },
  { code: "pl", label: "Poland", placeholder: "00-001" },
  { code: "pt", label: "Portugal", placeholder: "1000-001" },
  { code: "se", label: "Sweden", placeholder: "111 22" },
  { code: "no", label: "Norway", placeholder: "0001" },
  { code: "dk", label: "Denmark", placeholder: "1050" },
  { code: "fi", label: "Finland", placeholder: "00100" },
]

export type PostcodePlace = {
  placeName: string
  state: string
  stateAbbreviation: string
  latitude: string
  longitude: string
}

export type PostcodeLookupResult = {
  postCode: string
  country: string
  countryAbbreviation: string
  places: PostcodePlace[]
}

export function normalizePostcode(value: string, countryCode: string): string {
  const trimmed = value.trim().toUpperCase()
  const code = countryCode.toLowerCase()

  if (code === "gb" || code === "ca" || code === "ie") {
    return trimmed.replace(/\s+/g, "")
  }
  if (code === "br" || code === "jp" || code === "pl" || code === "pt") {
    return trimmed.replace(/\s+/g, "")
  }
  return trimmed.replace(/\s+/g, "")
}

export function mapsUrl(lat: string, lng: string): string {
  return `https://www.openstreetmap.org/?mlat=${encodeURIComponent(lat)}&mlon=${encodeURIComponent(lng)}#map=14/${encodeURIComponent(lat)}/${encodeURIComponent(lng)}`
}
