import { redirect } from "next/navigation";
import { getServerAuthUser, hasStaffSectionAccess } from "@/lib/auth/serverAuth";
import ReelsManagerClient from "./ReelsManagerClient";

export const dynamic = "force-dynamic";

/**
 * /dashboard/reels
 * Server Component enforcing section-level RBAC for the Reels Curation Desk.
 * - Owner always passes automatically.
 * - Staff member requires active VIEW grant on "reels".
 * - Passing canManage={true|false} signals whether curation actions (pin/hide/sync) are authorized.
 */
export default async function AstrologerReelsPage() {
  const auth = await getServerAuthUser();

  if (!auth.isAuthenticated) {
    redirect("/login?redirect_url=/dashboard/reels");
  }

  // Server-side section-level check: requires VIEW on "reels"
  if (!hasStaffSectionAccess(auth, "reels", "VIEW")) {
    redirect(auth.permissions.length > 0 ? "/dashboard" : "/account");
  }

  const canManage = hasStaffSectionAccess(auth, "reels", "MANAGE");

  return <ReelsManagerClient canManage={canManage} />;
}
