import { NextRequest, NextResponse } from "next/server";
import { otpProvider } from "@/lib/providers/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone } = body;

    if (!phone || typeof phone !== "string" || phone.length < 10) {
      return NextResponse.json(
        { success: false, message: "Valid 10-digit mobile number required" },
        { status: 400 }
      );
    }

    const result = await otpProvider.sendOtp(phone);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to process OTP request" },
      { status: 500 }
    );
  }
}
