import { redirect } from "next/navigation";
import { getServerAuthUser, hasStaffSectionAccess } from "@/lib/auth/serverAuth";
import BlogManagerClient from "./BlogManagerClient";

export const dynamic = "force-dynamic";

/**
 * /dashboard/blog
 * Server Component enforcing section-level RBAC for the Vedic Journal.
 * - Owner always passes automatically.
 * - Staff member requires active VIEW grant on "blog".
 * - Passing canManage={true|false} signals whether mutations (edit/publish/delete) are authorized.
 */
export default async function AstrologerBlogPage() {
  const auth = await getServerAuthUser();

  if (!auth.isAuthenticated) {
    redirect("/login?redirect_url=/dashboard/blog");
  }

  // Server-side section-level check: requires VIEW on "blog"
  if (!hasStaffSectionAccess(auth, "blog", "VIEW")) {
    redirect(auth.permissions.length > 0 ? "/dashboard" : "/account");
  }

  // Check whether user has MANAGE privilege to edit/publish/delete
  const canManage = hasStaffSectionAccess(auth, "blog", "MANAGE");

  return <BlogManagerClient canManage={canManage} />;
}
