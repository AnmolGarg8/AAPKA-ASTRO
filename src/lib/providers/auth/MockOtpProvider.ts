import { OtpProvider, SendOtpResult, VerifyOtpResult } from "./OtpProvider";

const mockStore = new Map<string, string>();

export class MockOtpProvider implements OtpProvider {
  readonly name = "mock";

  async sendOtp(phone: string): Promise<SendOtpResult> {
    const fixedOtp = "123456";
    mockStore.set(phone, fixedOtp);
    console.log(`[MOCK OTP] Generated OTP for ${phone}: ${fixedOtp}`);
    return {
      success: true,
      message: "Mock OTP generated (Use 123456)",
      sessionId: `mock-session-${Date.now()}`,
      isMock: true,
    };
  }

  async verifyOtp(phone: string, otp: string): Promise<VerifyOtpResult> {
    const stored = mockStore.get(phone) || "123456";
    if (otp === stored || otp === "123456") {
      mockStore.delete(phone);
      return {
        success: true,
        message: "OTP verified successfully.",
      };
    }
    return {
      success: false,
      message: "Invalid OTP. Use 123456 for test verification.",
    };
  }
}
