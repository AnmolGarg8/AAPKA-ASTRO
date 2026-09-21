import { NextRequest, NextResponse } from "next/server";
import { KundliService } from "@/lib/services/kundliService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { input, tier, action, chartData, userId } = body;

    if (action === "save") {
      const saveResult = await KundliService.saveKundli(input, chartData, userId);
      return NextResponse.json({ success: true, ...saveResult });
    }

    if (tier === "paid") {
      const interpretation = await KundliService.generatePaidInterpretation(input);
      return NextResponse.json({ success: true, interpretation });
    }

    const freeReport = await KundliService.generateFreeChart(input);
    return NextResponse.json({ success: true, report: freeReport });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to process Kundli request" },
      { status: 500 }
    );
  }
}
