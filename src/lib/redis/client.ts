import Redis from "ioredis";
import { env } from "@/config/env";

declare global {
  // eslint-disable-next-line no-var
  var redisGlobal: Redis | undefined;
}

function createRedisClient(): Redis {
  const client = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: 2,
    lazyConnect: true,
    retryStrategy(times) {
      if (times > 3) {
        return null; // Stop retrying if Redis is not running locally
      }
      return Math.min(times * 100, 1000);
    },
  });

  client.on("error", (err) => {
    // Log once and handle gracefully without crashing the app in dev mode
    if (process.env.NODE_ENV !== "production") {
      console.warn("⚠️ Redis connection notice (falling back to memory cache):", err.message);
    } else {
      console.error("❌ Redis connection error:", err);
    }
  });

  return client;
}

export const redis = globalThis.redisGlobal ?? createRedisClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.redisGlobal = redis;
}
