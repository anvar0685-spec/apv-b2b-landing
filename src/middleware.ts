import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intl(request);
  const slug = process.env.DEFAULT_TENANT_SLUG ?? "default";
  response.headers.set("x-tenant-slug", slug);
  return response;
}

export const config = {
  // Явно включаем `/`: иначе на части окружений middleware не вызывается для корня,
  // next-intl не получает локаль → notFound() вместо главной.
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
