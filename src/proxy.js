import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    const pathname = request.nextUrl.pathname;

    // Logged-in users cannot access login/register

    if (
      session &&
      (pathname === "/login" ||
        pathname === "/register")
    ) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    // Protected Routes

    const protectedRoutes = [
      "/dashboard",
      "/lawyers",
    ];

    const isProtected =
      protectedRoutes.some((route) =>
        pathname.startsWith(route)
      );

    // Not Logged In

    if (!session && isProtected) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    // If not logged in and route is public

    if (!session) {
      return NextResponse.next();
    }

    // Role Protection

    const role =
      session?.user?.role ||
      session?.data?.user?.role;

    // Client Dashboard

    if (
      pathname.startsWith(
        "/dashboard/client"
      ) &&
      role !== "client"
    ) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    // Lawyer Dashboard

    if (
      pathname.startsWith(
        "/dashboard/lawyer"
      ) &&
      role !== "lawyer"
    ) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    // Admin Dashboard

    if (
      pathname.startsWith(
        "/dashboard/admin"
      ) &&
      role !== "admin"
    ) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error(
      "Proxy Error:",
      error
    );

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