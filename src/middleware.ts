import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(req: NextRequest) {
   const { pathname, origin } = req.nextUrl;
   const token = req.cookies.get("jwt_auth_token")?.value;

   let verifiedToken = null;
   if (token) {
      try {
         verifiedToken = await verifyAuth(token);
      } catch (err) {
         console.log("Token verification failed:", err);
      }
   }

   if (pathname.startsWith("/login") || pathname.startsWith("/admin-login")) {
      if (verifiedToken) {
         return NextResponse.redirect(`${origin}/dashboard`);
      }
      return NextResponse.next();
   }

   if (!verifiedToken) {
      const loginUrl = pathname.startsWith("/admin")
         ? new URL("/admin-login", origin)
         : new URL("/login", origin);

      loginUrl.searchParams.set("redirect", pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("jwt_auth_token");
      return response;
   }

   if (verifiedToken && pathname.startsWith("/login")) {
      return NextResponse.redirect(`${origin}/dashboard`);
   }

   if (pathname.startsWith("/admin")) {
      if (!verifiedToken || verifiedToken.role !== "admin") {
         return NextResponse.redirect(`${origin}/admin-login`);
      }
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
