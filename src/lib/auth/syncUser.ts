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

        // 3. If not found by email, search by phone if available
        if (!user && userData.phone) {
          user = await prisma.user.findUnique({
            where: { phone: userData.phone },
            include: { wallet: true },
          });

          if (user) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: {
                clerkId: userData.clerkId,
                email: normalizedEmail || user.email,
                name: userData.name || user.name,
                role: isOwner ? "OWNER" : user.role,
              },
              include: { wallet: true },
            });
          }
        }

        // 4. If user still does not exist, create new user and associated wallet
        if (!user) {
          let safePhone = userData.phone || null;
          if (safePhone) {
            const existingPhoneUser = await prisma.user.findUnique({ where: { phone: safePhone } });
            if (existingPhoneUser) {
              safePhone = null;
            }
          }

          user = await prisma.user.create({
            data: {
              clerkId: userData.clerkId,
              identifier: normalizedEmail || userData.clerkId,
              email: normalizedEmail,
              name: userData.name || null,
              phone: safePhone,
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
          // 5. If user exists, update profile details and ensure wallet exists
          const updateData: any = {};
          if (userData.name !== undefined) updateData.name = userData.name;
          if (normalizedEmail !== null) updateData.email = normalizedEmail;
          if (userData.phone !== undefined) {
            const existingPhoneUser = userData.phone
              ? await prisma.user.findUnique({ where: { phone: userData.phone } })
              : null;
            if (!existingPhoneUser || existingPhoneUser.id === user.id) {
              updateData.phone = userData.phone;
            }
          }

          user = await prisma.user.update({
            where: { id: user.id },
            data: updateData,
            include: { wallet: true },
          });

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

/**
 * Removes a user record from the database when deleted in Clerk.
 */
export async function deleteClerkUserFromDatabase(clerkId: string) {
  if (!clerkId) return null;
  if (isDbReachable && prisma && (prisma as any).user) {
    try {
      return await prisma.user.deleteMany({
        where: { clerkId },
      });
    } catch (err: any) {
      console.warn("User deletion notice:", err?.message || err);
    }
  }
  return null;
}
