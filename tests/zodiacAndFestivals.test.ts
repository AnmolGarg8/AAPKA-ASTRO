import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { ZODIAC_SIGNS_EVERGREEN, getZodiacSignBySlug } from "../src/lib/astrology/zodiacHubData";
import {
  FESTIVALS_2026,
  getFestivalsByMonth,
  getFestivalsByCategory,
  getUpcomingFestivals,
} from "../src/lib/astrology/festivalService";

describe("Zodiac Signs Evergreen Hub Data", () => {
  test("contains all 12 classical zodiac signs with complete encyclopedic metadata", () => {
    assert.equal(ZODIAC_SIGNS_EVERGREEN.length, 12);

    const expectedSlugs = [
      "aries",
      "taurus",
      "gemini",
      "cancer",
      "leo",
      "virgo",
      "libra",
      "scorpio",
      "sagittarius",
      "capricorn",
      "aquarius",
      "pisces",
    ];

    for (const slug of expectedSlugs) {
      const sign = getZodiacSignBySlug(slug);
      assert.ok(sign, `Missing sign for slug ${slug}`);
      assert.ok(sign.name.length > 0);
      assert.ok(sign.vedicName.length > 0);
      assert.ok(sign.glyph.length > 0);
      assert.ok(sign.overview.length > 50);
      assert.ok(sign.personality.strengths.length >= 3);
      assert.ok(sign.personality.weaknesses.length >= 3);
      assert.ok(sign.loveCompatibility.bestMatches.length >= 2);
      assert.ok(sign.careerAndWealth.idealCareers.length >= 3);
      assert.ok(sign.healthAndVitality.rulingBodyParts.length > 0);
      assert.ok(sign.sacredMantra.length > 10);
      assert.ok(sign.luckyGemstone.length > 0);
    }
  });

  test("returns undefined for unknown zodiac slug", () => {
    assert.equal(getZodiacSignBySlug("ophiuchus"), undefined);
    assert.equal(getZodiacSignBySlug("unknown"), undefined);
  });
});

describe("Hindu Festival & Vrat Service", () => {
  test("contains comprehensive festival calendar dataset for 2026", () => {
    assert.ok(FESTIVALS_2026.length >= 20);

    for (const f of FESTIVALS_2026) {
      assert.ok(f.id.length > 0);
      assert.ok(f.name.length > 0);
      assert.ok(f.nameHindi.length > 0);
      assert.match(f.date, /^\d{4}-\d{2}-\d{2}$/);
      assert.ok(f.tithi.length > 0);
      assert.ok(f.significance.length > 20);
      assert.ok(f.rituals.length >= 1);
      assert.ok(f.deity.length > 0);
    }
  });

  test("filters festivals correctly by month number", () => {
    const marchFestivals = getFestivalsByMonth(3);
    assert.ok(marchFestivals.length > 0);
    for (const f of marchFestivals) {
      assert.equal(f.date.startsWith("2026-03"), true);
    }

    const octFestivals = getFestivalsByMonth(10);
    assert.ok(octFestivals.length > 0);
    for (const f of octFestivals) {
      assert.equal(f.date.startsWith("2026-10"), true);
    }
  });

  test("filters festivals correctly by category", () => {
    const ekadashis = getFestivalsByCategory("Ekadashi");
    assert.ok(ekadashis.length >= 3);
    for (const e of ekadashis) {
      assert.equal(e.category, "Ekadashi");
      assert.ok(e.name.toLowerCase().includes("ekadashi"));
    }

    const sankrantis = getFestivalsByCategory("Sankranti");
    assert.ok(sankrantis.length >= 1);
    for (const s of sankrantis) {
      assert.equal(s.category, "Sankranti");
    }
  });

  test("retrieves upcoming festivals from a reference date", () => {
    const upcoming = getUpcomingFestivals("2026-01-01", 5);
    assert.equal(upcoming.length, 5);
    assert.ok(upcoming[0].date >= "2026-01-01");
    // Ensure chronological order
    for (let i = 0; i < upcoming.length - 1; i++) {
      assert.ok(upcoming[i].date <= upcoming[i + 1].date);
    }
  });
});
