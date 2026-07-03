import { NextResponse, NextRequest } from 'next/server';
import { BillingRouter } from 'billing-router';

const sdk = new BillingRouter();

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Bypass check for static assets, Next.js internal routes, API routes, and the suspended page itself
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname === '/suspended'
  ) {
    return NextResponse.next();
  }

  // 2. Extract domain/host from request headers
  const hostHeader = request.headers.get('host') || '';
  const domain = hostHeader.split(':')[0].toLowerCase().trim();

  if (!domain) {
    return NextResponse.next();
  }

  try {
    // 3. Check suspension status via SDK (which dynamically suspends expired domains)
    const isSuspended = await sdk.isDomainSuspended(domain);

    if (isSuspended) {
      console.warn(`[Hosting Suspension] Access denied for domain: ${domain}`);
      // Redirect to /suspended and pass the domain as a query parameter
      const suspendedUrl = new URL('/suspended', request.url);
      suspendedUrl.searchParams.set('domain', domain);
      return NextResponse.redirect(suspendedUrl);
    }
  } catch (error) {
    // Fail-open: if there is an error communicating with Cloudflare KV,
    // log the error but let the visitor access the site to avoid complete downtime.
    console.error(`[Hosting Suspension] Error checking status for ${domain}:`, error);
  }

  return NextResponse.next();
}

// Configure middleware to match all routes
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
