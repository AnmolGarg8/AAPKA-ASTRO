/**
 * ============================================================================
 * VEDIC SHADBALA CALCULATION ENGINE (षड्बल - 6-FOLD PLANETARY STRENGTH)
 * ============================================================================
 * Implements classical Parashari Shadbala:
 * 1. Sthana Bala (Positional Strength: Uchcha, Kendradi, Ojayugma, Saptavargaja)
 * 2. Dik Bala (Directional Strength: 1st, 4th, 7th, 10th house orientations)
 * 3. Kaala Bala (Temporal Strength: Diurnal/Nocturnal, Paksha Bala)
 * 4. Cheshta Bala (Motional Strength: Retrograde & Velocity bonus)
 * 5. Naisargika Bala (Natural Inherent Strength: Sun > Moon > Venus > Jupiter > Mercury > Mars > Saturn)
 * 6. Drik Bala (Aspectual Influence)
 *
 * 1 Rupa = 60 Virupas.
 */

import { PlanetName, PlanetPosition, ShadbalaData, ShadbalaPlanetScore } from "./types";

// Standard Minimum Required Strengths in Rupas (Brihat Parashara Hora Shastra)
const REQUIRED_RUPAS: Record<string, number> = {
  Sun: 6.5,
  Moon: 6.0,
  Mars: 5.0,
  Mercury: 7.0,
  Jupiter: 6.5,
  Venus: 5.5,
  Saturn: 5.0,
};

// Fixed Natural Strengths (Naisargika Bala in Virupas)
const NAISARGIKA_BALA: Record<string, number> = {
  Sun: 60.0,
  Moon: 51.43,
  Venus: 42.86,
  Jupiter: 34.29,
  Mercury: 25.71,
  Mars: 17.14,
  Saturn: 8.57,
};

// Debilitation Deep Points (Degrees in absolute 360° longitude)
const DEBILITATION_POINTS: Record<string, number> = {
  Sun: 190.0, // Libra 10°
  Moon: 213.0, // Scorpio 3°
  Mars: 118.0, // Cancer 28°
  Mercury: 345.0, // Pisces 15°
  Jupiter: 275.0, // Capricorn 5°
  Venus: 177.0, // Virgo 27°
  Saturn: 20.0, // Aries 20°
};

