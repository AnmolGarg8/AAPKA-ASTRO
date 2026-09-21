import { redis } from "./client";

const QUEUE_ZSET_KEY = "astro:live_queue";
const QUEUE_META_PREFIX = "astro:queue:meta:";

export interface EnqueuedClientData {
  userId: string;
  userName: string;
  userPhone: string;
  consultationType: "chat" | "call";
  concern: string;
  birthDetails: {
    name: string;
    gender: "male" | "female" | "other";
    birthDate: string;
    birthTime: string;
    birthPlace: string;
    latitude: number;
    longitude: number;
    timezone: number;
  };
  enqueuedAt: string;
}

export interface ClientQueueStatus {
  inQueue: boolean;
  position: number; // 1-indexed (e.g. 1 = next in line)
  totalInQueue: number;
  estimatedWaitMinutes: number;
  clientData?: EnqueuedClientData;
}

// In-memory fallback
let memoryQueue: EnqueuedClientData[] = [];

export class LiveQueueService {
  /**
   * Add client to the live waiting queue using Redis Sorted Sets (scored by timestamp)
   */
  static async enqueue(client: Omit<EnqueuedClientData, "enqueuedAt">): Promise<ClientQueueStatus> {
    const timestamp = Date.now();
    const data: EnqueuedClientData = {
      ...client,
      enqueuedAt: new Date(timestamp).toISOString(),
    };

    // Update in-memory
    memoryQueue = memoryQueue.filter((c) => c.userId !== client.userId);
    memoryQueue.push(data);

    try {
      if (redis.status === "ready") {
        await redis.zadd(QUEUE_ZSET_KEY, timestamp, client.userId);
        await redis.set(
          `${QUEUE_META_PREFIX}${client.userId}`,
          JSON.stringify(data),
          "EX",
          3600 // 1 hour max wait TTL
        );
        await redis.publish(
          "astro:events:queue",
          JSON.stringify({ event: "client_enqueued", userId: client.userId })
        );
      }
    } catch {
      // In-memory handles fallback
    }

    return this.getPosition(client.userId);
  }

  /**
   * Get client's exact queue rank and estimated wait time
   */
  static async getPosition(userId: string): Promise<ClientQueueStatus> {
    try {
      if (redis.status === "ready") {
        const rank = await redis.zrank(QUEUE_ZSET_KEY, userId);
        const total = await redis.zcard(QUEUE_ZSET_KEY);

        if (rank !== null) {
          const rawMeta = await redis.get(`${QUEUE_META_PREFIX}${userId}`);
          const clientData = rawMeta ? JSON.parse(rawMeta) : undefined;
          const pos = rank + 1;
          return {
            inQueue: true,
            position: pos,
            totalInQueue: total,
            estimatedWaitMinutes: pos * 7,
            clientData,
          };
        }
      }
    } catch {
      // Fall through to memory
    }

    const idx = memoryQueue.findIndex((c) => c.userId === userId);
    if (idx !== -1) {
      const pos = idx + 1;
      return {
        inQueue: true,
        position: pos,
        totalInQueue: memoryQueue.length,
        estimatedWaitMinutes: pos * 7,
        clientData: memoryQueue[idx],
      };
    }

    return {
      inQueue: false,
      position: 0,
      totalInQueue: memoryQueue.length,
      estimatedWaitMinutes: 0,
    };
  }

  /**
   * Astrologer accepts and dequeues the next waiting client
   */
  static async dequeueNext(): Promise<EnqueuedClientData | null> {
    try {
      if (redis.status === "ready") {
        // Fetch first member (lowest score = oldest waiting)
        const nextIds = await redis.zrange(QUEUE_ZSET_KEY, 0, "0");
        if (nextIds.length > 0) {
          const userId = nextIds[0];
          const rawMeta = await redis.get(`${QUEUE_META_PREFIX}${userId}`);
          await redis.zrem(QUEUE_ZSET_KEY, userId);
          await redis.del(`${QUEUE_META_PREFIX}${userId}`);

          memoryQueue = memoryQueue.filter((c) => c.userId !== userId);

          if (rawMeta) {
            return JSON.parse(rawMeta);
          }
        }
      }
    } catch {
      // Fall through to memory
    }

    if (memoryQueue.length > 0) {
      return memoryQueue.shift() || null;
    }

    return null;
  }

  /**
   * Remove client from queue if they cancel or navigate away
   */
  static async leaveQueue(userId: string): Promise<void> {
    memoryQueue = memoryQueue.filter((c) => c.userId !== userId);

    try {
      if (redis.status === "ready") {
        await redis.zrem(QUEUE_ZSET_KEY, userId);
        await redis.del(`${QUEUE_META_PREFIX}${userId}`);
      }
    } catch {
      // Ignored
    }
  }

  /**
   * Get all currently waiting clients for the Astrologer Cockpit view
   */
  static async getAllWaiting(): Promise<EnqueuedClientData[]> {
    try {
      if (redis.status === "ready") {
        const userIds = await redis.zrange(QUEUE_ZSET_KEY, 0, "-1");
        if (userIds.length > 0) {
          const keys = userIds.map((id) => `${QUEUE_META_PREFIX}${id}`);
          const metas = await redis.mget(keys);
          return metas.filter(Boolean).map((m) => JSON.parse(m as string));
        }
        return [];
      }
    } catch {
      // Fall through to memory
    }

    return memoryQueue;
  }
}
