import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

import { AUTH_TOKEN_KEY, JWT_TOKEN } from "./constants"
import { baseURL } from "./utils/api/http"

export async function middleware(req: NextRequest) {
  const userToken = req.cookies.get(AUTH_TOKEN_KEY as string)?.value
  const data = await fetch(`${baseURL}/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }).then((res) => res.json())
  const isAdmin = data?.role === "admin"

  const host = req.nextUrl.protocol + req.headers.get("host")
  // console.log("host", host);

  // user login control
  if (userToken && isAdmin && req.nextUrl.pathname === "/signin") {
    return NextResponse.redirect(new URL(`${host}/admin`))
  }
  if (userToken && isAdmin && req.nextUrl.pathname === "/signup") {
    return NextResponse.redirect(new URL(`${host}/`))
  }

  if (userToken && !isAdmin && req.nextUrl.pathname === "/admin") {
    return NextResponse.redirect(new URL(`${host}/seller`))
  }

  if (userToken && isAdmin && req.nextUrl.pathname === "/seller") {
    return NextResponse.redirect(new URL(`${host}/admin`))
  }

  if (userToken && req.nextUrl.pathname === "/super-login") {
    return NextResponse.redirect(new URL(`${host}/`))
  }
  // Add a closing bracket here
  if (!userToken && req.nextUrl.pathname.includes("/admin" || "/seller")) {
    return NextResponse.redirect(new URL(`${host}/signin`))
  }

  if (!userToken && req.nextUrl.pathname.includes("/shop")) {
    return NextResponse.redirect(new URL(`${host}/signin`))
  }

  
}

export const config = {
  matcher: [
    "/:path*",
    "/admin/:path*",
    "/signin/:path*",
    "/signup/:path*",
    "/seller/:path*",
  ], // Add "/profile" path here
}
