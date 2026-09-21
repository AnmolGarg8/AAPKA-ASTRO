import { NextRequest, NextResponse } from "next/server";
import { callProvider } from "@/lib/providers/call";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { channelName, uid, role } = body;

    if (!channelName) {
      return NextResponse.json(
        { success: false, message: "channelName is required" },
        { status: 400 }
      );
    }

    const tokenResponse = await callProvider.generateToken(
      channelName,
      uid || `user_${Date.now().toString().slice(-4)}`,
      role || "publisher"
    );

    return NextResponse.json({
      success: true,
      provider: callProvider.name,
      ...tokenResponse,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to generate call token" },
      { status: 500 }
    );
  }
}
