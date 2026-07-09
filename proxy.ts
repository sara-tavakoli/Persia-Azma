import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { SESSION_COOKIE_NAME } from "./lib/auth/session";

const handleIntl = createMiddleware(routing);

// Optimistic check only — presence of the cookie, not cryptographic
// verification (that happens server-side in app/admin/layout.tsx, the
// real security boundary; proxy just avoids a round-trip to the login
// redirect for the common case).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();
    const hasSession = request.cookies.has(SESSION_COOKIE_NAME);
    if (!hasSession) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  return handleIntl(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
