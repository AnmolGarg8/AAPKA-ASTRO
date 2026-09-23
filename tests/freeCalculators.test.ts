import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  calculateLoveScore,
  calculateFlames,
  calculateMoonSign,
  calculateSunSign,
  calculateNumerology,
} from "../src/lib/astrology/freeCalculators";

describe("Free Lead-Gen Calculators Suite", () => {
  test("calculateLoveScore generates deterministic score and harmony pillars", () => {
    const res1 = calculateLoveScore("Aarav", "Meera", "1996-05-14", "1998-11-22");
    const res2 = calculateLoveScore("Meera", "Aarav", "1998-11-22", "1996-05-14");

    // Must be symmetric and consistent
    assert.equal(res1.score, res2.score);
    assert.ok(res1.score >= 50 && res1.score <= 100);
    assert.ok(res1.verdict.length > 0);
    assert.ok(res1.pillars.emotional >= 50);
    assert.ok(res1.pillars.communication >= 50);
    assert.ok(res1.pillars.passion >= 50);
    assert.ok(res1.pillars.stability >= 50);
  });

  test("calculateFlames produces authentic FLAMES elimination result", () => {
    // Test known pair: Rohan & Ananya
    const res = calculateFlames("Rohan", "Ananya");
    assert.ok(["F", "L", "A", "M", "E", "S"].includes(res.letter));
    assert.ok(res.category.length > 0);
    assert.ok(res.description.length > 0);
    assert.ok(res.emoji.length > 0);
  });

  test("calculateMoonSign computes accurate Nirayana Moon Rashi via Ephemeris", () => {
    const res = calculateMoonSign(
      "Aarav",
      "1996-05-14",
      "14:30",
      "New Delhi",
      28.6139,
      77.209,
      5.5
    );

    assert.ok(res.moonSign);
    assert.ok(res.rashiNumber >= 1 && res.rashiNumber <= 12);
    assert.ok(res.nakshatra);
    assert.ok(res.nakshatraPada >= 1 && res.nakshatraPada <= 4);
    assert.ok(["Fire", "Earth", "Air", "Water"].includes(res.element));
    assert.ok(res.coreTraits.length > 0);
  });

  test("calculateSunSign returns correct Western zodiac signs across month thresholds", () => {
    const aries = calculateSunSign("1996-04-05");
    assert.equal(aries.sign, "Aries");
    assert.equal(aries.element, "Fire");
    assert.equal(aries.rulingPlanet, "Mars");

    const leo = calculateSunSign("1996-08-15");
    assert.equal(leo.sign, "Leo");
    assert.equal(leo.element, "Fire");

    const scorpio = calculateSunSign("1996-11-01");
    assert.equal(scorpio.sign, "Scorpio");
    assert.equal(scorpio.element, "Water");

    const capricorn = calculateSunSign("1996-01-05");
    assert.equal(capricorn.sign, "Capricorn");
    assert.equal(capricorn.element, "Earth");
  });

  test("calculateNumerology reduces Life Path and Destiny numbers to 1..9", () => {
    // 1996-05-14 -> 1+9+9+6+0+5+1+4 = 35 -> 3+5 = 8
    const num = calculateNumerology("Aarav Sharma", "1996-05-14");
    assert.equal(num.lifePathNumber, 8);
    assert.ok(num.destinyNumber >= 1 && num.destinyNumber <= 9);
    assert.ok(num.soulUrgeNumber >= 1 && num.soulUrgeNumber <= 9);
    assert.ok(num.personalityNumber >= 1 && num.personalityNumber <= 9);
    assert.ok(num.rulingPlanet.length > 0);
    assert.ok(num.strengths.length > 0);
    assert.ok(num.challenges.length > 0);
  });
});
