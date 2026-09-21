import { OtpProvider, SendOtpResult, VerifyOtpResult } from "./OtpProvider";
import { env } from "@/config/env";

export class Msg91OtpProvider implements OtpProvider {
  readonly name = "msg91";

  async sendOtp(phone: string): Promise<SendOtpResult> {
    if (!env.MSG91_AUTH_KEY || !env.MSG91_TEMPLATE_ID) {
      console.warn("MSG91 credentials missing. Falling back to Mock OTP.");
      return {
        success: true,
        message: "MSG91 not configured. Use OTP: 123456",
        isMock: true,
      };
    }

    try {
      const cleanPhone = phone.replace(/\D/g, "");
      const res = await fetch("https://control.msg91.com/api/v5/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authkey: env.MSG91_AUTH_KEY,
        },
        body: JSON.stringify({
          template_id: env.MSG91_TEMPLATE_ID,
          mobile: cleanPhone,
          otp_length: 6,
        }),
      });

      const data = await res.json();
      if (res.ok && data.type === "success") {
        return {
          success: true,
          message: "OTP sent via MSG91 successfully.",
        };
      }
      return {
        success: false,
        message: data.message || "Failed to send OTP via MSG91",
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || "Network error sending OTP via MSG91",
      };
    }
  }

  async verifyOtp(phone: string, otp: string): Promise<VerifyOtpResult> {
    if (!env.MSG91_AUTH_KEY) {
      return {
        success: otp === "123456",
        message: otp === "123456" ? "Verified" : "Invalid test OTP",
      };
    }

    try {
      const cleanPhone = phone.replace(/\D/g, "");
      const url = `https://control.msg91.com/api/v5/otp/verify?mobile=${cleanPhone}&otp=${otp}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { authkey: env.MSG91_AUTH_KEY },
      });

      const data = await res.json();
      if (res.ok && data.type === "success") {
        return { success: true, message: "OTP verified successfully." };
      }
      return { success: false, message: data.message || "Invalid OTP" };
    } catch (err: any) {
      return { success: false, message: err.message || "Failed to verify OTP" };
    }
  }
}
