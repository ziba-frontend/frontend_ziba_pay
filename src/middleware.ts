import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { verifyAuth } from './lib/auth';

export async function middleware(req: NextRequest) {
    const { pathname, origin } = req.nextUrl;

    
    // Check if API_BASE_URL is set
    // if (!process.env.API_BASE_URL) {
    //     console.error('API_BASE_URL is not defined in the environment variables.');
    //     return NextResponse.redirect(`${origin}/server-down`);
    // }

    // try {
    //     // Check API health
    //     const healthResponse = await axios.get(`${process.env.API_BASE_URL}/health`);
    //     if (healthResponse.status !== 200) {
    //         throw new Error('Server health check failed with status: ' + healthResponse.status);
    //     }
    // } catch (error) {
    //     console.error('API health check failed:', error);

    //     // Redirect to a custom error page or show a specific error message
    //     return NextResponse.redirect(`${origin}/server-down`);
    // }

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
            return NextResponse.redirect(`${origin}/login`);
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
