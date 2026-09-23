import { redirect } from "next/navigation";
import { getServerAuthUser, hasStaffSectionAccess } from "@/lib/auth/serverAuth";
import EarningsManagerClient from "./EarningsManagerClient";

export const dynamic = "force-dynamic";

/**
 * /dashboard/earnings
 * Server Component enforcing section-level RBAC for Consultation Revenue & Earnings.
 * - Owner and Astrologer role pass automatically.
 * - Staff member requires active VIEW grant on "earnings".
 */
export default async function AstrologerEarningsPage() {
  const auth = await getServerAuthUser();

  if (!auth.isAuthenticated) {
    redirect("/login?redirect_url=/dashboard/earnings");
  }

  // Operator check: Owner, verified Astrologer, or staff with "earnings" permission
  const isAuthorized =
    auth.isOwner ||
    auth.role === "ASTROLOGER" ||
    hasStaffSectionAccess(auth, "earnings", "VIEW");

  if (!isAuthorized) {
    redirect(auth.permissions.length > 0 ? "/dashboard" : "/account");
  }

  const canManage =
    auth.isOwner ||
    auth.role === "ASTROLOGER" ||
    hasStaffSectionAccess(auth, "earnings", "MANAGE");

  return <EarningsManagerClient canManage={canManage} />;
}
