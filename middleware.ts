import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "alcm_session";

function getSecret() {
  const secret =
    process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 32
      ? process.env.SESSION_SECRET
      : "alcm-super-secure-jwt-secret-fallback-key-32-bytes";

  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  let session: { userId: string; role: string } | null = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, getSecret());
      if (
        typeof payload.userId === "string" &&
        ["student", "teacher", "admin"].includes(String(payload.role))
      ) {
        session = {
          userId: payload.userId,
          role: String(payload.role),
        };
      }
    } catch {
      // Invalid/expired token
      session = null;
    }
  }

  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/register");

  // If logged in and trying to access login/signup, redirect to their role dashboard
  if (isAuthRoute && session) {
    const dashboardUrl =
      session.role === "admin"
        ? "/admin/dashboard"
        : session.role === "teacher"
        ? "/teacher/dashboard"
        : "/student/dashboard";

    return NextResponse.redirect(new URL(dashboardUrl, request.url));
  }

  // Student portal access (allowed: student, admin)
  if (pathname.startsWith("/student")) {
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (session.role !== "student" && session.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Teacher portal access (allowed: teacher, admin)
  if (pathname.startsWith("/teacher/dashboard") || pathname.startsWith("/teacher/portal")) {
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (session.role !== "teacher" && session.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Admin portal access (allowed: only admin)
  if (pathname.startsWith("/admin")) {
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (session.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/teacher/dashboard/:path*",
    "/teacher/portal/:path*",
    "/student/:path*",
    "/login",
    "/signup",
    "/register",
  ],
};
