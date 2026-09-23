import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { isClerkConfigured } from "./clerkConfig";
import { UserRole, isAstrologerRole, isAdminRole } from "./roles";
import {
  isOwnerEmail,
  StaffPermissionService,
  STAFF_SECTIONS,
  StaffSection,
} from "./staffPermissions";

export interface ServerAuthResult {
  isAuthenticated: boolean;
  userId: string | null;
  role: UserRole | null;
  isAstrologer: boolean;
  isAdmin: boolean;
  isOwner: boolean;
  email: string | null;
  permissions: StaffSection[];
}

const UNAUTHENTICATED_RESULT: ServerAuthResult = {
  isAuthenticated: false,
  userId: null,
  role: null,
  isAstrologer: false,
  isAdmin: false,
  isOwner: false,
  email: null,
  permissions: [],
};

/**
 * Extracts and verifies authentication and role from a NextRequest instance.
 * Ideal for Middleware and Route Handlers.
 */
export function getAuthFromRequest(req: NextRequest): ServerAuthResult {
  const sessionCookie = req.cookies.get("aapka_astro_session")?.value;
  const roleCookie = req.cookies.get("aapka_astro_role")?.value;
  const mockUserCookie = req.cookies.get("aapka_astro_mock_user")?.value;
  const emailCookie = req.cookies.get("aapka_astro_email")?.value;

  let role: UserRole = "CLIENT";
  let userId: string | null = null;
  let email: string | null = emailCookie || null;
  let isAuthenticated = false;

  if (mockUserCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(mockUserCookie));
      if (parsed.role) {
        role = String(parsed.role).toUpperCase() as UserRole;
      }
      if (parsed.id) {
        userId = parsed.id;
      }
      if (parsed.email) {
        email = parsed.email;
      }
      isAuthenticated = true;
    } catch {
      // JSON parse error, ignore
    }
  } else if (roleCookie) {
    role = String(roleCookie).toUpperCase() as UserRole;
    isAuthenticated = true;
    userId = "mock_user";
  } else if (sessionCookie === "active") {
    isAuthenticated = true;
    role = "CLIENT";
    userId = "mock_user";
  }

  if (!isAuthenticated) {
    return UNAUTHENTICATED_RESULT;
  }

  const isOwner = isOwnerEmail(email);
  if (isOwner) {
    role = "ADMIN";
  }

  const permissions = isOwner
    ? (STAFF_SECTIONS.map((s) => s.id) as StaffSection[])
    : StaffPermissionService.getPermissionsSync(email || "");

  const isAstrologer = isAstrologerRole(role) || permissions.length > 0;
  const isAdmin = isOwner || isAdminRole(role);

  return {
    isAuthenticated: true,
    userId,
    role: isOwner ? "ADMIN" : role,
    isAstrologer,
    isAdmin,
    isOwner,
    email,
    permissions,
  };
}

/**
 * Extracts and verifies authentication and role on the server inside Server Components,
 * Layouts, and Server Actions.
 */
export async function getServerAuthUser(): Promise<ServerAuthResult> {
  // If Clerk is configured with valid production/test keys, inspect Clerk session
  if (isClerkConfigured()) {
    try {
      const { auth, currentUser } = await import("@clerk/nextjs/server");
      const session = await auth();

      if (!session || !session.userId) {
        return UNAUTHENTICATED_RESULT;
      }

      const claims = session.sessionClaims as any;
      let email = claims?.email || claims?.primaryEmailAddress || null;
      if (!email) {
        try {
          const u = await currentUser();
          email = u?.emailAddresses?.[0]?.emailAddress || null;
        } catch {
          // ignore
        }
      }

      const isOwner = isOwnerEmail(email);
      let rawRole =
        claims?.metadata?.role ||
        claims?.publicMetadata?.role ||
        claims?.unsafeMetadata?.role ||
        "CLIENT";

      if (isOwner) {
        rawRole = "ADMIN";
      }

      const role = String(rawRole).toUpperCase() as UserRole;
      const permissions = isOwner
        ? (STAFF_SECTIONS.map((s) => s.id) as StaffSection[])
        : await StaffPermissionService.getPermissionsForEmail(email || "");

      const isAstrologer = isAstrologerRole(role) || permissions.length > 0;
      const isAdmin = isOwner || isAdminRole(role);

      return {
        isAuthenticated: true,
        userId: session.userId,
        role: isOwner ? "ADMIN" : role,
        isAstrologer,
        isAdmin,
        isOwner,
        email,
        permissions,
      };
    } catch (err: any) {
      console.warn("Clerk server auth check error, falling back to cookie auth:", err?.message || err);
    }
  }

  // Fallback to cookie-based session verification
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("aapka_astro_session")?.value;
    const roleCookie = cookieStore.get("aapka_astro_role")?.value;
    const mockUserCookie = cookieStore.get("aapka_astro_mock_user")?.value;
    const emailCookie = cookieStore.get("aapka_astro_email")?.value;

    let role: UserRole = "CLIENT";
    let userId: string | null = null;
    let email: string | null = emailCookie || null;
    let isAuthenticated = false;

    if (mockUserCookie) {
      try {
        const parsed = JSON.parse(decodeURIComponent(mockUserCookie));
        if (parsed.role) {
          role = String(parsed.role).toUpperCase() as UserRole;
        }
        if (parsed.id) {
          userId = parsed.id;
        }
        if (parsed.email) {
          email = parsed.email;
        }
        isAuthenticated = true;
      } catch {
        // ignore
      }
    } else if (roleCookie) {
      role = String(roleCookie).toUpperCase() as UserRole;
      isAuthenticated = true;
      userId = "mock_user";
    } else if (sessionCookie === "active") {
      isAuthenticated = true;
      role = "CLIENT";
      userId = "mock_user";
    }

    if (!isAuthenticated) {
      return UNAUTHENTICATED_RESULT;
    }

    const isOwner = isOwnerEmail(email);
    if (isOwner) {
      role = "ADMIN";
    }

    const permissions = isOwner
      ? (STAFF_SECTIONS.map((s) => s.id) as StaffSection[])
      : await StaffPermissionService.getPermissionsForEmail(email || "");

    const isAstrologer = isAstrologerRole(role) || permissions.length > 0;
    const isAdmin = isOwner || isAdminRole(role);

    return {
      isAuthenticated: true,
      userId,
      role: isOwner ? "ADMIN" : role,
      isAstrologer,
      isAdmin,
      isOwner,
      email,
      permissions,
    };
  } catch (err: any) {
    return UNAUTHENTICATED_RESULT;
  }
}
