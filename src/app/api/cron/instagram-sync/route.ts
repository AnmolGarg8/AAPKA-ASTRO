import { NextRequest, NextResponse } from "next/server";
import { InstagramSyncService } from "@/lib/services/instagramSyncService";

export async function GET(req: NextRequest) {
  try {
    // Check optional authorization bearer token for cron jobs
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      // In production, protect cron routes from unauthorized invocation
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { success: false, message: "Unauthorized cron execution" },
          { status: 401 }
        );
      }
    }

    const result = await InstagramSyncService.syncMedia();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result,
      message: `Successfully synchronized ${result.syncedCount} Instagram media items. Panchang graphic detected: ${result.panchangFound}`,
    });
  } catch (err: any) {
    console.error("[Cron Instagram Sync Error]:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to execute Instagram sync" },
      { status: 500 }
    );
  }
}
