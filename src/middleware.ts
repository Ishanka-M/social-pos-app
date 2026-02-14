import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || 'secret-key-change-me' });
    const { pathname } = req.nextUrl;

    // Protect all routes except login and api/auth
    if (pathname.startsWith('/api/auth') || pathname === '/login') {
        return NextResponse.next();
    }

    if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    // Admin protection
    if (pathname.startsWith('/admin') && token.role !== 'admin') {
        const url = req.nextUrl.clone();
        url.pathname = '/'; // Redirect non-admins to home
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
