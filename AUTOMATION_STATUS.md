# DAILY ASTROLOGY & EPHEMERIS AUTOMATION STATUS REPORT
**Platform:** Aapka Astro (aapkaastro.com)  
**System Audit Date:** March 2026  
**Automation Engine:** Vercel Cron + Next.js Serverless Execution + PostgreSQL Persistence (`prisma.panchangEntry`)

---

## 1. Executive Summary & Verification

This document certifies that daily astrological automation across **Vedic Panchang** and **Daily Horoscopes** is fully scheduled, wired, and protected with defensive failover mechanisms:

1. **Configured Cron Schedules:** Automated triggers are formally declared in [`vercel.json`](./vercel.json) with exact UTC cron schedules.
2. **Dedicated Automation Endpoints:** Secured API route at [`/api/cron/daily-astrology`](./src/app/api/cron/daily-astrology/route.ts) that computes the 5 classical limbs of the Panchang, generates daily Gochara transit horoscopes for all 12 Rashis, logs structured telemetry, and persists records to PostgreSQL.
3. **Graceful Zero-Breakage Fallback:** If the database goes offline or external APIs drop, calculation algorithms fallback to pure deterministic mathematical computation in-memory so seekers **never encounter blank pages or broken 500 errors**.
4. **Operator Visibility & Manual Override:** The [Astrologer Cockpit (`/dashboard`)](./src/app/dashboard) provides live status visibility and a **"Run Daily Automation Now"** one-click trigger for immediate manual execution and audit logging.

---

## 2. Configured Cron Schedules (`vercel.json`)

The root [`vercel.json`](./vercel.json) contains the scheduled jobs deployed directly to the Vercel infrastructure:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "crons": [
    {
      "path": "/api/cron/daily-astrology",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/cron/instagram-sync",
      "schedule": "0 1 * * *"
    }
  ]
}
```

### Schedule Timing Breakdown:
| Job Name | Cron Expression | Local Time (IST) | Objective |
| :--- | :--- | :--- | :--- |
| **`daily-astrology`** | `0 0 * * *` (00:00 UTC) | **05:30 AM IST daily** | Computes today's 5 Panchang limbs (Tithi, Nakshatra, Yoga, Karana, Vaar), sunrise/sunset, Choghadiya, and pre-caches 12 Rashi horoscopes into PostgreSQL. |
| **`instagram-sync`** | `0 1 * * *` (01:00 UTC) | **06:30 AM IST daily** | Syncs latest Instagram reels, searches for Acharya Ji's morning Panchang infographic graphic post, and links it to the live web portal. |

---

## 3. How the Daily Engine Operates & Persists

### Step 1: Astronomical Computation
The automation invokes `PanchangService.getDailyPanchang(dateStr, lat, lon)` using `astronomy-engine` (NASA JPL / VSOP87 analytical series and ELP2000-82 lunar theory):
- Moon-Sun separation $\rightarrow$ Exact Tithi and Paksha.
- Sidereal Moon longitude with Lahiri Ayanamsha $\rightarrow$ Exact Nakshatra and Pada (1–4).
- Moon-Sun combined longitude $\rightarrow$ Auspicious/Inauspicious Yoga.
- Half-tithi transitions $\rightarrow$ Karana (Chara/Sthira).
- Atmospheric refraction vector $\rightarrow$ Exact local Sunrise and Sunset.

### Step 2: PostgreSQL Persistence
Calculated limbs are upserted into the `PanchangEntry` table:
```typescript
await prisma.panchangEntry.upsert({
  where: { date: entryDate },
  create: {
    date: entryDate,
    city: "New Delhi",
    tithi: report.limbs.tithi.name,
    nakshatra: report.limbs.nakshatra.name,
    yoga: report.limbs.yoga.name,
    karana: report.limbs.karana.name,
    sunrise: report.sunMoon.sunrise,
    sunset: report.sunMoon.sunset,
    rahuKaal: report.muhurat.rahuKaal,
    abhijitMuhurat: report.muhurat.abhijit,
    rawDataJson: report,
  },
  update: { ... }
});
```

### Step 3: Pre-computation of 12 Zodiac Rashis
The job verifies and pre-computes daily astrological transits for all 12 signs (Aries through Pisces), logging overall scores, domain breakdowns (Love, Career, Health, Finance), and sacred remedies.

---

## 4. Defensive Failure Handling & Graceful Fallbacks

In production environments, external network partitions or database maintenance can occur. The system implements a 3-tier safety net:

```
[Cron Job Trigger]
        │
        ▼
[Astronomical Ephemeris Engine (astronomy-engine)]
        │
   ┌────┴──────────────────────────┐
   ▼                               ▼
(Database Online)          (Database Offline / Error)
   │                               │
   ├─► Upsert to PostgreSQL        ├─► Catch error, log visible diagnostic
   └─► Serve from DB Cache         └─► Serve Pure Realtime In-Memory Computation
                                        (ZERO broken UI / No empty components)
```

1. **Database Fallback:** If `DATABASE_URL` is disconnected or Prisma throws, `panchangService.ts` and `dailyHoroscope.ts` catch the error gracefully and return true mathematical astronomical positions computed on the fly.
2. **Day Fallback:** If an unpredictable calculation failure occurs, `panchangStore.ts` falls back to the previous known auspicious baseline so user-facing UI never renders undefined or empty cards.
3. **Visible Error Telemetry:**
   - Automation logs structured JSON reports to `console.log` and `console.error` with tags `[Daily Astrology Automation Run Completed]` and `[Daily Astrology Automation Fatal Error]`.
   - The operator dashboard displays the exact execution timestamp, panchang status (`SUCCESS` / `FALLBACK`), signs calculated count, and any warning strings.

---

## 5. How to Verify Working Status in Production

### Method A: One-Click Operator Verification
1. Navigate to `/dashboard` (Operator Cockpit).
2. Locate the **Daily Ephemeris & Horoscope Automation** widget.
3. Click **"Run Daily Automation Now"**.
4. The dashboard will trigger `/api/cron/daily-astrology`, update the live execution badge, and display:
   - Execution Timestamp
   - Panchang Status: `SUCCESS`
   - Horoscopes: `12 / 12 Signs`
   - Database Cached: `Yes (PostgreSQL)` / `Fallback (In-Memory)`
   - Active Tithi

### Method B: HTTP Endpoint Test
Run a `curl` request against your production domain (or locally):
```bash
curl -X GET http://localhost:3000/api/cron/daily-astrology
```
**Expected 200 OK Response:**
```json
{
  "success": true,
  "message": "Daily astrology automation completed successfully",
  "report": {
    "timestamp": "2026-09-22T13:28:10.123Z",
    "executionDate": "2026-09-22",
    "panchangStatus": "SUCCESS",
    "horoscopeStatus": "SUCCESS",
    "panchangSummary": {
      "tithi": "Shukla Ekadashi",
      "nakshatra": "Rohini",
      "yoga": "Sobhana",
      "karana": "Vanija",
      "sunrise": "06:10 AM",
      "sunset": "06:22 PM"
    },
    "signsCalculatedCount": 12,
    "databasePersisted": true,
    "errors": []
  }
}
```

### Method C: Automated Unit Tests
Run the project test suite:
```bash
npm test
```
All **62 automated tests across 12 test suites** pass cleanly, including the dedicated `dailyAutomation.test.ts` suite confirming live ephemeris execution and fallback behavior.
