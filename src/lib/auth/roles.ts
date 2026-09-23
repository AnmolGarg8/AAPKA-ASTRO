/**
 * Role-Based Access Control (RBAC) Definitions & Primitives
 *
 * Aapka Astro operates on a three-tier role taxonomy:
 * 1. CLIENT: Standard registered seeker/user (read public tools, consult, pay, wallet, account).
 * 2. ASTROLOGER: Verified practitioner/operator (cockpit, presence, live queue, customer intake, chart calculation).
 * 3. ADMIN: Platform owner/administrator (full system controls, pricing management, analytics intelligence).
 */

export type UserRole = "CLIENT" | "ASTROLOGER" | "ADMIN";

/**
 * Returns true if the given role qualifies for astrologer/operator privilege.
 * Admin possesses a strict superset of Astrologer privileges.
 */
export function isAstrologerRole(role: string | null | undefined): boolean {
  if (!role) return false;
  const normalized = role.toUpperCase();
  return normalized === "ASTROLOGER" || normalized === "ADMIN";
}

/**
 * Returns true if the given role possesses full platform administrative privilege.
 */
export function isAdminRole(role: string | null | undefined): boolean {
  if (!role) return false;
  return role.toUpperCase() === "ADMIN";
}

import { isOwnerEmail } from "./staffPermissions";

export type RouteAccessResult =
  | { allowed: true }
  | { allowed: false; redirectUrl: string; reason: string; statusCode?: number };

/**
 * Pure evaluation function for route-level RBAC.
 * Used identically in Middleware, Server Layouts, and Automated Test Suites.
 */
export function evaluateRouteAccess(
  pathname: string,
  role: UserRole | null,
  isAuthenticated: boolean,
  permissions?: string[],
  email?: string | null
): RouteAccessResult {
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAdminRoute = pathname.startsWith("/admin");
  const isAstrologerRoute = pathname.startsWith("/astrologer");
  const isAccountRoute = pathname.startsWith("/account");

  // Non-restricted public routes
  if (!isDashboardRoute && !isAdminRoute && !isAstrologerRoute && !isAccountRoute) {
    return { allowed: true };
  }

  // Account requires authentication
  if (isAccountRoute) {
    if (!isAuthenticated) {
      return {
        allowed: false,
        redirectUrl: `/login?redirect_url=${encodeURIComponent(pathname)}`,
        reason: "Authentication required to access account",
      };
    }
    return { allowed: true };
  }

  const isOwner = isOwnerEmail(email);
  const perms = permissions || [];
  const hasAnyStaffPerm = perms.length > 0;

  // Staff management console: strictly requires Owner
  if (pathname.startsWith("/admin/staff")) {
    if (!isAuthenticated) {
      return {
        allowed: false,
        redirectUrl: `/login?redirect_url=${encodeURIComponent(pathname)}`,
        reason: "Authentication required to access staff management",
      };
    }
    if (!isOwner && !(isAdminRole(role) && (!email || isOwnerEmail(email)))) {
      return {
        allowed: false,
        redirectUrl:
          isAstrologerRole(role) || hasAnyStaffPerm
            ? "/dashboard"
            : "/account",
        reason: "Owner privilege strictly required for staff management",
      };
    }
    return { allowed: true };
  }

  // Pricing console: requires ADMIN, Owner, or 'pricing' staff permission
  if (pathname.startsWith("/admin/pricing")) {
    if (!isAuthenticated) {
      return {
        allowed: false,
        redirectUrl: `/login?redirect_url=${encodeURIComponent(pathname)}`,
        reason: "Authentication required to access pricing configuration",
      };
    }
    if (isOwner || isAdminRole(role) || perms.includes("pricing")) {
      return { allowed: true };
    }
    return {
      allowed: false,
      redirectUrl:
        isAstrologerRole(role) || hasAnyStaffPerm
          ? "/dashboard"
          : "/account",
      reason: "Pricing permission required",
    };
  }

  // Analytics console: requires ADMIN, Owner, or 'analytics' staff permission
  if (pathname.startsWith("/admin/analytics")) {
    if (!isAuthenticated) {
      return {
        allowed: false,
        redirectUrl: `/login?redirect_url=${encodeURIComponent(pathname)}`,
        reason: "Authentication required to access platform intelligence",
      };
    }
    if (isOwner || isAdminRole(role) || perms.includes("analytics")) {
      return { allowed: true };
    }
    return {
      allowed: false,
      redirectUrl:
        isAstrologerRole(role) || hasAnyStaffPerm
          ? "/dashboard"
          : "/account",
      reason: "Analytics permission required",
    };
  }

  // General Admin routes: strictly requires ADMIN or Owner
  if (isAdminRoute) {
    if (!isAuthenticated) {
      return {
        allowed: false,
        redirectUrl: `/login?redirect_url=${encodeURIComponent(pathname)}`,
        reason: "Authentication required to access admin intelligence",
      };
    }
    if (!isAdminRole(role) && !isOwner) {
      return {
        allowed: false,
        redirectUrl:
          isAstrologerRole(role) || hasAnyStaffPerm
            ? "/dashboard"
            : "/account",
        reason: "Strict ADMIN role required for admin dashboard",
      };
    }
    return { allowed: true };
  }

  // Operator Cockpit & Dashboard routes (/dashboard and /astrologer)
  if (isDashboardRoute || isAstrologerRoute) {
    if (!isAuthenticated) {
      return {
        allowed: false,
        redirectUrl: `/login?redirect_url=${encodeURIComponent(pathname)}`,
        reason: "Authentication required to access operator cockpit",
      };
    }

    const isAstrologerOrAdmin = isAstrologerRole(role) || isOwner;

    // A client with no staff permissions must be denied
    if (!isAstrologerOrAdmin && !hasAnyStaffPerm) {
      return {
        allowed: false,
        redirectUrl: "/account",
        reason: "Client role denied access to operator cockpit",
      };
    }

    // If accessing specific dashboard subroute, verify specific section if user has restricted permissions
    if (hasAnyStaffPerm && !isOwner && role !== "ADMIN") {
      if (pathname.startsWith("/dashboard/blog") && !perms.includes("blog")) {
        return {
          allowed: false,
          redirectUrl: "/dashboard",
          reason: "Staff member lacks blog permission",
        };
      }
      if (pathname.startsWith("/dashboard/reels") && !perms.includes("reels")) {
        return {
          allowed: false,
          redirectUrl: "/dashboard",
          reason: "Staff member lacks reels permission",
        };
      }
      if (pathname.startsWith("/dashboard/clients") && !perms.includes("clients")) {
        return {
          allowed: false,
          redirectUrl: "/dashboard",
          reason: "Staff member lacks clients permission",
        };
      }
      if (pathname.startsWith("/dashboard/earnings") && !perms.includes("earnings")) {
        return {
          allowed: false,
          redirectUrl: "/dashboard",
          reason: "Staff member lacks earnings permission",
        };
      }
      if (
        pathname.startsWith("/dashboard/session") &&
        !perms.includes("consultations") &&
        !isAstrologerRole(role)
      ) {
        return {
          allowed: false,
          redirectUrl: "/dashboard",
          reason: "Staff member lacks consultation permission",
        };
      }
    }

    return { allowed: true };
  }

  return { allowed: true };
}
