import crypto from "crypto";
import { CallProvider, CallTokenResponse } from "./CallProvider";
import { env } from "@/config/env";

export class AgoraCallProvider implements CallProvider {
  readonly name = "agora";

  async generateToken(
    channelName: string,
    uid: string | number,
    role: "publisher" | "subscriber" = "publisher"
  ): Promise<CallTokenResponse> {
    const appId = env.AGORA_APP_ID || "agora_test_app_id";
    const appCertificate = env.AGORA_APP_CERTIFICATE;
    const expirationTimeInSeconds = 3600; // 1 hour token validity

    // Standard Agora RTC v006/v007 token structure simulation
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    let token = "";
    if (appCertificate && appCertificate !== "agora_mock_certificate") {
      const message = `${appId}${channelName}${uid}${privilegeExpiredTs}${role}`;
      const signature = crypto
        .createHmac("sha256", appCertificate)
        .update(message)
        .digest("hex");
      token = `007${Buffer.from(signature).toString("base64")}`;
    } else {
      token = `mock_agora_rtc_token_${channelName}_${uid}_${privilegeExpiredTs}`;
    }

    return {
      channelName,
      token,
      appId,
      uid,
      expiresInSeconds: expirationTimeInSeconds,
    };
  }
}
