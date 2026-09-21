import { NextRequest, NextResponse } from "next/server";
import { PanchangService } from "@/lib/services/panchangService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date") || undefined;
    const lat = searchParams.get("lat") ? parseFloat(searchParams.get("lat")!) : 28.6139;
    const lon = searchParams.get("lon") ? parseFloat(searchParams.get("lon")!) : 77.209;

    const report = await PanchangService.getDailyPanchang(date, lat, lon);

    return NextResponse.json({
      success: true,
      data: report,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to calculate Panchang" },
      { status: 500 }
    );
  }
}
