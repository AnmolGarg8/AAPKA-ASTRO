import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { calculateKundli } from "../src/lib/astrology/chartCalculations";
import { PanchangService } from "../src/lib/services/panchangService";

describe("Real Astronomical Verification (5 Public Reference Charts & Panchang)", () => {
  // Case 1: Narendra Modi (17 Sep 1950, 11:00 AM IST, Vadnagar)
  test("Case 1: Narendra Modi matches published Vedic chart positions", () => {
    const chart = calculateKundli({
      name: "Narendra Modi",
      gender: "male",
      birthDate: "1950-09-17",
      birthTime: "11:00",
      birthPlace: "Vadnagar, Gujarat",
      latitude: 23.7833,
      longitude: 72.6333,
      timezone: 5.5,
    });

    // Lagna: Scorpio (Vrischika)
    assert.equal(chart.ascendant.rashiName, "Scorpio");
    assert.ok(chart.ascendant.degreesInSign >= 0 && chart.ascendant.degreesInSign <= 3);

    // Moon: Scorpio (Anuradha, Shani Dasha balance)
    const moon = chart.planets.find((p) => p.name === "Moon");
    assert.ok(moon);
    assert.equal(moon.rashiName, "Scorpio");
    assert.equal(moon.nakshatra, "Anuradha");
    assert.equal(chart.dashas[0].planet, "Saturn");

    // Mars: Scorpio in 1st house (Ruchaka Yoga)
    const mars = chart.planets.find((p) => p.name === "Mars");
    assert.ok(mars);
    assert.equal(mars.rashiName, "Scorpio");
    assert.equal(mars.house, 1);

    // Sun & Mercury in Virgo
    const sun = chart.planets.find((p) => p.name === "Sun");
    assert.equal(sun?.rashiName, "Virgo");
    const merc = chart.planets.find((p) => p.name === "Mercury");
    assert.equal(merc?.rashiName, "Virgo");
    assert.equal(merc?.isRetrograde, true); // Mercury was retrograde

    // Jupiter in Aquarius (Retrograde)
    const jup = chart.planets.find((p) => p.name === "Jupiter");
    assert.equal(jup?.rashiName, "Aquarius");
    assert.equal(jup?.isRetrograde, true);
  });

  // Case 2: Jawaharlal Nehru (14 Nov 1889, 23:03 IST, Allahabad)
  test("Case 2: Jawaharlal Nehru matches published Vedic chart positions", () => {
    const chart = calculateKundli({
      name: "Jawaharlal Nehru",
      gender: "male",
      birthDate: "1889-11-14",
      birthTime: "23:03",
      birthPlace: "Allahabad, UP",
      latitude: 25.467,
      longitude: 81.833,
      timezone: 5.5,
    });

    // Lagna: Cancer (Karka)
    assert.equal(chart.ascendant.rashiName, "Cancer");
    assert.ok(chart.ascendant.degreesInSign >= 20 && chart.ascendant.degreesInSign <= 25);

    // Moon in Cancer (Ashlesha, Mercury Dasha balance)
    const moon = chart.planets.find((p) => p.name === "Moon");
    assert.equal(moon?.rashiName, "Cancer");
    assert.equal(moon?.nakshatra, "Ashlesha");
    assert.equal(chart.dashas[0].planet, "Mercury");

    // Jupiter in Sagittarius in 6th house (Own sign)
    const jup = chart.planets.find((p) => p.name === "Jupiter");
    assert.equal(jup?.rashiName, "Sagittarius");
    assert.equal(jup?.house, 6);

    // Sun in Scorpio in 5th house
    const sun = chart.planets.find((p) => p.name === "Sun");
    assert.equal(sun?.rashiName, "Scorpio");
    assert.equal(sun?.house, 5);
  });

  // Case 3: Indira Gandhi (19 Nov 1917, 23:11 IST, Allahabad)
  test("Case 3: Indira Gandhi matches published Vedic chart positions", () => {
    const chart = calculateKundli({
      name: "Indira Gandhi",
      gender: "female",
      birthDate: "1917-11-19",
      birthTime: "23:11",
      birthPlace: "Allahabad, UP",
      latitude: 25.467,
      longitude: 81.833,
      timezone: 5.5,
    });

    // Lagna: Cancer (Karka)
    assert.equal(chart.ascendant.rashiName, "Cancer");

    // Moon in Capricorn (Uttara Ashadha, Sun Dasha balance)
    const moon = chart.planets.find((p) => p.name === "Moon");
    assert.equal(moon?.rashiName, "Capricorn");
    assert.equal(moon?.nakshatra, "Uttara Ashadha");
    assert.equal(chart.dashas[0].planet, "Sun");

    // Saturn in Cancer in 1st house
    const sat = chart.planets.find((p) => p.name === "Saturn");
    assert.equal(sat?.rashiName, "Cancer");
    assert.equal(sat?.house, 1);

    // Jupiter in Taurus (Retrograde)
    const jup = chart.planets.find((p) => p.name === "Jupiter");
    assert.equal(jup?.rashiName, "Taurus");
    assert.equal(jup?.isRetrograde, true);
  });

  // Case 4: Amitabh Bachchan (11 Oct 1942, 16:00 IST, Allahabad)
  test("Case 4: Amitabh Bachchan matches published Vedic chart positions", () => {
    const chart = calculateKundli({
      name: "Amitabh Bachchan",
      gender: "male",
      birthDate: "1942-10-11",
      birthTime: "16:00",
      birthPlace: "Allahabad, UP",
      latitude: 25.467,
      longitude: 81.833,
      timezone: 5.5,
    });

    // Lagna: Aquarius (Kumbha)
    assert.equal(chart.ascendant.rashiName, "Aquarius");

    // Moon in Libra (Swati, Rahu Dasha balance)
    const moon = chart.planets.find((p) => p.name === "Moon");
    assert.equal(moon?.rashiName, "Libra");
    assert.equal(moon?.nakshatra, "Swati");
    assert.equal(chart.dashas[0].planet, "Rahu");

    // 4 Planets in 8th house (Virgo): Sun, Mercury, Mars, Venus
    const sun = chart.planets.find((p) => p.name === "Sun");
    const merc = chart.planets.find((p) => p.name === "Mercury");
    const mars = chart.planets.find((p) => p.name === "Mars");
    const ven = chart.planets.find((p) => p.name === "Venus");

    assert.equal(sun?.rashiName, "Virgo");
    assert.equal(sun?.house, 8);
    assert.equal(merc?.rashiName, "Virgo");
    assert.equal(merc?.house, 8);
    assert.equal(mars?.rashiName, "Virgo");
    assert.equal(mars?.house, 8);
    assert.equal(ven?.rashiName, "Virgo");
    assert.equal(ven?.house, 8);

    // Jupiter in Cancer (Exalted) in 6th house
    const jup = chart.planets.find((p) => p.name === "Jupiter");
    assert.equal(jup?.rashiName, "Cancer");
    assert.equal(jup?.house, 6);
  });

  // Case 5: Dr. APJ Abdul Kalam (15 Oct 1931, 01:15 IST, Rameswaram)
  test("Case 5: Dr. APJ Abdul Kalam matches published Vedic chart positions", () => {
    const chart = calculateKundli({
      name: "Dr. APJ Abdul Kalam",
      gender: "male",
      birthDate: "1931-10-15",
      birthTime: "01:15",
      birthPlace: "Rameswaram, Tamil Nadu",
      latitude: 9.2876,
      longitude: 79.3129,
      timezone: 5.5,
    });

    // Lagna: Cancer (Karka)
    assert.equal(chart.ascendant.rashiName, "Cancer");

    // Jupiter Exalted in Cancer in 1st house (Hamsa Mahapurusha Yoga)
    const jup = chart.planets.find((p) => p.name === "Jupiter");
    assert.equal(jup?.rashiName, "Cancer");
    assert.equal(jup?.house, 1);

    // Moon in Scorpio
    const moon = chart.planets.find((p) => p.name === "Moon");
    assert.equal(moon?.rashiName, "Scorpio");

    // Sun & Mercury in Virgo in 3rd house
    const sun = chart.planets.find((p) => p.name === "Sun");
    assert.equal(sun?.rashiName, "Virgo");
    assert.equal(sun?.house, 3);
  });

  // Panchang Verification
  test("Panchang computes authentic astronomical limbs for known historical and current dates", async () => {
    // Spot check 2026-09-22
    const panchang = await PanchangService.getDailyPanchang("2026-09-22");
    assert.equal(panchang.limbs.tithi.name, "Ekadashi");
    assert.equal(panchang.limbs.tithi.paksha, "Shukla Paksha");
    assert.equal(panchang.limbs.nakshatra.name, "Uttara Ashadha");
    assert.equal(panchang.limbs.karana.name, "Vanija");
    assert.equal(panchang.sunMoon.sunSign, "Kanya (Virgo)");
    assert.equal(panchang.sunMoon.moonSign, "Makara (Capricorn)");
    assert.ok(panchang.sunMoon.sunrise.includes("AM"));
    assert.ok(panchang.sunMoon.sunset.includes("PM"));
  });
});
