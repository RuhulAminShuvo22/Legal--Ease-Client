import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    const pathname = request.nextUrl.pathname;

    // Logged-in users can't visit login/register

    if (session && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Protected routes

    const protectedRoutes = ["/dashboard", "/lawyers"];

    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route),
    );

    // Not logged in

    if (!session && isProtected) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Skip role check if user not logged in
    if (!session) {
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Proxy Error:", error);

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/login",
    "/register",

    "/dashboard/:path*",

    "/lawyers",
    "/lawyers/:path*",
  ],
};
