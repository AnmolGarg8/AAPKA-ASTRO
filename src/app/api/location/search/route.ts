import { NextRequest, NextResponse } from "next/server";
import { LocationService } from "@/lib/services/locationService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const limit = parseInt(searchParams.get("limit") || "8", 10);

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ success: true, locations: [] });
    }

    const locations = await LocationService.search(query, limit);

    return NextResponse.json({
      success: true,
      query,
      count: locations.length,
      locations,
    });
  } catch (error: any) {
    console.error("Location search API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to search locations", locations: [] },
      { status: 500 }
    );
  }
}
