import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    const stripped = pathname.replace(/^\/en(\/?|$)/, "/");
    url.pathname = stripped.length > 1 ? stripped : "/";
    return NextResponse.redirect(url, 308);
  }

  const response = intl(request);
  const slug = process.env.DEFAULT_TENANT_SLUG ?? "default";
  response.headers.set("x-tenant-slug", slug);
  return response;
}

export const config = {
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
