import { prisma } from "@/lib/db/prisma";

export type StaffSection =
  | "blog"
  | "reels"
  | "clients"
  | "earnings"
  | "consultations"
  | "pricing"
  | "analytics"
  | "staff";

export interface StaffSectionMeta {
  id: StaffSection;
  name: string;
  path: string;
  description: string;
  ownerOnly?: boolean;
}

export const STAFF_SECTIONS: readonly StaffSectionMeta[] = [
  {
    id: "blog",
    name: "Blog Post Manager",
    path: "/dashboard/blog",
    description: "Create, edit, draft, and publish astrology articles & SEO content.",
  },
  {
    id: "reels",
    name: "Instagram Reel Curation",
    path: "/dashboard/reels",
    description: "Curate, pin, hide, and sync reels from @aapkaastrologer feed.",
  },
  {
    id: "clients",
    name: "Client Intake Profiles",
    path: "/dashboard/clients",
    description: "View seeker birth details, consultation history, and remedy notes.",
  },
  {
    id: "earnings",
    name: "Revenue & Earnings",
    path: "/dashboard/earnings",
    description: "View consultation minutes billed, earnings breakdown, and balances.",
  },
  {
    id: "consultations",
    name: "Live Operator Cockpit",
    path: "/dashboard",
    description: "Manage live waiting queue, accept incoming calls, and run session workbench.",
  },
  {
    id: "pricing",
    name: "Pricing & Coupons",
    path: "/admin/pricing",
    description: "Configure per-minute consultation rates, discounts, and recharge minimums.",
  },
  {
    id: "analytics",
    name: "Platform Intelligence",
    path: "/admin/analytics",
    description: "View conversion funnels, traffic sources, and consultation volume metrics.",
  },
  {
    id: "staff",
    name: "Staff Permissions",
    path: "/admin/staff",
    description: "Assign or revoke per-section access for site employees (Owner Only).",
    ownerOnly: true,
  },
];

/**
 * Parses and returns the list of designated Owner email addresses.
 * The client's account is identified by OWNER_EMAIL in environment variables.
 */
export function getOwnerEmails(): string[] {
  const envVal =
    process.env.OWNER_EMAIL ||
    process.env.NEXT_PUBLIC_OWNER_EMAIL ||
    "anmol@aapkaastro.com,acharya@aapkaastro.com";

  return envVal
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Returns true if the provided email belongs to the site's Owner.
 * The Owner possesses complete, unrestricted administrative privilege across all sections.
 */
export function isOwnerEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  const owners = getOwnerEmails();
  return owners.includes(normalized);
}

/**
 * Evaluates whether a user holds authorization to access a specific admin/operator section.
 */
export function hasSectionPermission(
  user: {
    email?: string | null;
    role?: string | null;
    permissions?: string[];
  } | null | undefined,
  section: StaffSection
): boolean {
  if (!user) return false;

  // 1. Owner email always has unrestricted access to everything
  if (isOwnerEmail(user.email)) {
    return true;
  }

  // 2. The 'staff' management console is strictly restricted to platform Owner
  if (section === "staff") {
    return false;
  }

  const role = (user.role || "").toUpperCase();

  // 3. Global ADMIN role has access to all platform operations
  if (role === "ADMIN") {
    return true;
  }

  const perms = user.permissions || [];

  // 4. Wildcard permission
  if (perms.includes("*")) {
    return true;
  }

  // 5. Explicit section permission granted in database
  if (perms.includes(section)) {
    return true;
  }

  // 6. Astrologer role has consultation operator privilege by default
  if (section === "consultations" && role === "ASTROLOGER") {
    return true;
  }

  return false;
}

export interface StaffMemberRecord {
  email: string;
  name?: string;
  sections: StaffSection[];
  isOwner: boolean;
  updatedAt: string;
}

// In-memory permission cache for development preview / test resilience
const memoryStaffPermissions = new Map<string, Set<StaffSection>>([
  ["editor@aapkaastro.com", new Set<StaffSection>(["blog"])],
  ["curator@aapkaastro.com", new Set<StaffSection>(["reels"])],
]);

let isDbReachable = true;

/**
 * Service to manage per-site staff permissions stored in PostgreSQL.
 * Does not require paid Clerk Organizations features.
 */
export class StaffPermissionService {
  /**
   * Synchronous helper for request/middleware execution when DB is not awaited.
   */
  static getPermissionsSync(email: string): StaffSection[] {
    if (!email) return [];
    const normalized = email.trim().toLowerCase();
    if (isOwnerEmail(normalized)) {
      return STAFF_SECTIONS.map((s) => s.id);
    }
    const mem = memoryStaffPermissions.get(normalized);
    if (mem) {
      return Array.from(mem);
    }
    return [];
  }

