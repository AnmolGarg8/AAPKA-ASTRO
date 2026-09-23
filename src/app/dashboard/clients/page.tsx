import { redirect } from "next/navigation";
import { getServerAuthUser, hasStaffSectionAccess } from "@/lib/auth/serverAuth";
import ClientsManagerClient from "./ClientsManagerClient";

export const dynamic = "force-dynamic";

/**
 * /dashboard/clients
 * Server Component enforcing section-level RBAC for Seeker Directory.
 * - Owner and Astrologer role pass automatically.
 * - Staff member requires active VIEW grant on "clients".
 */
export default async function AstrologerClientsPage() {
  const auth = await getServerAuthUser();

  if (!auth.isAuthenticated) {
    redirect("/login?redirect_url=/dashboard/clients");
  }

  // Operator check: Owner, verified Astrologer, or staff with "clients" permission
  const isAuthorized =
    auth.isOwner ||
    auth.role === "ASTROLOGER" ||
    hasStaffSectionAccess(auth, "clients", "VIEW");

  if (!isAuthorized) {
    redirect(auth.permissions.length > 0 ? "/dashboard" : "/account");
  }

  const canManage =
    auth.isOwner ||
    auth.role === "ASTROLOGER" ||
    hasStaffSectionAccess(auth, "clients", "MANAGE");

  return <ClientsManagerClient canManage={canManage} />;
}
