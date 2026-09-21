import { NextRequest, NextResponse } from "next/server";
import { paymentProvider } from "@/lib/providers/payment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, userId, serviceType } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Valid amount in INR is required" },
        { status: 400 }
      );
    }

    const receiptId = `rcpt_${Date.now()}`;
    const order = await paymentProvider.createOrder(amount, receiptId, {
      userId: userId || "guest",
      serviceType: serviceType || "wallet_recharge",
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create payment order" },
      { status: 500 }
    );
  }
}
