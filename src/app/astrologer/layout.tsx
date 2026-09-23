import React from "react";
import { redirect } from "next/navigation";
import { getServerAuthUser } from "@/lib/auth/serverAuth";

export default async function AstrologerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getServerAuthUser();

  if (!auth.isAuthenticated) {
    redirect("/login?redirect_url=/astrologer");
  }

  // Operator Cockpit strictly requires ASTROLOGER or ADMIN role
  if (!auth.isAstrologer) {
    redirect("/account");
  }

  return <>{children}</>;
}
