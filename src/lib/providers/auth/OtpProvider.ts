export interface SendOtpResult {
  success: boolean;
  message: string;
  sessionId?: string;
  isMock?: boolean;
}

export interface VerifyOtpResult {
  success: boolean;
  message: string;
}

export interface OtpProvider {
  readonly name: string;
  sendOtp(phone: string): Promise<SendOtpResult>;
  verifyOtp(phone: string, otp: string, sessionId?: string): Promise<VerifyOtpResult>;
}
