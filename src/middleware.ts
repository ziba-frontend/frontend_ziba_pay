import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(req: NextRequest) {
   const { pathname, origin } = req.nextUrl;
   const token = req.cookies.get("auth-token")?.value;

   let verifiedToken = null;
   if (token) {
      try {
         verifiedToken = await verifyAuth(token);
      } catch (err) {
         console.log("Token verification failed:", err);
      }
   }

   // Redirect authenticated users away from login pages
   if (pathname.startsWith("/login") || pathname.startsWith("/admin-login")) {
      if (verifiedToken) {
         return NextResponse.redirect(`${origin}/dashboard`);
      }
      return NextResponse.next();
   }

   // Redirect unauthenticated users to the general login page
   if (!verifiedToken) {
      const loginUrl = new URL("/login", origin);
      loginUrl.searchParams.set("redirect", pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("auth-token");
      return response;
   }

   // Redirect admin users to the admin dashboard if accessing non-admin pages
   if (verifiedToken.role === "admin" && !pathname.startsWith("/admin")) {
      return NextResponse.redirect(`${origin}/admin`);
   }

   // Restrict access to admin pages to admin users only
   if (pathname.startsWith("/admin")) {
      if (verifiedToken.role !== "admin") {
         return NextResponse.redirect(`${origin}/dashboard`);
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

































// import { NextRequest, NextResponse } from "next/server";
// import { verifyAuth } from "./lib/auth";

// export async function middleware(req: NextRequest) {
//    const { pathname, origin } = req.nextUrl;
//    const token = req.cookies.get("auth-token")?.value;

//    let verifiedToken = null;
//    if (token) {
//       try {
//          verifiedToken = await verifyAuth(token);
//       } catch (err) {
//          console.log("Token verification failed:", err);
//       }
//    }

//    if (pathname.startsWith("/login") || pathname.startsWith("/admin-login")) {
//       if (verifiedToken) {
//          return NextResponse.redirect(`${origin}/dashboard`);
//       }
//       return NextResponse.next();
//    }

//    if (!verifiedToken) {
//       const loginUrl = pathname.startsWith("/admin")
//          ? new URL("/admin-login", origin)
//          : new URL("/login", origin);

//       loginUrl.searchParams.set("redirect", pathname);
//       const response = NextResponse.redirect(loginUrl);
//       response.cookies.delete("auth-token");
//       return response;
//    }

//    if (verifiedToken && pathname.startsWith("/login")) {
//       return NextResponse.redirect(`${origin}/dashboard`);
//    }

//    if (pathname.startsWith("/admin")) {
//       if (!verifiedToken || verifiedToken.role !== "admin") {
//          return NextResponse.redirect(`${origin}/admin-login`);
//       }
//    }

//    return NextResponse.next();
// }

// export const config = {
//    matcher: [
//       "/dashboard/:path*",
//       "/profile",
//       "/settings",
//       "/checkout",
//       "/login",
//       "/admin/:path*",
//    ],
// };
