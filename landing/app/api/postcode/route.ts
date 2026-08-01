import { NextResponse } from "next/server"
import { normalizePostcode } from "@/lib/postcode"

type ZippopotamPlace = {
  "place name": string
  longitude: string
  state: string
  "state abbreviation": string
  latitude: string
}

type ZippopotamResponse = {
  "post code": string
  country: string
  "country abbreviation": string
  places: ZippopotamPlace[]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const country = (searchParams.get("country") || "").trim().toLowerCase()
  const rawPostcode = (searchParams.get("postcode") || "").trim()

  if (!country || country.length !== 2) {
    return NextResponse.json(
      { error: "Select a valid country." },
      { status: 400 },
    )
  }

  if (!rawPostcode) {
    return NextResponse.json(
      { error: "Enter a ZIP or postcode." },
      { status: 400 },
    )
  }

  const postcode = normalizePostcode(rawPostcode, country)
  if (postcode.length < 2 || postcode.length > 12) {
    return NextResponse.json(
      { error: "That ZIP / postcode looks invalid." },
      { status: 400 },
    )
  }

  try {
    const response = await fetch(
      `https://api.zippopotam.us/${encodeURIComponent(country)}/${encodeURIComponent(postcode)}`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 86400 },
      },
    )

    if (response.status === 404) {
      return NextResponse.json(
        { error: "No address found for that ZIP / postcode." },
        { status: 404 },
      )
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: "Lookup service is unavailable. Try again shortly." },
        { status: 502 },
      )
    }

    const data = (await response.json()) as ZippopotamResponse

    return NextResponse.json({
      postCode: data["post code"],
      country: data.country,
      countryAbbreviation: data["country abbreviation"],
      places: (data.places || []).map((place) => ({
        placeName: place["place name"],
        state: place.state,
        stateAbbreviation: place["state abbreviation"],
        latitude: place.latitude,
        longitude: place.longitude,
      })),
    })
  } catch (error) {
    console.error("Postcode lookup failed:", error)
    return NextResponse.json(
      { error: "Something went wrong looking up that postcode." },
      { status: 500 },
    )
  }
}
