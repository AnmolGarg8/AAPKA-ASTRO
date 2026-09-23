import { redirect } from "next/navigation";
import { getServerAuthUser, hasStaffSectionAccess } from "@/lib/auth/serverAuth";
import AnalyticsManagerClient from "./AnalyticsManagerClient";

export const dynamic = "force-dynamic";

/**
 * /admin/analytics
 * Server Component enforcing section-level RBAC for Platform Intelligence & Analytics.
 * - Owner always passes automatically.
 * - Staff member requires active VIEW grant on "analytics".
 */
export default async function AdminAnalyticsPage() {
  const auth = await getServerAuthUser();

  if (!auth.isAuthenticated) {
    redirect("/login?redirect_url=/admin/analytics");
  }

  // Server-side check: requires VIEW on "analytics" (or Owner)
  const isAuthorized = auth.isOwner || hasStaffSectionAccess(auth, "analytics", "VIEW");

  if (!isAuthorized) {
    redirect(auth.permissions.length > 0 ? "/dashboard" : "/account");
  }

  return <AnalyticsManagerClient />;
}
