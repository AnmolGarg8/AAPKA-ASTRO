import { NextRequest, NextResponse } from "next/server";
import { LiveQueueService } from "@/lib/redis/queue";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const all = searchParams.get("all");

  if (all === "true") {
    const list = await LiveQueueService.getAllWaiting();
    return NextResponse.json({ clients: list });
  }

  if (userId) {
    const status = await LiveQueueService.getPosition(userId);
    return NextResponse.json(status);
  }

  return NextResponse.json(
    { success: false, message: "userId parameter is required" },
    { status: 400 }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, userName, userIdentifier, userPhone, consultationType, concern, birthDetails } = body;
    const identifier = userIdentifier || userPhone;

    if (!userId || !userName || !identifier) {
      return NextResponse.json(
        { success: false, message: "Missing required client fields (userId, userName, userIdentifier)" },
        { status: 400 }
      );
    }

    const queueStatus = await LiveQueueService.enqueue({
      userId,
      userName,
      userIdentifier: identifier,
      userPhone: userPhone || identifier,
      consultationType: consultationType || "chat",
      concern: concern || "General Vedic life guidance",
      birthDetails: birthDetails || {
        name: userName,
        gender: "male",
        birthDate: "1995-10-24",
        birthTime: "14:35",
        birthPlace: "New Delhi, Delhi",
        latitude: 28.6139,
        longitude: 77.209,
        timezone: 5.5,
      },
    });

    return NextResponse.json(queueStatus);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to join queue" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const action = searchParams.get("action");

  if (action === "next") {
    // Astrologer dequeues next client
    const nextClient = await LiveQueueService.dequeueNext();
    return NextResponse.json({ nextClient });
  }

  if (userId) {
    await LiveQueueService.leaveQueue(userId);
    return NextResponse.json({ success: true, message: "Left queue" });
  }

  return NextResponse.json({ success: false, message: "Missing parameter" }, { status: 400 });
}
