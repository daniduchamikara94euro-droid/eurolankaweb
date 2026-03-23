import { NextResponse } from 'next/server';

// The custom domain that should show the under construction page
const PRODUCTION_DOMAIN = 'eurolankaweb.com';

export function middleware(request) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // If the request is coming from your custom domain (not vercel.app or localhost)
  const isCustomDomain =
    hostname === PRODUCTION_DOMAIN || hostname === `www.${PRODUCTION_DOMAIN}`;

  if (isCustomDomain) {
    // Allow the coming-soon page itself to load (avoid redirect loop)
    if (pathname.startsWith('/coming-soon')) {
      return NextResponse.next();
    }

    // Redirect everything else to /coming-soon
    return NextResponse.redirect(new URL('/coming-soon', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run middleware on all routes except static files and API
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
