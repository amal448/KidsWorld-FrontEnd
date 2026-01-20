import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken'); 
  const { pathname } = req.nextUrl;

  // If trying to access checkout/dashboard without a cookie
  if ((pathname.startsWith('/checkout') || pathname.startsWith('/dashboard')) && !refreshToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout/:path*', '/dashboard/:path*'],
};