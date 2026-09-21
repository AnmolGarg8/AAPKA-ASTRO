import { OtpProvider } from "./OtpProvider";
import { MockOtpProvider } from "./MockOtpProvider";
import { Msg91OtpProvider } from "./Msg91OtpProvider";
import { TwilioOtpProvider } from "./TwilioOtpProvider";
import { env } from "@/config/env";

export * from "./OtpProvider";

function createOtpProvider(): OtpProvider {
  switch (env.OTP_PROVIDER) {
    case "msg91":
      return new Msg91OtpProvider();
    case "twilio":
      return new TwilioOtpProvider();
    case "mock":
    default:
      return new MockOtpProvider();
  }
}

export const otpProvider: OtpProvider = createOtpProvider();
