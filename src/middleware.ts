import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
   const { pathname, origin } = req.nextUrl;
   const token = req.cookies.get("auth-token")?.value;

   if (pathname.startsWith("/login") || pathname.startsWith("/admin-login")) {
      if (token) {
         return NextResponse.redirect(`${origin}/dashboard`);
      }
      return NextResponse.next();
   }

   if (!token) {
      const loginUrl = pathname.startsWith("/admin")
         ? new URL("/admin-login", origin)
         : new URL("/login", origin);

      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
   }

   return NextResponse.next();
}

export const config = {
   matcher: [
      "/dashboard/:path*",
      "/profile",
      "/settings",
      "/checkout",
      "/login",
      "/admin/:path*",
   ],
};
