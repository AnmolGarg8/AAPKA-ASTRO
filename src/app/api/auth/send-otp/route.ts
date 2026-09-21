import { NextRequest, NextResponse } from "next/server";
import { otpProvider } from "@/lib/providers/auth";
import { SendOtpSchema, normalizePhoneNumber } from "@/lib/security/inputSanitizer";
import { otpSendRateLimiter } from "@/lib/security/rateLimiter";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Input Validation via Zod
    const validation = SendOtpSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.issues[0]?.message || "Invalid phone number",
        },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePhoneNumber(validation.data.phone);

    // 2. Sliding-Window Rate Limiting (Max 3 OTPs per 10 mins)
    const rateCheck = otpSendRateLimiter.check(normalizedPhone);
    if (!rateCheck.allowed) {
      const waitMinutes = Math.ceil(rateCheck.resetTimeMs / 60000);
      return NextResponse.json(
        {
          success: false,
          message: `Too many OTP requests. Please wait ${waitMinutes} minute(s) before requesting again.`,
          retryAfterMs: rateCheck.resetTimeMs,
        },
        { status: 429 }
      );
    }

    // 3. Dispatch OTP via abstraction layer
    const result = await otpProvider.sendOtp(normalizedPhone);

    return NextResponse.json({
      ...result,
      remainingAttempts: rateCheck.remaining,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to process OTP request" },
      { status: 500 }
    );
  }
}
