import { CallProvider } from "./CallProvider";
import { AgoraCallProvider } from "./AgoraCallProvider";
import { MockCallProvider } from "./MockCallProvider";
import { env } from "@/config/env";

export * from "./CallProvider";

function createCallProvider(): CallProvider {
  if (env.CALL_PROVIDER === "agora") {
    return new AgoraCallProvider();
  }
  return new MockCallProvider();
}

export const callProvider: CallProvider = createCallProvider();
