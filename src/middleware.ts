import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { findLegacyRedirect } from "./lib/legacy-redirects";

const intl = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  // Legacy URLs first: on Netlify this edge middleware runs before next.config redirects,
  // so without this next-intl would prefix them with a locale (/oferta → /pl/oferta → 404).
  const target = findLegacyRedirect(req.nextUrl.pathname);
  if (target) {
    const url = req.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url, 308);
  }
  return intl(req);
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
