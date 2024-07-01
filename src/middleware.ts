import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from './lib/auth';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('jwt_auth_token')?.value;

    const verifiedToken = token && await verifyAuth(token).catch(err => {
        console.log(err);
    });

    const { pathname, origin } = req.nextUrl;

    if (!verifiedToken) {
        // Redirect to login if not authenticated
        if (!pathname.startsWith('/login')) {
            return NextResponse.redirect(`${origin}/login`);
        }
    } else {
        // Redirect to dashboard if authenticated and trying to access login
        if (pathname.startsWith('/login')) {
            return NextResponse.redirect(`${origin}/dashboard`);
        }
    }

    // Allow the request to proceed if no redirects are needed
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile', '/settings', '/login'],
};
