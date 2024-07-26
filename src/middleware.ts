import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from './lib/auth';

export async function middleware(req: NextRequest) {
    const { pathname, origin } = req.nextUrl;
    const token = req.cookies.get('jwt_auth_token')?.value;

    let verifiedToken;
    if (token) {
        try {
            verifiedToken = await verifyAuth(token);
        } catch (err) {
            console.log('Token verification failed:', err);
        }
    }

    if (!verifiedToken) {
        if (!pathname.startsWith('/login')) {
            // Save the original destination to redirect after login
            const loginUrl = new URL('/login', origin);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    } else {
        if (pathname.startsWith('/login')) {
            return NextResponse.redirect(`${origin}/dashboard`);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile', '/settings', '/login', '/checkout'],
};
