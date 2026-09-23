import React from "react";
import { redirect } from "next/navigation";
import { getServerAuthUser } from "@/lib/auth/serverAuth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getServerAuthUser();

  if (!auth.isAuthenticated) {
    redirect("/login?redirect_url=/admin");
  }

  // Admin section requires ADMIN role, Owner, or staff with pricing/analytics permissions
  const hasAdminSectionPerm =
    auth.permissions.includes("pricing") ||
    auth.permissions.includes("analytics") ||
    auth.permissions.includes("staff");

  if (!auth.isAdmin && !auth.isOwner && !hasAdminSectionPerm) {
    redirect(auth.isAstrologer ? "/dashboard" : "/account");
  }

  return <>{children}</>;
}
