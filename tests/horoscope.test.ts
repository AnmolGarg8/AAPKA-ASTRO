import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { DailyHoroscopeService, ZODIAC_SIGNS } from "../src/lib/astrology/dailyHoroscope";

describe("Vedic Daily Horoscope Service", () => {
  test("returns all 12 zodiac signs with bilingual metadata", () => {
    const signs = DailyHoroscopeService.getAllSigns();
    assert.equal(signs.length, 12);
    
    // Verify each sign has required fields
    for (const sign of signs) {
      assert.ok(sign.id, "Sign must have id");
      assert.ok(sign.englishName, "Sign must have englishName");
      assert.ok(sign.hindiName, "Sign must have hindiName");
      assert.ok(sign.sanskritName, "Sign must have sanskritName");
      assert.ok(sign.symbol, "Sign must have symbol");
      assert.ok(sign.rulingPlanet, "Sign must have rulingPlanet");
      assert.ok(sign.rulingPlanetHindi, "Sign must have rulingPlanetHindi");
      assert.ok(sign.element, "Sign must have element");
    }
  });

  test("retrieves sign by valid ID (case-insensitive)", () => {
    const aries = DailyHoroscopeService.getSignById("aries");
    assert.ok(aries);
    assert.equal(aries?.englishName, "Aries");
    assert.equal(aries?.hindiName, "मेष");

    const scorpioUpper = DailyHoroscopeService.getSignById("SCORPIO");
    assert.ok(scorpioUpper);
    assert.equal(scorpioUpper?.englishName, "Scorpio");
    assert.equal(scorpioUpper?.hindiName, "वृश्चिक");
  });

  test("returns undefined for invalid sign ID", () => {
    const invalid = DailyHoroscopeService.getSignById("unknown-sign");
    assert.equal(invalid, undefined);
  });

  test("generates complete daily horoscope with domain scores and remedies", () => {
    const horoscope = DailyHoroscopeService.getHoroscope("leo");
    assert.ok(horoscope);
    assert.equal(horoscope?.sign.id, "leo");
    assert.equal(horoscope?.sign.englishName, "Leo");
    assert.ok(horoscope?.date);
    assert.ok(horoscope?.formattedDate);
    assert.ok(horoscope?.summary);
    assert.ok(horoscope?.summaryHindi);

    // Verify dimension breakdown
    assert.ok(horoscope?.love.score >= 0 && horoscope?.love.score <= 100);
    assert.ok(horoscope?.love.description.length > 0);
    assert.ok(horoscope?.love.descriptionHindi.length > 0);

    assert.ok(horoscope?.career.score >= 0 && horoscope?.career.score <= 100);
    assert.ok(horoscope?.health.score >= 0 && horoscope?.health.score <= 100);
    assert.ok(horoscope?.finance.score >= 0 && horoscope?.finance.score <= 100);

    // Verify lucky attributes and remedies
    assert.ok(horoscope?.luckyColor);
    assert.ok(horoscope?.luckyColorHindi);
    assert.ok(horoscope?.luckyNumber > 0);
    assert.ok(horoscope?.auspiciousTime);
    assert.ok(horoscope?.remedy);
    assert.ok(horoscope?.remedyHindi);
    assert.ok(horoscope?.planetaryTransit);
  });

  test("returns null for non-existent sign horoscope query", () => {
    const result = DailyHoroscopeService.getHoroscope("invalid_sign");
    assert.equal(result, null);
  });
});
