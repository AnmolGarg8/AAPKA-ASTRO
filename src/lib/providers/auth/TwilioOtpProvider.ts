import { OtpProvider, SendOtpResult, VerifyOtpResult } from "./OtpProvider";
import { env } from "@/config/env";

export class TwilioOtpProvider implements OtpProvider {
  readonly name = "twilio";

  async sendOtp(phone: string): Promise<SendOtpResult> {
    if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN || !env.TWILIO_SERVICE_SID) {
      console.warn("Twilio credentials missing. Falling back to Mock OTP.");
      return {
        success: true,
        message: "Twilio not configured. Use OTP: 123456",
        isMock: true,
      };
    }

    try {
      const basicAuth = Buffer.from(
        `${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`
      ).toString("base64");

      const params = new URLSearchParams({
        To: phone.startsWith("+") ? phone : `+91${phone}`,
        Channel: "sms",
      });

      const res = await fetch(
        `https://verify.twilio.com/v2/Services/${env.TWILIO_SERVICE_SID}/Verifications`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        }
      );

      const data = await res.json();
      if (res.ok && data.status === "pending") {
        return { success: true, message: "OTP sent via Twilio." };
      }
      return { success: false, message: data.message || "Failed to send OTP via Twilio" };
    } catch (e: any) {
      return { success: false, message: e.message || "Twilio request failed" };
    }
  }

  async verifyOtp(phone: string, otp: string): Promise<VerifyOtpResult> {
    if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN || !env.TWILIO_SERVICE_SID) {
      return {
        success: otp === "123456",
        message: otp === "123456" ? "Verified" : "Invalid test OTP",
      };
    }

    try {
      const basicAuth = Buffer.from(
        `${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`
      ).toString("base64");

      const params = new URLSearchParams({
        To: phone.startsWith("+") ? phone : `+91${phone}`,
        Code: otp,
      });

      const res = await fetch(
        `https://verify.twilio.com/v2/Services/${env.TWILIO_SERVICE_SID}/VerificationCheck`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        }
      );

      const data = await res.json();
      if (res.ok && data.status === "approved") {
        return { success: true, message: "Twilio OTP verified." };
      }
      return { success: false, message: "Invalid or expired OTP." };
    } catch (e: any) {
      return { success: false, message: e.message || "Verification request failed" };
    }
  }
}
