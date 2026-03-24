import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/login']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    // Si déjà connecté et qu'on va sur /login → redirect vers /service
    if (token) {
      return NextResponse.redirect(new URL('/service', request.url))
    }
    return NextResponse.next()
  }

  // Route protégée sans token → redirect /login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/service/:path*',
    '/services/:path*',
    '/dashboard/:path*',
    '/postes/:path*',
    '/staff/:path*',
    '/tutoriels/:path*',
    '/reglages/:path*',
    '/login',
  ],
}
