import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { otpProvider } from "@/lib/providers/auth";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/config/env";
import {
  VerifyOtpSchema,
  normalizePhoneNumber,
  sanitizeString,
} from "@/lib/security/inputSanitizer";
import { otpVerifyRateLimiter } from "@/lib/security/rateLimiter";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Zod Input Validation
    const validation = VerifyOtpSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.issues[0]?.message || "Invalid input parameters",
        },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePhoneNumber(validation.data.phone);
    const sanitizedName = validation.data.name ? sanitizeString(validation.data.name) : "Aarav Sharma";
    const otp = validation.data.otp;

    // 2. Sliding-Window Rate Limiting for verification attempts (Max 5 attempts per 10 mins)
    const rateCheck = otpVerifyRateLimiter.check(normalizedPhone);
    if (!rateCheck.allowed) {
      const waitMinutes = Math.ceil(rateCheck.resetTimeMs / 60000);
      return NextResponse.json(
        {
          success: false,
          message: `Too many failed attempts. Security lockout active for ${waitMinutes} minute(s).`,
        },
        { status: 429 }
      );
    }

    // 3. Verify OTP via provider
    const verification = await otpProvider.verifyOtp(normalizedPhone, otp);
    if (!verification.success) {
      return NextResponse.json(
        {
          ...verification,
          remainingAttempts: rateCheck.remaining,
        },
        { status: 401 }
      );
    }

    // Reset rate limiter on successful login
    otpVerifyRateLimiter.reset(normalizedPhone);

    // 4. Upsert user record in database
    let user = {
      id: `usr_${Date.now()}`,
      phone: normalizedPhone,
      name: sanitizedName,
      role: "CLIENT",
      walletBalance: 250.0,
    };

    try {
      const dbUser = await prisma.user.upsert({
        where: { phone: normalizedPhone },
        update: {},
        create: {
          phone: normalizedPhone,
          name: sanitizedName || "New Client",
          walletBalance: 250.0,
          role: "CLIENT",
        },
      });
      user = {
        id: dbUser.id,
        phone: dbUser.phone,
        name: dbUser.name || "Client",
        role: dbUser.role,
        walletBalance: dbUser.walletBalance,
      };
    } catch {
      // Fallback for local preview if database server is offline
    }

    // 5. Sign JWT session token
    const token = jwt.sign(
      {
        userId: user.id,
        phone: user.phone,
        role: user.role,
      },
      env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
      user,
      token,
    });

    // Set secure HttpOnly session cookie
    response.cookies.set("aapka_astro_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
