import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "fr"];
const defaultLocale = "en";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  req.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(req.nextUrl);
}

export const config = {
  matcher: "/((?!api|_next|.*\\..*).*)",
};
