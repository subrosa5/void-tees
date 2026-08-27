import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, expectedSessionToken } from "@/lib/admin-auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const expected = await expectedSessionToken();
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const authenticated = Boolean(expected) && token === expected;

  if (!authenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
