import { NextRequest, NextResponse } from "next/server";

// Specify protected and public routes
const authenticatedRoutes = ["/console"];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {

  const path = req.nextUrl.pathname;
  const isProtectedRoute = authenticatedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Get session token from the cookie
  const token = req.cookies.get("token")?.value

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/authentication/login", req.nextUrl));
  }

  // Redirect to /console if the user is authenticated
  if (
    isPublicRoute &&
    token &&
    !req.nextUrl.pathname.startsWith("/console")
  ) {
    return NextResponse.redirect(new URL("/console", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};