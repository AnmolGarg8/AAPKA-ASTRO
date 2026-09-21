import http from "http";
import { Server, Socket } from "socket.io";
import { PresenceService } from "@/lib/redis/presence";
import { LiveQueueService } from "@/lib/redis/queue";

const PORT = parseInt(process.env.SOCKET_PORT || "3001", 10);

export function createSocketServer() {
  const httpServer = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", service: "Aapka Astro Socket.io Gateway" }));
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`[SOCKET CONNECTED]: ${socket.id}`);

    // Join Consultation Session Room
    socket.on("join_session", (sessionId: string) => {
      socket.join(`session:${sessionId}`);
      console.log(`Socket ${socket.id} joined session:${sessionId}`);
    });

    // Send Message in Active Session
    socket.on(
      "send_message",
      (data: {
        sessionId: string;
        senderId: string;
        senderRole: "USER" | "ASTROLOGER";
        text: string;
        attachmentType?: string;
        attachmentData?: any;
      }) => {
        const payload = {
          id: `msg-${Date.now()}`,
          ...data,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        // Broadcast to both client and astrologer in room
        io.to(`session:${data.sessionId}`).emit("new_message", payload);
      }
    );

    // Astrologer Presence Broadcast
    socket.on("update_presence", async (data: { status: any; message?: string }) => {
      await PresenceService.setPresence(data.status, data.message);
      io.emit("presence_changed", data);
    });

    // Queue updates
    socket.on("check_queue_status", async (userId: string) => {
      const queueStatus = await LiveQueueService.getPosition(userId);
      socket.emit("queue_status_update", queueStatus);
    });

    socket.on("disconnect", () => {
      console.log(`[SOCKET DISCONNECTED]: ${socket.id}`);
    });
  });

  return { httpServer, io };
}

// If run directly via ts-node or node
if (process.env.RUN_STANDALONE_SOCKET === "true") {
  const { httpServer } = createSocketServer();
  httpServer.listen(PORT, () => {
    console.log(`🚀 Aapka Astro Socket.io server running on port ${PORT}`);
  });
}
