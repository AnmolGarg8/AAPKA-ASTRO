import { NextRequest, NextResponse } from "next/server";
import { PresenceService } from "@/lib/redis/presence";

export async function GET() {
  const presence = await PresenceService.getPresence();
  return NextResponse.json(presence);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { status, statusMessage, nextAvailableAt } = body;

    if (!status) {
      return NextResponse.json(
        { success: false, message: "Status is required" },
        { status: 400 }
      );
    }

    const updated = await PresenceService.setPresence(status, statusMessage, nextAvailableAt);
    return NextResponse.json({ success: true, presence: updated });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update presence" },
      { status: 500 }
    );
  }
}
