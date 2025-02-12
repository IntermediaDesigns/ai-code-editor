// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('a_session_')

  // Protect /editor routes
  if (!authCookie && request.nextUrl.pathname.startsWith('/editor')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect authenticated users away from auth pages
  if (authCookie && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/editor', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/editor/:path*', '/login', '/register']
}