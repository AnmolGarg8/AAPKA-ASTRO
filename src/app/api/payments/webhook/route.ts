import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("x-razorpay-signature");
    const rawBody = await req.text();

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "whsec_aapka_astro_secure_2026";

    // Verify HMAC-SHA256 signature
    if (signature) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      if (expectedSignature !== signature) {
        return NextResponse.json(
          { success: false, error: "Invalid webhook signature" },
          { status: 400 }
        );
      }
    }

    const eventData = JSON.parse(rawBody);
    const event = eventData.event;
    const payload = eventData.payload;

    if (event === "payment.captured" || event === "order.paid") {
      const payment = payload?.payment?.entity;
      const orderId = payment?.order_id || payload?.order?.entity?.id;
      const paymentId = payment?.id;
      const amountPaise = payment?.amount || payload?.order?.entity?.amount || 0;
      const amountINR = Math.round(amountPaise / 100);
      const userId = payment?.notes?.userId || payload?.order?.entity?.notes?.userId;

      if (userId && amountINR > 0) {
        try {
          // Idempotent check: has this order or payment already been processed?
          const existingTx = await prisma.walletTransaction.findFirst({
            where: { razorpayOrderId: orderId },
          });

          if (!existingTx) {
            await prisma.$transaction([
              prisma.walletTransaction.create({
                data: {
                  userId,
                  amount: amountINR,
                  type: "CREDIT",
                  razorpayOrderId: orderId,
                  razorpayPaymentId: paymentId,
                  provider: "RAZORPAY_WEBHOOK",
                },
              }),
              prisma.user.update({
                where: { id: userId },
                data: {
                  walletBalance: { increment: amountINR },
                },
              }),
            ]);
          }
        } catch (dbErr) {
          console.warn("[Webhook DB] Fallback or local dev mode:", dbErr);
        }
      }
    }

    return NextResponse.json({ success: true, received: true });
  } catch (err: any) {
    console.error("[Razorpay Webhook Error]:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Webhook handling error" },
      { status: 500 }
    );
  }
}
