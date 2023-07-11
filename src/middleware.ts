import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'


export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublic = path === '/signup' || path === '/login';

    const hasToken = request.cookies.get('token')?.value || "";

    if (isPublic && hasToken) {
        return NextResponse.redirect(new URL('/', request.nextUrl.origin));
    }

    if (!isPublic && !hasToken) {
        return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
    }
}

export const config = {
    matcher: [
        '/',
        '/signup',
        '/login',
        '/create_trip/:path*',
        '/my_trip/:path*'
    ],
}