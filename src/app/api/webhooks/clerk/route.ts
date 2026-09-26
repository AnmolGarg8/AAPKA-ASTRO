import { NextRequest, NextResponse } from "next/server";
import { syncClerkUserToDatabase } from "@/lib/auth/syncUser";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

/**
 * Clerk Webhook Handler
 *
 * Receives real-time user lifecycle events from Clerk (user.created, user.updated, user.deleted)
 * and guarantees a matching row exists in PostgreSQL (Neon).
 */
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const eventType = payload?.type;
    const eventData = payload?.data;

    if (!eventType || !eventData) {
      return NextResponse.json({ error: "Missing event payload" }, { status: 400 });
    }

    if (eventType === "user.created" || eventType === "user.updated") {
      const clerkId = eventData.id;
      const primaryEmail =
        eventData.email_addresses?.find((e: any) => e.id === eventData.primary_email_address_id)?.email_address ||
        eventData.email_addresses?.[0]?.email_address ||
        null;
      const firstName = eventData.first_name || "";
      const lastName = eventData.last_name || "";
      const name = `${firstName} ${lastName}`.trim() || null;
      const phone = eventData.phone_numbers?.[0]?.phone_number || null;
      const imageUrl = eventData.image_url || null;

      const syncedUser = await syncClerkUserToDatabase({
        clerkId,
        email: primaryEmail,
        name,
        phone,
        imageUrl,
      });

      return NextResponse.json({
        success: true,
        message: "User synced successfully",
        userId: syncedUser?.id,
        event: eventType,
      });
    }

    if (eventType === "user.deleted") {
      const clerkId = eventData.id;
      if (clerkId) {
        try {
          if (prisma && (prisma as any).user) {
            await prisma.user.deleteMany({
              where: { clerkId },
            });
          }
        } catch (err: any) {
          console.warn("User deletion notice:", err?.message || err);
        }
      }
      return NextResponse.json({ success: true, message: "User deleted", event: eventType });
    }

    return NextResponse.json({ received: true, event: eventType });
  } catch (err: any) {
    console.error("Clerk webhook error:", err);
    return NextResponse.json(
      { error: err?.message || "Webhook processing error" },
      { status: 500 }
    );
  }
}
