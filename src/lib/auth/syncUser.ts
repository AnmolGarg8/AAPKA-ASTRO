import { prisma } from "@/lib/db/prisma";
import { isOwnerEmail } from "./staffPermissions";

export interface ClerkUserData {
  clerkId: string;
  email?: string | null;
  name?: string | null;
  phone?: string | null;
  imageUrl?: string | null;
}

let isDbReachable = true;

/**
 * Synchronizes an authenticated Clerk user into the application's PostgreSQL database (Neon).
 * Ensures that every real signup or signin has an associated User record and initial Wallet row.
 */
export async function syncClerkUserToDatabase(userData: ClerkUserData) {
  if (!userData.clerkId) {
    return null;
  }

  const normalizedEmail = userData.email?.trim().toLowerCase() || null;
  const isOwner = isOwnerEmail(normalizedEmail);

  if (isDbReachable) {
    try {
      if (prisma && (prisma as any).user) {
        // 1. Try finding user by clerkId
        let user = await prisma.user.findUnique({
          where: { clerkId: userData.clerkId },
          include: { wallet: true },
        });

        // 2. If not found by clerkId, search by email if available
        if (!user && normalizedEmail) {
          user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
            include: { wallet: true },
          });

          if (user) {
            // Associate clerkId to existing user record
            user = await prisma.user.update({
              where: { id: user.id },
              data: {
                clerkId: userData.clerkId,
                name: userData.name || user.name,
                role: isOwner ? "OWNER" : user.role,
              },
              include: { wallet: true },
            });
          }
        }

        // 3. If user still does not exist, create new user and associated wallet
        if (!user) {
          user = await prisma.user.create({
            data: {
              clerkId: userData.clerkId,
              identifier: normalizedEmail || userData.clerkId,
              email: normalizedEmail,
              name: userData.name || null,
              phone: userData.phone || null,
              role: isOwner ? "OWNER" : "CLIENT",
              walletBalance: 0.0,
              wallet: {
                create: {
                  balance: 0.0,
                },
              },
            },
            include: { wallet: true },
          });
        } else {
          // 4. If user exists but is missing wallet, create it
          if (!user.wallet && (prisma as any).wallet) {
            try {
              const newWallet = await prisma.wallet.create({
                data: {
                  userId: user.id,
                  balance: user.walletBalance || 0.0,
                },
              });
              user.wallet = newWallet;
            } catch {
              // Ignore if created concurrently
            }
          }
        }

        return user;
      }
    } catch (err: any) {
      console.warn("User database sync notice:", err?.message || err);
      if (err?.message?.includes("connect") || err?.message?.includes("Environment variable")) {
        isDbReachable = false;
      }
    }
  }

  // Graceful fallback representation if DB is offline during testing/dev preview
  return {
    id: `local_${userData.clerkId}`,
    clerkId: userData.clerkId,
    email: normalizedEmail,
    name: userData.name || null,
    role: isOwner ? "OWNER" : "CLIENT",
    walletBalance: 0.0,
  };
}
