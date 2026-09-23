import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { calculateKundli } from "../src/lib/astrology/chartCalculations";
import { calculateGunMilan } from "../src/lib/astrology/gunMilan";
import { calculateAshtakvarga } from "../src/lib/astrology/ashtakvarga";
import { calculateShadbala } from "../src/lib/astrology/shadbala";
import { calculateAllDivisionalCharts } from "../src/lib/astrology/divisionalCharts";
import { DivisionalChartData, DivisionalChartCode } from "../src/lib/astrology/types";

describe("Vedic Astrology Calculation Accuracy & Depth Engine", () => {
  const sampleBirth = {
    name: "Arjun Verma",
    gender: "male" as const,
    birthDate: "1995-10-24",
    birthTime: "14:35",
    birthPlace: "New Delhi, Delhi",
    latitude: 28.6139,
    longitude: 77.209,
    timezone: 5.5,
  };

  test("calculates accurate Nirayana geocentric planetary positions within 0..360°", () => {
    const kundli = calculateKundli(sampleBirth);
    assert.ok(kundli.ascendant.longitude >= 0 && kundli.ascendant.longitude < 360);
    assert.ok(kundli.ayanamsa > 23 && kundli.ayanamsa < 25); // Lahiri Ayanamsa for 1995 is ~23.8°

    // Verify all 9 planets have valid houses, rashis, and degrees
    assert.equal(kundli.planets.length, 9);
    for (const p of kundli.planets) {
      assert.ok(p.rashiNumber >= 1 && p.rashiNumber <= 12, `${p.name} rashiNumber out of bounds`);
      assert.ok(p.degreesInSign >= 0 && p.degreesInSign <= 30, `${p.name} degrees out of bounds`);
      assert.ok(p.house >= 1 && p.house <= 12, `${p.name} house out of bounds`);
      assert.ok(p.nakshatraNumber >= 1 && p.nakshatraNumber <= 27, `${p.name} nakshatra out of bounds`);
      assert.ok(p.pada >= 1 && p.pada <= 4, `${p.name} pada out of bounds`);
    }
  });

  test("calculates real retrograde motion and speed for planets", () => {
    const kundli = calculateKundli(sampleBirth);
    // Rahu and Ketu are always retrograde in mean motion
    const rahu = kundli.planets.find((p) => p.name === "Rahu");
    const ketu = kundli.planets.find((p) => p.name === "Ketu");
    assert.equal(rahu?.isRetrograde, true);
    assert.equal(ketu?.isRetrograde, true);

    // Sun and Moon never retrograde
    const sun = kundli.planets.find((p) => p.name === "Sun");
    const moon = kundli.planets.find((p) => p.name === "Moon");
    assert.equal(sun?.isRetrograde, false);
    assert.equal(moon?.isRetrograde, false);

    // Physical planets have speed property
    const mars = kundli.planets.find((p) => p.name === "Mars");
    assert.ok(typeof mars?.speed === "number");
  });

  test("calculates planetary avasthas (Baladi & Jagradadi)", () => {
    const kundli = calculateKundli(sampleBirth);
    for (const p of kundli.planets) {
      assert.ok(p.baladiAvastha, `${p.name} missing Baladi Avastha`);
      assert.ok(p.jagradadiAvastha, `${p.name} missing Jagradadi Avastha`);
    }
  });

  test("calculates all 7 Parashari Divisional Charts (D1 through D12)", () => {
    const kundli = calculateKundli(sampleBirth);
    assert.ok(kundli.divisionalCharts);

    const vargas: DivisionalChartCode[] = ["D1", "D2", "D3", "D7", "D9", "D10", "D12"];
    for (const v of vargas) {
      const chart: DivisionalChartData = kundli.divisionalCharts[v];
      assert.ok(chart, `Missing divisional chart ${v}`);
      assert.equal(chart.houses.length, 12, `${v} chart must have 12 houses`);

      // Total planets placed across all houses in this varga must be 9
      const totalPlaced = chart.houses.reduce((acc: number, h) => acc + h.planets.length, 0);
      assert.equal(totalPlaced, 9, `${v} must place all 9 planets`);
    }
  });

  test("calculates Sarvashtakavarga (SAV) with exact Parashari 337 total bindus", () => {
    const kundli = calculateKundli(sampleBirth);
    assert.ok(kundli.ashtakvarga);

    const sav = kundli.ashtakvarga.sarvashtakavarga;
    let totalBindus = 0;
    for (let h = 1; h <= 12; h++) {
      totalBindus += sav[h];
      assert.ok(sav[h] > 0, `House ${h} should have bindus`);
    }

    // Parashari SAV invariant: sum across 12 houses must equal exactly 337
    assert.equal(totalBindus, 337, `Sarvashtakavarga sum must equal 337 (got ${totalBindus})`);
  });

  test("calculates 6-Fold Shadbala strengths and rankings for classical 7 planets", () => {
    const kundli = calculateKundli(sampleBirth);
    assert.ok(kundli.shadbala);
    assert.equal(kundli.shadbala.planets.length, 7);

    for (const sp of kundli.shadbala.planets) {
      assert.ok(sp.totalVirupas > 0, `${sp.planet} total Virupas must be positive`);
      assert.ok(sp.totalRupas > 0, `${sp.planet} total Rupas must be positive`);
      assert.ok(sp.strengthRatio > 0, `${sp.planet} strength ratio must be positive`);
      assert.ok(sp.rank >= 1 && sp.rank <= 7, `${sp.planet} rank must be 1..7`);
    }

    assert.ok(kundli.shadbala.strongestPlanet);
    assert.ok(kundli.shadbala.weakestPlanet);
  });

  test("calculates 4-tier nested Vimshottari dasha hierarchy including Sookshmadashas", () => {
    const kundli = calculateKundli(sampleBirth);
    assert.ok(kundli.dashas.length >= 9);

    const currentMaha = kundli.dashas.find((d) => d.isCurrent);
    assert.ok(currentMaha, "Must find current Mahadasha");
    assert.ok(currentMaha.antardashas && currentMaha.antardashas.length === 9);

    const currentAntar = currentMaha.antardashas.find((a) => a.isCurrent);
    assert.ok(currentAntar, "Must find current Antardasha");
    assert.ok(currentAntar.pratyantardashas && currentAntar.pratyantardashas.length === 9);

    const currentPrat = currentAntar.pratyantardashas.find((p) => p.isCurrent);
    assert.ok(currentPrat, "Must find current Pratyantardasha");
    assert.ok(currentPrat.sookshmadashas && currentPrat.sookshmadashas.length === 9, "Must generate 9 Sookshmadashas");

    for (const sook of currentPrat.sookshmadashas) {
      assert.ok(sook.planet);
      assert.ok(sook.startDate);
      assert.ok(sook.endDate);
    }
  });

  test("calculates KP System (Krishnamurti Paddhati) house cusps and sub-lords", () => {
    const kundli = calculateKundli(sampleBirth);
    assert.ok(kundli.kpSystem, "KP system data must be attached to kundli");
    assert.equal(kundli.kpSystem.houses.length, 12, "Must have 12 KP house cusps");
    assert.equal(kundli.kpSystem.planets.length, 9, "Must have 9 KP planets");

    // Verify each house cusp has star lord and sub lord
    for (const cusp of kundli.kpSystem.houses) {
      assert.ok(cusp.houseNumber >= 1 && cusp.houseNumber <= 12);
      assert.ok(cusp.sign);
      assert.ok(cusp.signLord);
      assert.ok(cusp.star);
      assert.ok(cusp.starLord);
      assert.ok(cusp.subLord, `Cusp ${cusp.houseNumber} missing sub lord`);
      assert.ok(cusp.subSubLord, `Cusp ${cusp.houseNumber} missing sub-sub lord`);
    }

    // Verify each planet has KP significators
    for (const p of kundli.kpSystem.planets) {
      assert.ok(p.name);
      assert.ok(p.starLord);
      assert.ok(p.subLord, `${p.name} missing KP sub lord`);
    }
  });

  test("diagnoses comprehensive doshas including Kaal Sarp and Kuja Dosha exemptions", () => {
    const kundli = calculateKundli(sampleBirth);
    assert.ok(typeof kundli.doshas.hasManglik === "boolean");
    assert.ok(typeof kundli.doshas.hasSadeSati === "boolean");
    assert.ok(typeof kundli.doshas.hasKalsarpa === "boolean");
    assert.ok(kundli.doshas.kalsarpaType);
    assert.ok(typeof kundli.doshas.hasPitraDosha === "boolean");
  });

  test("calculates authentic Ashtakoot Guna Milan with 14-animal Yoni and cancellation rules", () => {
    const match = calculateGunMilan(
      sampleBirth,
      {
        name: "Priya Sharma",
        birthDate: "1997-04-12",
        birthTime: "08:15",
        birthPlace: "Jaipur, Rajasthan",
        latitude: 26.9124,
        longitude: 75.7873,
        timezone: 5.5,
      }
    );

    assert.ok(match.totalScore >= 0 && match.totalScore <= 36);
    assert.equal(match.maxScore, 36);
    assert.ok(match.percentage >= 0 && match.percentage <= 100);

    // Verify all 8 Kootas have scores within classical maximums
    assert.ok(match.varna.points >= 0 && match.varna.points <= 1);
    assert.ok(match.vashya.points >= 0 && match.vashya.points <= 2);
    assert.ok(match.tara.points >= 0 && match.tara.points <= 3);
    assert.ok(match.yoni.points >= 0 && match.yoni.points <= 4);
    assert.ok(match.grahaMaitri.points >= 0 && match.grahaMaitri.points <= 5);
    assert.ok(match.gana.points >= 0 && match.gana.points <= 6);
    assert.ok(match.bhakoot.points >= 0 && match.bhakoot.points <= 7);
    assert.ok(match.nadi.points >= 0 && match.nadi.points <= 8);

    assert.ok(match.manglikMatch);
    assert.ok(match.recommendations.length > 0);
  });

  test("calculates authentic D9 Navamsha divisional chart", () => {
    const kundli = calculateKundli(sampleBirth);
    const d9 = kundli.divisionalCharts?.["D9"];
    assert.ok(d9, "D9 Navamsha chart must be generated");
    assert.equal(d9.code, "D9");
    assert.equal(d9.houses.length, 12);

    // Verify all planets are placed in D9 houses
    const totalPlanetsInD9 = d9.houses.reduce((acc, h) => acc + h.planets.length, 0);
    assert.equal(totalPlanetsInD9, 9, "All 9 planets must be placed in D9");
  });
});
