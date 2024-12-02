import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const token = req.cookies.get("auth_token")?.value;

  if (pathname.startsWith("/login")) {
    if (token) {
      return NextResponse.redirect(`${origin}/dashboard`);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard") && !token) {
    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/dashboard",       
    "/profile",        
    "/settings",
    "/checkout",
    "/login",            
  ],
};
