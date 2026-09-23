/**
 * Role-Based Access Control (RBAC) Definitions & Primitives
 *
 * Aapka Astro operates on a four-tier role taxonomy:
 * 1. CLIENT: Standard registered seeker/user (read public tools, consult, pay, wallet, account).
 * 2. ASTROLOGER: Verified practitioner/operator (cockpit, presence, live queue, customer intake, chart calculation).
 * 3. ADMIN: Platform administrator (operational controls, pricing management, analytics intelligence).
 * 4. OWNER: Platform Owner (the client himself; holds absolute unrestricted access to all sections and staff management).
 */

export type UserRole = "CLIENT" | "ASTROLOGER" | "ADMIN" | "OWNER";

/**
 * Returns true if the given role qualifies for platform Owner status.
 */
export function isOwnerRole(role: string | null | undefined): boolean {
  if (!role) return false;
  return role.trim().toUpperCase() === "OWNER";
}

/**
 * Returns true if the given role possesses full platform administrative privilege.
 * OWNER possesses a strict superset of ADMIN privileges.
 */
export function isAdminRole(role: string | null | undefined): boolean {
  if (!role) return false;
  const normalized = role.trim().toUpperCase();
  return normalized === "ADMIN" || normalized === "OWNER";
}

/**
 * Returns true if the given role qualifies for astrologer/operator privilege.
 * Admin and Owner possess a strict superset of Astrologer privileges.
 */
export function isAstrologerRole(role: string | null | undefined): boolean {
  if (!role) return false;
  const normalized = role.trim().toUpperCase();
  return (
    normalized === "ASTROLOGER" ||
    normalized === "ADMIN" ||
    normalized === "OWNER"
  );
}

import {
  isOwnerEmail,
  StaffSection,
  StaffGrant,
  AccessLevel,
} from "./staffPermissions";

export type RouteAccessResult =
  | { allowed: true }
  | { allowed: false; redirectUrl: string; reason: string; statusCode?: number };

/**
 * Pure evaluation function for route-level RBAC.
 * Used identically in Middleware, Server Layouts, and Automated Test Suites.
 *
 * Rules:
 * - The Owner always passes every check automatically.
 * - Staff member only passes if they have an active grant for that exact section
 *   with sufficient accessLevel for the action/route.
 */
