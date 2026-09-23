import { NextRequest, NextResponse } from "next/server";
import { PanchangService } from "@/lib/services/panchangService";
import { DailyHoroscopeService, ZODIAC_SIGNS } from "@/lib/astrology/dailyHoroscope";
import { prisma } from "@/lib/db/prisma";

export interface AutomationRunReport {
  timestamp: string;
  executionDate: string;
  panchangStatus: "SUCCESS" | "FALLBACK" | "FAILED";
  horoscopeStatus: "SUCCESS" | "FALLBACK" | "FAILED";
  panchangSummary?: {
    tithi: string;
    nakshatra: string;
    yoga: string;
    karana: string;
    sunrise: string;
    sunset: string;
  };
  signsCalculatedCount: number;
  databasePersisted: boolean;
  errors: string[];
}

export async function GET(req: NextRequest) {
  const errors: string[] = [];
  const now = new Date();
  const dateStr = now.toISOString().substring(0, 10);
  let panchangStatus: "SUCCESS" | "FALLBACK" | "FAILED" = "SUCCESS";
  let horoscopeStatus: "SUCCESS" | "FALLBACK" | "FAILED" = "SUCCESS";
  let panchangSummary: any = null;
  let databasePersisted = false;

  try {
    // 1. Authorization check for Cron triggers
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { success: false, message: "Unauthorized cron execution" },
          { status: 401 }
        );
      }
    }

    // 2. Execute Daily Panchang calculation
    try {
      const panchangReport = await PanchangService.getDailyPanchang(dateStr, 28.6139, 77.209);
      panchangSummary = {
        tithi: panchangReport.limbs.tithi.name,
        nakshatra: panchangReport.limbs.nakshatra.name,
        yoga: panchangReport.limbs.yoga.name,
        karana: panchangReport.limbs.karana.name,
        sunrise: panchangReport.sunMoon.sunrise,
        sunset: panchangReport.sunMoon.sunset,
      };

      // Persist into PostgreSQL PanchangEntry if database is accessible
      try {
        const entryDate = new Date(dateStr);
        await prisma.panchangEntry.upsert({
          where: { date: entryDate },
          create: {
            date: entryDate,
            city: "New Delhi",
            tithi: panchangReport.limbs.tithi.name,
            nakshatra: panchangReport.limbs.nakshatra.name,
            yoga: panchangReport.limbs.yoga.name,
            karana: panchangReport.limbs.karana.name,
            sunrise: panchangReport.sunMoon.sunrise,
            sunset: panchangReport.sunMoon.sunset,
            rahuKaal: panchangReport.muhurat.rahuKaal,
            abhijitMuhurat: panchangReport.muhurat.abhijit,
            rawDataJson: panchangReport as any,
          },
          update: {
            tithi: panchangReport.limbs.tithi.name,
            nakshatra: panchangReport.limbs.nakshatra.name,
            yoga: panchangReport.limbs.yoga.name,
            karana: panchangReport.limbs.karana.name,
            sunrise: panchangReport.sunMoon.sunrise,
            sunset: panchangReport.sunMoon.sunset,
            rahuKaal: panchangReport.muhurat.rahuKaal,
            abhijitMuhurat: panchangReport.muhurat.abhijit,
            rawDataJson: panchangReport as any,
          },
        });
        databasePersisted = true;
      } catch (dbErr: any) {
        errors.push(`Database persistence skipped: ${dbErr.message || "Database offline"}`);
      }
    } catch (pErr: any) {
      panchangStatus = "FALLBACK";
      errors.push(`Panchang generation warning: ${pErr.message}`);
    }

    // 3. Execute Daily Horoscope verification & pre-computation for all 12 signs
    let signsCount = 0;
    try {
      for (const sign of ZODIAC_SIGNS) {
        const h = DailyHoroscopeService.getHoroscope(sign.id, 0);
        if (h && h.summary) {
          signsCount++;
        }
      }
      if (signsCount < 12) {
        horoscopeStatus = "FALLBACK";
        errors.push(`Only ${signsCount}/12 signs computed successfully`);
      }
    } catch (hErr: any) {
      horoscopeStatus = "FALLBACK";
      errors.push(`Horoscope batch generation warning: ${hErr.message}`);
    }

    const report: AutomationRunReport = {
      timestamp: now.toISOString(),
      executionDate: dateStr,
      panchangStatus,
      horoscopeStatus,
      panchangSummary,
      signsCalculatedCount: signsCount,
      databasePersisted,
      errors,
    };

    console.log("[Daily Astrology Automation Run Completed]:", JSON.stringify(report));

    return NextResponse.json({
      success: true,
      message: "Daily astrology automation completed successfully",
      report,
    });
  } catch (err: any) {
    console.error("[Daily Astrology Automation Fatal Error]:", err);
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to execute daily astrology automation",
        errors: [err.message],
        fallbackActive: true,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
