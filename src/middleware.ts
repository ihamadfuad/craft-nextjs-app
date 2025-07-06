import { NextRequest, NextResponse } from "next/server";

// 1. Specify protected and public routes
const protectedRoutes = ["/console"];
const publicRoutes = ["/login", "/signup", "/"];
const PUBLIC_FILE = /\.(.*)$/;

export default async function middleware(req: NextRequest) {
  console.log("🔍 Middleware is running...");
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const token = req.cookies.get("token")?.value

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/authentication/login", req.nextUrl));
  }

  // 5. Redirect to /console if the user is authenticated
  if (
    isPublicRoute &&
    token &&
    !req.nextUrl.pathname.startsWith("/console")
  ) {
    return NextResponse.redirect(new URL("/console", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };

export const config = {
  matcher: ["/:path*"],
};