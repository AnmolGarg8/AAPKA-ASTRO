export interface CallTokenResponse {
  channelName: string;
  token: string;
  appId: string;
  uid: string | number;
  expiresInSeconds: number;
}

export interface CallProvider {
  readonly name: string;
  generateToken(
    channelName: string,
    uid: string | number,
    role: "publisher" | "subscriber"
  ): Promise<CallTokenResponse>;
}
