import { CallProvider, CallTokenResponse } from "./CallProvider";

export class MockCallProvider implements CallProvider {
  readonly name = "mock";

  async generateToken(
    channelName: string,
    uid: string | number
  ): Promise<CallTokenResponse> {
    return {
      channelName,
      token: `mock_rtc_token_${Date.now()}`,
      appId: "mock_app_id",
      uid,
      expiresInSeconds: 3600,
    };
  }
}