export function evaluateRouteAccess(
  pathname: string,
  role: UserRole | null,
  isAuthenticated: boolean,
  permissions?: (string | StaffGrant)[],
  email?: string | null,
  requiredLevel: AccessLevel = "VIEW"
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

  const isOwner = isOwnerRole(role) || isOwnerEmail(email);

  const perms: string[] = [];
  const grants: StaffGrant[] = [];

  if (Array.isArray(permissions)) {
    for (const item of permissions) {
      if (typeof item === "string") {
        perms.push(item);
      } else if (item && typeof item === "object" && "section" in item) {
        perms.push(item.section);
        grants.push(item as StaffGrant);
      }
    }
  }

  const hasAnyStaffPerm = perms.length > 0;

  function hasSectionPerm(section: StaffSection, level: AccessLevel = "VIEW"): boolean {
    if (isOwner) return true;
    if (grants.length > 0) {
      const grant = grants.find((g) => g.section === section);
      if (!grant) return false;
      if (level === "VIEW") return true;
      return grant.accessLevel === "MANAGE";
    }
    return perms.includes(section);
  }

  // Team & Staff access management console: strictly requires Owner
  // Reject anyone else, including staff with MANAGE access to other sections
  if (pathname.startsWith("/admin/team") || pathname.startsWith("/admin/staff")) {
    if (!isAuthenticated) {
      return {
        allowed: false,
        redirectUrl: `/login?redirect_url=${encodeURIComponent(pathname)}`,
        reason: "Authentication required to access team access management",
      };
    }
    if (!isOwner) {
      return {
        allowed: false,
        redirectUrl:
          isAstrologerRole(role) || hasAnyStaffPerm
            ? "/dashboard"
            : "/account",
        reason: "Platform Owner privilege strictly required for team access management",
      };
    }
    return { allowed: true };
  }

  // Pricing console: strictly requires Owner or 'pricing' staff permission (or legacy ADMIN)
  if (pathname.startsWith("/admin/pricing")) {
    if (!isAuthenticated) {
      return {
        allowed: false,
        redirectUrl: `/login?redirect_url=${encodeURIComponent(pathname)}`,
        reason: "Authentication required to access pricing configuration",
      };
    }
    if (isOwner || (isAdminRole(role) && !hasAnyStaffPerm) || hasSectionPerm("pricing", requiredLevel)) {
      return { allowed: true };
    }
    return {
      allowed: false,
      redirectUrl:
        isAstrologerRole(role) || hasAnyStaffPerm
          ? "/dashboard"
          : "/account",
      reason: `Pricing permission required (${requiredLevel} required)`,
    };
  }

  // Analytics console: strictly requires Owner or 'analytics' staff permission (or legacy ADMIN)
  if (pathname.startsWith("/admin/analytics")) {
    if (!isAuthenticated) {
      return {
        allowed: false,
        redirectUrl: `/login?redirect_url=${encodeURIComponent(pathname)}`,
        reason: "Authentication required to access platform intelligence",
      };
    }
    if (isOwner || (isAdminRole(role) && !hasAnyStaffPerm) || hasSectionPerm("analytics", requiredLevel)) {
      return { allowed: true };
    }
    return {
      allowed: false,
      redirectUrl:
        isAstrologerRole(role) || hasAnyStaffPerm
          ? "/dashboard"
          : "/account",
      reason: `Analytics permission required (${requiredLevel} required)`,
    };
  }

  // General Admin routes: requires Owner, legacy ADMIN, or active admin section permission
  if (isAdminRoute) {
    if (!isAuthenticated) {
      return {
        allowed: false,
        redirectUrl: `/login?redirect_url=${encodeURIComponent(pathname)}`,
        reason: "Authentication required to access admin intelligence",
      };
    }
    const hasAdminPerm =
      isOwner ||
      (isAdminRole(role) && !hasAnyStaffPerm) ||
      hasSectionPerm("pricing", "VIEW") ||
      hasSectionPerm("analytics", "VIEW");

    if (!hasAdminPerm) {
      return {
        allowed: false,
        redirectUrl:
          isAstrologerRole(role) || hasAnyStaffPerm
            ? "/dashboard"
            : "/account",
        reason: "Strict section permission required for admin dashboard",
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

    // A client with no staff permissions must be denied from the cockpit entirely
    if (!isOwner && !hasAnyStaffPerm && !isAstrologerRole(role)) {
      return {
        allowed: false,
        redirectUrl: "/account",
        reason: "Client role denied access to operator cockpit",
      };
    }

    // Section-level checks for every specific dashboard subroute
    // Only the Owner always passes every check automatically.
    // Non-owners (including staff/astrologer/admin) only pass if they have that exact section permission.
    if (!isOwner && !isAdminRole(role)) {
      if (pathname.startsWith("/dashboard/blog") && !hasSectionPerm("blog", requiredLevel)) {
        return {
          allowed: false,
          redirectUrl: "/dashboard",
          reason: `Staff member lacks blog permission (${requiredLevel} required)`,
        };
      }
      if (pathname.startsWith("/dashboard/reels") && !hasSectionPerm("reels", requiredLevel)) {
        return {
          allowed: false,
          redirectUrl: "/dashboard",
          reason: `Staff member lacks reels permission (${requiredLevel} required)`,
        };
      }
      if (pathname.startsWith("/dashboard/clients") && !hasSectionPerm("clients", requiredLevel) && !isAstrologerRole(role)) {
        return {
          allowed: false,
          redirectUrl: "/dashboard",
          reason: `Staff member lacks clients permission (${requiredLevel} required)`,
        };
      }
      if (pathname.startsWith("/dashboard/earnings") && !hasSectionPerm("earnings", requiredLevel) && !isAstrologerRole(role)) {
        return {
          allowed: false,
          redirectUrl: "/dashboard",
          reason: `Staff member lacks earnings permission (${requiredLevel} required)`,
        };
      }
      if (
        (pathname.startsWith("/dashboard/session") || pathname.startsWith("/astrologer")) &&
        !hasSectionPerm("consultations", requiredLevel) &&
        !isAstrologerRole(role)
      ) {
        return {
          allowed: false,
          redirectUrl: "/dashboard",
          reason: `Staff member lacks consultation permission (${requiredLevel} required)`,
        };
      }
    }

    // Restricted staff member checks (even if role is elevated, specific section grant is required)
    if (hasAnyStaffPerm && !isOwner) {
      if (pathname.startsWith("/dashboard/blog") && !hasSectionPerm("blog", requiredLevel)) {
        return {
          allowed: false,
          redirectUrl: "/dashboard",
          reason: `Staff member lacks blog permission (${requiredLevel} required)`,
        };
      }
      if (pathname.startsWith("/dashboard/reels") && !hasSectionPerm("reels", requiredLevel)) {
        return {
          allowed: false,
          redirectUrl: "/dashboard",
          reason: `Staff member lacks reels permission (${requiredLevel} required)`,
        };
      }
      if (pathname.startsWith("/dashboard/clients") && !hasSectionPerm("clients", requiredLevel)) {
        return {
          allowed: false,
          redirectUrl: "/dashboard",
          reason: `Staff member lacks clients permission (${requiredLevel} required)`,
        };
      }
      if (pathname.startsWith("/dashboard/earnings") && !hasSectionPerm("earnings", requiredLevel)) {
        return {
          allowed: false,
          redirectUrl: "/dashboard",
          reason: `Staff member lacks earnings permission (${requiredLevel} required)`,
        };
      }
      if (
        (pathname.startsWith("/dashboard/session") || pathname.startsWith("/astrologer")) &&
        !hasSectionPerm("consultations", requiredLevel)
      ) {
        return {
          allowed: false,
          redirectUrl: "/dashboard",
          reason: `Staff member lacks consultation permission (${requiredLevel} required)`,
        };
      }
    }

    return { allowed: true };
  }

  return { allowed: true };
}