  /**
   * Retrieves all granted sections for a specific user email.
   */
  static async getPermissionsForEmail(email: string): Promise<StaffSection[]> {
    if (!email) return [];
    const normalized = email.trim().toLowerCase();

    // Owner has all sections
    if (isOwnerEmail(normalized)) {
      return STAFF_SECTIONS.map((s) => s.id);
    }

    if (isDbReachable) {
      try {
        if (prisma && (prisma as any).staffPermission) {
          const rows = await prisma.staffPermission.findMany({
            where: { email: normalized },
            select: { section: true },
          });

          if (rows && rows.length > 0) {
            const perms = rows.map((r) => r.section as StaffSection);
            memoryStaffPermissions.set(normalized, new Set(perms));
            return perms;
          }
        }
      } catch {
        isDbReachable = false;
      }
    }

    const mem = memoryStaffPermissions.get(normalized);
    if (mem) {
      return Array.from(mem);
    }

    return [];
  }

  /**
   * Lists all staff members and their configured permissions for this site.
   */
  static async listStaffMembers(): Promise<StaffMemberRecord[]> {
    const recordsMap = new Map<string, Set<StaffSection>>();

    // Load from database if available
    if (isDbReachable) {
      try {
        if (prisma && (prisma as any).staffPermission) {
          const rows = await prisma.staffPermission.findMany({
            orderBy: { createdAt: "desc" },
          });

          for (const row of rows) {
            const email = row.email.toLowerCase();
            if (!recordsMap.has(email)) {
              recordsMap.set(email, new Set());
            }
            recordsMap.get(email)!.add(row.section as StaffSection);
          }
        }
      } catch {
        isDbReachable = false;
      }
    }

    // Merge in-memory fallback entries
    for (const [email, perms] of memoryStaffPermissions.entries()) {
      if (!recordsMap.has(email)) {
        recordsMap.set(email, new Set(perms));
      } else {
        perms.forEach((p) => recordsMap.get(email)!.add(p));
      }
    }

    // Include configured owners
    const owners = getOwnerEmails();
    for (const owner of owners) {
      recordsMap.set(owner, new Set(STAFF_SECTIONS.map((s) => s.id)));
    }

    const result: StaffMemberRecord[] = [];
    for (const [email, sectionsSet] of recordsMap.entries()) {
      result.push({
        email,
        sections: Array.from(sectionsSet),
        isOwner: isOwnerEmail(email),
        updatedAt: new Date().toISOString(),
      });
    }

    return result;
  }

  /**
   * Grants or updates the per-section permissions for a staff member.
   */
  static async setPermissions(
    email: string,
    sections: StaffSection[],
    grantedBy: string = "Owner"
  ): Promise<boolean> {
    if (!email) return false;
    const normalized = email.trim().toLowerCase();

    // Prevent restricting the owner
    if (isOwnerEmail(normalized)) {
      return true;
    }

    // Update in-memory fallback
    memoryStaffPermissions.set(normalized, new Set(sections));

    // Update database if reachable
    if (isDbReachable) {
      try {
        if (prisma && (prisma as any).staffPermission) {
          // Find existing user if registered
          const user = await prisma.user.findUnique({
            where: { email: normalized },
          });

          // Delete existing section permissions for this email
          await prisma.staffPermission.deleteMany({
            where: { email: normalized },
          });

          // If sections are provided, insert them
          if (sections.length > 0) {
            const createData = sections.map((sec) => ({
              email: normalized,
              section: sec,
              userId: user ? user.id : null,
              grantedBy,
            }));

            await prisma.staffPermission.createMany({
              data: createData,
            });

            // Elevate user's role to ASTROLOGER/staff if currently CLIENT
            if (user && user.role === "CLIENT") {
              await prisma.user.update({
                where: { id: user.id },
                data: { role: "ASTROLOGER" },
              });
            }
          }
        }
      } catch {
        isDbReachable = false;
      }
    }

    return true; // memory store successfully updated
  }

  /**
   * Revokes all staff permissions for a given email.
   */
  static async revokeStaff(email: string): Promise<boolean> {
    if (!email) return false;
    const normalized = email.trim().toLowerCase();

    if (isOwnerEmail(normalized)) {
      return false; // Cannot revoke owner
    }

    memoryStaffPermissions.delete(normalized);

    if (isDbReachable) {
      try {
        if (prisma && (prisma as any).staffPermission) {
          await prisma.staffPermission.deleteMany({
            where: { email: normalized },
          });
        }
      } catch {
        isDbReachable = false;
      }
    }

    return true;
  }
}
