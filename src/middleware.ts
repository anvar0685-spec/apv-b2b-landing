import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

/** За nginx на 127.0.0.1:3000 Host внутри Next — localhost; без правки next-intl отдаёт Location на localhost. */
function withPublicOrigin(request: NextRequest): NextRequest {
  const xfHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  if (!xfHost) return request;

  const xfProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const xfPort = request.headers.get("x-forwarded-port")?.split(",")[0]?.trim();
  const proto = xfProto === "https" ? "https:" : "http:";
  const hostHasPort = /:\d+$/.test(xfHost) || /\]:\d+$/.test(xfHost);
  const hostHeader =
    !hostHasPort && xfPort && xfPort !== "80" && xfPort !== "443"
      ? `${xfHost}:${xfPort}`
      : xfHost;

  try {
    const path = `${request.nextUrl.pathname}${request.nextUrl.search}`;
    const url = new URL(path, `${proto}//${hostHeader}`);
    return new NextRequest(url, request);
  } catch {
    return request;
  }
}

export default function middleware(request: NextRequest) {
  const req = withPublicOrigin(request);
  const { pathname } = req.nextUrl;
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = req.nextUrl.clone();
    const stripped = pathname.replace(/^\/en(\/?|$)/, "/");
    url.pathname = stripped.length > 1 ? stripped : "/";
    return NextResponse.redirect(url, 308);
  }

  const response = intl(req);
  const slug = process.env.DEFAULT_TENANT_SLUG ?? "default";
  response.headers.set("x-tenant-slug", slug);
  return response;
}

export const config = {
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
