import { redirect } from "next/navigation";
import { getServerAuthUser } from "@/lib/auth/serverAuth";
import TeamManagementClient from "./TeamManagementClient";

export const dynamic = "force-dynamic";

/**
 * /admin/team
 * Strictly Owner-Only.
 * Rejects anyone else, including staff with MANAGE access to other sections, server-side.
 */
export default async function AdminTeamPage() {
  const auth = await getServerAuthUser();

  if (!auth.isAuthenticated) {
    redirect("/login?redirect_url=/admin/team");
  }

  // Strictly Owner-only: reject anyone else, including staff with MANAGE access to other sections
  if (!auth.isOwner) {
    redirect("/dashboard");
  }

  return (
    <TeamManagementClient
      currentUserEmail={auth.email}
      currentUserId={auth.userId}
    />
  );
}
