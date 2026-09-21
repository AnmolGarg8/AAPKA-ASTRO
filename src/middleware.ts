import { NextRequest, NextResponse } from "next/server";

interface JWTPayload {
  userId: string;
  phone: string;
  role: "CLIENT" | "ASTROLOGER" | "ADMIN" | "USER";
  exp?: number;
}

/**
 * Server-side JWT decoding & expiration check (Edge runtime compatible)
 */
function parseTokenPayload(token: string): JWTPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonStr = atob(base64);
    const payload: JWTPayload = JSON.parse(jsonStr);

    // Check expiry if exp claim is present
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /account, /dashboard, and /admin routes
  const isAccountRoute = pathname.startsWith("/account");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAdminRoute = pathname.startsWith("/admin");

  if (!isAccountRoute && !isDashboardRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  // 1. Retrieve session token from cookie or Authorization header
  const sessionCookie = req.cookies.get("aapka_astro_session")?.value;
  const authHeader = req.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
  const token = sessionCookie || bearerToken;

  // Development bypass flag for preview testing
  const isDevPreview =
    process.env.NODE_ENV !== "production" &&
    (req.nextUrl.searchParams.get("preview") === "true" ||
      req.cookies.get("aapka_astro_dev_preview")?.value === "true");

  if (isDevPreview) {
    return NextResponse.next();
  }

  // 2. Unauthenticated check
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Parse and validate token claims
  const payload = parseTokenPayload(token);
  if (!payload || !payload.userId) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const userRole = (payload.role || "CLIENT").toUpperCase();

  // 4. Role-based Server-Side Access Control (RBAC)
  // Admin routes: STRICTLY ADMIN
  if (isAdminRoute && userRole !== "ADMIN") {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Astrologer Workbench routes: ASTROLOGER or ADMIN
  if (isDashboardRoute && userRole !== "ASTROLOGER" && userRole !== "ADMIN") {
    const accountUrl = new URL("/account", req.url);
    return NextResponse.redirect(accountUrl);
  }

  // Forward authenticated request with security user headers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user-id", payload.userId);
  requestHeaders.set("x-user-role", userRole);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/account/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
