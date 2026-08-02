import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getAdminCredentials, isAuthorizedAdmin } from "@/lib/admin-auth"

export function middleware(request: NextRequest) {
  const credentials = getAdminCredentials()
  if (!credentials) {
    return new NextResponse(
      "Admin is not configured. Set ADMIN_USER and ADMIN_PASSWORD.",
      { status: 503 },
    )
  }

  if (!isAuthorizedAdmin(request.headers.get("authorization"))) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Woodo Admin", charset="UTF-8"',
        "Cache-Control": "no-store",
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
