// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('sessionId');
  
  // Paths that require authentication
  const authRequired = [
    '/editor',
  ];

  // Paths that should redirect to /editor if user is authenticated
  const authRedirect = [
    '/login',
    '/register',
  ];

  const path = request.nextUrl.pathname;

  // Redirect authenticated users away from auth pages
  if (currentUser && authRedirect.includes(path)) {
    return NextResponse.redirect(new URL('/editor', request.url));
  }

  // Redirect unauthenticated users to login
  if (!currentUser && authRequired.includes(path)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/editor/:path*',
    '/login',
    '/register',
  ],
};