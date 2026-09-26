import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { syncClerkUserToDatabase, deleteClerkUserFromDatabase } from "@/lib/auth/syncUser";

export const dynamic = "force-dynamic";

/**
 * Clerk Webhook Handler
 *
 * Receives real-time user lifecycle events from Clerk (user.created, user.updated, user.deleted)
 * and guarantees a matching row exists in PostgreSQL (Neon).
 *
 * Verifies webhook signatures using svix headers ('svix-id', 'svix-timestamp', 'svix-signature')
 * against CLERK_WEBHOOK_SECRET when provided.
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();

    if (!rawBody || rawBody.trim().length === 0) {
      return NextResponse.json({ error: "Missing webhook payload" }, { status: 400 });
    }

    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (webhookSecret) {
      const svixId = req.headers.get("svix-id");
      const svixTimestamp = req.headers.get("svix-timestamp");
      const svixSignature = req.headers.get("svix-signature");

      if (!svixId || !svixTimestamp || !svixSignature) {
        return NextResponse.json(
          { error: "Missing required svix verification headers" },
          { status: 400 }
        );
      }

      try {
        const wh = new Webhook(webhookSecret);
        wh.verify(rawBody, {
          "svix-id": svixId,
          "svix-timestamp": svixTimestamp,
          "svix-signature": svixSignature,
        });
      } catch (err: any) {
        console.error("Clerk webhook signature verification failed:", err?.message || err);
        return NextResponse.json(
          { error: "Invalid webhook signature" },
          { status: 400 }
        );
      }
    }

    let payload: any;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

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
        await deleteClerkUserFromDatabase(clerkId);
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
