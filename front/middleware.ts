import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const skipPaths = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access-token");
  const client = request.cookies.get("client");
  const uid = request.cookies.get("uid");
  const response = NextResponse.next();
  const requestPath = request.nextUrl.pathname;

  if (accessToken && client && uid) return response;
  if (skipPaths.includes(requestPath)) return response;

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
