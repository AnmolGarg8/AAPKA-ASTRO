import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { computeRealtimePanchang } from "../src/lib/astrology/realtimePanchang";
import { getPanchangForCity, CITIES_LIST } from "../src/lib/store/panchangStore";
import { DailyHoroscopeService, ZODIAC_SIGNS } from "../src/lib/astrology/dailyHoroscope";
import { PanchangService } from "../src/lib/services/panchangService";

describe("Daily Astrology Automation & Graceful Fallback Engine", () => {
  test("computes live astronomical Panchang with all 5 classical limbs", () => {
    const panchang = computeRealtimePanchang("delhi", new Date());

    assert.ok(panchang.tithi.name.length > 0);
    assert.ok(panchang.nakshatra.name.length > 0);
    assert.ok(panchang.nakshatra.pada >= 1 && panchang.nakshatra.pada <= 4);
    assert.ok(panchang.yoga.name.length > 0);
    assert.ok(panchang.karana.name.length > 0);
    assert.ok(panchang.vaar.length > 0);
    assert.match(panchang.sunTimes.sunrise, /^\d{2}:\d{2}\s(AM|PM)$/);
    assert.match(panchang.sunTimes.sunset, /^\d{2}:\d{2}\s(AM|PM)$/);
    assert.ok(panchang.moonTimes.moonSign.length > 0);
    assert.ok(panchang.auspiciousTimings.abhijitMuhurat.length > 0);
    assert.ok(panchang.inauspiciousTimings.rahuKaal.length > 0);
  });

  test("getPanchangForCity falls back gracefully for any valid or invalid city ID without throwing", () => {
    for (const city of CITIES_LIST) {
      const p = getPanchangForCity(city.id);
      assert.ok(p);
      assert.equal(p.city, city.name);
      assert.ok(p.tithi.name.length > 0);
    }

    // Invalid city fallback
    const fallback = getPanchangForCity("non-existent-city");
    assert.ok(fallback);
    assert.equal(fallback.city, "New Delhi");
    assert.ok(fallback.nakshatra.name.length > 0);
  });

  test("computes daily horoscope predictions across all 12 signs without broken content", () => {
    assert.equal(ZODIAC_SIGNS.length, 12);

    for (const sign of ZODIAC_SIGNS) {
      const horoscope = DailyHoroscopeService.getHoroscope(sign.id, 0);
      assert.ok(horoscope, `Failed to generate horoscope for ${sign.id}`);
      assert.equal(horoscope.sign.id, sign.id);
      assert.ok(horoscope.summary.length > 20);
      assert.ok(horoscope.summaryHindi.length > 20);
      assert.ok(horoscope.love.description.length > 10);
      assert.ok(horoscope.career.description.length > 10);
      assert.ok(horoscope.health.description.length > 10);
      assert.ok(horoscope.finance.description.length > 10);
      assert.ok(horoscope.luckyColor.length > 0);
      assert.ok(horoscope.luckyNumber > 0);
      assert.ok(horoscope.remedy.length > 10);
    }
  });

  test("PanchangService produces valid report with fallback when DB is unreachable", async () => {
    const report = await PanchangService.getDailyPanchang();
    assert.ok(report);
    assert.ok(report.limbs.tithi.name.length > 0);
    assert.ok(report.limbs.nakshatra.name.length > 0);
    assert.ok(report.sunMoon.sunrise.length > 0);
    assert.ok(report.sunMoon.sunset.length > 0);
  });
});
