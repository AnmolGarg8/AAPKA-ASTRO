import { redirect } from "next/navigation";
import { getServerAuthUser, hasStaffSectionAccess } from "@/lib/auth/serverAuth";
import SessionWorkbenchClient from "./SessionWorkbenchClient";

export const dynamic = "force-dynamic";

/**
 * /dashboard/session/[id]
 * Server Component enforcing operator & consultation access.
 * - Owner and Astrologer role pass automatically.
 * - Staff member requires active VIEW grant on "consultations".
 */
export default async function AstrologerSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const auth = await getServerAuthUser();

  if (!auth.isAuthenticated) {
    redirect(`/login?redirect_url=/dashboard/session/${resolvedParams.id}`);
  }

  const isAuthorized =
    auth.isOwner ||
    auth.role === "ASTROLOGER" ||
    hasStaffSectionAccess(auth, "consultations", "VIEW");

  if (!isAuthorized) {
    redirect(auth.permissions.length > 0 ? "/dashboard" : "/account");
  }

  return <SessionWorkbenchClient sessionId={resolvedParams.id} />;
}
