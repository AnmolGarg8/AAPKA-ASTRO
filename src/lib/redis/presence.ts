import { redis } from "./client";
import { AstrologerStatus } from "@/lib/store/astrologerStore";

const PRESENCE_KEY = "astro:presence";
const PRESENCE_TTL_SECONDS = 120; // 2 minutes heartbeat TTL

export interface PresencePayload {
  status: AstrologerStatus;
  statusMessage?: string;
  lastHeartbeat: string;
  nextAvailableAt?: string;
}

// In-memory fallback for local environments without running Redis server
let memoryPresence: PresencePayload = {
  status: "AVAILABLE",
  statusMessage: "Available right now for 1-on-1 consultations",
  lastHeartbeat: new Date().toISOString(),
  nextAvailableAt: "Tomorrow, 10:00 AM IST",
};

export class PresenceService {
  static async getPresence(): Promise<PresencePayload> {
    try {
      if (redis.status === "ready") {
        const raw = await redis.get(PRESENCE_KEY);
        if (raw) {
          return JSON.parse(raw);
        }
      }
    } catch (e) {
      // Fallback to memory
    }
    return memoryPresence;
  }

  static async setPresence(
    status: AstrologerStatus,
    statusMessage?: string,
    nextAvailableAt?: string
  ): Promise<PresencePayload> {
    const payload: PresencePayload = {
      status,
      statusMessage:
        statusMessage ||
        (status === "AVAILABLE"
          ? "Available right now for 1-on-1 consultations"
          : status === "BUSY"
          ? "Currently reading a client chart"
          : status === "BREAK"
          ? "On a brief tea/sadhana break"
          : "Offline. Pre-book an appointment slot"),
      lastHeartbeat: new Date().toISOString(),
      nextAvailableAt,
    };

    memoryPresence = payload;

    try {
      if (redis.status === "ready") {
        await redis.set(PRESENCE_KEY, JSON.stringify(payload), "EX", PRESENCE_TTL_SECONDS);
        // Publish presence change event on Redis channel for Socket.io listener
        await redis.publish("astro:events:presence", JSON.stringify(payload));
      }
    } catch (e) {
      // Redis unavailable; memory updated
    }

    return payload;
  }

  static async heartbeat(): Promise<void> {
    const current = await this.getPresence();
    await this.setPresence(current.status, current.statusMessage, current.nextAvailableAt);
  }
}