export function calculateShadbala(
  planets: PlanetPosition[],
  isDayBirth: boolean
): ShadbalaData {
  const eligiblePlanets: PlanetName[] = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
  const scores: ShadbalaPlanetScore[] = [];

  const sun = planets.find((p) => p.name === "Sun");
  const moon = planets.find((p) => p.name === "Moon");

  for (const name of eligiblePlanets) {
    const planet = planets.find((p) => p.name === name);
    if (!planet) continue;

    // 1. Sthana Bala (Positional Strength)
    // Uchcha Bala: Max 60 virupas at exact exaltation, 0 at debilitation
    const debPoint = DEBILITATION_POINTS[name] || 0;
    let distFromDeb = Math.abs(planet.longitude - debPoint);
    if (distFromDeb > 180) distFromDeb = 360 - distFromDeb;
    const uchchaBala = (distFromDeb / 180) * 60;

    // Kendradi Bala: Kendra (1, 4, 7, 10) = 60, Panaphara (2, 5, 8, 11) = 30, Apoklima (3, 6, 9, 12) = 15
    let kendradiBala = 15;
    if ([1, 4, 7, 10].includes(planet.house)) kendradiBala = 60;
    else if ([2, 5, 8, 11].includes(planet.house)) kendradiBala = 30;

    // Saptavargaja dignity bonus
    let dignityBonus = 45;
    if (planet.dignity === "Exalted") dignityBonus = 60;
    else if (planet.dignity === "Mooltrikona") dignityBonus = 55;
    else if (planet.dignity === "Own Sign") dignityBonus = 50;
    else if (planet.dignity === "Friendly") dignityBonus = 35;
    else if (planet.dignity === "Enemy") dignityBonus = 15;
    else if (planet.dignity === "Debilitated") dignityBonus = 5;

    const sthanaBala = Math.round(uchchaBala + kendradiBala + dignityBonus);

    // 2. Dik Bala (Directional Strength)
    // Powerful house: Jup/Merc in 1, Sun/Mars in 10, Sat in 7, Moon/Ven in 4
    let idealHouse = 1;
    if (name === "Jupiter" || name === "Mercury") idealHouse = 1;
    else if (name === "Sun" || name === "Mars") idealHouse = 10;
    else if (name === "Saturn") idealHouse = 7;
    else if (name === "Moon" || name === "Venus") idealHouse = 4;

    const houseDist = Math.abs(planet.house - idealHouse);
    const effectiveDist = houseDist > 6 ? 12 - houseDist : houseDist;
    const dikBala = Math.round((1 - effectiveDist / 6) * 60);

    // 3. Kaala Bala (Temporal Strength)
    let diurnalBonus = 30;
    if (isDayBirth) {
      if (["Sun", "Jupiter", "Venus"].includes(name)) diurnalBonus = 60;
      else if (["Moon", "Mars", "Saturn"].includes(name)) diurnalBonus = 10;
    } else {
      if (["Moon", "Mars", "Saturn"].includes(name)) diurnalBonus = 60;
      else if (["Sun", "Jupiter", "Venus"].includes(name)) diurnalBonus = 10;
    }
    if (name === "Mercury") diurnalBonus = 45; // Mercury is strong always

    // Paksha Bala (Moon waxing/waning influence)
    let pakshaBala = 30;
    if (sun && moon) {
      let elongation = moon.longitude - sun.longitude;
      if (elongation < 0) elongation += 360;
      const isWaxing = elongation <= 180;
      if (["Moon", "Jupiter", "Venus"].includes(name)) {
        pakshaBala = isWaxing ? 50 : 20;
      } else {
        pakshaBala = isWaxing ? 25 : 45;
      }
    }
    const kaalaBala = Math.round(diurnalBonus + pakshaBala);

    // 4. Cheshta Bala (Motional Strength)
    // Retrograde planets get max 60 virupas bonus
    let cheshtaBala = 25;
    if (planet.isRetrograde) {
      cheshtaBala = 60;
    } else if (name === "Sun" || name === "Moon") {
      cheshtaBala = 45; // Luminaries do not retrograde
    } else {
      cheshtaBala = 35;
    }

    // 5. Naisargika Bala (Natural Fixed Strength)
    const naisargikaBala = Math.round(NAISARGIKA_BALA[name] || 25);

    // 6. Drik Bala (Aspectual influence)
    let drikBala = 15;
    if ([1, 5, 9].includes(planet.house)) drikBala = 25; // Trikona blessing
    else if ([6, 8, 12].includes(planet.house)) drikBala = 5; // Dusthana affliction

    // Total Sum
    const totalVirupas = sthanaBala + dikBala + kaalaBala + cheshtaBala + naisargikaBala + drikBala;
    const totalRupas = parseFloat((totalVirupas / 60).toFixed(2));
    const reqRupas = REQUIRED_RUPAS[name] || 5.5;
    const strengthRatio = parseFloat((totalRupas / reqRupas).toFixed(2));

    scores.push({
      planet: name,
      sthanaBala,
      dikBala,
      kaalaBala,
      cheshtaBala,
      naisargikaBala,
      drikBala,
      totalVirupas,
      totalRupas,
      requiredRupas: reqRupas,
      strengthRatio,
      rank: 0, // set below
    });
  }

  // Sort by strengthRatio descending to assign ranks
  scores.sort((a, b) => b.strengthRatio - a.strengthRatio);
  scores.forEach((s, idx) => {
    s.rank = idx + 1;
  });

  return {
    planets: scores,
    strongestPlanet: scores[0].planet,
    weakestPlanet: scores[scores.length - 1].planet,
  };
}
