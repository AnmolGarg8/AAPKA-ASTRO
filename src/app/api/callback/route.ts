import { NextRequest, NextResponse } from "next/server";
import { ClientAccountStore } from "@/lib/store/clientAccountStore";
import { sanitizeString } from "@/lib/security/inputSanitizer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientName, phone, topic, preferredSlot } = body;

    if (!clientName || !phone) {
      return NextResponse.json(
        { success: false, message: "Client name and contact information are required." },
        { status: 400 }
      );
    }

    const cleanName = sanitizeString(clientName);
    const cleanPhone = sanitizeString(phone);
    const cleanTopic = sanitizeString(topic || "General Astrological Guidance");
    const cleanSlot = sanitizeString(preferredSlot || "Anytime today");

    const record = ClientAccountStore.requestCallback({
      clientName: cleanName,
      phone: cleanPhone,
      topic: cleanTopic,
      preferredSlot: cleanSlot,
    });

    return NextResponse.json({
      success: true,
      message:
        "Callback request registered with Acharya Ji's sanctum. We will notify you via WhatsApp/Email as soon as he is online.",
      data: record,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to submit callback request." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const requests = ClientAccountStore.getCallbackRequests();
  return NextResponse.json({ success: true, requests });
}
