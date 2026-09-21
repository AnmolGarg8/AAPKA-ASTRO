import crypto from "crypto";
import { PaymentOrder, PaymentProvider, VerifyPaymentParams } from "./PaymentProvider";
import { env } from "@/config/env";

export class RazorpayPaymentProvider implements PaymentProvider {
  readonly name = "razorpay";

  async createOrder(
    amountINR: number,
    receiptId: string,
    notes?: Record<string, string>
  ): Promise<PaymentOrder> {
    if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay credentials missing in environment config.");
    }

    const amountPaise = Math.round(amountINR * 100);
    const basicAuth = Buffer.from(
      `${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`
    ).toString("base64");

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: "INR",
        receipt: receiptId,
        notes: notes || {},
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Razorpay order creation failed: ${errText}`);
    }

    const data = await res.json();
    return {
      id: data.id,
      amount: data.amount,
      currency: data.currency,
      receipt: data.receipt,
      status: data.status,
      notes: data.notes,
    };
  }

  async verifyPaymentSignature(params: VerifyPaymentParams): Promise<boolean> {
    if (!env.RAZORPAY_KEY_SECRET) return false;

    const payload = `${params.orderId}|${params.paymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
      .update(payload)
      .digest("hex");

    return expectedSignature === params.signature;
  }
}
