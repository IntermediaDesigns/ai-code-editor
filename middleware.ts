// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for Appwrite session cookie
  const session = request.cookies.get('a_session_');
  
  if (!session && request.nextUrl.pathname.startsWith('/editor')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/editor', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/editor/:path*', '/login', '/register']
};